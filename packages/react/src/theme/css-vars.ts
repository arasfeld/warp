/**
 * Utility functions for managing CSS variables in React (web)
 * Sets CSS variables on document.documentElement for global theming
 */

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
 * Update CSS variables on the document root
 * This applies theme colors globally for Tailwind to use
 *
 * @param colors - Color palette to convert
 * @param isDark - Whether this is for dark mode (used for primary-foreground logic)
 */
export function updateCSSVariables(
  colors: ColorPalette,
  isDark: boolean = false
): void {
  if (typeof document === "undefined") {
    // SSR - skip
    return;
  }

  const root = document.documentElement;

  // Determine primary-foreground based on mode
  const primaryForeground = isDark
    ? "222.2 47.4% 11.2%" // Dark mode: dark foreground for light primary
    : "210 40% 98%"; // Light mode: light foreground for dark primary

  // Update CSS variables
  root.style.setProperty("--background", extractHslValues(colors.background));
  root.style.setProperty("--foreground", extractHslValues(colors.foreground));
  root.style.setProperty("--primary", extractHslValues(colors.primary));
  root.style.setProperty("--primary-foreground", primaryForeground);
  root.style.setProperty(
    "--secondary",
    extractHslValues(
      colors.secondary || colors.mutedBackground || colors.background
    )
  );
  root.style.setProperty(
    "--secondary-foreground",
    extractHslValues(colors.foreground)
  );
  root.style.setProperty(
    "--muted",
    extractHslValues(
      colors.mutedBackground || colors.secondary || colors.background
    )
  );
  root.style.setProperty(
    "--muted-foreground",
    extractHslValues(colors.mutedForeground || colors.foreground)
  );
  root.style.setProperty(
    "--border",
    extractHslValues(
      colors.border || colors.mutedBackground || colors.foreground
    )
  );
  root.style.setProperty(
    "--input",
    extractHslValues(
      colors.input ||
        colors.border ||
        colors.mutedBackground ||
        colors.foreground
    )
  );
  root.style.setProperty("--ring", extractHslValues(colors.ring || colors.primary));
}
