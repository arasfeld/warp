import type { Palette, Theme, ThemeMode } from "../types";
import { createPalette } from "./palette";
import { defaultTheme } from "./tokens";

/**
 * Get palette for a specific theme mode
 */
export function getPalette(theme: Theme, mode: ThemeMode): Palette {
  // If theme already has the correct mode, return it
  if (theme.palette.mode === mode) {
    return theme.palette;
  }
  // Otherwise create a new palette with the requested mode
  return createPalette(mode);
}

/**
 * Merge two themes, with the second theme taking precedence
 * Useful for theme customization
 */
export function mergeThemes(
  baseTheme: Theme,
  overrideTheme: Partial<Theme>
): Theme {
  return {
    palette: overrideTheme.palette ?? baseTheme.palette,
    spacing: overrideTheme.spacing ?? baseTheme.spacing,
    typography: {
      ...baseTheme.typography,
      ...overrideTheme.typography,
      h1: { ...baseTheme.typography.h1, ...overrideTheme.typography?.h1 },
      h2: { ...baseTheme.typography.h2, ...overrideTheme.typography?.h2 },
      h3: { ...baseTheme.typography.h3, ...overrideTheme.typography?.h3 },
      h4: { ...baseTheme.typography.h4, ...overrideTheme.typography?.h4 },
      h5: { ...baseTheme.typography.h5, ...overrideTheme.typography?.h5 },
      h6: { ...baseTheme.typography.h6, ...overrideTheme.typography?.h6 },
      subtitle1: {
        ...baseTheme.typography.subtitle1,
        ...overrideTheme.typography?.subtitle1,
      },
      subtitle2: {
        ...baseTheme.typography.subtitle2,
        ...overrideTheme.typography?.subtitle2,
      },
      body1: {
        ...baseTheme.typography.body1,
        ...overrideTheme.typography?.body1,
      },
      body2: {
        ...baseTheme.typography.body2,
        ...overrideTheme.typography?.body2,
      },
      button: {
        ...baseTheme.typography.button,
        ...overrideTheme.typography?.button,
      },
      caption: {
        ...baseTheme.typography.caption,
        ...overrideTheme.typography?.caption,
      },
      overline: {
        ...baseTheme.typography.overline,
        ...overrideTheme.typography?.overline,
      },
    },
    shape: {
      ...baseTheme.shape,
      ...overrideTheme.shape,
    },
    shadows: overrideTheme.shadows ?? baseTheme.shadows,
    breakpoints: {
      ...baseTheme.breakpoints,
      ...overrideTheme.breakpoints,
      values: {
        ...baseTheme.breakpoints.values,
        ...overrideTheme.breakpoints?.values,
      },
    },
    transitions: {
      ...baseTheme.transitions,
      ...overrideTheme.transitions,
      easing: {
        ...baseTheme.transitions.easing,
        ...overrideTheme.transitions?.easing,
      },
      duration: {
        ...baseTheme.transitions.duration,
        ...overrideTheme.transitions?.duration,
      },
    },
    zIndex: {
      ...baseTheme.zIndex,
      ...overrideTheme.zIndex,
    },
  };
}

/**
 * Validate theme structure
 * Returns true if theme is valid, throws error if invalid
 */
export function validateTheme(theme: Theme): theme is Theme {
  if (!theme.palette) {
    throw new Error("Theme must have palette");
  }
  if (!theme.palette.mode) {
    throw new Error("Theme palette must have mode");
  }
  if (!theme.spacing) {
    throw new Error("Theme must have spacing");
  }
  if (!theme.typography) {
    throw new Error("Theme must have typography");
  }
  if (!theme.shape) {
    throw new Error("Theme must have shape");
  }
  if (!theme.shadows) {
    throw new Error("Theme must have shadows");
  }
  if (!theme.breakpoints) {
    throw new Error("Theme must have breakpoints");
  }
  if (!theme.transitions) {
    throw new Error("Theme must have transitions");
  }
  if (!theme.zIndex) {
    throw new Error("Theme must have zIndex");
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
