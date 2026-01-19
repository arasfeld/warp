import React from "react";
import { View, useWindowDimensions, type StyleProp, type ViewStyle } from "react-native";

import type { ContainerBaseProps, ContainerSize } from "@warp/core";
import { CONTAINER_SIZE_MAP } from "@warp/core";

import { cn } from "../../utils/cn";

export interface ContainerProps extends ContainerBaseProps {
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
 * Note: On mobile, container behaves more like a padded wrapper
 * since screens are typically narrower than desktop breakpoints.
 *
 * @example
 * ```tsx
 * // Default container with padding
 * <Container>
 *   <Content />
 * </Container>
 *
 * // Full width container
 * <Container fluid>
 *   <Content />
 * </Container>
 * ```
 */
export function Container({
  children,
  size = "md",
  fluid = false,
  px = "md",
  className,
  style,
}: ContainerProps) {
  const { width: screenWidth } = useWindowDimensions();

  // Calculate max width based on size
  const maxWidthValue = CONTAINER_SIZE_MAP[size];
  const maxWidth = fluid || maxWidthValue === "100%"
    ? undefined
    : Math.min(maxWidthValue, screenWidth);

  return (
    <View
      className={cn(
        "w-full self-center",
        pxClasses[px],
        className
      )}
      style={[
        maxWidth ? { maxWidth } : undefined,
        style,
      ]}
    >
      {children}
    </View>
  );
}
