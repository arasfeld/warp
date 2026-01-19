/**
 * Input component types
 * Platform-agnostic type definitions for the Input component
 */

/**
 * Input size variants
 */
export type InputSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Input variant styles
 */
export type InputVariant = "default" | "filled" | "unstyled";

/**
 * Radius type (theme key or CSS value)
 */
export type InputRadius = "xs" | "sm" | "md" | "lg" | "xl" | "full" | number;

/**
 * Base Input props (platform-agnostic)
 * These props are shared between web and native implementations
 */
export interface InputBaseProps {
  /** Input size */
  size?: InputSize;
  /** Input variant */
  variant?: InputVariant;
  /** Border radius (theme key or CSS value) */
  radius?: InputRadius;
  /** Whether input is disabled */
  disabled?: boolean;
  /** Error state */
  error?: boolean | string;
  /** Whether to show error styles on the input */
  withErrorStyles?: boolean;
  /** Content displayed on the left side */
  leftSection?: React.ReactNode;
  /** Content displayed on the right side */
  rightSection?: React.ReactNode;
  /** Whether input has cursor: pointer */
  pointer?: boolean;
  /** Whether input is required */
  required?: boolean;
}

/**
 * Input Wrapper order options
 */
export type InputWrapperOrderItem = "label" | "description" | "input" | "error";

/**
 * Size configuration for Input heights
 */
export const INPUT_HEIGHT_MAP: Record<InputSize, number> = {
  xs: 28,
  sm: 36,
  md: 40,
  lg: 44,
  xl: 48,
};
