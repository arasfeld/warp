import type { Theme, ThemeMode } from "../types";
import { defaultTheme } from "./tokens";

/**
 * Get color palette for a specific theme mode
 */
export function getColors(theme: Theme, mode: ThemeMode) {
  return theme.colors[mode];
}

/**
 * Merge two themes, with the second theme taking precedence
 * Useful for theme customization
 */
export function mergeThemes(baseTheme: Theme, overrideTheme: Partial<Theme>): Theme {
  return {
    colors: {
      light: { ...baseTheme.colors.light, ...overrideTheme.colors?.light },
      dark: { ...baseTheme.colors.dark, ...overrideTheme.colors?.dark },
    },
    spacing: { ...baseTheme.spacing, ...overrideTheme.spacing },
    typography: {
      fontFamily: {
        ...baseTheme.typography.fontFamily,
        ...overrideTheme.typography?.fontFamily,
      },
      fontSize: {
        ...baseTheme.typography.fontSize,
        ...overrideTheme.typography?.fontSize,
      },
      fontWeight: {
        ...baseTheme.typography.fontWeight,
        ...overrideTheme.typography?.fontWeight,
      },
    },
    borderRadius: { ...baseTheme.borderRadius, ...overrideTheme.borderRadius },
    shadows: { ...baseTheme.shadows, ...overrideTheme.shadows },
    breakpoints: { ...baseTheme.breakpoints, ...overrideTheme.breakpoints },
  };
}

/**
 * Validate theme structure
 * Returns true if theme is valid, throws error if invalid
 */
export function validateTheme(theme: Theme): theme is Theme {
  if (!theme.colors) {
    throw new Error("Theme must have colors");
  }
  if (!theme.colors.light) {
    throw new Error("Theme must have light colors");
  }
  if (!theme.colors.dark) {
    throw new Error("Theme must have dark colors");
  }
  if (!theme.spacing) {
    throw new Error("Theme must have spacing");
  }
  if (!theme.typography) {
    throw new Error("Theme must have typography");
  }
  if (!theme.borderRadius) {
    throw new Error("Theme must have borderRadius");
  }
  if (!theme.shadows) {
    throw new Error("Theme must have shadows");
  }
  if (!theme.breakpoints) {
    throw new Error("Theme must have breakpoints");
  }
  return true;
}

/**
 * Create a theme from partial theme configuration
 * Merges with default theme and validates the result
 */
export function createTheme(partialTheme: Partial<Theme>): Theme {
  const mergedTheme = mergeThemes(defaultTheme, partialTheme);
  validateTheme(mergedTheme);
  return mergedTheme;
}
