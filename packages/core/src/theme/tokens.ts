import type { Theme } from "../types";
import { lightColors, darkColors } from "./colors";
import { spacing } from "./spacing";
import { typography } from "./typography";
import { borderRadius } from "./borderRadius";
import { shadows } from "./shadows";
import { breakpoints } from "./breakpoints";

/**
 * Default theme configuration
 * This is the source of truth for the theme system
 */
export const defaultTheme: Theme = {
  colors: {
    light: lightColors,
    dark: darkColors,
  },
  spacing,
  typography,
  borderRadius,
  shadows,
  breakpoints,
};
