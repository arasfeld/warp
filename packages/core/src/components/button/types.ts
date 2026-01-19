/**
 * Button component types
 * Platform-agnostic type definitions for the Button component
 */

/**
 * Button variant
 */
export type ButtonVariant = "filled" | "light" | "outline" | "gradient" | "default";

/**
 * Button size (including compact variants)
 */
export type ButtonSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "compact-xs"
  | "compact-sm"
  | "compact-md"
  | "compact-lg"
  | "compact-xl";

/**
 * Gradient configuration for gradient variant
 */
export interface GradientConfig {
  from: string;
  to: string;
  deg?: number;
}

/**
 * Loader props for Button loading state
 */
export interface ButtonLoaderProps {
  type?: "spinner" | "dots" | "bars";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
}

/**
 * Button justify options
 */
export type ButtonJustify = "flex-start" | "center" | "flex-end" | "space-between";

/**
 * Base Button props (platform-agnostic)
 * These props are shared between web and native implementations
 */
export interface ButtonBaseProps {
  /** Button variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Color (theme color key or CSS color) */
  color?: string;
  /** Border radius (theme key or CSS value) */
  radius?: string | number;
  /** Whether button takes full width */
  fullWidth?: boolean;
  /** Content displayed on the left side */
  leftSection?: React.ReactNode;
  /** Content displayed on the right side */
  rightSection?: React.ReactNode;
  /** Justify content alignment */
  justify?: ButtonJustify;
  /** Whether button is disabled */
  disabled?: boolean;
  /** Whether button is in loading state */
  loading?: boolean;
  /** Loader props */
  loaderProps?: ButtonLoaderProps;
  /** Gradient configuration (only used when variant="gradient") */
  gradient?: GradientConfig;
  /** Auto contrast (adjusts text color based on background) */
  autoContrast?: boolean;
}
