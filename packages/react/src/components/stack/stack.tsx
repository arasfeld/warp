"use client";

import React, { forwardRef } from "react";

import type { StackAlign, StackBaseProps, StackJustify, StackSpacing } from "@warp/core";

import { cn } from "../../utils/cn";

export interface StackProps
  extends StackBaseProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, "align"> {
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
 * Gap classes mapping
 * Maps semantic sizes to Tailwind gap utilities
 */
const gapClasses: Record<Exclude<StackSpacing, number>, string> = {
  xs: "gap-1",   // 0.25rem (4px)
  sm: "gap-2",   // 0.5rem (8px)
  md: "gap-4",   // 1rem (16px)
  lg: "gap-6",   // 1.5rem (24px)
  xl: "gap-8",   // 2rem (32px)
};

/**
 * Alignment classes mapping
 */
const alignClasses: Record<StackAlign, string> = {
  stretch: "items-stretch",
  center: "items-center",
  "flex-start": "items-start",
  "flex-end": "items-end",
  baseline: "items-baseline",
};

/**
 * Justify classes mapping
 */
const justifyClasses: Record<StackJustify, string> = {
  "flex-start": "justify-start",
  center: "justify-center",
  "flex-end": "justify-end",
  "space-between": "justify-between",
  "space-around": "justify-around",
  "space-evenly": "justify-evenly",
};

/**
 * Stack component
 * Vertical flex container with consistent gap spacing
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      children,
      gap = "md",
      align = "stretch",
      justify = "flex-start",
      className,
      component,
      style,
      ...props
    },
    ref
  ) => {
    const Component = component || "div";

    // Handle numeric gap values with inline style
    const isNumericGap = typeof gap === "number";
    const gapClass = !isNumericGap ? gapClasses[gap] : undefined;
    const gapStyle = isNumericGap ? { gap: `${gap * 0.25}rem` } : undefined;

    return (
      <Component
        ref={ref}
        className={cn(
          "flex flex-col",
          gapClass,
          alignClasses[align],
          justifyClasses[justify],
          className
        )}
        style={{ ...gapStyle, ...style }}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Stack.displayName = "Stack";
