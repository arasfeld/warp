"use client";

import React, { forwardRef, useRef, useState, useCallback } from "react";
import { Upload, X, File } from "lucide-react";

import { cn } from "../../utils/cn";
import { InputWrapper } from "../input/input";
import type { InputSize, InputVariant, InputWrapperProps } from "../input/input";

/**
 * FileInput component props
 */
export interface FileInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "onChange">,
    Omit<InputWrapperProps, "children" | "id" | "size" | "error"> {
  /** Input size */
  size?: InputSize;
  /** Input variant */
  variant?: InputVariant;
  /** Border radius */
  radius?: string | number;
  /** Error state or message */
  error?: boolean | React.ReactNode;
  /** Current file(s) (controlled) */
  value?: File | File[] | null;
  /** Called when file(s) change */
  onChange?: (files: File | File[] | null) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Accept file types */
  accept?: string;
  /** Allow multiple files */
  multiple?: boolean;
  /** Whether to show clear button */
  clearable?: boolean;
  /** Custom file value display */
  valueComponent?: React.ComponentType<{ value: File | File[] | null }>;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Left section content */
  leftSection?: React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Default value display component
 */
function DefaultValueDisplay({ value }: { value: File | File[] | null }) {
  if (!value) return null;

  const files = Array.isArray(value) ? value : [value];

  if (files.length === 0) return null;

  if (files.length === 1) {
    const file = files[0];
    return (
      <span className="flex items-center gap-2 truncate">
        <File className="h-4 w-4 flex-shrink-0" />
        <span className="truncate">{file?.name}</span>
      </span>
    );
  }

  return (
    <span className="flex items-center gap-2">
      <File className="h-4 w-4 flex-shrink-0" />
      <span>{files.length} files selected</span>
    </span>
  );
}

/**
 * FileInput component
 * Input for selecting files
 *
 * @example
 * ```tsx
 * <FileInput
 *   label="Upload file"
 *   placeholder="Select a file"
 *   accept="image/*"
 * />
 *
 * <FileInput
 *   label="Upload files"
 *   multiple
 *   accept=".pdf,.doc,.docx"
 * />
 * ```
 */
export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
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
      // FileInput-specific props
      size = "sm",
      variant = "default",
      radius,
      error,
      value,
      onChange,
      placeholder = "Select file",
      accept,
      multiple = false,
      clearable = true,
      valueComponent: ValueComponent = DefaultValueDisplay,
      icon,
      leftSection,
      disabled,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [internalValue, setInternalValue] = useState<File | File[] | null>(null);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const hasValue = currentValue && (Array.isArray(currentValue) ? currentValue.length > 0 : true);

    // Handle file selection
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) {
          if (!isControlled) setInternalValue(null);
          onChange?.(null);
          return;
        }

        const fileArray = Array.from(files);
        const newValue = multiple ? fileArray : fileArray[0];

        if (!isControlled) {
          setInternalValue(newValue ?? null);
        }
        onChange?.(newValue ?? null);
      },
      [isControlled, multiple, onChange]
    );

    // Handle clear
    const handleClear = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        if (!isControlled) {
          setInternalValue(null);
        }
        onChange?.(null);
      },
      [isControlled, onChange]
    );

    // Handle button click
    const handleClick = useCallback(() => {
      if (!disabled) {
        inputRef.current?.click();
      }
    }, [disabled]);

    // Handle keyboard
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          inputRef.current?.click();
        }
      },
      [disabled]
    );

    const hasWrapper = label || description || error;

    // Size classes
    const sizeClasses: Record<InputSize, string> = {
      xs: "h-7 text-xs px-2",
      sm: "h-9 text-sm px-3",
      md: "h-10 text-base px-4",
      lg: "h-11 text-base px-4",
      xl: "h-12 text-lg px-5",
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
        full: "rounded-full",
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
          "border border-divider bg-background-default focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2",
        filled:
          "border-0 bg-background-paper focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2",
        unstyled: "",
      };

      return variantMap[variant];
    };

    // Error classes
    const errorClasses = error
      ? "border-error focus-within:ring-error focus-within:border-error"
      : "";

    const radiusStyle: React.CSSProperties =
      typeof radius === "number" ? { borderRadius: `${radius}px` } : {};

    const inputElement = (
      <div className={cn("relative", className)}>
        {/* Hidden file input */}
        <input
          ref={(node) => {
            (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          type="file"
          id={id}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="sr-only"
          onChange={handleChange}
          {...props}
        />

        {/* Button-like trigger */}
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={cn(
            "flex items-center justify-between w-full cursor-pointer transition-colors",
            sizeClasses[size],
            getRadiusClass(),
            getVariantClasses(),
            errorClasses,
            disabled && "opacity-50 cursor-not-allowed"
          )}
          style={radiusStyle}
          aria-disabled={disabled}
        >
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {leftSection && (
              <span className="flex-shrink-0">{leftSection}</span>
            )}
            {!leftSection && (icon !== undefined ? (
              icon
            ) : (
              <Upload className="h-4 w-4 flex-shrink-0 text-text-secondary" />
            ))}
            {hasValue ? (
              <ValueComponent value={currentValue} />
            ) : (
              <span className="text-text-secondary truncate">{placeholder}</span>
            )}
          </div>

          {/* Clear button */}
          {clearable && hasValue && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="flex-shrink-0 p-1 rounded hover:bg-action-hover text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Clear selection"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );

    if (!hasWrapper) {
      return inputElement;
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
        {inputElement}
      </InputWrapper>
    );
  }
);

FileInput.displayName = "FileInput";
