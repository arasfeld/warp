"use client";

import React, { forwardRef, useState, useCallback, useRef, KeyboardEvent } from "react";
import { X } from "lucide-react";

import { cn } from "../../utils/cn";
import { InputWrapper } from "../input/input";
import type { InputSize, InputVariant, InputWrapperProps } from "../input/input";

/**
 * TagsInput component props
 */
export interface TagsInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    Omit<InputWrapperProps, "children" | "id" | "size" | "error"> {
  /** Input size */
  size?: InputSize;
  /** Input variant */
  variant?: InputVariant;
  /** Border radius */
  radius?: string | number;
  /** Error state or message */
  error?: boolean | React.ReactNode;
  /** Current tags (controlled) */
  value?: string[];
  /** Default tags (uncontrolled) */
  defaultValue?: string[];
  /** Called when tags change */
  onChange?: (tags: string[]) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Maximum number of tags */
  maxTags?: number;
  /** Whether to allow duplicates */
  allowDuplicates?: boolean;
  /** Keys that trigger tag creation */
  splitChars?: string[];
  /** Whether input is disabled */
  disabled?: boolean;
  /** Whether input is clearable */
  clearable?: boolean;
  /** Custom tag render function */
  renderTag?: (tag: string, onRemove: () => void) => React.ReactNode;
  /** Validate tag before adding */
  validateTag?: (tag: string) => boolean;
  /** Transform tag before adding */
  transformTag?: (tag: string) => string;
  /** Left section content */
  leftSection?: React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * TagsInput component
 * Input for managing multiple tags
 *
 * @example
 * ```tsx
 * <TagsInput
 *   label="Tags"
 *   placeholder="Add tags..."
 * />
 *
 * <TagsInput
 *   label="Skills"
 *   defaultValue={['React', 'TypeScript']}
 *   maxTags={5}
 * />
 * ```
 */
export const TagsInput = forwardRef<HTMLInputElement, TagsInputProps>(
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
      // TagsInput-specific props
      size = "sm",
      variant = "default",
      radius,
      error,
      value: controlledValue,
      defaultValue = [],
      onChange,
      placeholder = "Add tag...",
      maxTags,
      allowDuplicates = false,
      splitChars = [",", "Enter", "Tab"],
      disabled = false,
      clearable = true,
      renderTag,
      validateTag,
      transformTag,
      leftSection,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [internalTags, setInternalTags] = useState<string[]>(defaultValue);
    const [inputValue, setInputValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const isControlled = controlledValue !== undefined;
    const tags = isControlled ? controlledValue : internalTags;

    // Check if max tags reached
    const isMaxReached = maxTags !== undefined && tags.length >= maxTags;

    // Update tags
    const setTags = useCallback(
      (newTags: string[]) => {
        if (!isControlled) {
          setInternalTags(newTags);
        }
        onChange?.(newTags);
      },
      [isControlled, onChange]
    );

    // Add a tag
    const addTag = useCallback(
      (tag: string) => {
        const trimmed = tag.trim();
        if (!trimmed) return false;

        const transformed = transformTag ? transformTag(trimmed) : trimmed;

        // Validation
        if (validateTag && !validateTag(transformed)) return false;
        if (!allowDuplicates && tags.includes(transformed)) return false;
        if (maxTags !== undefined && tags.length >= maxTags) return false;

        setTags([...tags, transformed]);
        return true;
      },
      [tags, allowDuplicates, maxTags, validateTag, transformTag, setTags]
    );

    // Remove a tag
    const removeTag = useCallback(
      (index: number) => {
        if (disabled) return;
        const newTags = tags.filter((_, i) => i !== index);
        setTags(newTags);
      },
      [disabled, tags, setTags]
    );

    // Clear all tags
    const clearTags = useCallback(() => {
      if (disabled) return;
      setTags([]);
      setInputValue("");
    }, [disabled, setTags]);

    // Handle input change
    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Check for split characters (excluding Enter and Tab which are handled by keydown)
        const charSplitters = splitChars.filter((c) => c !== "Enter" && c !== "Tab");
        for (const char of charSplitters) {
          if (value.includes(char)) {
            const parts = value.split(char);
            parts.forEach((part, i) => {
              if (i < parts.length - 1 || value.endsWith(char)) {
                addTag(part);
              }
            });
            const firstSplitter = charSplitters[0] ?? ",";
            const lastPart = parts[parts.length - 1] ?? "";
            setInputValue(value.endsWith(firstSplitter) ? "" : lastPart);
            return;
          }
        }

        setInputValue(value);
      },
      [splitChars, addTag]
    );

    // Handle key down
    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (disabled) return;

        // Handle Enter and Tab
        if ((splitChars.includes("Enter") && e.key === "Enter") ||
            (splitChars.includes("Tab") && e.key === "Tab")) {
          if (inputValue.trim()) {
            e.preventDefault();
            if (addTag(inputValue)) {
              setInputValue("");
            }
          }
          return;
        }

        // Handle Backspace to remove last tag
        if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
          removeTag(tags.length - 1);
        }
      },
      [disabled, splitChars, inputValue, tags, addTag, removeTag]
    );

    // Handle paste
    const handlePaste = useCallback(
      (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasted = e.clipboardData.getData("text");
        const charSplitters = splitChars.filter((c) => c !== "Enter" && c !== "Tab");

        // Check if pasted content contains split chars
        const hasSplitChar = charSplitters.some((char) => pasted.includes(char));
        if (hasSplitChar) {
          e.preventDefault();
          let remaining = pasted;
          for (const char of charSplitters) {
            const parts = remaining.split(char);
            parts.forEach((part) => addTag(part));
            remaining = "";
          }
        }
      },
      [splitChars, addTag]
    );

    // Handle container click
    const handleContainerClick = useCallback(() => {
      inputRef.current?.focus();
    }, []);

    const hasWrapper = label || description || error;

    // Size classes
    const sizeConfig: Record<InputSize, { minHeight: string; padding: string; text: string; tagPadding: string }> = {
      xs: { minHeight: "min-h-7", padding: "p-1", text: "text-xs", tagPadding: "px-1.5 py-0.5" },
      sm: { minHeight: "min-h-9", padding: "p-1.5", text: "text-sm", tagPadding: "px-2 py-0.5" },
      md: { minHeight: "min-h-10", padding: "p-2", text: "text-sm", tagPadding: "px-2.5 py-1" },
      lg: { minHeight: "min-h-11", padding: "p-2", text: "text-base", tagPadding: "px-3 py-1" },
      xl: { minHeight: "min-h-12", padding: "p-2.5", text: "text-base", tagPadding: "px-3 py-1.5" },
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
        default: "border border-divider bg-background-default",
        filled: "border-0 bg-background-paper",
        unstyled: "",
      };

      return variantMap[variant];
    };

    // Error classes
    const errorClasses = error
      ? "border-error"
      : "";

    // Focus classes
    const focusClasses = isFocused && !error
      ? "ring-2 ring-primary ring-offset-2"
      : "";

    const radiusStyle: React.CSSProperties =
      typeof radius === "number" ? { borderRadius: `${radius}px` } : {};

    // Render default tag
    const defaultRenderTag = (tag: string, onRemove: () => void) => (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded",
          "bg-primary/10 text-primary",
          sizeConfig[size].tagPadding,
          sizeConfig[size].text
        )}
      >
        <span className="truncate max-w-[150px]">{tag}</span>
        {!disabled && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="flex-shrink-0 hover:bg-primary/20 rounded p-0.5 transition-colors"
            aria-label={`Remove ${tag}`}
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </span>
    );

    const inputElement = (
      <div
        className={cn(
          "flex flex-wrap items-center gap-1.5 cursor-text transition-all",
          sizeConfig[size].minHeight,
          sizeConfig[size].padding,
          getRadiusClass(),
          getVariantClasses(),
          errorClasses,
          focusClasses,
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        style={radiusStyle}
        onClick={handleContainerClick}
        {...props}
      >
        {/* Left section */}
        {leftSection && (
          <span className="flex-shrink-0">{leftSection}</span>
        )}

        {/* Tags */}
        {tags.map((tag, index) => (
          <React.Fragment key={`${tag}-${index}`}>
            {renderTag
              ? renderTag(tag, () => removeTag(index))
              : defaultRenderTag(tag, () => removeTag(index))}
          </React.Fragment>
        ))}

        {/* Input */}
        {!isMaxReached && (
          <input
            ref={(node) => {
              (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            type="text"
            id={id}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              // Add remaining input as tag on blur
              if (inputValue.trim()) {
                addTag(inputValue);
                setInputValue("");
              }
            }}
            placeholder={tags.length === 0 ? placeholder : ""}
            disabled={disabled}
            className={cn(
              "flex-1 min-w-[60px] bg-transparent border-0 outline-none",
              "placeholder:text-text-secondary",
              sizeConfig[size].text,
              disabled && "cursor-not-allowed"
            )}
          />
        )}

        {/* Clear button */}
        {clearable && tags.length > 0 && !disabled && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              clearTags();
            }}
            className="flex-shrink-0 p-1 rounded hover:bg-action-hover text-text-secondary hover:text-text-primary transition-colors ml-auto"
            aria-label="Clear all tags"
          >
            <X className="h-4 w-4" />
          </button>
        )}
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

TagsInput.displayName = "TagsInput";
