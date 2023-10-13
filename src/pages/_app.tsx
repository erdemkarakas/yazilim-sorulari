import { type AppType } from "next/app";

import { api } from "@/src/lib/api";

import "@/src/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
export default api.withTRPC(MyApp);
