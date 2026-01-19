/**
 * Radio component types
 * Platform-agnostic type definitions for the Radio component
 */

/**
 * Radio size variants
 */
export type RadioSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Radio variant
 */
export type RadioVariant = "filled" | "outline";

/**
 * Label position relative to the radio
 */
export type RadioLabelPosition = "left" | "right";

/**
 * Base Radio props (platform-agnostic)
 * These props are shared between web and native implementations
 */
export interface RadioBaseProps {
  /** Checked state for controlled component */
  checked?: boolean;
  /** Default checked state for uncontrolled component */
  defaultChecked?: boolean;
  /** Controls component colors based on variant */
  color?: string;
  /** Radio variant */
  variant?: RadioVariant;
  /** Controls size of the component */
  size?: RadioSize;
  /** Label position relative to the radio */
  labelPosition?: RadioLabelPosition;
  /** Whether the radio is disabled */
  disabled?: boolean;
  /** Label associated with the radio */
  label?: React.ReactNode;
  /** Description displayed below the label */
  description?: React.ReactNode;
  /** Error message displayed below the radio */
  error?: React.ReactNode;
  /** Radio value (required when used in Radio.Group) */
  value: string;
}

/**
 * Base Radio Group props (platform-agnostic)
 */
export interface RadioGroupBaseProps {
  /** Controlled value */
  value?: string | null;
  /** Default value */
  defaultValue?: string | null;
  /** Label for the group */
  label?: React.ReactNode;
  /** Description displayed below the label */
  description?: React.ReactNode;
  /** Error message displayed below the group */
  error?: React.ReactNode;
  /** Whether all radios in the group are disabled */
  disabled?: boolean;
  /** Size for all radios in the group */
  size?: RadioSize;
  /** Whether the group is required */
  required?: boolean;
}

/**
 * Size configuration for Radio
 */
export interface RadioSizeConfig {
  container: number;
  innerCircle: number;
}

/**
 * Default size configurations
 */
export const RADIO_SIZE_CONFIG: Record<RadioSize, RadioSizeConfig> = {
  xs: { container: 16, innerCircle: 6 },
  sm: { container: 20, innerCircle: 8 },
  md: { container: 24, innerCircle: 10 },
  lg: { container: 28, innerCircle: 12 },
  xl: { container: 32, innerCircle: 14 },
};
