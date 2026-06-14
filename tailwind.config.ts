import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./1779827441215156740.html",
    "./index.html",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // HSL переменные
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Брендовые цвета (фиксированные)
        teal: {
          DEFAULT: "#0cb8a0",
          dark: "#089b86",
          light: "#e0f7f4",
          "50": "#f0fdfa",
          "100": "#ccfbf1",
          "200": "#99f6e4",
          "300": "#5eead4",
          "400": "#2dd4bf",
          "500": "#14b8a6",
          "600": "#0cb8a0",
          "700": "#0f766e",
          "800": "#115e59",
          "900": "#134e4a",
        },
        yellow: {
          DEFAULT: "#ffe227",
          dark: "#f5d000",
          light: "#fef9c3",
          "50": "#fefce8",
          "100": "#fef9c3",
          "200": "#fef08a",
          "300": "#fde047",
          "400": "#facc15",
          "500": "#eab308",
          "600": "#ffe227",
          "700": "#a16207",
          "800": "#854d0e",
          "900": "#713f12",
        },
        dark: {
          DEFAULT: "#0d1f1e",
          1: "#0d1f1e",
          2: "#163330",
          3: "#1a4743",
        },
        gray: "#6b8f8c",
        "light-bg": "#f4fafa",
      },
      fontFamily: {
        golos: ["Golos Text", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "bounce-slow": {
          "0%, 100%": {
            transform: "translateY(-3%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards",
        "fade-in": "fade-in 0.5s ease forwards",
        "scale-in": "scale-in 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards",
        float: "float 4s ease-in-out infinite",
        "spin-slow": "spin-slow 12s linear infinite",
        marquee: "marquee 20s linear infinite",
        shimmer: "shimmer 2s infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        "bounce-slow": "bounce-slow 2s infinite",
      },
      backgroundImage: {
        "gradient-teal": "linear-gradient(135deg, #0cb8a0 0%, #089b86 100%)",
        "gradient-yellow": "linear-gradient(135deg, #ffe227 0%, #f5d000 100%)",
        "gradient-mesh":
          "radial-gradient(ellipse at 20% 50%, rgba(12, 184, 160, 0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(255, 226, 39, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 60% 80%, rgba(12, 184, 160, 0.08) 0%, transparent 50%)",
        "gradient-dark-mesh":
          "radial-gradient(ellipse at 20% 50%, rgba(12, 184, 160, 0.2) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(255, 226, 39, 0.08) 0%, transparent 50%)",
      },
      boxShadow: {
        teal: "0 8px 24px rgba(12, 184, 160, 0.15)",
        "teal-lg": "0 12px 32px rgba(12, 184, 160, 0.2)",
        yellow: "0 8px 24px rgba(255, 226, 39, 0.25)",
        "inner-teal": "inset 0 2px 4px 0 rgba(12, 184, 160, 0.05)",
      },
      screens: {
        xs: "480px",
        "3xl": "1600px",
      },
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
} satisfies Config;
