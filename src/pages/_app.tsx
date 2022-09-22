import "../../styles/globals.css";
import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";
import { AppRouter } from "../server/route/app.router";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import superjson from "superjson";

import type { AppProps } from "next/app";
import { trpc } from "../utils/trpc";
import { UserContextProvider } from "../context/user.context";

function MyApp({ Component, pageProps }: AppProps) {
  const { data, error, isLoading } = trpc.useQuery(["users.me"]);
  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <UserContextProvider value={data}>
      <div className="grid h-screen w-screen justify-center bg-slate-900 text-white">
        <Component {...pageProps} />
      </div>
    </UserContextProvider>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";
    const links = [
      loggerLink(),
      httpBatchLink({
        maxBatchSize: 10,
        url,
      }),
    ];
    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60,
          },
        },
      },
      headers() {
        if (ctx?.req) {
          return {
            ...ctx.req?.headers,
            "x-ssr": "1",
          };
        }
        return {};
      },
      links,
      transformer: superjson,
    };
  },
  ssr: false,
})(MyApp);
