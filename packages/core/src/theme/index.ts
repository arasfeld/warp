/**
 * Theme exports
 */

// Types
export type {
  Theme,
  ColorPalette,
  ThemeMode,
  ShadowDefinition,
} from "../types";

// Default theme tokens
export { defaultTheme } from "./tokens";

// Color palettes
export { lightColors, darkColors } from "./colors";

// Token scales
export { spacing } from "./spacing";
export { typography } from "./typography";
export { borderRadius } from "./borderRadius";
export { shadows } from "./shadows";
export { breakpoints } from "./breakpoints";

// Utilities
export { getColors, mergeThemes, validateTheme, createTheme } from "./utils";
