/**
 * Theme exports
 */

// Types
export type {
  CommonColors,
  ColorVariant,
  GreyScale,
  Palette,
  ShadowDefinition,
  Theme,
  ThemeMode,
  TypographyVariant,
} from "../types";

// Default theme tokens
export { defaultTheme } from "./tokens";

// Palette
export {
  commonColors,
  createPalette,
  darkPalette,
  grey,
  lightPalette,
} from "./palette";

// Typography
export { typography } from "./typography";

// Shadows
export { shadows, shadowsArray } from "./shadows";

// Breakpoints
export { breakpoints } from "./breakpoints";

// Transitions
export { transitions } from "./transitions";

// Z-index
export { zIndex } from "./zIndex";

// Utilities
export { createSpacing } from "./spacing-utils";
export { createTheme, getPalette, mergeThemes, validateTheme } from "./utils";
