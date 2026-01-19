/**
 * Switch component types
 * Platform-agnostic type definitions for the Switch component
 */

/**
 * Switch size variants
 */
export type SwitchSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Theme color type (theme color key or CSS color)
 */
export type SwitchColor = string;

/**
 * Label position relative to the switch
 */
export type SwitchLabelPosition = "left" | "right";

/**
 * Base Switch props (platform-agnostic)
 * These props are shared between web and native implementations
 */
export interface SwitchBaseProps {
  /** Controlled checked state */
  checked?: boolean;
  /** Default checked state for uncontrolled usage */
  defaultChecked?: boolean;
  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** Switch size */
  size?: SwitchSize;
  /** Switch color (theme color key or CSS color) */
  color?: SwitchColor;
  /** Label displayed next to the switch */
  label?: React.ReactNode;
  /** Position of the label relative to the switch */
  labelPosition?: SwitchLabelPosition;
  /** Description displayed below the label */
  description?: React.ReactNode;
  /** Error message displayed below the switch */
  error?: React.ReactNode;
  /** Label displayed inside the track when checked (on state) */
  onLabel?: React.ReactNode;
  /** Label displayed inside the track when unchecked (off state) */
  offLabel?: React.ReactNode;
  /** Icon displayed inside the thumb */
  thumbIcon?: React.ReactNode;
}

/**
 * Size configuration for the Switch component
 * Used for consistent sizing across platforms
 */
export interface SwitchSizeConfig {
  /** Track width */
  trackWidth: number;
  /** Track height */
  trackHeight: number;
  /** Thumb size (diameter) */
  thumbSize: number;
  /** Thumb offset from track edge */
  thumbOffset: number;
  /** Font size for internal labels */
  labelFontSize: number;
}

/**
 * Default size configurations
 */
export const SWITCH_SIZE_CONFIG: Record<SwitchSize, SwitchSizeConfig> = {
  xs: {
    trackWidth: 32,
    trackHeight: 16,
    thumbSize: 12,
    thumbOffset: 2,
    labelFontSize: 8,
  },
  sm: {
    trackWidth: 38,
    trackHeight: 20,
    thumbSize: 16,
    thumbOffset: 2,
    labelFontSize: 9,
  },
  md: {
    trackWidth: 46,
    trackHeight: 24,
    thumbSize: 20,
    thumbOffset: 2,
    labelFontSize: 10,
  },
  lg: {
    trackWidth: 56,
    trackHeight: 30,
    thumbSize: 26,
    thumbOffset: 2,
    labelFontSize: 11,
  },
  xl: {
    trackWidth: 66,
    trackHeight: 36,
    thumbSize: 32,
    thumbOffset: 2,
    labelFontSize: 12,
  },
};
