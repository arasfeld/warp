"use client";

import React, { Children, forwardRef } from "react";

import type { GroupBaseProps, GroupWrap, StackAlign, StackJustify, StackSpacing } from "@warp/core";

import { cn } from "../../utils/cn";

export interface GroupProps
  extends GroupBaseProps,
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
 * Gap classes mapping (same as Stack)
 */
const gapClasses: Record<Exclude<StackSpacing, number>, string> = {
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
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
 * Wrap classes mapping
 */
const wrapClasses: Record<GroupWrap, string> = {
  wrap: "flex-wrap",
  nowrap: "flex-nowrap",
  "wrap-reverse": "flex-wrap-reverse",
};

/**
 * Filter out falsy children (null, undefined, false)
 */
function filterFalsyChildren(children: React.ReactNode): React.ReactNode[] {
  return Children.toArray(children).filter(Boolean);
}

/**
 * Group component
 * Horizontal flex container with consistent gap spacing
 *
 * @example
 * ```tsx
 * // Basic horizontal layout
 * <Group gap="md">
 *   <Button>Save</Button>
 *   <Button variant="outline">Cancel</Button>
 * </Group>
 *
 * // Grow children to fill space
 * <Group grow>
 *   <Button>First</Button>
 *   <Button>Second</Button>
 *   <Button>Third</Button>
 * </Group>
 *
 * // Space between items
 * <Group justify="space-between">
 *   <Logo />
 *   <Navigation />
 * </Group>
 * ```
 */
export const Group = forwardRef<HTMLDivElement, GroupProps>(
  (
    {
      children,
      gap = "md",
      align = "center",
      justify = "flex-start",
      wrap = "wrap",
      grow = false,
      preventGrowOverflow = true,
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

    // Filter falsy children for accurate count
    const filteredChildren = filterFalsyChildren(children);
    const childCount = filteredChildren.length;

    // Calculate grow styles if needed
    const getChildStyle = (): React.CSSProperties | undefined => {
      if (!grow) return undefined;

      if (preventGrowOverflow && childCount > 0) {
        // Calculate max-width to prevent overflow
        // Account for gap between items
        const gapValue = isNumericGap ? gap * 0.25 : { xs: 0.25, sm: 0.5, md: 1, lg: 1.5, xl: 2 }[gap as Exclude<StackSpacing, number>];
        const totalGap = gapValue * (childCount - 1);
        return {
          flexGrow: 1,
          maxWidth: `calc(${100 / childCount}% - ${totalGap / childCount}rem)`,
        };
      }

      return { flexGrow: 1 };
    };

    const childStyle = getChildStyle();

    return (
      <Component
        ref={ref}
        className={cn(
          "flex flex-row",
          gapClass,
          alignClasses[align],
          justifyClasses[justify],
          wrapClasses[wrap],
          className
        )}
        style={{ ...gapStyle, ...style }}
        {...props}
      >
        {grow && childStyle
          ? filteredChildren.map((child, index) => (
              <div key={index} style={childStyle}>
                {child}
              </div>
            ))
          : children}
      </Component>
    );
  }
);

Group.displayName = "Group";
