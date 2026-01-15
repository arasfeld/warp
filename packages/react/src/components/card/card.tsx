"use client";

import React from "react";
import { cn } from "../../utils/cn";

/**
 * Spacing type (theme key or CSS value)
 */
export type Spacing = string | number;

/**
 * Radius type (theme key or CSS value)
 */
export type Radius = string | number;

/**
 * Shadow type (theme key or CSS value)
 */
export type Shadow = string;

/**
 * Card component props
 * Comprehensive card component
 * Supports polymorphic components (div, anchor, etc.)
 */
export interface CardProps extends Omit<
  React.HTMLAttributes<HTMLDivElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "padding"
> {
  /** Card content */
  children?: React.ReactNode;
  /** Padding (theme spacing key or CSS value) */
  padding?: Spacing;
  /** Border radius (theme key or CSS value) */
  radius?: Radius;
  /** Box shadow (theme key or CSS value) */
  shadow?: Shadow;
  /** Whether card has border */
  withBorder?: boolean;
  /** Component to render as (polymorphic) */
  component?: React.ElementType;
  /** Additional className */
  className?: string;
}

/**
 * Card Section props
 */
export interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card section content */
  children?: React.ReactNode;
  /** Whether section inherits padding from parent Card */
  inheritPadding?: boolean;
  /** Whether section has border */
  withBorder?: boolean;
  /** Component to render as (polymorphic) */
  component?: React.ElementType;
  /** Additional className */
  className?: string;
}

/**
 * Card component
 * Comprehensive card component with padding, radius, shadow, and withBorder props
 */
export function Card({
  children,
  padding = "md",
  radius,
  shadow,
  withBorder = false,
  component,
  className,
  ...props
}: CardProps) {
  const actualPadding = padding;

  // Convert padding to Tailwind class or inline style
  const getPaddingClass = () => {
    if (typeof actualPadding === "number") {
      return "";
    }
    const paddingMap: Record<string, string> = {
      xs: "p-2",
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
      xl: "p-8",
    };
    return paddingMap[actualPadding] || "";
  };

  const getPaddingStyle = (): React.CSSProperties | undefined => {
    if (typeof actualPadding === "number") {
      return { padding: `${actualPadding}px` };
    }
    return undefined;
  };

  // Convert radius to Tailwind class or inline style
  const getRadiusClass = () => {
    if (radius === undefined) return "rounded-lg";
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
    return radiusMap[radius] || "";
  };

  const getRadiusStyle = (): React.CSSProperties | undefined => {
    if (typeof radius === "number") {
      return { borderRadius: `${radius}px` };
    }
    return undefined;
  };

  // Convert shadow to Tailwind class or inline style
  const getShadowClass = () => {
    if (!shadow) return "shadow-sm";
    const shadowMap: Record<string, string> = {
      xs: "shadow-xs",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
    };
    return shadowMap[shadow] || "";
  };

  const getShadowStyle = (): React.CSSProperties | undefined => {
    if (shadow && !getShadowClass()) {
      return { boxShadow: shadow };
    }
    return undefined;
  };

  const baseClasses = cn(
    "relative overflow-hidden flex flex-col",
    "bg-background-paper text-foreground",
    getPaddingClass(),
    getRadiusClass(),
    getShadowClass(),
    withBorder && "border border-divider",
    className
  );

  const style: React.CSSProperties = {
    ...getPaddingStyle(),
    ...getRadiusStyle(),
    ...getShadowStyle(),
    ...props.style,
  };

  const Component = component || "div";

  // Calculate padding value for Card.Section negative margins
  const getPaddingValue = (): number => {
    if (typeof actualPadding === "number") return actualPadding;
    const paddingMap: Record<string, number> = {
      xs: 8,
      sm: 12,
      md: 16,
      lg: 24,
      xl: 32,
    };
    return paddingMap[actualPadding] || 16;
  };

  const paddingValue = getPaddingValue();

  // Process children to detect Card.Section components and apply negative margins
  const processedChildren = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;

    // Check if this is a CardSection (check displayName)
    const isCardSection = (child.type as any)?.displayName === "CardSection";

    if (isCardSection) {
      const isFirst = index === 0;
      const isLast = index === React.Children.count(children) - 1;
      const negativeMargin = `-${paddingValue}px`;

      const sectionStyle: React.CSSProperties = {
        marginLeft: negativeMargin,
        marginRight: negativeMargin,
        ...(isFirst && { marginTop: negativeMargin }),
        ...(isLast && { marginBottom: negativeMargin }),
        ...(child.props as any).style,
      };

      return React.cloneElement(child, {
        ...(child.props as any),
        style: sectionStyle,
        "data-section-position": isFirst ? "first" : isLast ? "last" : "middle",
        "data-padding-value": paddingValue,
      } as any);
    }

    return child;
  });

  return (
    <Component className={baseClasses} style={style} {...props}>
      {processedChildren}
    </Component>
  );
}

/**
 * Card Section component
 * Removes Card padding from its children using negative margins
 */
export function CardSection({
  children,
  inheritPadding = false,
  withBorder = false,
  component,
  className,
  style,
  ...props
}: CardSectionProps) {
  const Component = component || "div";

  // Get padding value from data attribute set by Card
  const paddingValue = (props as any)["data-padding-value"] || 16;
  const sectionPosition = (props as any)["data-section-position"];

  // Apply borders based on position
  const getBorderClasses = () => {
    if (!withBorder) return "";
    // First section has no top border, last has no bottom border
    // Adjacent sections don't double up borders
    if (sectionPosition === "first") return "border-b border-divider";
    if (sectionPosition === "last") return "border-t border-divider";
    return "border-t border-b border-divider";
  };

  // Apply inherited padding
  const getInheritPaddingStyle = (): React.CSSProperties | undefined => {
    if (!inheritPadding) return undefined;
    return {
      paddingLeft: `${paddingValue}px`,
      paddingRight: `${paddingValue}px`,
    };
  };

  return (
    <Component
      className={cn(getBorderClasses(), className)}
      style={{
        ...getInheritPaddingStyle(),
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

// Mark CardSection for identification
(CardSection as any).displayName = "CardSection";
