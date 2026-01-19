/**
 * Checkbox component types
 * Platform-agnostic type definitions for the Checkbox component
 */

/**
 * Checkbox size variants
 */
export type CheckboxSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Checkbox variant
 */
export type CheckboxVariant = "filled" | "outline";

/**
 * Radius type (theme key or CSS value)
 */
export type CheckboxRadius = "xs" | "sm" | "md" | "lg" | "xl" | "full" | number;

/**
 * Label position relative to the checkbox
 */
export type CheckboxLabelPosition = "left" | "right";

/**
 * Base Checkbox props (platform-agnostic)
 * These props are shared between web and native implementations
 */
export interface CheckboxBaseProps {
  /** Checked state for controlled component */
  checked?: boolean;
  /** Default checked state for uncontrolled component */
  defaultChecked?: boolean;
  /** Controls component colors based on variant */
  color?: string;
  /** Checkbox variant */
  variant?: CheckboxVariant;
  /** Controls size of the component */
  size?: CheckboxSize;
  /** Border radius */
  radius?: CheckboxRadius;
  /** Indeterminate state (if set, checked prop is ignored) */
  indeterminate?: boolean;
  /** Label position relative to the checkbox */
  labelPosition?: CheckboxLabelPosition;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Label associated with the checkbox */
  label?: React.ReactNode;
  /** Description displayed below the label */
  description?: React.ReactNode;
  /** Error message displayed below the checkbox */
  error?: React.ReactNode;
  /** Checkbox value (required when used in Checkbox.Group) */
  value?: string;
}

/**
 * Size configuration for Checkbox
 */
export interface CheckboxSizeConfig {
  container: number;
  icon: number;
}

/**
 * Default size configurations
 */
export const CHECKBOX_SIZE_CONFIG: Record<CheckboxSize, CheckboxSizeConfig> = {
  xs: { container: 16, icon: 10 },
  sm: { container: 20, icon: 12 },
  md: { container: 24, icon: 16 },
  lg: { container: 28, icon: 20 },
  xl: { container: 32, icon: 24 },
};
