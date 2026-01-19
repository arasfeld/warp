/**
 * Container component types
 * Platform-agnostic type definitions for Container layout component
 */

/**
 * Container size presets
 * Maps to common max-width breakpoints
 */
export type ContainerSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";

/**
 * Base props shared between web and native Container implementations
 */
export interface ContainerBaseProps {
  /**
   * Maximum width of the container
   * - xs: 540px
   * - sm: 720px
   * - md: 960px (default)
   * - lg: 1140px
   * - xl: 1320px
   * - full: 100%
   * @default "md"
   */
  size?: ContainerSize;

  /**
   * When true, container takes 100% width (ignores size)
   * @default false
   */
  fluid?: boolean;

  /**
   * Horizontal padding
   * @default "md"
   */
  px?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
}

/**
 * Container size configuration (max-width in pixels)
 */
export const CONTAINER_SIZE_MAP: Record<ContainerSize, number | "100%"> = {
  xs: 540,
  sm: 720,
  md: 960,
  lg: 1140,
  xl: 1320,
  full: "100%",
};
