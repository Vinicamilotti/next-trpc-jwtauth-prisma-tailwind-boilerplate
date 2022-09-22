import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from "@trpc/server";
import { serialize } from "cookie";
import path from "path";
import { createUserSchema, requestLogin } from "../../schemas/user.schema";
import { signJWT } from "../../utils/jwt";
import { createRouter } from "../createRouter";

export const userRouter = createRouter()
  .mutation("register-user", {
    input: createUserSchema,
    resolve: async ({ ctx, input }) => {
      const { username, email, password } = input;
      try {
        const user = await ctx.prisma.user.create({
          data: {
            username,
            email,
            password,
          },
        });
        return user;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            throw new trpc.TRPCError({
              code: "CONFLICT",
              message: "Usuário já cadastrado",
            });
          }
          throw new trpc.TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Ops, algo deu errado",
          });
        }
      }
    },
  })
  .mutation("login", {
    input: requestLogin,
    resolve: async ({ ctx, input }) => {
      const { username, password } = input;
      const user = await ctx.prisma.user.findUnique({
        where: {
          username,
        },
      });
      if (!username) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "Usuário não encontrado :(",
        });
      }
      const passValid = user?.password == password ? true : false;
      if (!passValid) {
        throw new trpc.TRPCError({
          code: "FORBIDDEN",
          message: "Senha incorreta",
        });
      }
      const jwt = signJWT({
        username: user?.username,
        id: user?.id,
      });
      ctx.res.setHeader("Set-Cookie", serialize("token", jwt, { path: "/" }));
      return {
        redirect: "/dashboard",
      };
    },
  })
  .query("me", {
    resolve({ ctx }) {
      return ctx.user;
    },
  });
