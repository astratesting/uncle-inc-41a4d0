import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          50: "#F5F5F5",
          100: "#E8E8E8",
          200: "#D1D1D1",
          300: "#B0B0B0",
          400: "#8A8A8A",
          500: "#6B6B6B",
          600: "#555555",
          700: "#404040",
          800: "#333333",
          900: "#2D2D2D",
          950: "#1A1A1A",
        },
        ivory: "#FFFFF0",
        gold: {
          DEFAULT: "#C9A96E",
          light: "#D4BA85",
          dark: "#B8954F",
          50: "#FBF7EE",
          100: "#F5EDDA",
          200: "#EBD9B5",
          300: "#DFC28A",
          400: "#D4BA85",
          500: "#C9A96E",
          600: "#B8954F",
          700: "#9A7A3D",
          800: "#7C6232",
          900: "#5E4A26",
        },
        burgundy: {
          DEFAULT: "#800020",
          light: "#9A1A3A",
          dark: "#660019",
          50: "#FDF2F4",
          100: "#FCE5E9",
          200: "#F9CCD5",
          300: "#F4A3B5",
          400: "#EC6E8D",
          500: "#DF4068",
          600: "#C7235A",
          700: "#A61849",
          800: "#800020",
          900: "#660019",
        },
      },
      fontFamily: {
        serif: ["Canela", "Georgia", "Times New Roman", "serif"],
        sans: [
          "Neue Haas Grotesk",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "system-ui",
          "sans-serif",
        ],
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out",
        "slide-up": "slide-up 0.6s ease-out",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
