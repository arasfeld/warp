/**
 * Skeleton animation type
 */
export type SkeletonAnimation = "pulse" | "wave" | false;

/**
 * Base Skeleton props (platform-agnostic)
 */
export interface SkeletonBaseProps {
  /** Width of skeleton */
  width?: string | number;
  /** Height of skeleton */
  height?: string | number;
  /** Border radius */
  radius?: string | number;
  /** Whether to render a circle skeleton */
  circle?: boolean;
  /** Whether skeleton is visible */
  visible?: boolean;
  /** Animation type */
  animate?: SkeletonAnimation;
}
