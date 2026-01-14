/**
 * Utility functions for managing CSS variables with NativeWind
 * Follows NativeWind v4 best practices for dynamic theming
 */

import { vars } from "nativewind";
import type { ColorPalette } from "@warp/core";

/**
 * Extract HSL values from HSL string
 * "hsl(222.2 47.4% 11.2%)" -> "222.2 47.4% 11.2%"
 */
function extractHslValues(hsl: string): string {
  // Remove "hsl(" and ")" wrapper, keep just the values
  return hsl.replace(/^hsl\(/, "").replace(/\)$/, "");
}

/**
 * Convert a color palette to NativeWind vars object
 * This creates CSS variable values that can be applied via inline styles
 *
 * @param colors - Color palette to convert
 * @param isDark - Whether this is for dark mode (used for primary-foreground logic)
 * @returns NativeWind vars object for CSS variables
 */
export function createThemeVars(
  colors: ColorPalette,
  isDark: boolean = false
): ReturnType<typeof vars> {
  // Determine primary-foreground based on mode
  // Light mode: primary is dark, so foreground should be light
  // Dark mode: primary is light, so foreground should be dark
  // This matches shadcn/ui's approach where primary-foreground provides contrast
  const primaryForeground = isDark
    ? "222.2 47.4% 11.2%" // Dark mode: dark foreground for light primary
    : "210 40% 98%"; // Light mode: light foreground for dark primary

  return vars({
    "--background": extractHslValues(colors.background),
    "--foreground": extractHslValues(colors.foreground),
    "--primary": extractHslValues(colors.primary),
    "--primary-foreground": primaryForeground,
    "--secondary": extractHslValues(
      colors.secondary || colors.mutedBackground || colors.background
    ),
    "--secondary-foreground": extractHslValues(colors.foreground),
    "--muted": extractHslValues(
      colors.mutedBackground || colors.secondary || colors.background
    ),
    "--muted-foreground": extractHslValues(
      colors.mutedForeground || colors.foreground
    ),
    "--border": extractHslValues(
      colors.border || colors.mutedBackground || colors.foreground
    ),
    "--input": extractHslValues(
      colors.input ||
        colors.border ||
        colors.mutedBackground ||
        colors.foreground
    ),
    "--ring": extractHslValues(colors.ring || colors.primary),
  });
}
