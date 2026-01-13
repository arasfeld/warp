/**
 * Base theme type definitions
 */

/**
 * Color palette definition
 */
export interface ColorPalette {
  /** Primary brand colors */
  primary: string;
  secondary?: string;
  /** Semantic colors */
  success?: string;
  warning?: string;
  error?: string;
  info?: string;
  /** Neutral colors */
  background: string;
  foreground: string;
  /** Muted colors */
  mutedBackground?: string;
  mutedForeground?: string;
  /** Border colors */
  border?: string;
  /** Input colors */
  input?: string;
  /** Ring colors (for focus rings) */
  ring?: string;
}

/**
 * Theme mode (light or dark)
 */
export type ThemeMode = "light" | "dark";

/**
 * Complete theme configuration
 */
export interface Theme {
  /** Color definitions for light and dark modes */
  colors: {
    light: ColorPalette;
    dark: ColorPalette;
  };
  /** Spacing scale */
  spacing: Record<string, string | number>;
  /** Typography scale */
  typography: {
    fontFamily?: {
      sans?: readonly string[];
      serif?: readonly string[];
      mono?: readonly string[];
    };
    fontSize: Record<
      string,
      { fontSize: string | number; lineHeight?: string | number }
    >;
    fontWeight: Record<string, string | number>;
  };
  /** Border radius scale */
  borderRadius: Record<string, string | number>;
  /** Shadow definitions (abstract - platform adapters convert to CSS/RN styles) */
  shadows: Record<string, ShadowDefinition>;
  /** Breakpoints (primarily for web, but defined in core) */
  breakpoints: Record<string, string | number>;
}

/**
 * Shadow definition (platform-agnostic)
 * Platform adapters convert this to CSS box-shadow or RN shadow props
 */
export interface ShadowDefinition {
  /** Shadow offset X */
  offsetX?: number;
  /** Shadow offset Y */
  offsetY?: number;
  /** Shadow blur radius */
  blur?: number;
  /** Shadow spread radius */
  spread?: number;
  /** Shadow color */
  color: string;
  /** Shadow opacity (0-1) */
  opacity?: number;
}
