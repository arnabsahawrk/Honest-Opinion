import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#444444",
        bgSecondary: "#DA0037",
        textPrimary: "#EDEDED",
        textSecondary: "#171717",
      },
    },
  },
  plugins: [],
};
export default config;
