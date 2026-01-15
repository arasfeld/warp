"use client";

import React from "react";
import { cn } from "../../utils/cn";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Orientation of the group */
  orientation?: "horizontal" | "vertical";
  /** Border width */
  borderWidth?: string | number;
  /** Children (Button components) */
  children: React.ReactNode;
}

export function ButtonGroup({
  orientation = "horizontal",
  borderWidth = 1,
  className,
  children,
  ...props
}: ButtonGroupProps) {
  const borderWidthValue =
    typeof borderWidth === "number" ? `${borderWidth}px` : borderWidth;

  return (
    <div
      className={cn(
        "inline-flex",
        orientation === "horizontal" ? "flex-row" : "flex-col",
        className
      )}
      style={
        {
          "--button-group-border-width": borderWidthValue,
        } as React.CSSProperties
      }
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;

        const isFirst = index === 0;
        const isLast = index === React.Children.count(children) - 1;
        const childProps = child.props as any;
        const existingClassName = childProps.className || "";
        const variant = childProps.variant || "filled";

        // Add border to "default" variant buttons so they connect visually
        // Other variants (outline, filled, etc.) handle their own borders
        const needsBorder = variant === "default";
        const borderClasses = needsBorder ? "border border-divider" : "";

        // Remove border radius on connected sides
        const radiusClasses =
          orientation === "horizontal"
            ? cn(!isFirst && "rounded-l-none", !isLast && "rounded-r-none")
            : cn(!isFirst && "rounded-t-none", !isLast && "rounded-b-none");

        // Remove inner borders and use negative margin to overlap for seamless connection
        const connectionClasses =
          orientation === "horizontal"
            ? cn(!isFirst && "border-l-0 -ml-px", !isLast && "border-r-0")
            : cn(!isFirst && "border-t-0 -mt-px", !isLast && "border-b-0");

        return React.cloneElement(child, {
          ...childProps,
          key: child.key || index,
          className: cn(
            existingClassName,
            "relative",
            borderClasses,
            radiusClasses,
            connectionClasses
          ),
          style: {
            ...childProps.style,
            zIndex: isLast ? 1 : index,
            position: "relative",
          },
        });
      })}
    </div>
  );
}

export interface ButtonGroupSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Variant to match button styling */
  variant?: "filled" | "light" | "outline" | "gradient" | "default";
  /** Background color */
  bg?: string;
  /** Minimum width */
  miw?: string | number;
  /** Children */
  children: React.ReactNode;
}

export function ButtonGroupSection({
  variant = "default",
  bg,
  miw,
  className,
  children,
  style,
  ...props
}: ButtonGroupSectionProps) {
  const variantClasses = {
    filled: "bg-primary text-primary-foreground",
    light: "bg-primary/10 text-primary",
    outline: "border-2 border-divider bg-transparent text-foreground",
    default: "bg-secondary text-secondary-foreground",
    gradient: "",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center px-4 py-2 border border-divider",
        variantClasses[variant],
        className
      )}
      style={{
        backgroundColor: bg,
        minWidth: typeof miw === "number" ? `${miw}px` : miw,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
