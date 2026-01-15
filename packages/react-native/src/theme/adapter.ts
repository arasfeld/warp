import type { Theme, ThemeMode, ShadowDefinition } from "@warp/core";
import { normalizeColor } from "./color-utils";

/**
 * Convert spacing value to number (React Native prefers numbers for spacing)
 */
function normalizeSpacing(value: string | number): number {
  if (typeof value === "number") {
    return value;
  }
  // Convert "1rem" to pixels (assuming 16px base)
  // For now, parse common values
  if (value.endsWith("rem")) {
    const num = parseFloat(value);
    return num * 16;
  }
  if (value.endsWith("px")) {
    return parseFloat(value);
  }
  // Default fallback
  return 0;
}

/**
 * Convert shadow definition to React Native shadow props
 */
function convertShadow(shadow: ShadowDefinition): {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation?: number; // Android
} {
  // Extract opacity from color if it's in the color string, otherwise use shadow.opacity
  const opacity = shadow.opacity ?? 1;

  return {
    shadowColor: normalizeColor(shadow.color),
    shadowOffset: {
      width: shadow.offsetX ?? 0,
      height: shadow.offsetY ?? 0,
    },
    shadowOpacity: opacity,
    shadowRadius: shadow.blur ?? 0,
    elevation: shadow.blur ?? 0, // Android elevation (approximation)
  };
}

/**
 * React Native theme structure
 */
export interface RNTheme {
  colors: {
    primary: string;
    secondary?: string;
    success?: string;
    warning?: string;
    error?: string;
    info?: string;
    background: string;
    foreground: string;
    mutedBackground?: string;
    mutedForeground?: string;
    border?: string;
    input?: string;
    ring?: string;
  };
  spacing: Record<string, number>;
  typography: {
    fontFamily: {
      sans?: string;
      serif?: string;
      mono?: string;
    };
    fontSize: Record<string, number>;
    fontWeight: Record<string, string>;
    lineHeight: Record<string, number>;
  };
  borderRadius: Record<string, number>;
  shadows: Record<string, ReturnType<typeof convertShadow>>;
}

/**
 * Convert core theme to React Native theme
 */
export function adaptTheme(theme: Theme, mode: ThemeMode = "light"): RNTheme {
  const colors = theme.colors[mode];

  // Convert typography
  const fontSize: Record<string, number> = {};
  const lineHeight: Record<string, number> = {};

  Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
    const size =
      typeof value.fontSize === "number"
        ? value.fontSize
        : normalizeSpacing(value.fontSize);
    fontSize[key] = size;

    if (value.lineHeight) {
      const height =
        typeof value.lineHeight === "number"
          ? value.lineHeight
          : normalizeSpacing(value.lineHeight);
      lineHeight[key] = height;
    }
  });

  // Convert font families (take first font from array)
  const fontFamily = {
    sans: theme.typography.fontFamily?.sans?.[0],
    serif: theme.typography.fontFamily?.serif?.[0],
    mono: theme.typography.fontFamily?.mono?.[0],
  };

  // Convert spacing
  const spacing: Record<string, number> = {};
  Object.entries(theme.spacing).forEach(([key, value]) => {
    spacing[key] = normalizeSpacing(value);
  });

  // Convert border radius
  const borderRadius: Record<string, number> = {};
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    borderRadius[key] = normalizeSpacing(value);
  });

  // Convert shadows
  const shadows: Record<string, ReturnType<typeof convertShadow>> = {};
  Object.entries(theme.shadows).forEach(([key, shadow]) => {
    shadows[key] = convertShadow(shadow);
  });

  return {
    colors: {
      primary: normalizeColor(colors.primary),
      secondary: colors.secondary
        ? normalizeColor(colors.secondary)
        : undefined,
      success: colors.success ? normalizeColor(colors.success) : undefined,
      warning: colors.warning ? normalizeColor(colors.warning) : undefined,
      error: colors.error ? normalizeColor(colors.error) : undefined,
      info: colors.info ? normalizeColor(colors.info) : undefined,
      background: normalizeColor(colors.background),
      foreground: normalizeColor(colors.foreground),
      mutedBackground: colors.mutedBackground
        ? normalizeColor(colors.mutedBackground)
        : undefined,
      mutedForeground: colors.mutedForeground
        ? normalizeColor(colors.mutedForeground)
        : undefined,
      border: colors.border ? normalizeColor(colors.border) : undefined,
      input: colors.input ? normalizeColor(colors.input) : undefined,
      ring: colors.ring ? normalizeColor(colors.ring) : undefined,
    },
    spacing,
    typography: {
      fontFamily,
      fontSize,
      fontWeight: theme.typography.fontWeight as Record<string, string>,
      lineHeight,
    },
    borderRadius,
    shadows,
  };
}
