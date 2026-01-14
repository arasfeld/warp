"use client";

import React from "react";
import { cn } from "../../utils/cn";

/**
 * Text size variants
 */
export type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

/**
 * Text weight variants
 */
export type TextWeight = "normal" | "medium" | "semibold" | "bold";

/**
 * Text color variants
 */
export type TextColor = "default" | "muted" | "primary" | "secondary" | "error" | "success";

/**
 * Text component props
 */
export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Text content */
  children?: React.ReactNode;
  /** Text size */
  size?: TextSize;
  /** Text weight */
  weight?: TextWeight;
  /** Text color variant */
  color?: TextColor;
  /** Render as different HTML element */
  as?: "p" | "span" | "div" | "label";
}

/**
 * Heading component props
 */
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Heading content */
  children?: React.ReactNode;
  /** Heading level (h1-h6) */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Text weight */
  weight?: TextWeight;
  /** Text color variant */
  color?: TextColor;
}

/**
 * Text component
 * Flexible text component with size, weight, and color variants
 *
 * @example
 * ```tsx
 * <Text size="lg" weight="semibold" color="primary">
 *   Hello World
 * </Text>
 * ```
 */
export function Text({
  children,
  size = "md",
  weight = "normal",
  color = "default",
  as: Component = "p",
  className,
  ...props
}: TextProps) {
  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
  };

  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const colorClasses = {
    default: "text-foreground",
    muted: "text-muted-foreground",
    primary: "text-primary",
    secondary: "text-secondary-foreground",
    error: "text-error",
    success: "text-success",
  };

  return (
    <Component
      className={cn(
        sizeClasses[size],
        weightClasses[weight],
        colorClasses[color],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * Heading component
 * Semantic heading component with automatic sizing based on level
 *
 * @example
 * ```tsx
 * <Heading level={1}>Main Title</Heading>
 * <Heading level={2}>Subtitle</Heading>
 * ```
 */
export function Heading({
  children,
  level = 1,
  weight = "bold",
  color = "default",
  className,
  ...props
}: HeadingProps) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;

  const sizeClasses = {
    1: "text-4xl",
    2: "text-3xl",
    3: "text-2xl",
    4: "text-xl",
    5: "text-lg",
    6: "text-base",
  };

  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const colorClasses = {
    default: "text-foreground",
    muted: "text-muted-foreground",
    primary: "text-primary",
    secondary: "text-secondary-foreground",
    error: "text-error",
    success: "text-success",
  };

  return (
    <Component
      className={cn(
        sizeClasses[level],
        weightClasses[weight],
        colorClasses[color],
        "leading-tight tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
