import { type AppType } from "next/app";

import { api } from "@/src/lib/api";

import "@/src/styles/globals.css";
import { Fira_Mono } from "next/font/google";

//👇 Configure our font object
const firaMono = Fira_Mono({
  subsets: ["latin"],
  weight: "400",
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={firaMono.className}>
      <Component {...pageProps} />
    </main>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
export default api.withTRPC(MyApp);
