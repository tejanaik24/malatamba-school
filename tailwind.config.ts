import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#762123",
        dark: "#1a0a0a",
        light: "#f5f0f0",
        gold: "#c9a84c",
        crimson: {
          50: "#fdf2f2",
          100: "#f9e0e0",
          200: "#f4c6c6",
          300: "#ea9e9e",
          400: "#dc6d6d",
          500: "#cf4646",
          600: "#c13030",
          700: "#a22424",
          800: "#762123",
          900: "#641e20",
          950: "#360c0d",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
