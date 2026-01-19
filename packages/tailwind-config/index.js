/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--palette-primary-main) / <alpha-value>)",
          light: "hsl(var(--palette-primary-light) / <alpha-value>)",
          dark: "hsl(var(--palette-primary-dark) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--palette-secondary-main) / <alpha-value>)",
          light: "hsl(var(--palette-secondary-light) / <alpha-value>)",
          dark: "hsl(var(--palette-secondary-dark) / <alpha-value>)",
        },
        error: {
          DEFAULT: "hsl(var(--palette-error-main) / <alpha-value>)",
          light: "hsl(var(--palette-error-light) / <alpha-value>)",
          dark: "hsl(var(--palette-error-dark) / <alpha-value>)",
          contrast: "var(--palette-error-contrast)",
        },
        warning: {
          DEFAULT: "hsl(var(--palette-warning-main) / <alpha-value>)",
          light: "hsl(var(--palette-warning-light) / <alpha-value>)",
          dark: "hsl(var(--palette-warning-dark) / <alpha-value>)",
          contrast: "var(--palette-warning-contrast)",
        },
        info: {
          DEFAULT: "hsl(var(--palette-info-main) / <alpha-value>)",
          light: "hsl(var(--palette-info-light) / <alpha-value>)",
          dark: "hsl(var(--palette-info-dark) / <alpha-value>)",
          contrast: "var(--palette-info-contrast)",
        },
        success: {
          DEFAULT: "hsl(var(--palette-success-main) / <alpha-value>)",
          light: "hsl(var(--palette-success-light) / <alpha-value>)",
          dark: "hsl(var(--palette-success-dark) / <alpha-value>)",
          contrast: "var(--palette-success-contrast)",
        },
        grey: {
          50: "var(--palette-grey-50)",
          100: "var(--palette-grey-100)",
          200: "var(--palette-grey-200)",
          300: "var(--palette-grey-300)",
          400: "var(--palette-grey-400)",
          500: "var(--palette-grey-500)",
          600: "var(--palette-grey-600)",
          700: "var(--palette-grey-700)",
          800: "var(--palette-grey-800)",
          900: "var(--palette-grey-900)",
          A100: "var(--palette-grey-A100)",
          A200: "var(--palette-grey-A200)",
          A400: "var(--palette-grey-A400)",
          A700: "var(--palette-grey-A700)",
        },
        text: {
          primary: "var(--palette-text-primary)",
          secondary: "var(--palette-text-secondary)",
          muted: "var(--palette-text-secondary)",
        },
        divider: "var(--palette-divider)",
        "action-hover": "var(--palette-action-hover)",
        "action-selected": "var(--palette-action-selected)",
        background: {
          DEFAULT: "hsl(var(--palette-background-default) / <alpha-value>)",
          surface: "hsl(var(--palette-background-paper) / <alpha-value>)",
        },
        surface: "hsl(var(--palette-background-paper) / <alpha-value>)",
      },
      borderRadius: {
        xs: "var(--radius-xs, 0.125rem)",
        sm: "var(--radius-sm, 2px)",
        md: "var(--radius-md, 3px)",
        DEFAULT: "var(--radius, 4px)",
        lg: "var(--radius-lg, 8px)",
        xl: "var(--radius-xl, 12px)",
        "2xl": "var(--radius-2xl, 16px)",
        full: "var(--radius-full, 9999px)",
      },
      transitionTimingFunction: {
        "ease-in-out":
          "var(--transition-easing-easeInOut, cubic-bezier(0.4, 0, 0.2, 1))",
        "ease-out":
          "var(--transition-easing-easeOut, cubic-bezier(0.0, 0, 0.2, 1))",
        "ease-in":
          "var(--transition-easing-easeIn, cubic-bezier(0.4, 0, 1, 1))",
        sharp: "var(--transition-easing-sharp, cubic-bezier(0.4, 0, 0.6, 1))",
      },
      transitionDuration: {
        fast: "150ms",    // hover states, quick feedback
        normal: "250ms",  // standard transitions
        slow: "350ms",    // modals, panels
      },
    },
  },
};
