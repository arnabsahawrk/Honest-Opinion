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
        bgPrimary: "#1B1A55",
        bgSecondary: "#070F2B",
        textPrimary: "#EDEDED",
        textSecondary: "#171717",
      },
    },
  },
  plugins: [],
};
export default config;
