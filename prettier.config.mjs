/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  theme: {
    extend: {
      colors: {
        primary: "rgba(10, 85, 255, 1)",
        "primary-400": "rgba(10, 85, 255, 0.4)",
        "primary-050": "rgba(10, 85, 255, 0.05)",
        "primary-hover": "rgba(9, 79, 238, 1)",
      },

      fontSize: {
        xxl: "2.0rem",
        xl: "1.5rem",
        lg: "1.125rem",
        md: "1rem",
        sm: "0.875rem",
        xs: "0.75rem",
      },
    },
  },
};

export default config;
