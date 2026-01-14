"use client";

import React from "react";
import { cn } from "../../utils/cn";

/**
 * Button variant
 */
export type ButtonVariant = "primary" | "secondary" | "outline";

/**
 * Button size
 */
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Button props
 * Matches React Native Button API for consistency
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button text/content */
  children?: React.ReactNode;
  /** Button variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Whether button is disabled */
  disabled?: boolean;
  /** Whether button is in loading state */
  loading?: boolean;
}

/**
 * Button component
 * Uses CSS variables via Tailwind classes (shadcn/ui approach)
 * Same API as React Native Button for consistency
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={() => console.log('clicked')}>
 *   Click me
 * </Button>
 * ```
 */
export function Button({
  children,
  disabled = false,
  loading = false,
  size = "md",
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  // Base classes - layout and structure
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap";

  // Variant classes using CSS variables (defined in tailwind.config.js)
  const variantClasses = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70",
    outline:
      "border-2 border-border bg-transparent text-foreground hover:bg-muted active:bg-muted/90",
  };

  // Size classes
  const sizeClasses = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-11 px-6 text-base",
  };

  const buttonClassName = cn(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  return (
    <button
      className={buttonClassName}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="mr-2 h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
