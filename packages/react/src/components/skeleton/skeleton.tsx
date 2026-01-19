"use client";

import React, { forwardRef } from "react";

import { cn } from "../../utils/cn";

/**
 * Skeleton animation type
 */
export type SkeletonAnimation = "pulse" | "wave" | false;

/**
 * Skeleton component props
 */
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width of skeleton */
  width?: string | number;
  /** Height of skeleton */
  height?: string | number;
  /** Border radius */
  radius?: string | number;
  /** Whether to render a circle skeleton */
  circle?: boolean;
  /** Whether skeleton is visible (if false, renders children) */
  visible?: boolean;
  /** Animation type */
  animate?: SkeletonAnimation;
  /** Additional className */
  className?: string;
  /** Children to render when visible is false */
  children?: React.ReactNode;
}

/**
 * Skeleton component
 * Display placeholder content while loading
 *
 * @example
 * ```tsx
 * <Skeleton height={20} width="100%" />
 * <Skeleton circle height={50} width={50} />
 * <Skeleton visible={loading}>
 *   <Text>Loaded content</Text>
 * </Skeleton>
 * ```
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      width,
      height,
      radius,
      circle = false,
      visible = true,
      animate = "pulse",
      className,
      children,
      style,
      ...props
    },
    ref
  ) => {
    // If not visible, render children
    if (!visible) {
      return <>{children}</>;
    }

    // Radius classes
    const getRadiusClass = () => {
      if (circle) return "rounded-full";
      if (radius === undefined) return "rounded-md";
      if (typeof radius === "number") return "";
      const radiusMap: Record<string, string> = {
        xs: "rounded-sm",
        sm: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      };
      return radiusMap[radius] || "rounded-md";
    };

    // Animation classes
    const getAnimationClass = () => {
      if (animate === false) return "";
      if (animate === "pulse") return "animate-pulse";
      if (animate === "wave") return "skeleton-wave";
      return "animate-pulse";
    };

    // Calculate styles
    const computedStyle: React.CSSProperties = {
      ...style,
      width: typeof width === "number" ? `${width}px` : width,
      height: typeof height === "number" ? `${height}px` : height,
      ...(typeof radius === "number" && { borderRadius: `${radius}px` }),
      ...(circle && width && {
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof width === "number" ? `${width}px` : width,
      }),
    };

    return (
      <div
        ref={ref}
        className={cn(
          "bg-gray-300 dark:bg-gray-600",
          getRadiusClass(),
          getAnimationClass(),
          className
        )}
        style={computedStyle}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

/**
 * Skeleton.Text component props
 */
export interface SkeletonTextProps extends Omit<SkeletonProps, "height"> {
  /** Number of lines to render */
  lines?: number;
  /** Height of each line */
  lineHeight?: string | number;
  /** Gap between lines */
  gap?: string | number;
  /** Whether the last line should be shorter */
  lastLineWidth?: string | number;
}

/**
 * Skeleton.Text component
 * Display multiple skeleton lines for text content
 */
export const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
  (
    {
      lines = 3,
      lineHeight = 16,
      gap = 8,
      lastLineWidth = "70%",
      width = "100%",
      animate = "pulse",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col", className)}
        style={{
          gap: typeof gap === "number" ? `${gap}px` : gap,
        }}
        {...props}
      >
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton
            key={index}
            width={index === lines - 1 ? lastLineWidth : width}
            height={lineHeight}
            animate={animate}
          />
        ))}
      </div>
    );
  }
);

SkeletonText.displayName = "SkeletonText";

/**
 * Skeleton.Circle component props
 */
export interface SkeletonCircleProps extends Omit<SkeletonProps, "circle" | "width" | "height"> {
  /** Size (diameter) of the circle */
  size?: string | number;
}

/**
 * Skeleton.Circle component
 * Display a circular skeleton (avatar placeholder)
 */
export const SkeletonCircle = forwardRef<HTMLDivElement, SkeletonCircleProps>(
  ({ size = 40, animate = "pulse", className, ...props }, ref) => {
    return (
      <Skeleton
        ref={ref}
        circle
        width={size}
        height={size}
        animate={animate}
        className={className}
        {...props}
      />
    );
  }
);

SkeletonCircle.displayName = "SkeletonCircle";
