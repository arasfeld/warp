/**
 * Badge size options
 */
export type BadgeSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Badge variant options
 */
export type BadgeVariant = "filled" | "outline" | "light" | "dot";

/**
 * Badge position when used with children
 */
export type BadgePosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";

/**
 * Base Badge props (platform-agnostic)
 */
export interface BadgeBaseProps {
  /** Badge content (number, text, or element) */
  label?: React.ReactNode;
  /** Visual style variant */
  variant?: BadgeVariant;
  /** Badge size */
  size?: BadgeSize;
  /** Color theme */
  color?: string;
  /** Border radius */
  radius?: string | number;
  /** Whether the badge should be a circle (for single characters or numbers) */
  circle?: boolean;
  /** Whether badge should have a gradient background */
  gradient?: { from: string; to: string; deg?: number };
  /** Left section element */
  leftSection?: React.ReactNode;
  /** Right section element */
  rightSection?: React.ReactNode;
  /** If true, the badge will not be visible when label is 0 or empty */
  showZero?: boolean;
  /** Maximum value to display (shows "max+" if exceeded) */
  max?: number;
  /** Processing/loading state with animation */
  processing?: boolean;
}
