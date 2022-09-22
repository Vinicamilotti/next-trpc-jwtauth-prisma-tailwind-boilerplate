import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { createContext } from "../../../server/createContext";
import { appRouter } from "../../../server/route/app.router";

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  onError({ error }) {
    if (error.code === "INTERNAL_SERVER_ERROR") {
      console.log("something went wroth", error);
    }
  },
});
