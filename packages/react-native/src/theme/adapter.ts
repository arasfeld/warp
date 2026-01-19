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
export function adaptTheme(theme: Theme, _mode: ThemeMode = "light"): RNTheme {
  const palette = theme.palette;

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

  // Convert spacing (base unit is a number, so we create a scale)
  const spacingBase = theme.spacing;
  const spacing: Record<string, number> = {
    "0": 0,
    "1": spacingBase * 0.25,
    "2": spacingBase * 0.5,
    "3": spacingBase * 0.75,
    "4": spacingBase,
    "5": spacingBase * 1.25,
    "6": spacingBase * 1.5,
    "8": spacingBase * 2,
    "10": spacingBase * 2.5,
    "12": spacingBase * 3,
    "16": spacingBase * 4,
    "20": spacingBase * 5,
    "24": spacingBase * 6,
  };

  // Convert border radius from shape
  const borderRadius: Record<string, number> = {
    none: 0,
    sm: theme.shape.borderRadius * 0.5,
    md: theme.shape.borderRadius,
    lg: theme.shape.borderRadius * 2,
    xl: theme.shape.borderRadius * 3,
    full: 9999,
  };

  // Shadows are now strings in the array format, create placeholder for RN
  const shadows: Record<string, ReturnType<typeof convertShadow>> = {
    none: convertShadow({ color: "transparent", opacity: 0 }),
    sm: convertShadow({ color: "rgba(0,0,0,0.1)", offsetY: 1, blur: 2, opacity: 0.1 }),
    md: convertShadow({ color: "rgba(0,0,0,0.1)", offsetY: 4, blur: 6, opacity: 0.1 }),
    lg: convertShadow({ color: "rgba(0,0,0,0.1)", offsetY: 10, blur: 15, opacity: 0.1 }),
  };

  return {
    colors: {
      primary: normalizeColor(palette.primary.main),
      secondary: normalizeColor(palette.secondary.main),
      success: normalizeColor(palette.success.main),
      warning: normalizeColor(palette.warning.main),
      error: normalizeColor(palette.error.main),
      info: normalizeColor(palette.info.main),
      background: normalizeColor(palette.background.default),
      foreground: normalizeColor(palette.text.primary),
      mutedBackground: normalizeColor(palette.background.paper),
      mutedForeground: normalizeColor(palette.text.secondary),
      border: normalizeColor(palette.divider),
      input: normalizeColor(palette.divider),
      ring: normalizeColor(palette.primary.main),
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
