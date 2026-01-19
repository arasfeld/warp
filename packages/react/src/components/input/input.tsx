"use client";

import React, { forwardRef } from "react";

import { cn } from "../../utils/cn";

/**
 * Input size variants
 */
export type InputSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Input variant styles
 */
export type InputVariant = "default" | "filled" | "unstyled";

/**
 * Base Input component props
 */
export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  /** Input size */
  size?: InputSize;
  /** Input variant */
  variant?: InputVariant;
  /** Border radius (theme key or CSS value) */
  radius?: string | number;
  /** Whether input is disabled */
  disabled?: boolean;
  /** Error state (adds error styles and aria-invalid) */
  error?: boolean | React.ReactNode;
  /** Whether to show error styles on the input */
  withErrorStyles?: boolean;
  /** Content displayed on the left side */
  leftSection?: React.ReactNode;
  /** Content displayed on the right side */
  rightSection?: React.ReactNode;
  /** Left section width */
  leftSectionWidth?: React.CSSProperties["width"];
  /** Right section width */
  rightSectionWidth?: React.CSSProperties["width"];
  /** Left section pointer events */
  leftSectionPointerEvents?: React.CSSProperties["pointerEvents"];
  /** Right section pointer events */
  rightSectionPointerEvents?: React.CSSProperties["pointerEvents"];
  /** Props passed to left section */
  leftSectionProps?: React.ComponentPropsWithoutRef<"div">;
  /** Props passed to right section */
  rightSectionProps?: React.ComponentPropsWithoutRef<"div">;
  /** Whether input has cursor: pointer */
  pointer?: boolean;
  /** Whether input is multiline (for textarea) */
  multiline?: boolean;
  /** Whether to add aria attributes */
  withAria?: boolean;
  /** Component to render as (polymorphic) */
  component?: React.ElementType;
  /** Wrapper props */
  wrapperProps?: React.ComponentPropsWithoutRef<"div">;
  /** Input size attribute */
  inputSize?: string;
  /** Whether input is required */
  required?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Base Input component
 * Comprehensive input component with polymorphic support and sections
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "sm",
      variant = "default",
      radius,
      disabled = false,
      error = false,
      withErrorStyles = true,
      leftSection,
      rightSection,
      leftSectionWidth,
      rightSectionWidth,
      leftSectionPointerEvents = "none",
      rightSectionPointerEvents = "none",
      leftSectionProps,
      rightSectionProps,
      pointer = false,
      multiline = false,
      withAria = true,
      component,
      wrapperProps,
      inputSize,
      required = false,
      className,
      id,
      ...props
    },
    ref
  ) => {
  const normalizedSize: InputSize = size;
  const normalizedVariant: InputVariant = variant;

  // Size classes
  const sizeClasses = {
    xs: "h-7 text-xs",
    sm: "h-9 text-sm",
    md: "h-10 text-base",
    lg: "h-11 text-base",
    xl: "h-12 text-lg",
  };

  // Section width calculation
  const getSectionWidth = (width?: React.CSSProperties["width"]) => {
    if (width) return width;
    // Default section width matches input height
    const heightMap: Record<InputSize, string> = {
      xs: "28px",
      sm: "36px",
      md: "40px",
      lg: "44px",
      xl: "48px",
    };
    return heightMap[normalizedSize];
  };

  const leftSectionWidthValue = getSectionWidth(leftSectionWidth);
  const rightSectionWidthValue = getSectionWidth(rightSectionWidth);

  // Padding classes based on size and sections
  const getPaddingClasses = () => {
    const basePadding = {
      xs: "px-2",
      sm: "px-3",
      md: "px-4",
      lg: "px-4",
      xl: "px-5",
    };

    if (!leftSection && !rightSection) {
      return basePadding[normalizedSize];
    }

    // When sections are present, we use inline styles for padding
    // Return empty string to avoid class conflicts
    return "";
  };

  // Get padding styles for inline style when sections are present
  const getPaddingStyles = (): React.CSSProperties => {
    if (!leftSection && !rightSection) {
      return {};
    }

    const basePaddingMap: Record<InputSize, { left: string; right: string }> = {
      xs: { left: "8px", right: "8px" },
      sm: { left: "12px", right: "12px" },
      md: { left: "16px", right: "16px" },
      lg: { left: "16px", right: "16px" },
      xl: { left: "20px", right: "20px" },
    };

    const basePadding = basePaddingMap[normalizedSize];
    const styles: React.CSSProperties = {};

    if (leftSection) {
      styles.paddingLeft = leftSectionWidthValue;
    } else {
      styles.paddingLeft = basePadding.left;
    }

    if (rightSection) {
      styles.paddingRight = rightSectionWidthValue;
    } else {
      styles.paddingRight = basePadding.right;
    }

    return styles;
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
    if (normalizedVariant === "unstyled") {
      return "border-0 bg-transparent p-0";
    }

    const variantMap: Record<InputVariant, string> = {
      default:
        "border border-divider bg-background-default focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      filled:
        "border-0 bg-background-paper focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      unstyled: "", // Handled above
    };

    return variantMap[normalizedVariant] || variantMap.default;
  };

  // Error classes
  const errorClasses =
    error && withErrorStyles
      ? "border-error focus-visible:ring-error focus-visible:border-error"
      : "";

  const inputClasses = cn(
    "flex w-full transition-colors",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
    "placeholder:text-muted-foreground",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "focus-visible:outline-none",
    sizeClasses[normalizedSize],
    getPaddingClasses(),
    getRadiusClass(),
    getVariantClasses(),
    errorClasses,
    pointer && "cursor-pointer"
  );

  const hasError = !!error;
  const errorMessage = typeof error === "string" ? error : undefined;

  const Component = component || "input";

  const inputElement = (
    <div
      className={cn("relative", className, wrapperProps?.className)}
      {...wrapperProps}
    >
      {leftSection && (
        <div
          className="absolute left-0 top-0 bottom-0 flex items-center justify-center z-10"
          style={{
            width: leftSectionWidthValue,
            paddingLeft:
              normalizedSize === "xs"
                ? "8px"
                : normalizedSize === "sm"
                  ? "12px"
                  : "16px",
            pointerEvents: leftSectionPointerEvents,
          }}
          {...leftSectionProps}
        >
          {leftSection}
        </div>
      )}
      {rightSection && (
        <div
          className="absolute right-0 top-0 bottom-0 flex items-center justify-center z-10"
          style={{
            width: rightSectionWidthValue,
            paddingRight:
              normalizedSize === "xs"
                ? "8px"
                : normalizedSize === "sm"
                  ? "12px"
                  : "16px",
            pointerEvents: rightSectionPointerEvents,
          }}
          {...rightSectionProps}
        >
          {rightSection}
        </div>
      )}
      <Component
        ref={ref}
        id={id}
        className={inputClasses}
        style={{
          ...getPaddingStyles(),
          ...props.style,
        }}
        disabled={disabled}
        required={required}
        size={inputSize}
        aria-invalid={withAria && hasError ? true : undefined}
        aria-describedby={
          withAria && errorMessage ? `${id || "input"}-error` : undefined
        }
        {...props}
      />
    </div>
  );

  return inputElement;
  }
);

Input.displayName = "Input";

/**
 * Input.Wrapper component props
 */
export interface InputWrapperProps {
  /** Label content */
  label?: React.ReactNode;
  /** Description content */
  description?: React.ReactNode;
  /** Error content */
  error?: React.ReactNode;
  /** Input element id */
  id?: string;
  /** Whether input is required */
  required?: boolean;
  /** Whether to show asterisk without required attribute */
  withAsterisk?: boolean;
  /** Size for label, description, error */
  size?: InputSize;
  /** Order of elements */
  inputWrapperOrder?: ("label" | "description" | "input" | "error")[];
  /** Label element type */
  labelElement?: "div" | "label";
  /** Props for label */
  labelProps?: React.ComponentPropsWithoutRef<"label">;
  /** Props for description */
  descriptionProps?: React.ComponentPropsWithoutRef<"div">;
  /** Props for error */
  errorProps?: React.ComponentPropsWithoutRef<"div">;
  /** Input container render function */
  inputContainer?: (children: React.ReactNode) => React.ReactNode;
  /** Children (should be Input component) */
  children: React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Input.Wrapper component
 * Wraps Input with label, description, and error
 */
function InputWrapper({
  label,
  description,
  error,
  id,
  required = false,
  withAsterisk = false,
  size = "sm",
  inputWrapperOrder = ["label", "description", "input", "error"],
  labelElement = "label",
  labelProps,
  descriptionProps,
  errorProps,
  inputContainer = (children) => children,
  children,
  className,
}: InputWrapperProps) {
  const showAsterisk = required || withAsterisk;

  const elements: Record<string, React.ReactNode> = {};

  if (label) {
    const labelClassName = cn(
      "block text-sm font-medium text-foreground mb-1.5",
      labelProps?.className
    );

    if (labelElement === "label") {
      elements.label = (
        <label
          htmlFor={id}
          className={labelClassName}
          {...(labelProps as React.LabelHTMLAttributes<HTMLLabelElement>)}
        >
          {label}
          {showAsterisk && (
            <span className="text-error ml-1" aria-label="required">
              *
            </span>
          )}
        </label>
      );
    } else {
      elements.label = (
        <div
          className={labelClassName}
          {...(labelProps as React.HTMLAttributes<HTMLDivElement>)}
        >
          {label}
          {showAsterisk && (
            <span className="text-error ml-1" aria-label="required">
              *
            </span>
          )}
        </div>
      );
    }
  }

  if (description) {
    elements.description = (
      <div
        className={cn(
          "text-sm text-muted-foreground mb-1.5",
          descriptionProps?.className
        )}
        {...descriptionProps}
      >
        {description}
      </div>
    );
  }

  elements.input = inputContainer(children);

  if (error) {
    const errorMessage = typeof error === "string" ? error : error;
    elements.error = (
      <div
        id={id ? `${id}-error` : undefined}
        className={cn("text-sm text-error mt-1.5", errorProps?.className)}
        role="alert"
        {...errorProps}
      >
        {errorMessage}
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      {inputWrapperOrder.map((key) => {
        const element = elements[key];
        return element ? (
          <React.Fragment key={key}>{element}</React.Fragment>
        ) : null;
      })}
    </div>
  );
}

/**
 * Input.Label component
 */
function InputLabel({
  children,
  required = false,
  size = "sm",
  labelElement = "label",
  className,
  ...props
}: {
  children: React.ReactNode;
  required?: boolean;
  size?: InputSize;
  labelElement?: "div" | "label";
  className?: string;
} & React.ComponentPropsWithoutRef<"label">) {
  const labelClassName = cn("block text-sm font-medium text-foreground", className);

  if (labelElement === "label") {
    return (
      <label
        className={labelClassName}
        {...(props as React.LabelHTMLAttributes<HTMLLabelElement>)}
      >
        {children}
        {required && (
          <span className="text-error ml-1" aria-label="required">
            *
          </span>
        )}
      </label>
    );
  }

  return (
    <div
      className={labelClassName}
      {...(props as React.HTMLAttributes<HTMLDivElement>)}
    >
      {children}
      {required && (
        <span className="text-error ml-1" aria-label="required">
          *
        </span>
      )}
    </div>
  );
}

/**
 * Input.Description component
 */
function InputDescription({
  children,
  size = "sm",
  className,
  ...props
}: {
  children: React.ReactNode;
  size?: InputSize;
  className?: string;
} & React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </div>
  );
}

/**
 * Input.Error component
 */
function InputError({
  children,
  size = "sm",
  className,
  ...props
}: {
  children: React.ReactNode;
  size?: InputSize;
  className?: string;
} & React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("text-sm text-error", className)}
      role="alert"
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Input.Placeholder component
 */
function InputPlaceholder({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("text-muted-foreground pointer-events-none", className)}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Input.ClearButton component
 */
function InputClearButton({
  onClick,
  size,
  className,
  ...props
}: {
  onClick?: () => void;
  size?: InputSize;
  className?: string;
} & React.ComponentPropsWithoutRef<"button">) {
  const sizeClasses = {
    xs: "w-4 h-4",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-5 h-5",
    xl: "w-6 h-6",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-center rounded-full hover:bg-action-hover transition-colors text-muted-foreground hover:text-foreground",
        sizeClasses[size || "sm"],
        className
      )}
      aria-label="Clear input"
      {...props}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 3L3 9M3 3L9 9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

// Attach sub-components as static properties
(Input as any).Wrapper = InputWrapper;
(Input as any).Label = InputLabel;
(Input as any).Description = InputDescription;
(Input as any).Error = InputError;
(Input as any).Placeholder = InputPlaceholder;
(Input as any).ClearButton = InputClearButton;

export {
  InputWrapper,
  InputLabel,
  InputDescription,
  InputError,
  InputPlaceholder,
  InputClearButton,
};
