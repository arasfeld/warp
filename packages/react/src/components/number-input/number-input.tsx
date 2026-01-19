"use client";

import React, {
  forwardRef,
  useState,
  useCallback,
  useRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

import { cn } from "../../utils/cn";
import { Input, InputWrapper } from "../input/input";
import type { InputProps, InputSize, InputVariant, InputWrapperProps } from "../input/input";

/**
 * NumberInput handlers ref type
 */
export interface NumberInputHandlers {
  increment: () => void;
  decrement: () => void;
}

/**
 * NumberInput component props
 */
export interface NumberInputProps
  extends Omit<InputProps, "component" | "multiline" | "type" | "rightSection" | "onChange" | "value" | "defaultValue">,
    Omit<InputWrapperProps, "children" | "id" | "size" | "error"> {
  /** Input size */
  size?: InputSize;
  /** Input variant */
  variant?: InputVariant;
  /** Error state or message */
  error?: boolean | React.ReactNode;
  /** Controlled value */
  value?: number | string;
  /** Default value (uncontrolled) */
  defaultValue?: number | string;
  /** Called when value changes */
  onChange?: (value: number | string) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step value for increment/decrement */
  step?: number;
  /** Number of decimal places */
  decimalScale?: number;
  /** Whether to fix decimal scale (always show exact decimals) */
  fixedDecimalScale?: boolean;
  /** Allow negative numbers */
  allowNegative?: boolean;
  /** Allow decimal numbers */
  allowDecimal?: boolean;
  /** Hide increment/decrement controls */
  hideControls?: boolean;
  /** Clamp value on blur */
  clampBehavior?: "strict" | "blur" | "none";
  /** Prefix string */
  prefix?: string;
  /** Suffix string */
  suffix?: string;
  /** Decimal separator */
  decimalSeparator?: string;
  /** Thousands separator */
  thousandSeparator?: string | boolean;
  /** Ref to handlers for programmatic control */
  handlersRef?: React.RefObject<NumberInputHandlers | null>;
  /** Delay before step hold starts (ms) */
  stepHoldDelay?: number;
  /** Interval between steps when holding (ms) */
  stepHoldInterval?: number | ((stepCount: number) => number);
}

/**
 * Parse string to number, handling edge cases
 */
function parseNumber(value: string | number | undefined, decimalSeparator: string): number | undefined {
  if (value === undefined || value === "" || value === "-") return undefined;
  if (typeof value === "number") return value;
  const normalized = value.replace(decimalSeparator, ".");
  const parsed = parseFloat(normalized);
  return isNaN(parsed) ? undefined : parsed;
}

/**
 * Format number to string with options
 */
function formatNumber(
  value: number | undefined,
  options: {
    decimalScale?: number;
    fixedDecimalScale?: boolean;
    decimalSeparator?: string;
    thousandSeparator?: string | boolean;
    prefix?: string;
    suffix?: string;
  }
): string {
  if (value === undefined) return "";

  const {
    decimalScale,
    fixedDecimalScale,
    decimalSeparator = ".",
    thousandSeparator,
    prefix = "",
    suffix = "",
  } = options;

  let numStr: string;

  if (decimalScale !== undefined) {
    if (fixedDecimalScale) {
      numStr = value.toFixed(decimalScale);
    } else {
      numStr = parseFloat(value.toFixed(decimalScale)).toString();
    }
  } else {
    numStr = value.toString();
  }

  // Replace decimal separator
  if (decimalSeparator !== ".") {
    numStr = numStr.replace(".", decimalSeparator);
  }

  // Add thousands separator
  if (thousandSeparator) {
    const sep = typeof thousandSeparator === "string" ? thousandSeparator : ",";
    const parts = numStr.split(decimalSeparator);
    const intPart = parts[0] ?? "";
    const decPart = parts[1];
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
    numStr = decPart !== undefined ? `${formattedInt}${decimalSeparator}${decPart}` : formattedInt;
  }

  return `${prefix}${numStr}${suffix}`;
}

/**
 * NumberInput component
 * Numeric input with increment/decrement controls
 *
 * @example
 * ```tsx
 * <NumberInput
 *   label="Quantity"
 *   min={0}
 *   max={100}
 *   step={1}
 * />
 *
 * <NumberInput
 *   label="Price"
 *   prefix="$"
 *   decimalScale={2}
 *   fixedDecimalScale
 * />
 * ```
 */
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
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
      // NumberInput-specific props
      value: controlledValue,
      defaultValue,
      onChange,
      min,
      max,
      step = 1,
      decimalScale,
      fixedDecimalScale = false,
      allowNegative = true,
      allowDecimal = true,
      hideControls = false,
      clampBehavior = "blur",
      prefix = "",
      suffix = "",
      decimalSeparator = ".",
      thousandSeparator,
      handlersRef,
      stepHoldDelay = 500,
      stepHoldInterval = 50,
      // Input props
      size = "sm",
      variant = "default",
      radius,
      disabled,
      error,
      withErrorStyles = true,
      leftSection,
      leftSectionWidth,
      leftSectionPointerEvents,
      leftSectionProps,
      rightSectionWidth,
      rightSectionPointerEvents,
      rightSectionProps,
      pointer,
      withAria = true,
      wrapperProps,
      inputSize,
      className,
      id,
      onBlur,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const holdIntervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
    const holdTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const stepCountRef = useRef(0);

    // Forward ref
    useImperativeHandle(ref, () => inputRef.current!);

    // Internal value state
    const [internalValue, setInternalValue] = useState<number | string>(() => {
      if (controlledValue !== undefined) return controlledValue;
      if (defaultValue !== undefined) return defaultValue;
      return "";
    });

    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;
    const numericValue = parseNumber(currentValue, decimalSeparator);

    // Clamp value to min/max
    const clamp = useCallback(
      (value: number): number => {
        let clamped = value;
        if (min !== undefined && clamped < min) clamped = min;
        if (max !== undefined && clamped > max) clamped = max;
        return clamped;
      },
      [min, max]
    );

    // Update value
    const setValue = useCallback(
      (newValue: number | string) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      },
      [isControlled, onChange]
    );

    // Increment handler
    const increment = useCallback(() => {
      const current = numericValue ?? 0;
      const newValue = clamp(current + step);
      setValue(newValue);
    }, [numericValue, step, clamp, setValue]);

    // Decrement handler
    const decrement = useCallback(() => {
      const current = numericValue ?? 0;
      const newValue = clamp(current - step);
      setValue(newValue);
    }, [numericValue, step, clamp, setValue]);

    // Expose handlers ref
    useEffect(() => {
      if (handlersRef) {
        (handlersRef as React.MutableRefObject<NumberInputHandlers | null>).current = {
          increment,
          decrement,
        };
      }
    }, [handlersRef, increment, decrement]);

    // Start hold interval
    const startHold = useCallback(
      (action: () => void) => {
        stepCountRef.current = 0;
        action();

        holdTimeoutRef.current = setTimeout(() => {
          holdIntervalRef.current = setInterval(() => {
            stepCountRef.current += 1;
            action();

            // Adjust interval if function provided
            if (typeof stepHoldInterval === "function") {
              clearInterval(holdIntervalRef.current);
              const newInterval = stepHoldInterval(stepCountRef.current);
              holdIntervalRef.current = setInterval(action, newInterval);
            }
          }, typeof stepHoldInterval === "number" ? stepHoldInterval : 50);
        }, stepHoldDelay);
      },
      [stepHoldDelay, stepHoldInterval]
    );

    // Stop hold interval
    const stopHold = useCallback(() => {
      if (holdTimeoutRef.current) clearTimeout(holdTimeoutRef.current);
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    }, []);

    // Cleanup on unmount
    useEffect(() => {
      return () => {
        stopHold();
      };
    }, [stopHold]);

    // Handle input change
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;

        // Remove prefix/suffix for processing
        if (prefix && inputValue.startsWith(prefix)) {
          inputValue = inputValue.slice(prefix.length);
        }
        if (suffix && inputValue.endsWith(suffix)) {
          inputValue = inputValue.slice(0, -suffix.length);
        }

        // Remove thousands separator
        if (thousandSeparator) {
          const sep = typeof thousandSeparator === "string" ? thousandSeparator : ",";
          inputValue = inputValue.split(sep).join("");
        }

        // Allow empty, minus sign, or valid number patterns
        if (inputValue === "" || inputValue === "-") {
          setValue(inputValue);
          return;
        }

        // Validate input
        let pattern = allowNegative ? "^-?" : "^";
        if (allowDecimal) {
          const escapedSep = decimalSeparator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          pattern += `\\d*${escapedSep}?\\d*$`;
        } else {
          pattern += "\\d*$";
        }

        if (!new RegExp(pattern).test(inputValue)) {
          return;
        }

        const parsed = parseNumber(inputValue, decimalSeparator);

        if (clampBehavior === "strict" && parsed !== undefined) {
          if ((min !== undefined && parsed < min) || (max !== undefined && parsed > max)) {
            return;
          }
        }

        setValue(parsed !== undefined ? parsed : inputValue);
      },
      [allowNegative, allowDecimal, decimalSeparator, thousandSeparator, prefix, suffix, clampBehavior, min, max, setValue]
    );

    // Handle blur - clamp value
    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        if (clampBehavior === "blur" && numericValue !== undefined) {
          const clamped = clamp(numericValue);
          if (clamped !== numericValue) {
            setValue(clamped);
          }
        }
        onBlur?.(e);
      },
      [clampBehavior, numericValue, clamp, setValue, onBlur]
    );

    // Handle keyboard
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowUp") {
          e.preventDefault();
          increment();
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          decrement();
        }
        onKeyDown?.(e);
      },
      [increment, decrement, onKeyDown]
    );

    const hasWrapper = label || description || error;

    // Format display value
    const displayValue = formatNumber(numericValue, {
      decimalScale,
      fixedDecimalScale,
      decimalSeparator,
      thousandSeparator,
      prefix,
      suffix,
    });

    // Control buttons
    const controls = !hideControls && !disabled && (
      <div className="flex flex-col h-full">
        <button
          type="button"
          tabIndex={-1}
          className={cn(
            "flex-1 flex items-center justify-center px-1",
            "text-text-secondary hover:text-text-primary hover:bg-action-hover",
            "transition-colors border-l border-divider",
            "focus:outline-none"
          )}
          onMouseDown={() => startHold(increment)}
          onMouseUp={stopHold}
          onMouseLeave={stopHold}
          aria-label="Increment"
        >
          <ChevronUp className="h-3 w-3" />
        </button>
        <button
          type="button"
          tabIndex={-1}
          className={cn(
            "flex-1 flex items-center justify-center px-1",
            "text-text-secondary hover:text-text-primary hover:bg-action-hover",
            "transition-colors border-l border-t border-divider",
            "focus:outline-none"
          )}
          onMouseDown={() => startHold(decrement)}
          onMouseUp={stopHold}
          onMouseLeave={stopHold}
          aria-label="Decrement"
        >
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>
    );

    const inputElement = (
      <Input
        ref={inputRef}
        id={id}
        type="text"
        inputMode="decimal"
        size={size}
        variant={variant}
        radius={radius}
        disabled={disabled}
        error={error}
        withErrorStyles={withErrorStyles}
        leftSection={leftSection}
        rightSection={controls}
        leftSectionWidth={leftSectionWidth}
        rightSectionWidth={hideControls ? rightSectionWidth : "32px"}
        leftSectionPointerEvents={leftSectionPointerEvents}
        rightSectionPointerEvents="auto"
        leftSectionProps={leftSectionProps}
        rightSectionProps={{
          ...rightSectionProps,
          style: { padding: 0, ...rightSectionProps?.style },
        }}
        pointer={pointer}
        withAria={withAria}
        wrapperProps={wrapperProps}
        inputSize={inputSize}
        required={required}
        className={className}
        value={currentValue === "" ? "" : displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        {...props}
      />
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

NumberInput.displayName = "NumberInput";
