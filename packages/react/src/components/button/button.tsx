"use client";

import React, { forwardRef } from "react";

import { cn } from "../../utils/cn";
import { Loader } from "../loader";
import { ButtonGroup, ButtonGroupSection } from "./button-group";

/**
 * Button variant
 */
export type ButtonVariant =
  | "filled"
  | "light"
  | "outline"
  | "gradient"
  | "default";

/**
 * Button size (including compact variants)
 */
export type ButtonSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "compact-xs"
  | "compact-sm"
  | "compact-md"
  | "compact-lg"
  | "compact-xl";

/**
 * Theme color type (theme color key or CSS color)
 */
export type ThemeColor = string;

/**
 * Gradient configuration
 */
export interface GradientConfig {
  from: string;
  to: string;
  deg?: number;
}

/**
 * Loader props for Button
 */
export interface LoaderProps {
  type?: "spinner" | "dots" | "bars";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
}

/**
 * Button props
 * Comprehensive button component
 * Supports polymorphic components (button, anchor, div, etc.)
 */
export interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "color"
> {
  /** Button text/content */
  children?: React.ReactNode;
  /** Button variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Color (theme color key or CSS color) */
  color?: string;
  /** Border radius (theme key or CSS value) */
  radius?: string | number;
  /** Whether button takes full width */
  fullWidth?: boolean;
  /** Content displayed on the left side */
  leftSection?: React.ReactNode;
  /** Content displayed on the right side */
  rightSection?: React.ReactNode;
  /** Justify content alignment */
  justify?: "flex-start" | "center" | "flex-end" | "space-between";
  /** Whether button is disabled */
  disabled?: boolean;
  /** Data-disabled attribute (for links that should look disabled) */
  "data-disabled"?: boolean;
  /** Whether button is in loading state */
  loading?: boolean;
  /** Loader props */
  loaderProps?: LoaderProps;
  /** Gradient configuration (only used when variant="gradient") */
  gradient?: GradientConfig;
  /** Auto contrast (adjusts text color based on background) */
  autoContrast?: boolean;
  /** Component to render as (polymorphic) */
  component?: React.ElementType;
  /** Additional className */
  className?: string;
}

/**
 * Button component
 * Comprehensive button component with full feature set
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "filled",
      size = "sm",
      color,
      radius,
      fullWidth = false,
      leftSection,
      rightSection,
      justify = "center",
      disabled = false,
      "data-disabled": dataDisabled,
      loading = false,
      loaderProps,
      gradient,
      autoContrast = false,
      component,
      className,
      ...props
    },
    ref
  ) => {
  const normalizedVariant: ButtonVariant = variant;
  const normalizedSize: ButtonSize = size;

  const isDisabled = disabled || loading || dataDisabled;
  const isCompact = normalizedSize.startsWith("compact-");

  // Base classes
  const baseClasses =
    "inline-flex items-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed whitespace-nowrap relative active:translate-y-[1px] disabled:active:translate-y-0";

  // Size classes
  const sizeClasses = {
    xs: "h-7 px-2 text-xs",
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-11 px-5 text-base",
    xl: "h-12 px-6 text-lg",
    "compact-xs": "h-6 px-1.5 text-xs",
    "compact-sm": "h-7 px-2 text-sm",
    "compact-md": "h-8 px-2.5 text-sm",
    "compact-lg": "h-9 px-3 text-base",
    "compact-xl": "h-10 px-3.5 text-base",
  };

  // Radius classes
  const getRadiusClass = () => {
    if (radius === undefined) return "rounded-md";
    if (typeof radius === "number") {
      return `rounded-[${radius}px]`;
    }
    const radiusMap: Record<string, string> = {
      xs: "rounded-sm",
      sm: "rounded",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    };
    return radiusMap[radius] || `rounded-[${radius}]`;
  };

  // Variant classes
  const getVariantClasses = () => {
    if (normalizedVariant === "gradient") {
      if (gradient) {
        const deg = gradient.deg || 90;
        return `bg-gradient-to-r text-white hover:opacity-90 active:opacity-80`;
      }
      return "bg-gradient-to-r from-primary to-primary/80 text-white hover:opacity-90 active:opacity-80";
    }

    const variantMap: Record<ButtonVariant, string> = {
      filled:
        "bg-primary text-white hover:bg-primary/90 active:bg-primary/80",
      light:
        "bg-primary/20 text-primary hover:bg-primary/30 active:bg-primary/40",
      outline:
        "border-2 border-primary bg-transparent text-primary hover:bg-primary/10 active:bg-primary/20",
      default:
        "bg-grey-200 dark:bg-grey-800 text-text-primary hover:bg-grey-300 dark:hover:bg-grey-700 active:bg-grey-400 dark:active:bg-grey-600",
      gradient: "", // Handled above
    };

    return variantMap[normalizedVariant] || variantMap.filled;
  };

  // Color classes (if color prop is provided, override default colors)
  const getColorClasses = () => {
    if (!color) return "";
    // For now, we'll use inline styles for custom colors
    // In a full implementation, you'd map theme colors
    return "";
  };

  // Disabled state - uses palette.action.disabledOpacity (default 0.38)
  // Use CSS variable if available, fallback to 0.38
  // Simply apply opacity and prevent interactions, keep all original styling
  const disabledOpacity = "var(--action-disabled-opacity, var(--palette-action-disabled-opacity, 0.38))";
  const disabledClasses = isDisabled
    ? "cursor-not-allowed pointer-events-none"
    : "";

  const buttonClassName = cn(
    baseClasses,
    sizeClasses[normalizedSize],
    getRadiusClass(),
    !isDisabled && getVariantClasses(),
    isDisabled && disabledClasses,
    getColorClasses(),
    fullWidth && "w-full justify-center",
    className
  );

  // Gradient style
  const gradientStyle =
    normalizedVariant === "gradient" && gradient
      ? {
          backgroundImage: `linear-gradient(${gradient.deg || 90}deg, ${gradient.from}, ${gradient.to})`,
        }
      : undefined;

  // Section spacing
  const hasLeftSection = !!leftSection;
  const hasRightSection = !!rightSection;
  const sectionSpacing = hasLeftSection || hasRightSection ? "gap-2" : "";

  const Component = component || "button";

  // Apply disabled opacity via inline style if disabled
  const buttonStyle: React.CSSProperties = {
    ...(gradientStyle || {}),
    ...(isDisabled ? { opacity: disabledOpacity } : {}),
    ...props.style,
  };

  return (
    <Component
      ref={ref}
      className={buttonClassName}
      disabled={isDisabled && Component === "button"}
      data-disabled={dataDisabled || (isDisabled && Component !== "button")}
      style={buttonStyle}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader
            size={loaderProps?.size || "sm"}
            type={loaderProps?.type || "spinner"}
            color="currentColor"
          />
        </div>
      )}
      <div
        className={cn(
          "flex items-center",
          sectionSpacing,
          loading && "opacity-0",
          justify === "flex-start" && "justify-start",
          justify === "center" && "justify-center",
          justify === "flex-end" && "justify-end",
          justify === "space-between" && "justify-between"
        )}
      >
        {leftSection && (
          <span className="flex items-center" data-position="left">
            {leftSection}
          </span>
        )}
        {children && <span>{children}</span>}
        {rightSection && (
          <span className="flex items-center" data-position="right">
            {rightSection}
          </span>
        )}
      </div>
    </Component>
  );
  }
);

Button.displayName = "Button";

// Attach Group and GroupSection as static properties
(Button as any).Group = ButtonGroup;
(Button as any).GroupSection = ButtonGroupSection;
