/**
 * Chip component types
 * Platform-agnostic type definitions for the Chip component
 */

/**
 * Chip size variants
 */
export type ChipSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Chip variant
 */
export type ChipVariant = "filled" | "outline" | "light";

/**
 * Radius type (theme key or CSS value)
 */
export type ChipRadius = "xs" | "sm" | "md" | "lg" | "xl" | "full" | number;

/**
 * Chip input type
 */
export type ChipType = "checkbox" | "radio";

/**
 * Base Chip props (platform-agnostic)
 * These props are shared between web and native implementations
 */
export interface ChipBaseProps {
  /** Checked state for controlled component */
  checked?: boolean;
  /** Default checked state for uncontrolled component */
  defaultChecked?: boolean;
  /** Controls component colors based on variant */
  color?: string;
  /** Chip variant */
  variant?: ChipVariant;
  /** Controls various properties related to component size */
  size?: ChipSize;
  /** Border radius */
  radius?: ChipRadius;
  /** Chip input type */
  type?: ChipType;
  /** Any element or component to replace default icon */
  icon?: React.ReactNode;
  /** If set, adjusts text color based on background color for filled variant */
  autoContrast?: boolean;
  /** Whether the chip is disabled */
  disabled?: boolean;
  /** Chip value (required when used in Chip.Group) */
  value?: string;
}

/**
 * Base Chip Group props (platform-agnostic)
 */
export interface ChipGroupBaseProps {
  /** Controlled value */
  value?: string | string[];
  /** Default value */
  defaultValue?: string | string[];
  /** Whether multiple chips can be selected */
  multiple?: boolean;
}

/**
 * Size configuration for Chip
 */
export interface ChipSizeConfig {
  height: number;
  paddingX: number;
  fontSize: number;
  iconSize: number;
}

/**
 * Default size configurations
 */
export const CHIP_SIZE_CONFIG: Record<ChipSize, ChipSizeConfig> = {
  xs: { height: 20, paddingX: 8, fontSize: 12, iconSize: 12 },
  sm: { height: 24, paddingX: 10, fontSize: 14, iconSize: 16 },
  md: { height: 28, paddingX: 12, fontSize: 14, iconSize: 16 },
  lg: { height: 32, paddingX: 16, fontSize: 16, iconSize: 20 },
  xl: { height: 36, paddingX: 20, fontSize: 16, iconSize: 20 },
};
