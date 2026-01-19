/**
 * Stack component types
 * Platform-agnostic type definitions for Stack layout component
 */

/**
 * Spacing values following Tailwind's spacing scale
 * xs=1 (0.25rem), sm=2 (0.5rem), md=4 (1rem), lg=6 (1.5rem), xl=8 (2rem)
 */
export type StackSpacing = "xs" | "sm" | "md" | "lg" | "xl" | number;

/**
 * Alignment options for cross-axis alignment (align-items)
 */
export type StackAlign = "stretch" | "center" | "flex-start" | "flex-end" | "baseline";

/**
 * Justification options for main-axis alignment (justify-content)
 */
export type StackJustify =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly";

/**
 * Base props shared between web and native Stack implementations
 */
export interface StackBaseProps {
  /**
   * Gap between children
   * @default "md"
   */
  gap?: StackSpacing;

  /**
   * Cross-axis alignment (align-items)
   * @default "stretch"
   */
  align?: StackAlign;

  /**
   * Main-axis alignment (justify-content)
   * @default "flex-start"
   */
  justify?: StackJustify;
}

/**
 * Spacing value map for consistent sizing across platforms
 * Maps semantic sizes to Tailwind spacing scale numbers
 */
export const STACK_SPACING_MAP: Record<Exclude<StackSpacing, number>, number> = {
  xs: 1,   // 0.25rem (4px)
  sm: 2,   // 0.5rem (8px)
  md: 4,   // 1rem (16px)
  lg: 6,   // 1.5rem (24px)
  xl: 8,   // 2rem (32px)
};
