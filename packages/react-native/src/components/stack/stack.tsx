import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";

import type { StackAlign, StackBaseProps, StackJustify, StackSpacing } from "@warp/core";

import { cn } from "../../utils/cn";

export interface StackProps extends StackBaseProps {
  /**
   * Children to render
   */
  children?: React.ReactNode;
  /**
   * Additional className for NativeWind styling
   */
  className?: string;
  /**
   * Custom style for the container
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * Gap classes mapping
 * Maps semantic sizes to NativeWind gap utilities
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
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Stack gap="md">
 *   <Text>Item 1</Text>
 *   <Text>Item 2</Text>
 *   <Text>Item 3</Text>
 * </Stack>
 *
 * // Centered content
 * <Stack gap="lg" align="center" justify="center">
 *   <Heading>Title</Heading>
 *   <Text>Description</Text>
 * </Stack>
 * ```
 */
export function Stack({
  children,
  gap = "md",
  align = "stretch",
  justify = "flex-start",
  className,
  style,
}: StackProps) {
  // Handle numeric gap values with inline style
  const isNumericGap = typeof gap === "number";
  const gapClass = !isNumericGap ? gapClasses[gap] : undefined;
  const gapStyle = isNumericGap ? { gap: gap * 4 } : undefined; // RN uses pixels, so multiply by 4 (base 16px / 4 = 4px per unit)

  return (
    <View
      className={cn(
        "flex flex-col",
        gapClass,
        alignClasses[align],
        justifyClasses[justify],
        className
      )}
      style={[gapStyle, style]}
    >
      {children}
    </View>
  );
}
