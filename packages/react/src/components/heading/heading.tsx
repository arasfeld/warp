"use client";

import React from "react";
import { cn } from "../../utils/cn";

/**
 * Theme color type (theme color key or CSS color)
 */
export type ThemeColor = string;

/**
 * Theme size type
 */
export type ThemeSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Heading order (1-6)
 */
export type HeadingOrder = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Heading size type
 */
export type HeadingSize =
  | HeadingOrder
  | ThemeSize
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | number
  | (string & {});

/**
 * Text wrap type
 */
export type TextWrap = "wrap" | "nowrap" | "balance" | "pretty" | "stable";

/**
 * Gradient configuration
 */
export interface Gradient {
  from: string;
  to: string;
  deg?: number;
}

/**
 * Heading component props
 * Comprehensive heading component
 */
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Heading content */
  children?: React.ReactNode;
  /** Heading order (1-6), controls font-size if size prop is not set */
  order?: HeadingOrder;
  /** Changes heading size, if not set, then size is controlled by order prop */
  size?: HeadingSize;
  /** Font weight (number like 400, 500, 700 or string) */
  fw?: number | "normal" | "bold" | "lighter" | "bolder";
  /** Text color (theme color key or CSS color) */
  c?: ThemeColor;
  /** Variant */
  variant?: "text" | "gradient";
  /** Gradient configuration (only used when variant="gradient") */
  gradient?: Gradient;
  /** Text wrap CSS property */
  textWrap?: TextWrap;
  /** Line clamp (max number of lines) */
  lineClamp?: number;
  /** Component to render as (polymorphic) */
  component?: React.ElementType;
  /** Additional className */
  className?: string;
}

/**
 * Heading component
 * Comprehensive heading component
 *
 * @example
 * ```tsx
 * <Heading order={1} size="h1">
 *   Main Title
 * </Heading>
 * ```
 */
export function Heading({
  children,
  order = 1,
  size,
  fw,
  c,
  variant = "text",
  gradient,
  textWrap = "wrap",
  lineClamp,
  component,
  className,
  style,
  ...props
}: HeadingProps) {
  // Determine root element
  const Component = component || (`h${order}` as keyof React.JSX.IntrinsicElements);
  const ComponentType = Component as React.ElementType;

  // Size classes based on order (if size not specified)
  const orderSizeClasses: Record<HeadingOrder, string> = {
    1: "text-4xl",
    2: "text-3xl",
    3: "text-2xl",
    4: "text-xl",
    5: "text-lg",
    6: "text-base",
  };

  // Build classes array
  const classes: string[] = [];

  // Size handling
  if (size !== undefined) {
    // If size is a heading order (h1-h6), use corresponding size
    if (typeof size === "string" && size.startsWith("h")) {
      const headingMap: Record<string, string> = {
        h1: "text-4xl",
        h2: "text-3xl",
        h3: "text-2xl",
        h4: "text-xl",
        h5: "text-lg",
        h6: "text-base",
      };
      if (headingMap[size]) {
        classes.push(headingMap[size]);
      }
    }
    // If size is a number (1-6), treat as heading order
    else if (typeof size === "number" && size >= 1 && size <= 6) {
      const headingSizeMap: Record<number, string> = {
        1: "text-4xl",
        2: "text-3xl",
        3: "text-2xl",
        4: "text-xl",
        5: "text-lg",
        6: "text-base",
      };
      if (headingSizeMap[size]) {
        classes.push(headingSizeMap[size]);
      }
    }
    // If size is a ThemeSize, use theme size classes
    else if (typeof size === "string") {
      const themeSizeMap: Record<string, string> = {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
      };
      if (themeSizeMap[size]) {
        classes.push(themeSizeMap[size]);
      } else if (typeof size === "string") {
        // Custom size value
        classes.push(`text-[${size}]`);
      }
    }
  } else {
    // Use order-based size if size not specified
    classes.push(orderSizeClasses[order]);
  }

  // Font weight
  if (fw !== undefined) {
    if (typeof fw === "number") {
      classes.push(`font-[${fw}]`);
    } else {
      const fwMap: Record<string, string> = {
        normal: "font-normal",
        bold: "font-bold",
        lighter: "font-light",
        bolder: "font-extrabold",
      };
      if (fwMap[fw]) classes.push(fwMap[fw]);
    }
  } else {
    // Default font weight based on order
    const defaultFw: Record<HeadingOrder, string> = {
      1: "font-extrabold",
      2: "font-bold",
      3: "font-bold",
      4: "font-semibold",
      5: "font-semibold",
      6: "font-semibold",
    };
    classes.push(defaultFw[order]);
  }

  // Text color (only if not gradient variant)
  if (c && variant !== "gradient") {
    const colorMap: Record<string, string> = {
      default: "text-foreground",
      muted: "text-muted-foreground",
      dimmed: "text-muted-foreground",
      primary: "text-primary",
      secondary: "text-secondary-foreground",
      error: "text-error",
      success: "text-success",
      warning: "text-warning",
      info: "text-info",
    };
    if (colorMap[c]) {
      classes.push(colorMap[c]);
    } else if (c.includes(".")) {
      // Handle dot notation like "teal.4" - use as-is
      classes.push(`text-[${c}]`);
    } else {
      // Use as CSS color
      classes.push(`text-[${c}]`);
    }
  } else if (variant !== "gradient") {
    classes.push("text-foreground");
  }

  // Text wrap
  if (textWrap) {
    const textWrapMap: Record<string, string> = {
      wrap: "text-wrap",
      nowrap: "text-nowrap",
      balance: "text-balance",
      pretty: "text-pretty",
      stable: "text-stable",
    };
    if (textWrapMap[textWrap]) {
      classes.push(textWrapMap[textWrap]);
    }
  }

  // Line clamp
  if (lineClamp) {
    const clampMap: Record<number, string> = {
      1: "line-clamp-1",
      2: "line-clamp-2",
      3: "line-clamp-3",
      4: "line-clamp-4",
      5: "line-clamp-5",
      6: "line-clamp-6",
    };
    if (clampMap[lineClamp]) {
      classes.push(clampMap[lineClamp]);
    } else {
      classes.push(`line-clamp-[${lineClamp}]`);
    }
  }

  // Default spacing
  classes.push("leading-tight tracking-tight");

  // Gradient variant
  const gradientStyle: React.CSSProperties = {};
  if (variant === "gradient" && gradient) {
    const deg = gradient.deg ?? 45;
    gradientStyle.backgroundImage = `linear-gradient(${deg}deg, ${gradient.from}, ${gradient.to})`;
    gradientStyle.WebkitBackgroundClip = "text";
    gradientStyle.backgroundClip = "text";
    gradientStyle.WebkitTextFillColor = "transparent";
    gradientStyle.color = "transparent";
  }

  return (
    <ComponentType
      className={cn(classes, className)}
      style={{
        ...gradientStyle,
        ...style,
      }}
      {...props}
    >
      {children}
    </ComponentType>
  );
}
