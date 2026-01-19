"use client";

import React, {
  forwardRef,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown, Loader2, X } from "lucide-react";

import { cn } from "../../utils/cn";
import { InputWrapper } from "../input/input";
import type { InputSize, InputVariant, InputWrapperProps } from "../input/input";

/**
 * Autocomplete option type
 */
export interface AutocompleteOption {
  value: string;
  label?: string;
  disabled?: boolean;
  group?: string;
}

/**
 * Autocomplete component props
 */
export interface AutocompleteProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange">,
    Omit<InputWrapperProps, "children" | "id" | "size" | "error"> {
  /** Options data */
  data: (string | AutocompleteOption)[];
  /** Input size */
  size?: InputSize;
  /** Input variant */
  variant?: InputVariant;
  /** Border radius */
  radius?: string | number;
  /** Error state or message */
  error?: boolean | React.ReactNode;
  /** Current value (controlled) */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Called when value changes */
  onChange?: (value: string) => void;
  /** Called when option is selected */
  onOptionSubmit?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Whether to show dropdown on focus */
  dropdownOpenedByDefault?: boolean;
  /** Maximum dropdown height */
  maxDropdownHeight?: number | string;
  /** Whether input is disabled */
  disabled?: boolean;
  /** Left section icon */
  leftSection?: React.ReactNode;
  /** Right section icon */
  rightSection?: React.ReactNode;
  /** Whether to show loading spinner */
  loading?: boolean;
  /** Filter function for options */
  filter?: (option: AutocompleteOption, query: string) => boolean;
  /** Maximum number of options to display */
  limit?: number;
  /** Whether to select first option on Enter if nothing selected */
  selectFirstOptionOnChange?: boolean;
  /** No options message */
  nothingFoundMessage?: React.ReactNode;
  /** Clearable */
  clearable?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Normalize option to AutocompleteOption format
 */
function normalizeOption(option: string | AutocompleteOption): AutocompleteOption {
  if (typeof option === "string") {
    return { value: option, label: option };
  }
  return { ...option, label: option.label ?? option.value };
}

/**
 * Default filter function
 */
function defaultFilter(option: AutocompleteOption, query: string): boolean {
  const label = option.label || option.value;
  return label.toLowerCase().includes(query.toLowerCase().trim());
}

/**
 * Autocomplete component
 * Text input with suggestions
 *
 * @example
 * ```tsx
 * <Autocomplete
 *   label="Country"
 *   placeholder="Select a country"
 *   data={['United States', 'Canada', 'Mexico']}
 * />
 * ```
 */
export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
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
      // Autocomplete-specific props
      data,
      size = "sm",
      variant = "default",
      radius,
      error,
      value: controlledValue,
      defaultValue = "",
      onChange,
      onOptionSubmit,
      placeholder,
      dropdownOpenedByDefault = false,
      maxDropdownHeight = 250,
      disabled = false,
      leftSection,
      rightSection,
      loading = false,
      filter = defaultFilter,
      limit,
      selectFirstOptionOnChange = false,
      nothingFoundMessage = "Nothing found",
      clearable = false,
      className,
      id,
      onFocus,
      onBlur,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [isOpen, setIsOpen] = useState(dropdownOpenedByDefault);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    // Normalize and filter options
    const normalizedOptions = data.map(normalizeOption);
    const filteredOptions = normalizedOptions.filter(
      (option) => !option.disabled && filter(option, currentValue)
    );
    const displayedOptions = limit ? filteredOptions.slice(0, limit) : filteredOptions;

    // Mount check for portal
    useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
    }, []);

    // Update dropdown position
    const updateDropdownPosition = useCallback(() => {
      if (!inputRef.current) return;
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }, []);

    // Update position on scroll/resize
    useEffect(() => {
      if (isOpen) {
        updateDropdownPosition();
        window.addEventListener("scroll", updateDropdownPosition, true);
        window.addEventListener("resize", updateDropdownPosition);
        return () => {
          window.removeEventListener("scroll", updateDropdownPosition, true);
          window.removeEventListener("resize", updateDropdownPosition);
        };
      }
    }, [isOpen, updateDropdownPosition]);

    // Close dropdown when clicking outside
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (
          !inputRef.current?.contains(e.target as Node) &&
          !dropdownRef.current?.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    // Update value
    const setValue = useCallback(
      (newValue: string) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      },
      [isControlled, onChange]
    );

    // Handle input change
    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        setIsOpen(true);
        setHighlightedIndex(selectFirstOptionOnChange && displayedOptions.length > 0 ? 0 : -1);
      },
      [setValue, selectFirstOptionOnChange, displayedOptions.length]
    );

    // Handle option select
    const handleOptionSelect = useCallback(
      (option: AutocompleteOption) => {
        setValue(option.label || option.value);
        onOptionSubmit?.(option.value);
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.focus();
      },
      [setValue, onOptionSubmit]
    );

    // Handle clear
    const handleClear = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        setValue("");
        inputRef.current?.focus();
      },
      [setValue]
    );

    // Handle focus
    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsOpen(true);
        updateDropdownPosition();
        onFocus?.(e);
      },
      [onFocus, updateDropdownPosition]
    );

    // Handle blur
    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        // Delay to allow click on dropdown - use longer timeout for reliability
        setTimeout(() => {
          if (!dropdownRef.current?.contains(document.activeElement)) {
            setIsOpen(false);
          }
        }, 200);
        onBlur?.(e);
      },
      [onBlur]
    );

    // Handle keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (disabled) return;

        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            if (!isOpen) {
              setIsOpen(true);
              updateDropdownPosition();
            }
            setHighlightedIndex((prev) =>
              prev < displayedOptions.length - 1 ? prev + 1 : 0
            );
            break;
          case "ArrowUp":
            e.preventDefault();
            setHighlightedIndex((prev) =>
              prev > 0 ? prev - 1 : displayedOptions.length - 1
            );
            break;
          case "Enter":
            e.preventDefault();
            if (highlightedIndex >= 0 && displayedOptions[highlightedIndex]) {
              handleOptionSelect(displayedOptions[highlightedIndex]);
            }
            break;
          case "Escape":
            setIsOpen(false);
            setHighlightedIndex(-1);
            break;
          case "Tab":
            setIsOpen(false);
            break;
        }

        onKeyDown?.(e);
      },
      [disabled, isOpen, displayedOptions, highlightedIndex, handleOptionSelect, onKeyDown, updateDropdownPosition]
    );

    const hasWrapper = label || description || error;

    // Size classes
    const sizeClasses: Record<InputSize, string> = {
      xs: "h-7 text-xs",
      sm: "h-9 text-sm",
      md: "h-10 text-base",
      lg: "h-11 text-base",
      xl: "h-12 text-lg",
    };

    const paddingClasses: Record<InputSize, { base: string; left: string; right: string }> = {
      xs: { base: "px-2", left: "pl-7", right: "pr-7" },
      sm: { base: "px-3", left: "pl-9", right: "pr-9" },
      md: { base: "px-4", left: "pl-10", right: "pr-10" },
      lg: { base: "px-4", left: "pl-11", right: "pr-11" },
      xl: { base: "px-5", left: "pl-12", right: "pr-12" },
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
          "border border-divider bg-background-default focus:ring-2 focus:ring-primary focus:ring-offset-2",
        filled:
          "border-0 bg-background-paper focus:ring-2 focus:ring-primary focus:ring-offset-2",
        unstyled: "",
      };

      return variantMap[variant];
    };

    const errorClasses = error ? "border-error focus:ring-error" : "";

    const radiusStyle: React.CSSProperties =
      typeof radius === "number" ? { borderRadius: `${radius}px` } : {};

    const showClear = clearable && currentValue && !disabled && !loading;
    const showRightSection = rightSection || loading || showClear;

    const inputElement = (
      <div className={cn("relative", className)}>
        {/* Left section */}
        {leftSection && (
          <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center pl-3 pointer-events-none">
            {leftSection}
          </div>
        )}

        {/* Input */}
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
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls={isOpen ? `${id}-listbox` : undefined}
          aria-activedescendant={
            highlightedIndex >= 0 ? `${id}-option-${highlightedIndex}` : undefined
          }
          value={currentValue}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "w-full transition-colors outline-none",
            "placeholder:text-text-secondary",
            "disabled:cursor-not-allowed disabled:opacity-50",
            sizeClasses[size],
            paddingClasses[size].base,
            leftSection && paddingClasses[size].left,
            showRightSection && paddingClasses[size].right,
            getRadiusClass(),
            getVariantClasses(),
            errorClasses
          )}
          style={radiusStyle}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          {...props}
        />

        {/* Right section */}
        {showRightSection && (
          <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center pr-3 gap-1">
            {loading && <Loader2 className="h-4 w-4 animate-spin text-text-secondary" />}
            {showClear && (
              <button
                type="button"
                onClick={handleClear}
                className="p-0.5 rounded hover:bg-action-hover text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Clear"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            {rightSection}
          </div>
        )}

        {/* Dropdown */}
        {mounted && isOpen && (
          createPortal(
            <div
              ref={dropdownRef}
              id={`${id}-listbox`}
              role="listbox"
              className={cn(
                "absolute z-[9999] border border-divider shadow-lg overflow-auto",
                "bg-white dark:bg-gray-900",
                getRadiusClass()
              )}
              style={{
                ...radiusStyle,
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                width: dropdownPosition.width,
                maxHeight: typeof maxDropdownHeight === "number" ? `${maxDropdownHeight}px` : maxDropdownHeight,
              }}
            >
              {displayedOptions.length > 0 ? (
                displayedOptions.map((option, index) => (
                  <div
                    key={option.value}
                    id={`${id}-option-${index}`}
                    role="option"
                    aria-selected={highlightedIndex === index}
                    className={cn(
                      "px-3 py-2 cursor-pointer transition-colors",
                      "text-text-primary",
                      highlightedIndex === index ? "bg-gray-100 dark:bg-gray-800" : "bg-white dark:bg-gray-900",
                      option.disabled && "opacity-50 cursor-not-allowed"
                    )}
                    onMouseDown={(e) => {
                      e.preventDefault(); // Prevent blur from firing before selection
                      if (!option.disabled) {
                        handleOptionSelect(option);
                      }
                    }}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    {option.label}
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-text-secondary">
                  {nothingFoundMessage}
                </div>
              )}
            </div>,
            document.body
          )
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

Autocomplete.displayName = "Autocomplete";
