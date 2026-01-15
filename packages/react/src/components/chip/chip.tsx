"use client";

import React, { useId, useRef, forwardRef } from "react";
import { cn } from "../../utils/cn";
import { useChipGroup } from "./chip-group";

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
 * Chip variant
 */
export type ChipVariant = "filled" | "outline" | "light";

/**
 * Chip component props
 */
export interface ChipProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "color" | "checked" | "defaultChecked" | "onChange"
  > {
  /** Label element associated with the input */
  children?: React.ReactNode;
  /** Checked state for controlled component */
  checked?: boolean;
  /** Default checked state for uncontrolled component */
  defaultChecked?: boolean;
  /** Called when checked state changes */
  onChange?: (checked: boolean) => void;
  /** Controls components colors based on variant */
  color?: ThemeColor;
  /** Chip variant */
  variant?: ChipVariant;
  /** Controls various properties related to component size */
  size?: ThemeSize;
  /** Key of theme.radius or any valid CSS value to set border-radius */
  radius?: Radius;
  /** Chip input type */
  type?: "checkbox" | "radio";
  /** Any element or component to replace default icon */
  icon?: React.ReactNode;
  /** If set, adjusts text color based on background color for filled variant */
  autoContrast?: boolean;
  /** Props passed down to the root element */
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  /** Assigns ref of the root element */
  rootRef?: React.Ref<HTMLDivElement>;
  /** Chip value (required when used in Chip.Group) */
  value?: string;
  /** Additional className */
  className?: string;
}

/**
 * Chip component
 * Pick one or multiple values with inline controls
 *
 * @example
 * ```tsx
 * <Chip defaultChecked>Awesome chip</Chip>
 * ```
 */

export const Chip = forwardRef<HTMLInputElement, ChipProps>(
  (
    {
      children,
      checked: controlledChecked,
      defaultChecked,
      onChange,
      color = "primary",
      variant = "filled",
      size = "sm",
      radius = "xl",
      type: controlledType,
      icon,
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
    const labelId = `${inputId}-label`;
    const chipRef = useRef<HTMLDivElement>(null);
    const chipGroup = useChipGroup();

    // Combine rootRef with internal ref
    React.useImperativeHandle(rootRef, () => chipRef.current as HTMLDivElement);

    // When in Chip.Group, use group state
    const isInGroup = chipGroup !== null && value !== undefined;
    const type = controlledType || (chipGroup?.multiple ? "checkbox" : "radio");
    
    // Determine checked state
    let checked: boolean;
    let inputChecked: boolean | undefined;
    let inputDefaultChecked: boolean | undefined;
    
    if (isInGroup) {
      // In group: use group's checked state
      checked = chipGroup!.isChecked(value!);
      inputChecked = checked;
      inputDefaultChecked = undefined;
    } else {
      // Standalone: use controlled/uncontrolled props
      checked = controlledChecked ?? defaultChecked ?? false;
      inputChecked = controlledChecked;
      inputDefaultChecked = defaultChecked;
    }

    // Handle change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      
      if (isInGroup && value !== undefined) {
        // Chip.Group handles the state
        chipGroup.onChange(value, e.target.checked);
      } else {
        // Standalone chip
        if (onChange) {
          onChange(e.target.checked);
        }
      }
    };

    // Size classes
    const sizeClasses: Record<ThemeSize, { input: string; label: string; icon: string }> = {
      xs: {
        input: "h-5 w-5",
        label: "text-xs px-2 h-5",
        icon: "w-3 h-3",
      },
      sm: {
        input: "h-6 w-6",
        label: "text-sm px-2.5 h-6",
        icon: "w-4 h-4",
      },
      md: {
        input: "h-7 w-7",
        label: "text-sm px-3 h-7",
        icon: "w-4 h-4",
      },
      lg: {
        input: "h-8 w-8",
        label: "text-base px-4 h-8",
        icon: "w-5 h-5",
      },
      xl: {
        input: "h-9 w-9",
        label: "text-base px-5 h-9",
        icon: "w-5 h-5",
      },
    };

    const sizeConfig = sizeClasses[size];

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
      const baseClasses = "inline-flex items-center justify-center cursor-pointer transition-all duration-200 border-2 font-medium";
      
      if (variant === "filled") {
        // Color mapping for filled variant
        const colorMap: Record<string, { bg: string; text: string; border: string; checked: string }> = {
          primary: {
            bg: "bg-primary",
            text: "text-white",
            border: "border-primary",
            checked: "bg-primary border-primary text-white",
          },
          blue: {
            bg: "bg-blue-500",
            text: "text-white",
            border: "border-blue-500",
            checked: "bg-blue-500 border-blue-500 text-white",
          },
          red: {
            bg: "bg-red-500",
            text: "text-white",
            border: "border-red-500",
            checked: "bg-red-500 border-red-500 text-white",
          },
        };
        
        const colorConfig = colorMap[color] || {
          bg: `bg-[${color}]`,
          text: autoContrast ? "text-white" : "text-white",
          border: `border-[${color}]`,
          checked: `bg-[${color}] border-[${color}] text-white`,
        };

        return cn(
          baseClasses,
          "border-transparent",
          checked
            ? cn(colorConfig.checked)
            : cn("bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700"),
          "hover:opacity-90",
          disabled && "opacity-50 cursor-not-allowed"
        );
      }

      if (variant === "outline") {
        const colorMap: Record<string, { checked: string; unchecked: string }> = {
          primary: {
            checked: "bg-primary/10 text-primary border-primary",
            unchecked: "bg-transparent text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600",
          },
          blue: {
            checked: "bg-blue-500/10 text-blue-500 border-blue-500",
            unchecked: "bg-transparent text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600",
          },
          red: {
            checked: "bg-red-500/10 text-red-500 border-red-500",
            unchecked: "bg-transparent text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600",
          },
        };

        const colorConfig = colorMap[color] || {
          checked: `bg-[${color}]/10 text-[${color}] border-[${color}]`,
            unchecked: "bg-transparent text-muted-foreground border-gray-300 dark:border-gray-600",
        };

        return cn(
          baseClasses,
          checked ? colorConfig.checked : colorConfig.unchecked,
          "hover:opacity-80",
          disabled && "opacity-50 cursor-not-allowed"
        );
      }

      if (variant === "light") {
        const colorMap: Record<string, { checked: string; unchecked: string }> = {
          primary: {
            checked: "bg-primary/20 text-primary border-transparent",
            unchecked: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-transparent",
          },
          blue: {
            checked: "bg-blue-500/20 text-blue-500 border-transparent",
            unchecked: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-transparent",
          },
          red: {
            checked: "bg-red-500/20 text-red-500 border-transparent",
            unchecked: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-transparent",
          },
        };

        const colorConfig = colorMap[color] || {
          checked: `bg-[${color}]/20 text-[${color}] border-transparent`,
            unchecked: "bg-gray-100 dark:bg-gray-800 text-muted-foreground border-transparent",
        };

        return cn(
          baseClasses,
          "border-transparent",
          checked ? colorConfig.checked : colorConfig.unchecked,
          "hover:opacity-80",
          disabled && "opacity-50 cursor-not-allowed"
        );
      }

      return baseClasses;
    };

    // Default check icon (checkmark)
    const defaultIcon = (
      <svg
        className={sizeConfig.icon}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    );

    return (
      <div
        ref={chipRef}
        {...wrapperProps}
        className={cn("inline-block", wrapperProps?.className)}
      >
        <input
          ref={ref}
          id={inputId}
          type={type}
          checked={inputChecked}
          defaultChecked={inputDefaultChecked}
          onChange={handleChange}
          disabled={disabled}
          value={value}
          className="sr-only peer"
          {...props}
        />
        <label
          htmlFor={inputId}
          id={labelId}
          className={cn(
            getVariantClasses(),
            radiusClass,
            sizeConfig.label,
            "relative",
            className
          )}
          style={radiusStyle}
        >
          {checked && icon !== null && (
            <span className={cn("mr-1.5 flex-shrink-0", sizeConfig.icon)}>
              {icon !== undefined ? icon : defaultIcon}
            </span>
          )}
          {children}
        </label>
      </div>
    );
  }
);

Chip.displayName = "Chip";
