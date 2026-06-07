import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      colors: {
        ink: "#1A1633",
        brand: "#3a1fb3",
        "brand-soft": "#E3A9BE",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui"],
      },
      boxShadow: {
        sticker: "5px 5px 0 0 #3a1fb3",
        "sticker-press": "2px 2px 0 0 #3a1fb3",
      },
      keyframes: {
        ripple: {
          "0%": { transform: "scale(0.5)", opacity: "0.55" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
      },
      animation: {
        ripple: "ripple 0.9s ease-out forwards",
      },
    },
  },
} satisfies Config;