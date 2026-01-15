/**
 * Utility functions for managing CSS variables with NativeWind
 * Follows NativeWind v4 best practices for dynamic theming
 */

import { vars } from "nativewind";
import type { Palette } from "@warp/core";

/**
 * Extract HSL values from HSL string
 * "hsl(222.2 47.4% 11.2%)" -> "222.2 47.4% 11.2%"
 */
function extractHslValues(hsl: string): string {
  // Remove "hsl(" and ")" wrapper, keep just the values
  return hsl.replace(/^hsl\(/, "").replace(/\)$/, "");
}

/**
 * Convert a palette to NativeWind vars object
 * This creates CSS variable values that can be applied via inline styles
 *
 * @param palette - Palette to convert
 * @returns NativeWind vars object for CSS variables
 */
export function createThemeVars(
  palette: Palette
): ReturnType<typeof vars> {
  // Determine primary-foreground based on mode
  // Light mode: primary is dark, so foreground should be light
  // Dark mode: primary is light, so foreground should be dark
  const primaryForeground = palette.mode === "dark"
    ? "222.2 47.4% 11.2%" // Dark mode: dark foreground for light primary
    : "210 40% 98%"; // Light mode: light foreground for dark primary

  // Extract main color from ColorVariant if needed
  const getMainColor = (color: string | { main: string }) => {
    return typeof color === "string" ? color : color.main;
  };

  return vars({
    "--background": extractHslValues(palette.background.default),
    "--foreground": extractHslValues(palette.text.primary),
    "--primary": extractHslValues(getMainColor(palette.primary)),
    "--primary-foreground": primaryForeground,
    "--secondary": extractHslValues(getMainColor(palette.secondary)),
    "--secondary-foreground": extractHslValues(palette.secondary.contrastText || palette.text.primary),
    "--muted": extractHslValues(palette.background.paper),
    "--muted-foreground": extractHslValues(palette.text.secondary),
    "--border": extractHslValues(palette.divider),
    "--input": extractHslValues(palette.divider),
    "--ring": extractHslValues(getMainColor(palette.primary)),
  });
}
