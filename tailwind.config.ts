import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#050505",
        "void-2": "#0a0a0a",
        "void-3": "#111111",
        electric: "#00D4FF",
        "electric-2": "#0EA5E9",
        plasma: "#8B5CF6",
        "plasma-2": "#7C3AED",
        chrome: "#C0C0C0",
        "glass-bg": "rgba(255,255,255,0.03)",
        "glass-border": "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      fontSize: {
        "10xl": ["10rem", { lineHeight: "0.9" }],
        "11xl": ["12rem", { lineHeight: "0.85" }],
        "12xl": ["14rem", { lineHeight: "0.85" }],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "glow-blue": "radial-gradient(ellipse at center, rgba(14,165,233,0.15) 0%, transparent 70%)",
        "glow-plasma": "radial-gradient(ellipse at center, rgba(139,92,246,0.15) 0%, transparent 70%)",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "marquee": "marquee 25s linear infinite",
        "marquee-reverse": "marqueeReverse 25s linear infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
