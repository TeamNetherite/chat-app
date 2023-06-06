import typography from "@tailwindcss/typography";
import plugin from "tailwindcss/plugin";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["src/**/*.svelte"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "gg sans",
          "Noto Sans",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        code: [
          "JetBrainsMono Nerd Font Mono",
          "Consolas",
          "Andale Mono WT",
          "Andale Mono",
          "Lucida Console",
          "Lucida Sans Typewriter",
          "DejaVu Sans Mono",
          "Bitstream Vera Sans Mono",
          "Liberation Mono",
          "Nimbus Mono L",
          "Monaco",
          "Courier New",
          "Courier",
          "monospace",
        ],
        heading: [
          "ABC Ginto Nord",
          "Noto Sans",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        headingSecondary: [
          "Montserrat",
          "ABC Ginto Nord",
          "Noto Sans",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        rubik: ["Rubik", "Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        seasalt: "#f6f6f6",
        red: {
          bittersweet: "#FF5050",
        },
        orange: {
          scarlet: "#FC2F00",
        },
        yellow: {
          selective: "#FFBC0A",
        },
        blue: {
          celestial: "#49afe2",
        },
        brown: {
          50: "#fdf8f6",
          100: "#f2e8e5",
          200: "#eaddd7",
          300: "#e0cec7",
          400: "#d2bab0",
          500: "#bfa094",
          600: "#a18072",
          700: "#977669",
          800: "#846358",
          900: "#43302b",
          netherite: "#4D4143",
          "netherite-outline": "#3E3232",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "hsl(var(--background))",
          secondary: "hsl(var(--background-secondary))",
        },
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      height: {
        dscreen: "100dvh",
      },
      width: {
        dscreen: "100dvw",
      },
    },
  },
  plugins: [
    typography,
    plugin(({ addComponents }) => {
      addComponents({
        ".bg-normal": "@apply dark:bg-dark bg-light",
      });
    }),
    animate,
  ],
  darkMode: "class",
};
