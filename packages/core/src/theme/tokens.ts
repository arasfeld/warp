import type { Theme } from "../types";
import { breakpoints } from "./breakpoints";
import { createPalette } from "./palette";
import { shadowsArray as shadows } from "./shadows";
import { transitions } from "./transitions";
import { typography } from "./typography";
import { zIndex } from "./zIndex";

/**
 * Default theme configuration
 * This is the source of truth for the theme system
 */
export const defaultTheme: Theme = {
  palette: createPalette("light"),
  typography,
  spacing: 8, // Base spacing unit (8px multiplier)
  shape: {
    borderRadius: 4,
  },
  shadows,
  breakpoints,
  transitions,
  zIndex,
};
