"use client";

import React, { forwardRef, useId, useState } from "react";

import type {
  SwitchBaseProps,
  SwitchSize,
} from "@warp/core";
import { SWITCH_SIZE_CONFIG } from "@warp/core";

import { cn } from "../../utils/cn";
import { InputDescription, InputError, InputWrapper } from "../input/input";

/**
 * Switch component props
 */
export interface SwitchProps
  extends SwitchBaseProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "onChange"> {
  /** Additional className for the root element */
  className?: string;
  /** Props passed to the wrapper element */
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  /** Ref for the root wrapper element */
  rootRef?: React.Ref<HTMLDivElement>;
}

/**
 * Size classes for the switch track
 */
const trackSizeClasses: Record<SwitchSize, string> = {
  xs: "w-8 h-4",
  sm: "w-[38px] h-5",
  md: "w-[46px] h-6",
  lg: "w-14 h-[30px]",
  xl: "w-[66px] h-9",
};

/**
 * Size classes for the switch thumb
 */
const thumbSizeClasses: Record<SwitchSize, string> = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-[26px] h-[26px]",
  xl: "w-8 h-8",
};

/**
 * Translation classes for the thumb when checked
 */
const thumbTranslateClasses: Record<SwitchSize, string> = {
  xs: "translate-x-4",
  sm: "translate-x-[18px]",
  md: "translate-x-[22px]",
  lg: "translate-x-[26px]",
  xl: "translate-x-[30px]",
};

/**
 * Internal label size classes
 */
const internalLabelSizeClasses: Record<SwitchSize, string> = {
  xs: "text-[8px]",
  sm: "text-[9px]",
  md: "text-[10px]",
  lg: "text-[11px]",
  xl: "text-xs",
};

/**
 * Switch component
 * Toggle between on and off states
 *
 * @example
 * ```tsx
 * // Uncontrolled
 * <Switch label="Enable notifications" />
 *
 * // Controlled
 * <Switch
 *   checked={isEnabled}
 *   onCheckedChange={setIsEnabled}
 *   label="Dark mode"
 * />
 *
 * // With internal labels
 * <Switch onLabel="ON" offLabel="OFF" />
 * ```
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      disabled = false,
      size = "sm",
      color = "primary",
      label,
      labelPosition = "right",
      description,
      error,
      onLabel,
      offLabel,
      thumbIcon,
      className,
      wrapperProps,
      rootRef,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    // Internal state for uncontrolled usage
    const isControlled = controlledChecked !== undefined;
    const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
    const checked = isControlled ? controlledChecked : uncontrolledChecked;

    // Handle change
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked;

      if (!isControlled) {
        setUncontrolledChecked(newChecked);
      }

      onCheckedChange?.(newChecked);
    };

    // Color classes for the track
    const colorMap: Record<string, { checked: string; unchecked: string }> = {
      primary: {
        checked: "bg-primary",
        unchecked: "bg-gray-300 dark:bg-gray-600",
      },
      secondary: {
        checked: "bg-secondary",
        unchecked: "bg-gray-300 dark:bg-gray-600",
      },
      error: {
        checked: "bg-error",
        unchecked: "bg-gray-300 dark:bg-gray-600",
      },
      success: {
        checked: "bg-success",
        unchecked: "bg-gray-300 dark:bg-gray-600",
      },
      warning: {
        checked: "bg-warning",
        unchecked: "bg-gray-300 dark:bg-gray-600",
      },
      info: {
        checked: "bg-info",
        unchecked: "bg-gray-300 dark:bg-gray-600",
      },
    };

    const defaultColorClasses = { checked: "bg-primary", unchecked: "bg-gray-300 dark:bg-gray-600" };
    const trackColorClasses = colorMap[color] || defaultColorClasses;

    const switchElement = (
      <div
        ref={rootRef}
        className={cn(
          "inline-flex items-center gap-2",
          labelPosition === "left" && "flex-row-reverse",
          className
        )}
        {...wrapperProps}
      >
        <label
          htmlFor={inputId}
          className={cn(
            "relative inline-flex cursor-pointer items-center",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          {/* Hidden input */}
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            role="switch"
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            className="sr-only peer"
            aria-checked={checked}
            {...props}
          />

          {/* Track */}
          <div
            className={cn(
              "rounded-full transition-colors duration-200",
              trackSizeClasses[size],
              checked ? trackColorClasses.checked : trackColorClasses.unchecked,
              "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/20 peer-focus-visible:ring-offset-2"
            )}
          >
            {/* Internal labels (on/off) */}
            {(onLabel || offLabel) && (
              <div className="absolute inset-0 flex items-center justify-between px-1">
                <span
                  className={cn(
                    "font-semibold text-white transition-opacity duration-200",
                    internalLabelSizeClasses[size],
                    checked ? "opacity-100" : "opacity-0"
                  )}
                >
                  {onLabel}
                </span>
                <span
                  className={cn(
                    "font-semibold text-gray-600 dark:text-gray-400 transition-opacity duration-200",
                    internalLabelSizeClasses[size],
                    checked ? "opacity-0" : "opacity-100"
                  )}
                >
                  {offLabel}
                </span>
              </div>
            )}
          </div>

          {/* Thumb */}
          <div
            className={cn(
              "absolute rounded-full bg-white shadow-md transition-transform duration-200",
              thumbSizeClasses[size],
              "left-0.5 top-1/2 -translate-y-1/2",
              checked && thumbTranslateClasses[size],
              "flex items-center justify-center"
            )}
          >
            {thumbIcon && (
              <span className="text-gray-600 flex items-center justify-center">
                {thumbIcon}
              </span>
            )}
          </div>
        </label>

        {/* External label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium cursor-pointer select-none",
              disabled && "cursor-not-allowed opacity-50",
              error && "text-error"
            )}
          >
            {label}
          </label>
        )}
      </div>
    );

    // Wrap with InputWrapper if description or error is provided
    if (description || error) {
      const normalizedSize =
        typeof size === "string" ? (size as "xs" | "sm" | "md" | "lg" | "xl") : "sm";
      return (
        <InputWrapper id={inputId} size={normalizedSize} error={error} description={description}>
          {switchElement}
        </InputWrapper>
      );
    }

    return switchElement;
  }
);

Switch.displayName = "Switch";
