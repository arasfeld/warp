/**
 * Typography scale
 * Font sizes, line heights, and font weights
 * Inspired by modern design systems like Tailwind and shadcn
 */
export const typography = {
  fontFamily: {
    sans: [
      "ui-sans-serif",
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      '"Noto Sans"',
      "sans-serif",
    ],
    serif: [
      "ui-serif",
      "Georgia",
      "Cambria",
      '"Times New Roman"',
      "Times",
      "serif",
    ],
    mono: [
      "ui-monospace",
      "SFMono-Regular",
      "Menlo",
      "Monaco",
      "Consolas",
      '"Liberation Mono"',
      '"Courier New"',
      "monospace",
    ],
  },
  fontSize: {
    xs: { fontSize: "0.75rem", lineHeight: "1rem" }, // 12px
    sm: { fontSize: "0.875rem", lineHeight: "1.25rem" }, // 14px
    base: { fontSize: "1rem", lineHeight: "1.5rem" }, // 16px
    lg: { fontSize: "1.125rem", lineHeight: "1.75rem" }, // 18px
    xl: { fontSize: "1.25rem", lineHeight: "1.75rem" }, // 20px
    "2xl": { fontSize: "1.5rem", lineHeight: "2rem" }, // 24px
    "3xl": { fontSize: "1.875rem", lineHeight: "2.25rem" }, // 30px
    "4xl": { fontSize: "2.25rem", lineHeight: "2.5rem" }, // 36px
    "5xl": { fontSize: "3rem", lineHeight: "1" }, // 48px
    "6xl": { fontSize: "3.75rem", lineHeight: "1" }, // 60px
    "7xl": { fontSize: "4.5rem", lineHeight: "1" }, // 72px
    "8xl": { fontSize: "6rem", lineHeight: "1" }, // 96px
    "9xl": { fontSize: "8rem", lineHeight: "1" }, // 128px
  },
  fontWeight: {
    thin: "100",
    extralight: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },
  /** Typography variants */
  variants: {
    h1: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 300,
      fontSize: "6rem",
      lineHeight: 1.167,
      letterSpacing: "-0.01562em",
    },
    h2: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 300,
      fontSize: "3.75rem",
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
    },
    h3: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: "3rem",
      lineHeight: 1.167,
      letterSpacing: "0em",
    },
    h4: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: "2.125rem",
      lineHeight: 1.235,
      letterSpacing: "0.00735em",
    },
    h5: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: "1.5rem",
      lineHeight: 1.334,
      letterSpacing: "0em",
    },
    h6: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      fontSize: "1.25rem",
      lineHeight: 1.6,
      letterSpacing: "0.0075em",
    },
    subtitle1: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.75,
      letterSpacing: "0.00938em",
    },
    subtitle2: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.57,
      letterSpacing: "0.00714em",
    },
    body1: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
    },
    body2: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.43,
      letterSpacing: "0.01071em",
    },
    button: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.75,
      letterSpacing: "0.02857em",
      textTransform: "uppercase" as const,
    },
    caption: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 1.66,
      letterSpacing: "0.03333em",
    },
    overline: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 2.66,
      letterSpacing: "0.08333em",
      textTransform: "uppercase" as const,
    },
  },
  /** HTML font size (default: 16px) */
  htmlFontSize: 16,
  /** Default font size */
  fontSize: 14,
  /** Font weights */
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
} as const;
