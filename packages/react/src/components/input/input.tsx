"use client";

import React from "react";
import { cn } from "../../utils/cn";

/**
 * Input size variants
 */
export type InputSize = "sm" | "md" | "lg";

/**
 * Input variant styles
 */
export type InputVariant = "default" | "outline" | "filled";

/**
 * Input component props
 */
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Input size */
  size?: InputSize;
  /** Input variant */
  variant?: InputVariant;
  /** Whether input has an error state */
  error?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Label text */
  label?: string;
  /** Helper text */
  helperText?: string;
}

/**
 * Input component
 * Text input with variants, sizes, and error states
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   error={hasError}
 *   errorMessage="Invalid email"
 * />
 * ```
 */
export function Input({
  size = "md",
  variant = "default",
  error = false,
  errorMessage,
  label,
  helperText,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const sizeClasses = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-11 px-4 text-lg",
  };

  const variantClasses = {
    default:
      "border border-input bg-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    outline:
      "border-2 border-border bg-transparent focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    filled:
      "border-0 bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  };

  const errorClasses = error
    ? "border-error focus-visible:ring-error"
    : "";

  const inputClasses = cn(
    "flex w-full rounded-md transition-colors",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
    "placeholder:text-muted-foreground",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "focus-visible:outline-none",
    sizeClasses[size],
    variantClasses[variant],
    errorClasses,
    className
  );

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-foreground mb-1.5"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={inputClasses}
        aria-invalid={error}
        aria-describedby={
          error && errorMessage
            ? `${inputId}-error`
            : helperText
            ? `${inputId}-helper`
            : undefined
        }
        {...props}
      />
      {error && errorMessage && (
        <p
          id={`${inputId}-error`}
          className="mt-1.5 text-sm text-error"
          role="alert"
        >
          {errorMessage}
        </p>
      )}
      {!error && helperText && (
        <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-muted-foreground">
          {helperText}
        </p>
      )}
    </div>
  );
}
