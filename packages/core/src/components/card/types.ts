/**
 * Card component types
 * Platform-agnostic type definitions for the Card component
 */

/**
 * Spacing type (theme key or CSS value)
 */
export type CardSpacing = "xs" | "sm" | "md" | "lg" | "xl" | number;

/**
 * Radius type (theme key or CSS value)
 */
export type CardRadius = "xs" | "sm" | "md" | "lg" | "xl" | "full" | number;

/**
 * Shadow type (theme key or CSS value)
 */
export type CardShadow = "xs" | "sm" | "md" | "lg" | "xl" | string;

/**
 * Base Card props (platform-agnostic)
 * These props are shared between web and native implementations
 */
export interface CardBaseProps {
  /** Padding (theme spacing key or CSS value) */
  padding?: CardSpacing;
  /** Border radius (theme key or CSS value) */
  radius?: CardRadius;
  /** Box shadow (theme key or CSS value) */
  shadow?: CardShadow;
  /** Whether card has border */
  withBorder?: boolean;
}

/**
 * Base Card Section props (platform-agnostic)
 */
export interface CardSectionBaseProps {
  /** Whether section inherits padding from parent Card */
  inheritPadding?: boolean;
  /** Whether section has border */
  withBorder?: boolean;
}

/**
 * Padding value map for consistent sizing
 */
export const CARD_PADDING_MAP: Record<Exclude<CardSpacing, number>, number> = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
};
