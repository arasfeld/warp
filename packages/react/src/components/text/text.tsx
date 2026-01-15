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
 * Text size variants (includes theme sizes plus extended sizes)
 */
export type TextSize = ThemeSize | "2xl" | "3xl" | "4xl" | (string & {});

/**
 * Text truncate type
 */
export type TextTruncate = "start" | "end" | boolean;

/**
 * Gradient configuration
 */
export interface Gradient {
  from: string;
  to: string;
  deg?: number;
}

/**
 * Text component props
 * Comprehensive text component with polymorphic support
 */
export interface TextProps extends Omit<
  React.HTMLAttributes<HTMLParagraphElement> &
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "color"
> {
  /** Text content */
  children?: React.ReactNode;
  /** Text size */
  size?: TextSize;
  /** Font weight (number like 400, 500, 700 or string) */
  fw?: number | "normal" | "bold" | "lighter" | "bolder";
  /** Font style */
  fs?: "normal" | "italic" | "oblique";
  /** Text decoration */
  td?: "none" | "underline" | "line-through" | "overline";
  /** Text color (theme color key or CSS color) */
  c?: ThemeColor;
  /** Deprecated: Use c prop instead */
  color?: string;
  /** Text transform */
  tt?: "none" | "uppercase" | "lowercase" | "capitalize";
  /** Text align */
  ta?: "left" | "center" | "right" | "justify";
  /** Variant */
  variant?: "text" | "gradient";
  /** Gradient configuration (only used when variant="gradient") */
  gradient?: Gradient;
  /** Truncate text (side or boolean) */
  truncate?: TextTruncate;
  /** Line clamp (max number of lines) */
  lineClamp?: number;
  /** Inherit font styles from parent */
  inherit?: boolean;
  /** Inline mode (sets line-height to 1) */
  inline?: boolean;
  /** Shorthand for component="span" */
  span?: boolean;
  /** Component to render as (polymorphic) */
  component?: React.ElementType;
  /** Additional className */
  className?: string;
}

/**
 * Text weight variants (kept for backward compatibility)
 * @deprecated Use fw prop with number instead
 */
export type TextWeight = "normal" | "medium" | "semibold" | "bold";

/**
 * Text color variants (kept for backward compatibility)
 * @deprecated Use c prop with ThemeColor instead
 */
export type TextColor =
  | "default"
  | "muted"
  | "primary"
  | "secondary"
  | "error"
  | "success";

/**
 * Heading component props
 */
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Heading content */
  children?: React.ReactNode;
  /** Heading level (h1-h6) */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Text weight (backward compatibility) */
  weight?: TextWeight;
  /** Font weight */
  fw?: number | "normal" | "bold" | "lighter" | "bolder";
  /** Text color variant (backward compatibility) */
  color?: TextColor;
  /** Text color (theme color key or CSS color) */
  c?: ThemeColor;
  /** Additional className */
  className?: string;
}

/**
 * Text component
 * Comprehensive text component with typography controls
 *
 * @example
 * ```tsx
 * <Text size="lg" fw={600} c="blue">
 *   Hello World
 * </Text>
 * ```
 */
export function Text({
  children,
  size = "md",
  fw,
  fs,
  td,
  c,
  color, // Deprecated
  tt,
  ta,
  variant = "text",
  gradient,
  truncate,
  lineClamp,
  inherit = false,
  inline = false,
  span = false,
  component,
  className,
  style,
  ...props
}: TextProps) {
  // Determine root element
  const Component = span ? "span" : component || "p";

  // Size classes
  const sizeClasses: Record<string, string> = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
  };

  // Build classes array
  const classes: string[] = [];

  // Size (only if not inheriting)
  if (!inherit && size) {
    const sizeClass =
      sizeClasses[size] || (typeof size === "string" ? `text-[${size}]` : "");
    if (sizeClass) classes.push(sizeClass);
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
  }

  // Font style
  if (fs) {
    const fsMap: Record<string, string> = {
      normal: "not-italic",
      italic: "italic",
      oblique: "italic",
    };
    if (fsMap[fs]) classes.push(fsMap[fs]);
  }

  // Text decoration
  if (td) {
    const tdMap: Record<string, string> = {
      none: "no-underline",
      underline: "underline",
      "line-through": "line-through",
      overline: "overline",
    };
    if (tdMap[td]) classes.push(tdMap[td]);
  }

  // Text color (use c prop, fallback to deprecated color prop)
  const colorValue = c || color;
  if (colorValue && variant !== "gradient") {
    // Handle special color values
    if (colorValue === "dimmed") {
      classes.push("text-muted-foreground");
    } else if (colorValue.includes(".")) {
      // Handle dot notation like "teal.4" - use as-is for now
      classes.push(`text-[${colorValue}]`);
    } else {
      // Try common color mappings
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
      if (colorMap[colorValue]) {
        classes.push(colorMap[colorValue]);
      } else {
        // Use as CSS color
        classes.push(`text-[${colorValue}]`);
      }
    }
  }

  // Text transform
  if (tt) {
    const ttMap: Record<string, string> = {
      none: "normal-case",
      uppercase: "uppercase",
      lowercase: "lowercase",
      capitalize: "capitalize",
    };
    if (ttMap[tt]) classes.push(ttMap[tt]);
  }

  // Text align
  if (ta) {
    const taMap: Record<string, string> = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    };
    if (taMap[ta]) classes.push(taMap[ta]);
  }

  // Inline mode
  if (inline) {
    classes.push("leading-none");
  }

  // Truncate
  if (truncate) {
    if (truncate === "end" || truncate === true) {
      classes.push("truncate");
    } else if (truncate === "start") {
      classes.push("truncate");
      // Note: Tailwind doesn't have start truncate, would need custom CSS
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

  // Inherit styles - remove font-size and line-height classes if inherit is true
  const finalClasses = inherit
    ? classes.filter(
        (cls) =>
          !cls.startsWith("text-") &&
          !cls.startsWith("leading-") &&
          !cls.startsWith("font-")
      )
    : classes;

  return (
    <Component
      className={cn(finalClasses, className)}
      style={{
        ...gradientStyle,
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
