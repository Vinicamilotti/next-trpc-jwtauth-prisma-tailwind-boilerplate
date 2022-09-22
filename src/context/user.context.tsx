import { inferProcedureOutput } from "@trpc/server";
import { createContext, useContext } from "react";
import { AppRouter } from "../server/route/app.router";

type TQuery = keyof AppRouter["_def"]["queries"];

type InfereQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
  AppRouter["_def"]["queries"][TRouteKey]
>;

const UserContext = createContext<InfereQueryOutput<"users.me">>(null);

function UserContextProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: InfereQueryOutput<"users.me"> | undefined;
}) {
  return (
    <UserContext.Provider value={value || null}>
      {children}
    </UserContext.Provider>
  );
}

const useUserContext = () => {
  return useContext(UserContext);
};

export { useUserContext, UserContextProvider };
