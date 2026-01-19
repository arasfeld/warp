/**
 * Group component types
 * Platform-agnostic type definitions for Group layout component
 */

import type { StackAlign, StackJustify, StackSpacing } from "../stack";

/**
 * Wrap options for the group
 */
export type GroupWrap = "wrap" | "nowrap" | "wrap-reverse";

/**
 * Base props shared between web and native Group implementations
 */
export interface GroupBaseProps {
  /**
   * Gap between children
   * @default "md"
   */
  gap?: StackSpacing;

  /**
   * Cross-axis alignment (align-items)
   * @default "center"
   */
  align?: StackAlign;

  /**
   * Main-axis alignment (justify-content)
   * @default "flex-start"
   */
  justify?: StackJustify;

  /**
   * Whether children should wrap to next line
   * @default "wrap"
   */
  wrap?: GroupWrap;

  /**
   * Whether children should grow to fill available space
   * @default false
   */
  grow?: boolean;

  /**
   * Prevent children from overflowing when grow is true
   * Calculates max-width based on number of children
   * @default true
   */
  preventGrowOverflow?: boolean;
}

// Re-export spacing types for convenience
export type { StackAlign as GroupAlign, StackJustify as GroupJustify, StackSpacing as GroupSpacing };
