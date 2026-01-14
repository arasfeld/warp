"use client";

import React from "react";
import { cn } from "../../utils/cn";
import { Loader } from "../loader";
import { ButtonGroup, ButtonGroupSection } from "./button-group";

/**
 * Button variant
 */
export type ButtonVariant = "filled" | "light" | "outline" | "gradient" | "default";

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
 * Mantine color type (theme color key or CSS color)
 */
export type MantineColor = string;

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
 * Similar API to Mantine Button
 */
export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  /** Button text/content */
  children?: React.ReactNode;
  /** Button variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Color (theme color key or CSS color) */
  color?: MantineColor;
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

// Legacy type aliases for backward compatibility
export type ButtonVariantLegacy = "primary" | "secondary" | "outline";
export type ButtonSizeLegacy = "sm" | "md" | "lg";

/**
 * Button component
 * Mantine-like API with full feature set
 */
export function Button({
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
}: ButtonProps) {
  // Handle legacy variant names for backward compatibility
  const normalizedVariant: ButtonVariant =
    (variant as any) === "primary"
      ? "filled"
      : (variant as any) === "secondary"
        ? "default"
        : (variant as any) === "outline"
          ? "outline"
          : variant;

  // Handle legacy size names
  const normalizedSize: ButtonSize =
    size === "sm" && !size.startsWith("compact-")
      ? "sm"
      : size === "md" && !size.startsWith("compact-")
        ? "md"
        : size === "lg" && !size.startsWith("compact-")
          ? "lg"
          : size;

  const isDisabled = disabled || loading || dataDisabled;
  const isCompact = normalizedSize.startsWith("compact-");

  // Base classes
  const baseClasses =
    "inline-flex items-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap relative";

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
        return `bg-gradient-to-r text-white`;
      }
      return "bg-gradient-to-r from-primary to-primary/80 text-white";
    }

    const variantMap: Record<ButtonVariant, string> = {
      filled: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
      light: "bg-primary/10 text-primary hover:bg-primary/20 active:bg-primary/30",
      outline:
        "border-2 border-border bg-transparent text-foreground hover:bg-muted active:bg-muted/90",
      default:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70",
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

  const buttonClassName = cn(
    baseClasses,
    sizeClasses[normalizedSize],
    getRadiusClass(),
    getVariantClasses(),
    getColorClasses(),
    fullWidth && "w-full",
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

  return (
    <Component
      className={buttonClassName}
      disabled={isDisabled && Component === "button"}
      data-disabled={dataDisabled || (isDisabled && Component !== "button")}
      style={gradientStyle}
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

// Attach Group and GroupSection as static properties (like Mantine)
(Button as any).Group = ButtonGroup;
(Button as any).GroupSection = ButtonGroupSection;
