import type { CommonColors, GreyScale, Palette } from "../types";

/**
 * Common colors (black and white)
 */
export const commonColors: CommonColors = {
  black: "#000000",
  white: "#ffffff",
};

/**
 * Grey color scale
 */
export const grey: GreyScale = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  A100: "#f5f5f5",
  A200: "#eeeeee",
  A400: "#bdbdbd",
  A700: "#616161",
};

/**
 * Light palette
 */
export const lightPalette: Omit<Palette, "mode"> = {
  common: commonColors,
  primary: {
    main: "hsl(222.2 47.4% 11.2%)",
    light: "hsl(222.2 47.4% 20%)",
    dark: "hsl(222.2 47.4% 8%)",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "hsl(210 40% 96.1%)",
    light: "hsl(210 40% 98%)",
    dark: "hsl(210 40% 94%)",
    contrastText: "hsl(222.2 47.4% 11.2%)",
  },
  error: {
    main: "hsl(0 84.2% 60.2%)",
    light: "hsl(0 84.2% 70%)",
    dark: "hsl(0 84.2% 50%)",
    contrastText: "#ffffff",
  },
  warning: {
    main: "hsl(38 92% 50%)",
    light: "hsl(38 92% 60%)",
    dark: "hsl(38 92% 40%)",
    contrastText: "#000000",
  },
  info: {
    main: "hsl(199 89% 48%)",
    light: "hsl(199 89% 58%)",
    dark: "hsl(199 89% 38%)",
    contrastText: "#ffffff",
  },
  success: {
    main: "hsl(142.1 76.2% 36.3%)",
    light: "hsl(142.1 76.2% 46%)",
    dark: "hsl(142.1 76.2% 26%)",
    contrastText: "#ffffff",
  },
  grey,
  text: {
    // Using HSL format for Tailwind compatibility
    primary: "hsl(0 0% 0% / 0.87)", // rgba(0, 0, 0, 0.87) equivalent
    secondary: "hsl(0 0% 0% / 0.6)", // rgba(0, 0, 0, 0.6) equivalent
    disabled: "hsl(0 0% 0% / 0.38)", // rgba(0, 0, 0, 0.38) equivalent
  },
  divider: "hsl(0 0% 0% / 0.12)", // rgba(0, 0, 0, 0.12) equivalent
  background: {
    default: "hsl(0 0% 100%)", // #ffffff
    paper: "hsl(0 0% 100%)", // #ffffff
  },
  action: {
    // Using HSL format with opacity for Tailwind compatibility
    active: "hsl(0 0% 0% / 0.54)", // rgba(0, 0, 0, 0.54) equivalent
    hover: "hsl(0 0% 0% / 0.04)", // rgba(0, 0, 0, 0.04) equivalent
    hoverOpacity: 0.04,
    selected: "hsl(0 0% 0% / 0.08)", // rgba(0, 0, 0, 0.08) equivalent
    selectedOpacity: 0.08,
    disabled: "hsl(0 0% 0% / 0.26)", // rgba(0, 0, 0, 0.26) equivalent
    disabledBackground: "hsl(0 0% 0% / 0.12)", // rgba(0, 0, 0, 0.12) equivalent
    disabledOpacity: 0.38,
    focus: "hsl(0 0% 0% / 0.12)", // rgba(0, 0, 0, 0.12) equivalent
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },
};

/**
 * Dark palette
 */
export const darkPalette: Omit<Palette, "mode"> = {
  common: commonColors,
  primary: {
    main: "hsl(271 91% 65%)",
    light: "hsl(271 91% 75%)",
    dark: "hsl(271 91% 55%)",
    contrastText: "#000000",
  },
  secondary: {
    main: "hsl(0 0% 19%)",
    light: "hsl(0 0% 25%)",
    dark: "hsl(0 0% 13%)",
    contrastText: "#ffffff",
  },
  error: {
    main: "hsl(0 62.8% 30.6%)",
    light: "hsl(0 62.8% 40%)",
    dark: "hsl(0 62.8% 20%)",
    contrastText: "#ffffff",
  },
  warning: {
    main: "hsl(38 92% 50%)",
    light: "hsl(38 92% 60%)",
    dark: "hsl(38 92% 40%)",
    contrastText: "#000000",
  },
  info: {
    main: "hsl(199 89% 48%)",
    light: "hsl(199 89% 58%)",
    dark: "hsl(199 89% 38%)",
    contrastText: "#ffffff",
  },
  success: {
    main: "hsl(142.1 70.6% 45.3%)",
    light: "hsl(142.1 70.6% 55%)",
    dark: "hsl(142.1 70.6% 35%)",
    contrastText: "#ffffff",
  },
  grey,
  text: {
    // Using HSL format for Tailwind compatibility
    primary: "hsl(0 0% 100% / 0.87)", // rgba(255, 255, 255, 0.87) equivalent
    secondary: "hsl(0 0% 100% / 0.6)", // rgba(255, 255, 255, 0.6) equivalent
    disabled: "hsl(0 0% 100% / 0.38)", // rgba(255, 255, 255, 0.38) equivalent
  },
  divider: "hsl(0 0% 100% / 0.12)", // rgba(255, 255, 255, 0.12) equivalent
  background: {
    default: "hsl(0 0% 14%)",
    paper: "hsl(0 0% 19%)",
  },
  action: {
    // Using HSL format with opacity for Tailwind compatibility
    active: "hsl(0 0% 100% / 0.54)", // rgba(255, 255, 255, 0.54) equivalent
    hover: "hsl(0 0% 100% / 0.08)", // rgba(255, 255, 255, 0.08) equivalent
    hoverOpacity: 0.08,
    selected: "hsl(0 0% 100% / 0.16)", // rgba(255, 255, 255, 0.16) equivalent
    selectedOpacity: 0.16,
    disabled: "hsl(0 0% 100% / 0.26)", // rgba(255, 255, 255, 0.26) equivalent
    disabledBackground: "hsl(0 0% 100% / 0.12)", // rgba(255, 255, 255, 0.12) equivalent
    disabledOpacity: 0.38,
    focus: "hsl(0 0% 100% / 0.12)", // rgba(255, 255, 255, 0.12) equivalent
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },
};

/**
 * Create a palette for a specific mode
 */
export function createPalette(mode: "light" | "dark"): Palette {
  const base = mode === "light" ? lightPalette : darkPalette;
  return {
    ...base,
    mode,
  };
}
