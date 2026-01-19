"use client";

import React, { forwardRef } from "react";

import { cn } from "../../utils/cn";

/**
 * Badge size options
 */
export type BadgeSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Badge variant options
 */
export type BadgeVariant = "filled" | "outline" | "light" | "dot";

/**
 * Badge component props
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Badge content (number, text, or element) */
  label?: React.ReactNode;
  /** Visual style variant */
  variant?: BadgeVariant;
  /** Badge size */
  size?: BadgeSize;
  /** Color theme */
  color?: string;
  /** Border radius */
  radius?: string | number;
  /** Whether the badge should be a circle (for single characters or numbers) */
  circle?: boolean;
  /** Left section element */
  leftSection?: React.ReactNode;
  /** Right section element */
  rightSection?: React.ReactNode;
  /** If false, the badge will not be visible when label is 0 or empty */
  showZero?: boolean;
  /** Maximum value to display (shows "max+" if exceeded) */
  max?: number;
  /** Processing/loading state with animation */
  processing?: boolean;
  /** Whether to render badge with full width */
  fullWidth?: boolean;
  /** Additional className */
  className?: string;
  /** Children to render (inline content) */
  children?: React.ReactNode;
}

/**
 * Badge component
 * Display badges, pills, and tags
 *
 * @example
 * ```tsx
 * <Badge>Default</Badge>
 * <Badge color="red" variant="filled">Error</Badge>
 * <Badge variant="dot" color="green">Online</Badge>
 * ```
 */
export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      label,
      variant = "filled",
      size = "sm",
      color = "primary",
      radius = "full",
      circle = false,
      leftSection,
      rightSection,
      showZero = true,
      max,
      processing = false,
      fullWidth = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Use children as label if label is not provided
    const content = label ?? children;

    // Handle numeric content with max
    let displayContent = content;
    if (typeof content === "number" && max !== undefined && content > max) {
      displayContent = `${max}+`;
    }

    // Hide badge if content is 0 and showZero is false
    if (!showZero && (content === 0 || content === "0")) {
      return null;
    }

    // Size classes
    const sizeClasses: Record<BadgeSize, { badge: string; text: string; dot: string }> = {
      xs: {
        badge: circle ? "h-4 w-4" : "h-4 px-1.5",
        text: "text-[10px]",
        dot: "h-1.5 w-1.5",
      },
      sm: {
        badge: circle ? "h-5 w-5" : "h-5 px-2",
        text: "text-xs",
        dot: "h-2 w-2",
      },
      md: {
        badge: circle ? "h-6 w-6" : "h-6 px-2.5",
        text: "text-xs",
        dot: "h-2.5 w-2.5",
      },
      lg: {
        badge: circle ? "h-7 w-7" : "h-7 px-3",
        text: "text-sm",
        dot: "h-3 w-3",
      },
      xl: {
        badge: circle ? "h-8 w-8" : "h-8 px-3.5",
        text: "text-sm",
        dot: "h-3.5 w-3.5",
      },
    };

    const sizeConfig = sizeClasses[size];

    // Radius classes
    const getRadiusClass = () => {
      if (typeof radius === "number") {
        return "";
      }
      const radiusMap: Record<string, string> = {
        xs: "rounded-sm",
        sm: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      };
      return radiusMap[radius] || "rounded-full";
    };

    const radiusClass = getRadiusClass();
    const radiusStyle: React.CSSProperties =
      typeof radius === "number" ? { borderRadius: `${radius}px` } : {};

    // Color classes for different variants
    const getVariantClasses = () => {
      const colorMap: Record<string, {
        filled: string;
        outline: string;
        light: string;
        dot: string;
      }> = {
        primary: {
          filled: "bg-primary text-primary-foreground",
          outline: "bg-transparent text-primary border border-primary",
          light: "bg-primary/10 text-primary",
          dot: "bg-primary",
        },
        secondary: {
          filled: "bg-secondary text-secondary-foreground",
          outline: "bg-transparent text-secondary-foreground border border-secondary",
          light: "bg-secondary/50 text-secondary-foreground",
          dot: "bg-secondary-foreground",
        },
        success: {
          filled: "bg-success text-white",
          outline: "bg-transparent text-success border border-success",
          light: "bg-success/10 text-success",
          dot: "bg-success",
        },
        warning: {
          filled: "bg-warning text-white",
          outline: "bg-transparent text-warning border border-warning",
          light: "bg-warning/10 text-warning",
          dot: "bg-warning",
        },
        error: {
          filled: "bg-error text-white",
          outline: "bg-transparent text-error border border-error",
          light: "bg-error/10 text-error",
          dot: "bg-error",
        },
        info: {
          filled: "bg-info text-white",
          outline: "bg-transparent text-info border border-info",
          light: "bg-info/10 text-info",
          dot: "bg-info",
        },
        gray: {
          filled: "bg-gray-500 text-white",
          outline: "bg-transparent text-gray-500 border border-gray-500",
          light: "bg-gray-500/10 text-gray-500",
          dot: "bg-gray-500",
        },
        red: {
          filled: "bg-red-500 text-white",
          outline: "bg-transparent text-red-500 border border-red-500",
          light: "bg-red-500/10 text-red-500",
          dot: "bg-red-500",
        },
        blue: {
          filled: "bg-blue-500 text-white",
          outline: "bg-transparent text-blue-500 border border-blue-500",
          light: "bg-blue-500/10 text-blue-500",
          dot: "bg-blue-500",
        },
        green: {
          filled: "bg-green-500 text-white",
          outline: "bg-transparent text-green-500 border border-green-500",
          light: "bg-green-500/10 text-green-500",
          dot: "bg-green-500",
        },
        yellow: {
          filled: "bg-yellow-500 text-white",
          outline: "bg-transparent text-yellow-500 border border-yellow-500",
          light: "bg-yellow-500/10 text-yellow-500",
          dot: "bg-yellow-500",
        },
        orange: {
          filled: "bg-orange-500 text-white",
          outline: "bg-transparent text-orange-500 border border-orange-500",
          light: "bg-orange-500/10 text-orange-500",
          dot: "bg-orange-500",
        },
        purple: {
          filled: "bg-purple-500 text-white",
          outline: "bg-transparent text-purple-500 border border-purple-500",
          light: "bg-purple-500/10 text-purple-500",
          dot: "bg-purple-500",
        },
        pink: {
          filled: "bg-pink-500 text-white",
          outline: "bg-transparent text-pink-500 border border-pink-500",
          light: "bg-pink-500/10 text-pink-500",
          dot: "bg-pink-500",
        },
      };

      const colorConfig = colorMap[color] ?? colorMap.primary!;
      return colorConfig[variant] ?? colorConfig.filled;
    };

    // Dot variant renders differently
    if (variant === "dot") {
      return (
        <div
          ref={ref}
          className={cn(
            "inline-flex items-center gap-1.5",
            sizeConfig.text,
            "font-medium",
            fullWidth && "w-full justify-center",
            className
          )}
          {...props}
        >
          <span
            className={cn(
              "rounded-full flex-shrink-0",
              sizeConfig.dot,
              getVariantClasses(),
              processing && "animate-pulse"
            )}
          />
          {displayContent && <span>{displayContent}</span>}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-1 font-medium",
          sizeConfig.badge,
          sizeConfig.text,
          radiusClass,
          getVariantClasses(),
          fullWidth && "w-full",
          processing && "animate-pulse",
          className
        )}
        style={radiusStyle}
        {...props}
      >
        {leftSection && (
          <span className="flex-shrink-0 -ml-0.5">{leftSection}</span>
        )}
        {displayContent}
        {rightSection && (
          <span className="flex-shrink-0 -mr-0.5">{rightSection}</span>
        )}
      </div>
    );
  }
);

Badge.displayName = "Badge";
