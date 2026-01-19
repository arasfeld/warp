/**
 * Base theme type definitions
 */

/**
 * Color variant with main, light, dark, and contrast text
 */
export interface ColorVariant {
  main: string;
  light?: string;
  dark?: string;
  contrastText?: string;
}

/**
 * Grey color scale
 */
export interface GreyScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  A100?: string;
  A200?: string;
  A400?: string;
  A700?: string;
}

/**
 * Common colors (black and white)
 */
export interface CommonColors {
  black: string;
  white: string;
}

/**
 * Palette definition
 * Single palette that adapts based on mode
 */
export interface Palette {
  /** Theme mode */
  mode: "light" | "dark";
  /** Common colors (black, white) */
  common: CommonColors;
  /** Primary color */
  primary: ColorVariant;
  /** Secondary color */
  secondary: ColorVariant;
  /** Error color */
  error: ColorVariant;
  /** Warning color */
  warning: ColorVariant;
  /** Info color */
  info: ColorVariant;
  /** Success color */
  success: ColorVariant;
  /** Grey scale */
  grey: GreyScale;
  /** Text colors */
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  /** Divider color */
  divider: string;
  /** Background colors */
  background: {
    default: string;
    paper: string;
  };
  /** Action states */
  action: {
    active: string;
    hover: string;
    hoverOpacity: number;
    selected: string;
    selectedOpacity: number;
    disabled: string;
    disabledBackground: string;
    disabledOpacity: number;
    focus: string;
    focusOpacity: number;
    activatedOpacity: number;
  };
}

/**
 * Theme mode (light or dark)
 */
export type ThemeMode = "light" | "dark";

/**
 * Complete theme configuration
 */
export interface Theme {
  /** Color palette (adapts based on mode) */
  palette: Palette;
  /** Typography configuration */
  typography: {
    fontFamily: {
      sans: readonly string[];
      serif: readonly string[];
      mono: readonly string[];
    };
    fontSize: Record<string, { fontSize: string; lineHeight: string }>;
    fontWeight: Record<string, string>;
    variants: {
      h1: TypographyVariant;
      h2: TypographyVariant;
      h3: TypographyVariant;
      h4: TypographyVariant;
      h5: TypographyVariant;
      h6: TypographyVariant;
      subtitle1: TypographyVariant;
      subtitle2: TypographyVariant;
      body1: TypographyVariant;
      body2: TypographyVariant;
      button: TypographyVariant;
      caption: TypographyVariant;
      overline: TypographyVariant;
    };
    htmlFontSize: number;
    baseFontSize: number;
    fontWeightLight: number;
    fontWeightRegular: number;
    fontWeightMedium: number;
    fontWeightBold: number;
  };
  /** Spacing function multiplier (default: 8px) */
  spacing: number;
  /** Shape (border radius) */
  shape: {
    borderRadius: number;
  };
  /** Shadow definitions */
  shadows: readonly string[];
  /** Breakpoints */
  breakpoints: {
    values: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    unit: string;
  };
  /** Transitions */
  transitions: {
    easing: {
      easeInOut: string;
      easeOut: string;
      easeIn: string;
      sharp: string;
    };
    duration: {
      shortest: number;
      shorter: number;
      short: number;
      standard: number;
      complex: number;
      enteringScreen: number;
      leavingScreen: number;
    };
  };
  /** Z-index scale */
  zIndex: {
    mobileStepper: number;
    fab: number;
    speedDial: number;
    appBar: number;
    drawer: number;
    modal: number;
    snackbar: number;
    tooltip: number;
  };
}

/**
 * Typography variant definition
 */
export interface TypographyVariant {
  fontFamily?: string;
  fontWeight?: string | number;
  fontSize?: string | number;
  lineHeight?: string | number;
  letterSpacing?: string | number;
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
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
