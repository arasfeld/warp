"use client";

import React, { forwardRef, useRef, useEffect, useCallback, useImperativeHandle } from "react";

import { cn } from "../../utils/cn";
import { InputWrapper } from "../input/input";
import type { InputSize, InputVariant, InputWrapperProps } from "../input/input";

/**
 * Textarea component props
 */
export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    Omit<InputWrapperProps, "children" | "id" | "size" | "error"> {
  /** Input size */
  size?: InputSize;
  /** Input variant */
  variant?: InputVariant;
  /** Border radius */
  radius?: string | number;
  /** Error state or message */
  error?: boolean | React.ReactNode;
  /** Whether to show error styles */
  withErrorStyles?: boolean;
  /** Auto-resize textarea based on content */
  autosize?: boolean;
  /** Minimum rows when autosize is enabled */
  minRows?: number;
  /** Maximum rows when autosize is enabled */
  maxRows?: number;
  /** Fixed number of rows (when not using autosize) */
  rows?: number;
  /** Resize behavior */
  resize?: "none" | "both" | "horizontal" | "vertical";
}

/**
 * Textarea component
 * Multi-line text input with optional auto-resize
 *
 * @example
 * ```tsx
 * <Textarea
 *   label="Description"
 *   placeholder="Enter description..."
 *   rows={4}
 * />
 *
 * <Textarea
 *   label="Bio"
 *   autosize
 *   minRows={2}
 *   maxRows={6}
 * />
 * ```
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      // Wrapper props
      label,
      description,
      required,
      withAsterisk,
      inputWrapperOrder,
      labelElement,
      labelProps,
      descriptionProps,
      errorProps,
      inputContainer,
      // Textarea-specific props
      size = "sm",
      variant = "default",
      radius,
      error,
      withErrorStyles = true,
      autosize = false,
      minRows = 1,
      maxRows,
      rows,
      resize = "vertical",
      // Native textarea props
      disabled,
      className,
      id,
      onChange,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Forward ref
    useImperativeHandle(ref, () => textareaRef.current!);

    // Calculate line height based on size
    const getLineHeight = () => {
      const lineHeights: Record<InputSize, number> = {
        xs: 18,
        sm: 20,
        md: 24,
        lg: 24,
        xl: 28,
      };
      return lineHeights[size];
    };

    // Auto-resize handler
    const adjustHeight = useCallback(() => {
      const textarea = textareaRef.current;
      if (!textarea || !autosize) return;

      const lineHeight = getLineHeight();
      const paddingY = size === "xs" ? 6 : size === "sm" ? 8 : size === "md" ? 10 : size === "lg" ? 12 : 14;
      const borderWidth = 2; // 1px top + 1px bottom

      // Reset height to get scrollHeight
      textarea.style.height = "auto";

      // Calculate min and max heights
      const minHeight = lineHeight * minRows + paddingY * 2 + borderWidth;
      const maxHeight = maxRows ? lineHeight * maxRows + paddingY * 2 + borderWidth : Infinity;

      // Set new height
      const scrollHeight = textarea.scrollHeight;
      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
      textarea.style.height = `${newHeight}px`;

      // Add overflow if content exceeds maxHeight
      textarea.style.overflowY = scrollHeight > maxHeight ? "auto" : "hidden";
    }, [autosize, minRows, maxRows, size]);

    // Adjust height on mount and value change
    useEffect(() => {
      adjustHeight();
    }, [adjustHeight, value, defaultValue]);

    // Handle change with autosize
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e);
        if (autosize) {
          adjustHeight();
        }
      },
      [onChange, autosize, adjustHeight]
    );

    const hasWrapper = label || description || error;

    // Size classes
    const sizeClasses: Record<InputSize, string> = {
      xs: "text-xs py-1.5 px-2",
      sm: "text-sm py-2 px-3",
      md: "text-base py-2.5 px-4",
      lg: "text-base py-3 px-4",
      xl: "text-lg py-3.5 px-5",
    };

    // Radius classes
    const getRadiusClass = () => {
      if (radius === undefined) return "rounded-md";
      if (typeof radius === "number") return "";
      const radiusMap: Record<string, string> = {
        xs: "rounded-sm",
        sm: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
      };
      return radiusMap[radius] || "rounded-md";
    };

    // Variant classes
    const getVariantClasses = () => {
      if (variant === "unstyled") {
        return "border-0 bg-transparent p-0";
      }

      const variantMap: Record<InputVariant, string> = {
        default:
          "border border-divider bg-background-default focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        filled:
          "border-0 bg-background-paper focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        unstyled: "",
      };

      return variantMap[variant];
    };

    // Error classes
    const errorClasses =
      error && withErrorStyles
        ? "border-error focus-visible:ring-error focus-visible:border-error"
        : "";

    // Resize classes
    const resizeClasses: Record<string, string> = {
      none: "resize-none",
      both: "resize",
      horizontal: "resize-x",
      vertical: "resize-y",
    };

    const textareaClasses = cn(
      "w-full transition-colors",
      "placeholder:text-muted-foreground",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "focus-visible:outline-none",
      sizeClasses[size],
      getRadiusClass(),
      getVariantClasses(),
      errorClasses,
      autosize ? "resize-none overflow-hidden" : resizeClasses[resize],
      className
    );

    const radiusStyle: React.CSSProperties =
      typeof radius === "number" ? { borderRadius: `${radius}px` } : {};

    // Calculate min-height for non-autosize
    const minHeightStyle: React.CSSProperties = autosize
      ? {}
      : rows
        ? {}
        : { minHeight: `${getLineHeight() * minRows + 16}px` };

    const textareaElement = (
      <textarea
        ref={textareaRef}
        id={id}
        disabled={disabled}
        required={required}
        rows={autosize ? minRows : rows}
        className={textareaClasses}
        style={{ ...radiusStyle, ...minHeightStyle }}
        onChange={handleChange}
        value={value}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={error && typeof error === "string" ? `${id}-error` : undefined}
        {...props}
      />
    );

    if (!hasWrapper) {
      return textareaElement;
    }

    return (
      <InputWrapper
        id={id}
        label={label}
        description={description}
        error={typeof error === "boolean" ? undefined : error}
        required={required}
        withAsterisk={withAsterisk}
        size={size}
        inputWrapperOrder={inputWrapperOrder}
        labelElement={labelElement}
        labelProps={labelProps}
        descriptionProps={descriptionProps}
        errorProps={errorProps}
        inputContainer={inputContainer}
      >
        {textareaElement}
      </InputWrapper>
    );
  }
);

Textarea.displayName = "Textarea";
