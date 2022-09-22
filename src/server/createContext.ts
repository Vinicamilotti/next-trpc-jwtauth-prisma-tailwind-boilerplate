import { NextApiRequest, NextApiResponse } from "next";
import { verifyJWT } from "../utils/jwt";
import { prisma } from "../utils/prisma";

interface CtxUser {
  id: string;
  username: string;
  email: string;
  iat: string;
  exp: number;
}

function getUserFromRequest(req: NextApiRequest) {
  const token = req.cookies.token;
  if (token) {
    try {
      const verify = verifyJWT<CtxUser>(token);
      return verify;
    } catch {
      return null;
    }
  }
  return null;
}

export function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const user = getUserFromRequest(req);
  return { req, res, prisma, user };
}

export type Context = ReturnType<typeof createContext>;
