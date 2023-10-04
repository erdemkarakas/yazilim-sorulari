import { type AppType } from "next/app";

import { api } from "@/src/lib/api";

import "@/src/styles/globals.css";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Yazılım Soruları</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
export default api.withTRPC(MyApp);
