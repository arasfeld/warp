/** @type {import('tailwindcss').Config} */
import coreConfig from "@warp/tailwind-config";

export default {
  ...coreConfig,
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/react/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Merge core colors with docs-specific extensions
      ...coreConfig.theme?.extend,
      transitionDuration: {
        // Extend core with docs-specific timing
        "entering-screen": "var(--transition-duration-enteringScreen, 225ms)",
        "leaving-screen": "var(--transition-duration-leavingScreen, 195ms)",
        shortest: "var(--transition-duration-shortest, 150ms)",
        shorter: "var(--transition-duration-shorter, 200ms)",
        short: "var(--transition-duration-short, 250ms)",
        standard: "var(--transition-duration-standard, 300ms)",
        complex: "var(--transition-duration-complex, 375ms)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-docs":
          "linear-gradient(to right, hsl(var(--docs-gradient-from)), hsl(var(--docs-gradient-to)))",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in-up-fast": "fadeInUp 0.3s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in-up-slow": "fadeInUp 1s cubic-bezier(0.16,1,0.3,1) both",
        "slide-down": "slideDown 0.3s ease-out",
        "vortex-rotate": "vortexRotate 15s linear infinite",
        "particle-float": "particleFloat 20s ease-in-out infinite",
        "float-orb": "floatOrb 25s ease-in-out infinite",
        "logo-glow": "logoGlow 3s ease-in-out infinite",
        "bounce-scroll": "bounceScroll 2s infinite",
        "title-shimmer": "titleShimmer 8s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          from: {
            opacity: "0",
            transform: "translateY(60px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideDown: {
          from: {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        vortexRotate: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        particleFloat: {
          "0%, 100%": {
            transform: "translate(0, 0)",
            opacity: "0.3",
          },
          "50%": {
            transform: "translate(var(--tx), var(--ty))",
            opacity: "1",
          },
        },
        floatOrb: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "25%": { transform: "translate(100px, -100px) scale(1.2)" },
          "50%": { transform: "translate(-80px, 80px) scale(0.9)" },
          "75%": { transform: "translate(120px, 100px) scale(1.1)" },
        },
        logoGlow: {
          "0%, 100%": {
            filter: "drop-shadow(0 0 5px rgba(168, 85, 247, 0.5))",
          },
          "50%": { filter: "drop-shadow(0 0 15px rgba(168, 85, 247, 0.8))" },
        },
        bounceScroll: {
          "0%, 100%": { transform: "translate(-50%, 0)" },
          "50%": { transform: "translate(-50%, 15px)" },
        },
        titleShimmer: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      fontFamily: {
        sans: [
          "var(--font-space-grotesk)",
          "Space Grotesk",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        mono: [
          "var(--font-jetbrains-mono)",
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      boxShadow: {
        "docs-sm": "var(--docs-shadow-sm)",
        "docs-md": "var(--docs-shadow-md)",
        "docs-lg": "var(--docs-shadow-lg)",
        "docs-xl": "var(--docs-shadow-xl)",
        "docs-2xl": "var(--docs-shadow-2xl)",
      },
    },
  },
};
