"use client";

import React, { forwardRef } from "react";

import type { ContainerBaseProps, ContainerSize } from "@warp/core";

import { cn } from "../../utils/cn";

export interface ContainerProps
  extends ContainerBaseProps,
    React.HTMLAttributes<HTMLDivElement> {
  /**
   * Children to render
   */
  children?: React.ReactNode;
  /**
   * Additional className
   */
  className?: string;
  /**
   * Polymorphic component type
   */
  component?: React.ElementType;
}

/**
 * Max-width classes mapping
 */
const sizeClasses: Record<ContainerSize, string> = {
  xs: "max-w-[540px]",
  sm: "max-w-[720px]",
  md: "max-w-[960px]",
  lg: "max-w-[1140px]",
  xl: "max-w-[1320px]",
  full: "max-w-full",
};

/**
 * Horizontal padding classes
 */
const pxClasses: Record<NonNullable<ContainerBaseProps["px"]>, string> = {
  none: "px-0",
  xs: "px-2",    // 0.5rem (8px)
  sm: "px-4",    // 1rem (16px)
  md: "px-6",    // 1.5rem (24px)
  lg: "px-8",    // 2rem (32px)
  xl: "px-12",   // 3rem (48px)
};

/**
 * Container component
 * Wrapper that centers content with max-width constraint
 *
 * @example
 * ```tsx
 * // Default centered container
 * <Container>
 *   <Content />
 * </Container>
 *
 * // Large container with more padding
 * <Container size="lg" px="lg">
 *   <Content />
 * </Container>
 *
 * // Fluid container (full width)
 * <Container fluid>
 *   <Content />
 * </Container>
 * ```
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      children,
      size = "md",
      fluid = false,
      px = "md",
      className,
      component,
      ...props
    },
    ref
  ) => {
    const Component = component || "div";

    return (
      <Component
        ref={ref}
        className={cn(
          "w-full mx-auto",
          fluid ? "max-w-full" : sizeClasses[size],
          pxClasses[px],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = "Container";
