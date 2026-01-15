"use client";

import React, { useId, useRef, forwardRef } from "react";
import { cn } from "../../utils/cn";
import { useCheckboxGroup } from "./checkbox-group";
import { InputWrapper, InputLabel, InputDescription, InputError } from "../input/input";

/**
 * Theme color type (theme color key or CSS color)
 */
export type ThemeColor = string;

/**
 * Theme size type
 */
export type ThemeSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Radius type (theme key or CSS value)
 */
export type Radius = string | number;

/**
 * Checkbox variant
 */
export type CheckboxVariant = "filled" | "outline";

/**
 * Icon component props
 */
export interface CheckboxIconProps {
  indeterminate: boolean;
  className?: string;
}

/**
 * Checkbox component props
 */
export interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "color"
  > {
  /** Label associated with the checkbox */
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
  /** Controls components colors based on variant */
  color?: ThemeColor;
  /** Checkbox variant */
  variant?: CheckboxVariant;
  /** Controls size of the component */
  size?: ThemeSize | (string & {});
  /** Key of theme.radius or any valid CSS value to set border-radius */
  radius?: Radius;
  /** Indeterminate state of the checkbox. If set, checked prop is ignored. */
  indeterminate?: boolean;
  /** Icon displayed when checkbox is in checked or indeterminate state */
  icon?: React.FC<CheckboxIconProps>;
  /** Key of theme.colors or any valid CSS color to set icon color */
  iconColor?: ThemeColor;
  /** If set, adjusts text color based on background color for filled variant */
  autoContrast?: boolean;
  /** Props passed down to the root element */
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  /** Root element ref */
  rootRef?: React.Ref<HTMLDivElement>;
  /** Checkbox value (required when used in Checkbox.Group) */
  value?: string;
  /** Additional className */
  className?: string;
}

/**
 * Checkbox component
 * Capture boolean input from user
 *
 * @example
 * ```tsx
 * <Checkbox defaultChecked label="I agree to sell my privacy" />
 * ```
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
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
      radius = "sm",
      indeterminate = false,
      icon: IconComponent,
      iconColor,
      autoContrast = false,
      wrapperProps,
      rootRef,
      id,
      className,
      disabled,
      value,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const checkboxRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const checkboxGroup = useCheckboxGroup();
    
    // Combine external ref with internal ref
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    // Combine rootRef with internal ref
    React.useImperativeHandle(rootRef, () => checkboxRef.current as HTMLDivElement);

    // Internal state for uncontrolled checkboxes
    const isControlled = controlledChecked !== undefined;
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(
      defaultChecked ?? false
    );

    // Handle click on the visual checkbox to trigger the input
    const handleVisualClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      // Don't prevent default if clicking on the label
      if ((e.target as HTMLElement).tagName === 'LABEL') {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      inputRef.current?.click();
    };

    // When in Checkbox.Group, use group state
    const isInGroup = checkboxGroup !== null && value !== undefined;
    
    // Determine checked state
    let checked: boolean;
    let inputChecked: boolean | undefined;
    let inputDefaultChecked: boolean | undefined;
    
    if (isInGroup) {
      // In group: use group's checked state
      checked = checkboxGroup!.isChecked(value!);
      inputChecked = checked;
      inputDefaultChecked = undefined;
    } else if (isControlled) {
      // Controlled: use controlledChecked
      checked = indeterminate ? false : controlledChecked;
      inputChecked = indeterminate ? undefined : controlledChecked;
      inputDefaultChecked = undefined;
    } else {
      // Uncontrolled: use internal state
      checked = indeterminate ? false : uncontrolledChecked;
      inputChecked = undefined; // Let React manage via defaultChecked
      inputDefaultChecked = indeterminate ? undefined : defaultChecked;
    }

    // Handle change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      
      const newChecked = e.target.checked;
      
      if (isInGroup && value !== undefined) {
        // Checkbox.Group handles the state
        checkboxGroup!.onChange(value, newChecked);
      } else if (isControlled) {
        // Controlled: call onChange
        if (onChange) {
          onChange(e);
        }
      } else {
        // Uncontrolled: update internal state and call onChange if provided
        setUncontrolledChecked(newChecked);
        if (onChange) {
          onChange(e);
        }
      }
    };

    // Size classes
    const sizeClasses: Record<string, { container: string; input: string; icon: string }> = {
      xs: {
        container: "h-4 w-4",
        input: "h-4 w-4",
        icon: "w-2.5 h-2.5",
      },
      sm: {
        container: "h-5 w-5",
        input: "h-5 w-5",
        icon: "w-3 h-3",
      },
      md: {
        container: "h-6 w-6",
        input: "h-6 w-6",
        icon: "w-4 h-4",
      },
      lg: {
        container: "h-7 w-7",
        input: "h-7 w-7",
        icon: "w-5 h-5",
      },
      xl: {
        container: "h-8 w-8",
        input: "h-8 w-8",
        icon: "w-6 h-6",
      },
    };

    const sizeKey = typeof size === "string" ? size : "sm";
    const sizeConfig = sizeClasses[sizeKey] || sizeClasses.sm;
    
    if (!sizeConfig) {
      // This should never happen, but TypeScript needs this check
      throw new Error(`Invalid size: ${size}`);
    }

    // Radius classes
    const getRadiusClass = () => {
      if (typeof radius === "number") {
        return "";
      }
      const radiusMap: Record<string, string> = {
        xs: "rounded-sm",
        sm: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        full: "rounded-full",
      };
      return radiusMap[radius] || "";
    };

    const radiusClass = getRadiusClass();
    const radiusStyle: React.CSSProperties =
      typeof radius === "number" ? { borderRadius: `${radius}px` } : {};

    // Variant and color classes
    const getVariantClasses = () => {
      const baseClasses = "inline-flex items-center justify-center transition-all duration-200 border-2";
      
      const isChecked = indeterminate || checked;
      
      if (variant === "filled") {
        const colorMap: Record<string, { checked: string; unchecked: string }> = {
          primary: {
            checked: "bg-primary border-primary",
            unchecked: "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600",
          },
          blue: {
            checked: "bg-blue-500 border-blue-500",
            unchecked: "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600",
          },
          red: {
            checked: "bg-red-500 border-red-500",
            unchecked: "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600",
          },
        };
        
        const colorConfig = colorMap[color] || {
          checked: `bg-[${color}] border-[${color}]`,
          unchecked: "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600",
        };

        return cn(
          baseClasses,
          isChecked ? colorConfig.checked : colorConfig.unchecked,
          !disabled && "hover:opacity-80",
          disabled && "opacity-50 cursor-not-allowed"
        );
      }

      if (variant === "outline") {
        const colorMap: Record<string, { checked: string; unchecked: string }> = {
          primary: {
            checked: "bg-primary/10 border-primary",
            unchecked: "bg-transparent border-gray-300 dark:border-gray-600",
          },
          blue: {
            checked: "bg-blue-500/10 border-blue-500",
            unchecked: "bg-transparent border-gray-300 dark:border-gray-600",
          },
          red: {
            checked: "bg-red-500/10 border-red-500",
            unchecked: "bg-transparent border-gray-300 dark:border-gray-600",
          },
        };

        const colorConfig = colorMap[color] || {
          checked: `bg-[${color}]/10 border-[${color}]`,
          unchecked: "bg-transparent border-gray-300 dark:border-gray-600",
        };

        return cn(
          baseClasses,
          isChecked ? colorConfig.checked : colorConfig.unchecked,
          !disabled && "hover:opacity-80",
          disabled && "opacity-50 cursor-not-allowed"
        );
      }

      return baseClasses;
    };

    // Default check icon
    const DefaultCheckIcon: React.FC<CheckboxIconProps> = ({ indeterminate, className }) => {
      if (indeterminate) {
        return (
          <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5" />
          </svg>
        );
      }
      return (
        <svg
          className={className}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      );
    };

    const IconToRender = IconComponent || DefaultCheckIcon;
    const isChecked = indeterminate || checked;

    // Icon color styles
    const iconColorStyle: React.CSSProperties = iconColor
      ? { color: iconColor }
      : {
          color: isChecked ? (variant === "filled" ? "#ffffff" : undefined) : undefined,
        };

    const checkboxElement = (
      <div
        ref={checkboxRef}
        className={cn("inline-flex items-center gap-2", labelPosition === "left" && "flex-row-reverse", className)}
        {...wrapperProps}
      >
        <div className={cn("relative flex-shrink-0", sizeConfig.container)}>
          <input
            ref={inputRef}
            id={inputId}
            type="checkbox"
            checked={inputChecked}
            defaultChecked={inputDefaultChecked}
            onChange={handleChange}
            disabled={disabled}
            value={value}
            className="sr-only peer"
            {...props}
          />
          <div
            onClick={handleVisualClick}
            className={cn(
              getVariantClasses(),
              radiusClass,
              sizeConfig.container,
              "cursor-pointer peer-focus:ring-2 peer-focus:ring-primary/20 peer-focus:ring-offset-2",
              disabled && "cursor-not-allowed"
            )}
            style={radiusStyle}
          >
            {isChecked && (
              <div
                className={cn(sizeConfig.icon, "flex items-center justify-center")}
                style={iconColorStyle}
              >
                <IconToRender indeterminate={indeterminate} className="w-full h-full" />
              </div>
            )}
          </div>
        </div>
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

    // If we have description or error, wrap with InputWrapper
    if (description || error) {
      const normalizedSize = typeof sizeKey === "string" 
        ? (sizeKey as "xs" | "sm" | "md" | "lg" | "xl")
        : "sm";
      return (
        <InputWrapper
          id={inputId}
          size={normalizedSize}
          error={error}
          description={description}
        >
          {checkboxElement}
        </InputWrapper>
      );
    }

    return checkboxElement;
  }
);

Checkbox.displayName = "Checkbox";
