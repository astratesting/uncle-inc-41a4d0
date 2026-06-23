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
          DEFAULT: "#2D2D2D",
          50: "#F5F5F5",
          100: "#E8E8E8",
          200: "#D1D1D1",
          300: "#A3A3A3",
          400: "#787878",
          500: "#525252",
          600: "#3D3D3D",
          700: "#2D2D2D",
          800: "#1A1A1A",
          900: "#0D0D0D",
        },
        ivory: {
          DEFAULT: "#FFFFF0",
          50: "#FFFFF8",
          100: "#FFFFF0",
          200: "#FEFEE0",
          300: "#FDFCC8",
        },
        gold: {
          DEFAULT: "#C9A96E",
          50: "#FBF7EF",
          100: "#F5EDD9",
          200: "#ECDBB5",
          300: "#DFC48C",
          400: "#C9A96E",
          500: "#B8944F",
          600: "#A07B3A",
          700: "#856430",
          800: "#6E502B",
          900: "#5C4327",
        },
        burgundy: {
          DEFAULT: "#722F37",
          50: "#FDF2F3",
          100: "#FCE7E8",
          200: "#F9D2D6",
          300: "#F3ADB4",
          400: "#EB7E8B",
          500: "#DD5165",
          600: "#C93149",
          700: "#A8243C",
          800: "#8E2038",
          900: "#722F37",
        },
      },
      fontFamily: {
        heading: ["Playfair Display", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fade-in 0.8s ease-out forwards",
        "slide-up": "slide-up 0.8s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "lattice":
          "linear-gradient(to right, rgba(201,169,110,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(201,169,110,0.06) 1px, transparent 1px)",
        "lattice-dense":
          "linear-gradient(to right, rgba(201,169,110,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(201,169,110,0.1) 1px, transparent 1px)",
      },
      backgroundSize: {
        "lattice": "60px 60px",
        "lattice-dense": "40px 40px",
      },
    },
  },
  plugins: [],
};

export default config;
