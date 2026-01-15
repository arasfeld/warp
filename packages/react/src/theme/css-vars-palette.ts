/**
 * Utility functions for managing CSS variables in React (web)
 * Palette-based CSS variable management
 */

import type { Palette, Theme } from "@warp/core";

/**
 * Extract HSL values from HSL string
 * "hsl(222.2 47.4% 11.2%)" -> "222.2 47.4% 11.2%"
 */
function extractHslValues(hsl: string): string {
  return hsl.replace(/^hsl\(/, "").replace(/\)$/, "");
}

/**
 * Update CSS variables from palette
 */
export function updatePaletteCSSVariables(palette: Palette): void {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;

  // Primary
  root.style.setProperty("--palette-primary-main", extractHslValues(palette.primary.main));
  if (palette.primary.light) {
    root.style.setProperty("--palette-primary-light", extractHslValues(palette.primary.light));
  }
  if (palette.primary.dark) {
    root.style.setProperty("--palette-primary-dark", extractHslValues(palette.primary.dark));
  }
  if (palette.primary.contrastText) {
    root.style.setProperty("--palette-primary-contrast", palette.primary.contrastText);
  }

  // Secondary
  root.style.setProperty("--palette-secondary-main", extractHslValues(palette.secondary.main));
  if (palette.secondary.light) {
    root.style.setProperty("--palette-secondary-light", extractHslValues(palette.secondary.light));
  }
  if (palette.secondary.dark) {
    root.style.setProperty("--palette-secondary-dark", extractHslValues(palette.secondary.dark));
  }
  if (palette.secondary.contrastText) {
    root.style.setProperty("--palette-secondary-contrast", palette.secondary.contrastText);
  }

  // Semantic colors
  root.style.setProperty("--palette-error-main", extractHslValues(palette.error.main));
  root.style.setProperty("--palette-warning-main", extractHslValues(palette.warning.main));
  root.style.setProperty("--palette-info-main", extractHslValues(palette.info.main));
  root.style.setProperty("--palette-success-main", extractHslValues(palette.success.main));
  
  // Backward compatibility: Map to simple variable names for Tailwind
  root.style.setProperty("--error", extractHslValues(palette.error.main));
  root.style.setProperty("--warning", extractHslValues(palette.warning.main));
  root.style.setProperty("--info", extractHslValues(palette.info.main));
  root.style.setProperty("--success", extractHslValues(palette.success.main));

  // Grey scale
  Object.entries(palette.grey).forEach(([key, value]) => {
    if (typeof value === "string") {
      root.style.setProperty(`--palette-grey-${key}`, value);
    }
  });

  // Text
  root.style.setProperty("--palette-text-primary", palette.text.primary);
  root.style.setProperty("--palette-text-secondary", palette.text.secondary);
  root.style.setProperty("--palette-text-disabled", palette.text.disabled);
  
  // Backward compatibility: Map to simple variable names for Tailwind
  root.style.setProperty("--text-primary", palette.text.primary);
  root.style.setProperty("--text-secondary", palette.text.secondary);
  root.style.setProperty("--text-disabled", palette.text.disabled);

  // Divider
  root.style.setProperty("--palette-divider", palette.divider);
  root.style.setProperty("--divider", palette.divider);

  // Background
  root.style.setProperty("--palette-background-default", palette.background.default);
  root.style.setProperty("--palette-background-paper", palette.background.paper);

  // Action states
  root.style.setProperty("--palette-action-active", palette.action.active);
  root.style.setProperty("--palette-action-hover", palette.action.hover);
  root.style.setProperty("--palette-action-hover-opacity", palette.action.hoverOpacity.toString());
  root.style.setProperty("--palette-action-selected", palette.action.selected);
  root.style.setProperty("--palette-action-selected-opacity", palette.action.selectedOpacity.toString());
  root.style.setProperty("--palette-action-disabled", palette.action.disabled);
  root.style.setProperty("--palette-action-disabled-background", palette.action.disabledBackground);
  root.style.setProperty("--palette-action-disabled-opacity", palette.action.disabledOpacity.toString());
  root.style.setProperty("--palette-action-focus", palette.action.focus);
  root.style.setProperty("--palette-action-focus-opacity", palette.action.focusOpacity.toString());
  root.style.setProperty("--palette-action-activated-opacity", palette.action.activatedOpacity.toString());
  
  // Helper to extract HSL values from action colors
  function extractActionColor(color: string): string {
    if (color.startsWith("hsl(")) {
      const hslMatch = color.match(/hsl\(([^)]+)\)/);
      if (hslMatch) {
        return hslMatch[1].split("/")[0].trim();
      }
      return extractHslValues(color);
    }
    return color;
  }
  
  // Backward compatibility: Map to simple variable names for Tailwind
  root.style.setProperty("--action-active", extractActionColor(palette.action.active));
  root.style.setProperty("--action-hover", extractActionColor(palette.action.hover));
  root.style.setProperty("--action-selected", extractActionColor(palette.action.selected));
  root.style.setProperty("--action-disabled", extractActionColor(palette.action.disabled));
  root.style.setProperty("--action-focus", extractActionColor(palette.action.focus));

  // Common colors
  root.style.setProperty("--palette-common-black", palette.common.black);
  root.style.setProperty("--palette-common-white", palette.common.white);

  // Backward compatibility: Map to shadcn-style variables for existing components
  // These are set dynamically based on the palette mode
  const isDark = palette.mode === "dark";
  
  // Helper to extract HSL values or keep rgba/hex as-is
  function getColorForCSSVar(color: string): string {
    if (color.startsWith("hsl(")) {
      return extractHslValues(color);
    }
    // For rgba, hex, or other formats, use as-is
    return color;
  }
  
  // Background - handle HSL and hex
  root.style.setProperty("--background", getColorForCSSVar(palette.background.default));
  
  // Foreground - extract HSL values (now using HSL format with opacity)
  if (palette.text.primary.startsWith("hsl(")) {
    // Handle HSL with opacity: "hsl(0 0% 0% / 0.87)" -> "0 0% 0% / 0.87"
    // For Tailwind, we'll extract just the HSL part and approximate opacity via lightness
    const hslMatch = palette.text.primary.match(/hsl\(([^)]+)\)/);
    if (hslMatch) {
      const hslParts = hslMatch[1].split("/");
      const hslValues = hslParts[0].trim();
      const opacity = hslParts[1] ? parseFloat(hslParts[1].trim()) : 1;
      
      // Extract base HSL values
      const valuesMatch = hslValues.match(/([\d.]+)\s+([\d.]+)%\s+([\d.]+)%/);
      if (valuesMatch) {
        const h = valuesMatch[1];
        const s = valuesMatch[2];
        const l = parseFloat(valuesMatch[3]);
        // Adjust lightness based on opacity for better contrast
        const adjustedL = opacity < 1 
          ? Math.round(l * opacity + (isDark ? 96 : 11) * (1 - opacity))
          : l;
        root.style.setProperty("--foreground", `${h} ${s}% ${adjustedL}%`);
      } else {
        root.style.setProperty("--foreground", hslValues);
      }
    } else {
      root.style.setProperty("--foreground", extractHslValues(palette.text.primary));
    }
  } else {
    root.style.setProperty("--foreground", palette.text.primary);
  }
  
  // Primary color (always HSL in our palette)
  root.style.setProperty("--primary", extractHslValues(palette.primary.main));
  root.style.setProperty("--primary-foreground", palette.primary.contrastText || (isDark ? "#000000" : "#ffffff"));
  
  // Secondary
  root.style.setProperty("--secondary", extractHslValues(palette.secondary.main));
  const secondaryForeground = palette.secondary.contrastText || (isDark ? "#ffffff" : extractHslValues(palette.text.primary));
  if (secondaryForeground.startsWith("hsl(")) {
    root.style.setProperty("--secondary-foreground", extractHslValues(secondaryForeground));
  } else {
    root.style.setProperty("--secondary-foreground", secondaryForeground);
  }
  
  // Muted (using background.paper)
  root.style.setProperty("--muted", getColorForCSSVar(palette.background.paper));
  root.style.setProperty("--card-background", getColorForCSSVar(palette.background.paper));
  // Muted foreground - extract HSL values
  if (palette.text.secondary.startsWith("hsl(")) {
    const hslMatch = palette.text.secondary.match(/hsl\(([^)]+)\)/);
    if (hslMatch) {
      const hslParts = hslMatch[1].split("/");
      const hslValues = hslParts[0].trim();
      const opacity = hslParts[1] ? parseFloat(hslParts[1].trim()) : 1;
      const valuesMatch = hslValues.match(/([\d.]+)\s+([\d.]+)%\s+([\d.]+)%/);
      if (valuesMatch) {
        const h = valuesMatch[1];
        const s = valuesMatch[2];
        const l = parseFloat(valuesMatch[3]);
        const adjustedL = opacity < 1 
          ? Math.round(l * opacity + (isDark ? 60 : 47) * (1 - opacity))
          : l;
        root.style.setProperty("--muted-foreground", `${h} ${s}% ${adjustedL}%`);
      } else {
        root.style.setProperty("--muted-foreground", hslValues);
      }
    } else {
      root.style.setProperty("--muted-foreground", extractHslValues(palette.text.secondary));
    }
  } else {
    root.style.setProperty("--muted-foreground", palette.text.secondary);
  }
  
  // Border and input (using divider)
  if (palette.divider.startsWith("hsl(")) {
    const hslMatch = palette.divider.match(/hsl\(([^)]+)\)/);
    if (hslMatch) {
      const hslValues = hslMatch[1].split("/")[0].trim();
      root.style.setProperty("--border", hslValues);
      root.style.setProperty("--input", hslValues);
    } else {
      root.style.setProperty("--border", extractHslValues(palette.divider));
      root.style.setProperty("--input", extractHslValues(palette.divider));
    }
  } else {
    root.style.setProperty("--border", palette.divider);
    root.style.setProperty("--input", palette.divider);
  }
  
  // Ring (using primary - always HSL)
  root.style.setProperty("--ring", extractHslValues(palette.primary.main));
  
  // Button state colors (using action states)
  // Set button state colors (extract HSL values for Tailwind)
  root.style.setProperty("--button-hover-bg", extractActionColor(palette.action.hover));
  root.style.setProperty("--button-active-bg", extractActionColor(palette.action.active));
  root.style.setProperty("--button-disabled-bg", extractActionColor(palette.action.disabledBackground));
  root.style.setProperty("--button-disabled-text", extractActionColor(palette.action.disabled));
  
  // Also set -dark variants for dark mode
  if (isDark) {
    root.style.setProperty("--button-hover-bg-dark", extractActionColor(palette.action.hover));
    root.style.setProperty("--button-active-bg-dark", extractActionColor(palette.action.active));
    root.style.setProperty("--button-disabled-bg-dark", extractActionColor(palette.action.disabledBackground));
    root.style.setProperty("--button-disabled-text-dark", extractActionColor(palette.action.disabled));
  }
}

/**
 * Update CSS variables for the entire theme
 */
export function updateThemeCSSVariables(theme: Theme): void {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;

  // Update palette CSS variables
  updatePaletteCSSVariables(theme.palette);

  // Typography variants
  const variants = [
    "h1", "h2", "h3", "h4", "h5", "h6",
    "subtitle1", "subtitle2",
    "body1", "body2",
    "button", "caption", "overline",
  ] as const;

  variants.forEach((variant) => {
    const variantConfig = theme.typography[variant];
    if (variantConfig.fontSize) {
      root.style.setProperty(
        `--typography-${variant}-font-size`,
        typeof variantConfig.fontSize === "number"
          ? `${variantConfig.fontSize}px`
          : variantConfig.fontSize
      );
    }
    if (variantConfig.fontWeight) {
      root.style.setProperty(
        `--typography-${variant}-font-weight`,
        variantConfig.fontWeight.toString()
      );
    }
    if (variantConfig.lineHeight) {
      root.style.setProperty(
        `--typography-${variant}-line-height`,
        variantConfig.lineHeight.toString()
      );
    }
    if (variantConfig.letterSpacing) {
      root.style.setProperty(
        `--typography-${variant}-letter-spacing`,
        variantConfig.letterSpacing
      );
    }
  });

  // Base typography
  root.style.setProperty("--typography-html-font-size", `${theme.typography.htmlFontSize}px`);
  root.style.setProperty("--typography-font-family", theme.typography.fontFamily);
  root.style.setProperty("--typography-font-size", `${theme.typography.fontSize}px`);

  // Transitions
  Object.entries(theme.transitions.easing).forEach(([key, value]) => {
    root.style.setProperty(`--transition-easing-${key}`, value);
  });
  Object.entries(theme.transitions.duration).forEach(([key, value]) => {
    root.style.setProperty(`--transition-duration-${key}`, `${value}ms`);
  });

  // Z-index
  Object.entries(theme.zIndex).forEach(([key, value]) => {
    root.style.setProperty(`--z-index-${key}`, value.toString());
  });

  // Spacing (base unit)
  root.style.setProperty("--spacing-unit", `${theme.spacing}px`);

  // Shape - Border radius
  const baseRadius = theme.shape.borderRadius;
  root.style.setProperty("--shape-border-radius", `${baseRadius}px`);
  
  // Generate all border-radius size variants
  // These match common Tailwind patterns and the borderRadius scale
  root.style.setProperty("--radius-xs", "0.125rem"); // 2px
  root.style.setProperty("--radius-sm", `${Math.max(0, baseRadius - 2)}px`); // base - 2px, min 0
  root.style.setProperty("--radius-md", `${Math.max(0, baseRadius - 1)}px`); // base - 1px, min 0
  root.style.setProperty("--radius", `${baseRadius}px`); // base value (backward compatibility)
  root.style.setProperty("--radius-lg", `${baseRadius + 4}px`); // base + 4px
  root.style.setProperty("--radius-xl", `${baseRadius + 8}px`); // base + 8px
  root.style.setProperty("--radius-2xl", `${baseRadius + 12}px`); // base + 12px
  root.style.setProperty("--radius-full", "9999px"); // full rounded
  
  // Also set shape border radius variants
  root.style.setProperty("--shape-border-radius-sm", `${Math.max(0, baseRadius - 2)}px`);
  root.style.setProperty("--shape-border-radius-md", `${Math.max(0, baseRadius - 1)}px`);
  root.style.setProperty("--shape-border-radius-lg", `${baseRadius + 4}px`);

  // Breakpoints
  Object.entries(theme.breakpoints.values).forEach(([key, value]) => {
    root.style.setProperty(`--breakpoint-${key}`, `${value}${theme.breakpoints.unit}`);
  });
}
