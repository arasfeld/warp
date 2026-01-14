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

        const existingClassName =
          (child.props as { className?: string }).className || "";

        return React.cloneElement(child, {
          ...(child.props as any),
          className: cn(
            existingClassName,
            orientation === "horizontal"
              ? cn(
                  !isFirst && "rounded-l-none border-l-0",
                  !isLast && "rounded-r-none border-r-0"
                )
              : cn(
                  !isFirst && "rounded-t-none border-t-0",
                  !isLast && "rounded-b-none border-b-0"
                )
          ),
        } as any);
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
    outline: "border-2 border-border bg-transparent text-foreground",
    default: "bg-secondary text-secondary-foreground",
    gradient: "",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center px-4 py-2 border border-border",
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
