/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");
import removeImports from "next-remove-imports";

/** @type {function(import("next").NextConfig): import("next").NextConfig}} */
const removeImportsFun = removeImports({
  // test: /node_modules([\s\S]*?)\.(tsx|ts|js|mjs|jsx)$/,
  // matchImports: "\\.(less|css|scss|sass|styl)$"
});

const config = {
  reactStrictMode: true,

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
export default removeImportsFun({
  webpack(config, options) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config;
  },
});
