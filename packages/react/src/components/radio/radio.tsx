"use client";

import React, { useId, useRef, forwardRef } from "react";

import { cn } from "../../utils/cn";
import { InputWrapper } from "../input/input";
import { useRadioGroup } from "./radio-group";

/**
 * Theme size type
 */
export type RadioSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Radio variant
 */
export type RadioVariant = "filled" | "outline";

/**
 * Radio component props
 */
export interface RadioProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "color"
  > {
  /** Label associated with the radio */
  label?: React.ReactNode;
  /** Position of the label relative to the input */
  labelPosition?: "left" | "right";
  /** Description displayed below the label */
  description?: React.ReactNode;
  /** Error message displayed below the label */
  error?: React.ReactNode;
  /** Checked state for controlled component */
  checked?: boolean;
  /** Default checked state for uncontrolled component */
  defaultChecked?: boolean;
  /** Called when checked state changes */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Controls component colors based on variant */
  color?: string;
  /** Radio variant */
  variant?: RadioVariant;
  /** Controls size of the component */
  size?: RadioSize;
  /** If set, adjusts text color based on background color for filled variant */
  autoContrast?: boolean;
  /** Props passed down to the root element */
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  /** Root element ref */
  rootRef?: React.Ref<HTMLDivElement>;
  /** Radio value (required when used in Radio.Group) */
  value: string;
  /** Additional className */
  className?: string;
}

/**
 * Radio component
 * Capture single selection from a group of options
 *
 * @example
 * ```tsx
 * <Radio.Group value={selected} onChange={setSelected}>
 *   <Radio value="react" label="React" />
 *   <Radio value="vue" label="Vue" />
 *   <Radio value="svelte" label="Svelte" />
 * </Radio.Group>
 * ```
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      labelPosition = "right",
      description,
      error,
      checked: controlledChecked,
      defaultChecked,
      onChange,
      color = "primary",
      variant = "filled",
      size = "sm",
      autoContrast = false,
      wrapperProps,
      rootRef,
      id,
      className,
      disabled,
      value,
      name: propName,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const radioRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const radioGroup = useRadioGroup();

    // Combine external ref with internal ref
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    // Combine rootRef with internal ref
    React.useImperativeHandle(
      rootRef,
      () => radioRef.current as HTMLDivElement
    );

    // Internal state for uncontrolled radios (only used outside of group)
    const isControlled = controlledChecked !== undefined;
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(
      defaultChecked ?? false
    );

    // Handle click on the visual radio to trigger the input
    const handleVisualClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || radioGroup?.disabled) return;
      // Don't prevent default if clicking on the label
      if ((e.target as HTMLElement).tagName === "LABEL") {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      inputRef.current?.click();
    };

    // When in Radio.Group, use group state
    const isInGroup = radioGroup !== null;
    const name = isInGroup ? radioGroup.name : propName;
    const isDisabled = disabled || radioGroup?.disabled;

    // Determine checked state
    let checked: boolean;
    let inputChecked: boolean | undefined;
    let inputDefaultChecked: boolean | undefined;

    if (isInGroup) {
      // In group: use group's checked state
      checked = radioGroup.isChecked(value);
      inputChecked = checked;
      inputDefaultChecked = undefined;
    } else if (isControlled) {
      // Controlled: use controlledChecked
      checked = controlledChecked;
      inputChecked = controlledChecked;
      inputDefaultChecked = undefined;
    } else {
      // Uncontrolled: use internal state
      checked = uncontrolledChecked;
      inputChecked = undefined;
      inputDefaultChecked = defaultChecked;
    }

    // Handle change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isDisabled) return;

      if (isInGroup) {
        // Radio.Group handles the state
        radioGroup.onChange(value);
      } else if (isControlled) {
        // Controlled: call onChange
        if (onChange) {
          onChange(e);
        }
      } else {
        // Uncontrolled: update internal state and call onChange if provided
        setUncontrolledChecked(e.target.checked);
        if (onChange) {
          onChange(e);
        }
      }
    };

    // Size classes
    const sizeClasses: Record<
      RadioSize,
      { container: string; inner: string }
    > = {
      xs: {
        container: "h-4 w-4",
        inner: "h-1.5 w-1.5",
      },
      sm: {
        container: "h-5 w-5",
        inner: "h-2 w-2",
      },
      md: {
        container: "h-6 w-6",
        inner: "h-2.5 w-2.5",
      },
      lg: {
        container: "h-7 w-7",
        inner: "h-3 w-3",
      },
      xl: {
        container: "h-8 w-8",
        inner: "h-3.5 w-3.5",
      },
    };

    const actualSize = (radioGroup?.size as RadioSize) || size;
    const sizeConfig = sizeClasses[actualSize] || sizeClasses.sm;

    // Variant and color classes
    const getVariantClasses = () => {
      const baseClasses =
        "inline-flex items-center justify-center transition-all duration-200 border-2 rounded-full";

      if (variant === "filled") {
        const colorMap: Record<string, { checked: string; unchecked: string }> =
          {
            primary: {
              checked: "bg-primary border-primary",
              unchecked:
                "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600",
            },
            blue: {
              checked: "bg-blue-500 border-blue-500",
              unchecked:
                "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600",
            },
            red: {
              checked: "bg-red-500 border-red-500",
              unchecked:
                "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600",
            },
          };

        const colorConfig = colorMap[color] || {
          checked: `bg-[${color}] border-[${color}]`,
          unchecked:
            "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600",
        };

        return cn(
          baseClasses,
          checked ? colorConfig.checked : colorConfig.unchecked,
          !isDisabled && "hover:opacity-80",
          isDisabled && "opacity-50 cursor-not-allowed"
        );
      }

      if (variant === "outline") {
        const colorMap: Record<string, { checked: string; unchecked: string }> =
          {
            primary: {
              checked: "bg-primary/10 border-primary",
              unchecked:
                "bg-transparent border-gray-300 dark:border-gray-600",
            },
            blue: {
              checked: "bg-blue-500/10 border-blue-500",
              unchecked:
                "bg-transparent border-gray-300 dark:border-gray-600",
            },
            red: {
              checked: "bg-red-500/10 border-red-500",
              unchecked:
                "bg-transparent border-gray-300 dark:border-gray-600",
            },
          };

        const colorConfig = colorMap[color] || {
          checked: `bg-[${color}]/10 border-[${color}]`,
          unchecked: "bg-transparent border-gray-300 dark:border-gray-600",
        };

        return cn(
          baseClasses,
          checked ? colorConfig.checked : colorConfig.unchecked,
          !isDisabled && "hover:opacity-80",
          isDisabled && "opacity-50 cursor-not-allowed"
        );
      }

      return baseClasses;
    };

    // Inner circle color
    const getInnerCircleClasses = () => {
      if (variant === "filled") {
        return "bg-white";
      }
      // Outline variant: use the color
      const colorMap: Record<string, string> = {
        primary: "bg-primary",
        blue: "bg-blue-500",
        red: "bg-red-500",
      };
      return colorMap[color] || `bg-[${color}]`;
    };

    const radioElement = (
      <div
        ref={radioRef}
        className={cn(
          "inline-flex items-center gap-2",
          labelPosition === "left" && "flex-row-reverse",
          className
        )}
        {...wrapperProps}
      >
        <div
          onClick={handleVisualClick}
          className={cn(
            "relative flex-shrink-0",
            getVariantClasses(),
            sizeConfig.container,
            "cursor-pointer peer-focus:ring-2 peer-focus:ring-primary/20 peer-focus:ring-offset-2",
            isDisabled && "cursor-not-allowed"
          )}
        >
          <input
            ref={inputRef}
            id={inputId}
            type="radio"
            name={name}
            checked={inputChecked}
            defaultChecked={inputDefaultChecked}
            onChange={handleChange}
            disabled={isDisabled}
            value={value}
            className="sr-only peer"
            {...props}
          />
          {checked && (
            <div
              className={cn(
                "absolute inset-0 m-auto",
                sizeConfig.inner,
                "rounded-full",
                getInnerCircleClasses()
              )}
            />
          )}
        </div>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium cursor-pointer select-none",
              isDisabled && "cursor-not-allowed opacity-50",
              error && "text-error"
            )}
          >
            {label}
          </label>
        )}
      </div>
    );

    // If we have description or error, wrap with InputWrapper
    if (description || error) {
      return (
        <InputWrapper
          id={inputId}
          size={actualSize}
          error={error}
          description={description}
        >
          {radioElement}
        </InputWrapper>
      );
    }

    return radioElement;
  }
);

Radio.displayName = "Radio";
