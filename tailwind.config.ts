import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        others: "var(--color-others)",
        textcolor: "var(--color-text)",
      },
    },
  },
  plugins: [],
};

export default config;
