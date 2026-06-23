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
          50: "#FAFAF9",
          100: "#F5F5F4",
          200: "#E7E5E4",
          300: "#D6D3D1",
          400: "#A8A29E",
          500: "#78716C",
          600: "#57534E",
          700: "#44403C",
          800: "#292524",
          900: "#1C1917",
          950: "#0C0A09",
        },
        ivory: "#FAF8F5",
        gold: {
          DEFAULT: "#B8A88A",
          light: "#C4B396",
          dark: "#A89878",
          50: "#FBF8F1",
          100: "#F5EDD8",
          200: "#ECDBB4",
          300: "#DDC48A",
          400: "#C4B396",
          500: "#B8A88A",
          600: "#A89878",
          700: "#8A7A60",
          800: "#6E624E",
          900: "#5A5040",
        },
        burgundy: {
          DEFAULT: "#6B2D3E",
          light: "#7A3448",
          dark: "#5A2535",
          50: "#FDF2F4",
          100: "#FCE7EB",
          200: "#F9D0DA",
          300: "#F4A8BC",
          400: "#EC7696",
          500: "#DF4D74",
          600: "#C73058",
          700: "#A62247",
          800: "#8B1E3E",
          900: "#6B2D3E",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
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
