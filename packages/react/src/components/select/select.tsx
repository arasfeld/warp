"use client";

import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useId,
  useImperativeHandle,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "../../utils/cn";
import { Input, InputSize, InputVariant } from "../input/input";

/**
 * Select option data
 */
export interface SelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  group?: string;
}

/**
 * Select size (matches Input size)
 */
export type SelectSize = InputSize;

/**
 * Select variant (matches Input variant)
 */
export type SelectVariant = InputVariant;

/**
 * Select props
 */
export interface SelectProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "value" | "defaultValue" | "onChange" | "multiple"
  > {
  /** Select size */
  size?: SelectSize;
  /** Select variant */
  variant?: SelectVariant;
  /** Options data */
  data?: SelectOption[];
  /** Controlled value */
  value?: string | string[] | null;
  /** Default value */
  defaultValue?: string | string[] | null;
  /** Change handler */
  onChange?: (value: string | string[] | null) => void;
  /** Whether multiple selection is allowed */
  multiple?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Whether select is disabled */
  disabled?: boolean;
  /** Error state */
  error?: boolean | React.ReactNode;
  /** Whether select is searchable */
  searchable?: boolean;
  /** Whether to show clear button */
  clearable?: boolean;
  /** Custom render function for selected value */
  renderValue?: (value: string | string[] | null) => React.ReactNode;
  /** Maximum dropdown height */
  maxDropdownHeight?: number | string;
  /** Whether dropdown is open (controlled) */
  open?: boolean;
  /** Default open state */
  defaultOpen?: boolean;
  /** Callback when dropdown opens */
  onOpen?: () => void;
  /** Callback when dropdown closes */
  onClose?: () => void;
  /** Additional className */
  className?: string;
  /** Right section content */
  rightSection?: React.ReactNode;
  /** Left section content */
  leftSection?: React.ReactNode;
}

/**
 * Select component
 * Dropdown select component with keyboard navigation and accessibility
 */
export const Select = forwardRef<HTMLInputElement, SelectProps>(
  (
    {
      size = "sm",
      variant = "default",
      data = [],
      value: controlledValue,
      defaultValue,
      onChange,
      multiple = false,
      placeholder = "Select option...",
      disabled = false,
      error = false,
      searchable = false,
      clearable = false,
      renderValue,
      maxDropdownHeight = 300,
      open: controlledOpen,
      defaultOpen = false,
      onOpen,
      onClose,
      className,
      rightSection,
      leftSection,
      id,
      name,
      required,
      ...props
    },
    ref
  ) => {
  const [internalValue, setInternalValue] = useState<string | string[] | null>(
    defaultValue ?? (multiple ? [] : null)
  );
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [searchQuery, setSearchQuery] = useState("");
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const isControlled = controlledValue !== undefined;
  const isOpenControlled = controlledOpen !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const open = isOpenControlled ? controlledOpen : internalOpen;

  const selectId = useId();
  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  // Expose the input ref to parent components
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  // Get options lookup
  const optionsLookup = useMemo(() => {
    const lookup: Record<string, SelectOption> = {};
    data.forEach((option) => {
      lookup[option.value] = option;
    });
    return lookup;
  }, [data]);

  // Filter options based on search
  const filteredOptions = useMemo(() => {
    if (!searchable || !searchQuery) return data;
    const query = searchQuery.toLowerCase();
    return data.filter(
      (option) =>
        String(option.label).toLowerCase().includes(query) ||
        option.value.toLowerCase().includes(query)
    );
  }, [data, searchQuery, searchable]);

  // Get selected options
  const selectedOptions = useMemo(() => {
    if (value === null || value === undefined) return [];
    const values = Array.isArray(value) ? value : [value];
    return values
      .map((v) => optionsLookup[v])
      .filter((opt): opt is SelectOption => opt !== undefined);
  }, [value, optionsLookup]);

  // Get display value
  const displayValue = useMemo(() => {
    if (renderValue) {
      return renderValue(value);
    }

    if (multiple) {
      if (selectedOptions.length === 0) return null;
      if (selectedOptions.length === 1) return selectedOptions[0]?.label ?? null;
      return `${selectedOptions.length} selected`;
    }

    return selectedOptions[0]?.label || null;
  }, [value, selectedOptions, multiple, renderValue]);

  // Handle value change
  const handleChange = useCallback(
    (newValue: string) => {
      if (multiple) {
        const currentValues = Array.isArray(value) ? value : [];
        const newValues = currentValues.includes(newValue)
          ? currentValues.filter((v) => v !== newValue)
          : [...currentValues, newValue];
        if (!isControlled) setInternalValue(newValues);
        onChange?.(newValues);
      } else {
        const newSingleValue = value === newValue ? null : newValue;
        if (!isControlled) setInternalValue(newSingleValue);
        onChange?.(newSingleValue);
        handleClose();
      }
    },
    [value, multiple, isControlled, onChange]
  );

  // Handle open/close
  const handleOpen = useCallback(() => {
    if (disabled) return;
    if (!isOpenControlled) setInternalOpen(true);
    onOpen?.();
    if (searchable) {
      // Find the input element within the select
      const inputElement = selectRef.current?.querySelector('input');
      if (inputElement) {
        inputElement.focus();
        inputRef.current = inputElement;
      }
    }
  }, [disabled, isOpenControlled, onOpen, searchable]);

  const handleClose = useCallback(() => {
    if (!isOpenControlled) setInternalOpen(false);
    onClose?.();
    setSearchQuery("");
    setFocusedIndex(null);
    const inputElement = selectRef.current?.querySelector('input');
    if (inputElement) {
      inputElement.blur();
    }
  }, [isOpenControlled, onClose]);

  const handleToggle = useCallback(() => {
    if (open) {
      handleClose();
    } else {
      handleOpen();
    }
  }, [open, handleOpen, handleClose]);

  // Handle clear
  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (multiple) {
        if (!isControlled) setInternalValue([]);
        onChange?.([]);
      } else {
        if (!isControlled) setInternalValue(null);
        onChange?.(null);
      }
    },
    [multiple, isControlled, onChange]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
        selectRef.current?.focus();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((prev) => {
          const next = prev === null ? 0 : Math.min(prev + 1, filteredOptions.length - 1);
          scrollToOption(next);
          return next;
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex((prev) => {
          const next = prev === null ? filteredOptions.length - 1 : Math.max(prev - 1, 0);
          scrollToOption(next);
          return next;
        });
      } else if (e.key === "Enter" && focusedIndex !== null) {
        e.preventDefault();
        const option = filteredOptions[focusedIndex];
        if (option && !option.disabled) {
          handleChange(option.value);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, focusedIndex, filteredOptions, handleChange, handleClose]);

  // Scroll to focused option
  const scrollToOption = (index: number) => {
    if (dropdownRef.current) {
      const optionElement = dropdownRef.current.querySelector(
        `[data-option-index="${index}"]`
      );
      optionElement?.scrollIntoView({ block: "nearest" });
    }
  };

  // Click outside handler
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(e.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, handleClose]);

  // Position dropdown
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  useEffect(() => {
    if (!open || !selectRef.current) {
      setDropdownPosition(null);
      return;
    }

    const updatePosition = () => {
      const rect = selectRef.current?.getBoundingClientRect();
      if (!rect) return;

      setDropdownPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  // Update hidden input for form submission
  useEffect(() => {
    if (hiddenInputRef.current) {
      if (multiple) {
        hiddenInputRef.current.value = Array.isArray(value) ? value.join(",") : "";
      } else {
        hiddenInputRef.current.value = value && !Array.isArray(value) ? value : "";
      }
    }
  }, [value, multiple]);

  const hasValue = value !== null && value !== undefined && 
    (multiple ? Array.isArray(value) && value.length > 0 : value !== "");

  const showClearButton = clearable && hasValue && !disabled;

  return (
    <>
      <div
        ref={selectRef}
        className={cn("relative w-full", className)}
        onClick={handleToggle}
      >
        <Input
          id={id || selectId}
          size={size}
          variant={variant}
          disabled={disabled}
          error={error}
          placeholder={placeholder}
          value={searchable && open ? searchQuery : (displayValue ? String(displayValue) : "")}
          onChange={(e) => {
            if (searchable) {
              setSearchQuery(e.target.value);
              if (!open) handleOpen();
            }
          }}
          readOnly={!searchable}
          leftSection={leftSection}
          rightSection={
            rightSection || (
              <div className="flex items-center gap-1">
                {showClearButton && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="flex items-center justify-center rounded-full hover:bg-action-hover transition-colors text-muted-foreground hover:text-foreground w-4 h-4"
                    aria-label="Clear selection"
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
                )}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={cn(
                    "text-muted-foreground transition-transform",
                    open && "rotate-180"
                  )}
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )
          }
          rightSectionPointerEvents="auto"
          pointer={!searchable}
          className={cn(
            "cursor-pointer",
            !searchable && "select-none"
          )}
          aria-expanded={open}
          aria-haspopup="listbox"
          role="combobox"
          {...props}
        />
        <input
          ref={hiddenInputRef}
          type="hidden"
          name={name}
          value={multiple ? (Array.isArray(value) ? value.join(",") : "") : (value && !Array.isArray(value) ? value : "")}
          required={required}
        />
      </div>

      {open &&
        dropdownPosition &&
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed z-50 bg-background-paper border border-divider rounded-md shadow-lg overflow-hidden"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
              maxHeight: typeof maxDropdownHeight === "number" 
                ? `${maxDropdownHeight}px` 
                : maxDropdownHeight,
            }}
            role="listbox"
            aria-labelledby={id || selectId}
          >
            <div className="overflow-y-auto max-h-full">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-muted-foreground text-center">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option, index) => {
                  const isSelected = multiple
                    ? Array.isArray(value) && value.includes(option.value)
                    : value === option.value;
                  const isFocused = focusedIndex === index;

                  return (
                    <div
                      key={option.value}
                      data-option-index={index}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        if (!option.disabled) {
                          handleChange(option.value);
                        }
                      }}
                      onMouseEnter={() => setFocusedIndex(index)}
                      className={cn(
                        "px-3 py-2 text-sm cursor-pointer transition-colors",
                        "hover:bg-action-hover",
                        isFocused && "bg-action-hover",
                        isSelected && "bg-action-selected",
                        option.disabled && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {multiple && (
                          <input
                            type="checkbox"
                            checked={isSelected}
                            readOnly
                            className="w-4 h-4 rounded border-divider"
                          />
                        )}
                        <span className="flex-1">{option.label}</span>
                        {!multiple && isSelected && (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            className="text-primary"
                          >
                            <path
                              d="M13.3333 4L6 11.3333L2.66667 8"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
  }
);

Select.displayName = "Select";
