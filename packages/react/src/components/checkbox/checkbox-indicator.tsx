"use client";

import React from "react";
import { cn } from "../../utils/cn";
import type {
  ThemeColor,
  ThemeSize,
  Radius,
  CheckboxVariant,
  CheckboxIconProps,
} from "./checkbox";

/**
 * Checkbox.Indicator props
 */
export interface CheckboxIndicatorProps {
  /** Determines whether the component should have checked styles */
  checked?: boolean;
  /** Determines whether the component should have disabled styles */
  disabled?: boolean;
  /** Indeterminate state of the checkbox. If set, checked prop is ignored. */
  indeterminate?: boolean;
  /** Controls components colors based on variant */
  color?: ThemeColor;
  /** Checkbox variant */
  variant?: CheckboxVariant;
  /** Controls size of the component */
  size?: ThemeSize | (string & {});
  /** Key of theme.radius or any valid CSS value to set border-radius */
  radius?: Radius;
  /** Icon displayed when checkbox is in checked or indeterminate state */
  icon?: React.FC<CheckboxIconProps>;
  /** Key of theme.colors or any valid CSS color to set icon color */
  iconColor?: ThemeColor;
  /** If set, adjusts text color based on background color for filled variant */
  autoContrast?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Checkbox.Indicator component
 * Visual representation of checkbox state without interaction
 */
export function CheckboxIndicator({
  checked = false,
  disabled = false,
  indeterminate = false,
  color = "primary",
  variant = "filled",
  size = "sm",
  radius = "sm",
  icon: IconComponent,
  iconColor,
  autoContrast = false,
  className,
}: CheckboxIndicatorProps) {
  // Size classes
  const sizeClasses: Record<string, { container: string; icon: string }> = {
    xs: {
      container: "h-4 w-4",
      icon: "w-2.5 h-2.5",
    },
    sm: {
      container: "h-5 w-5",
      icon: "w-3 h-3",
    },
    md: {
      container: "h-6 w-6",
      icon: "w-4 h-4",
    },
    lg: {
      container: "h-7 w-7",
      icon: "w-5 h-5",
    },
    xl: {
      container: "h-8 w-8",
      icon: "w-6 h-6",
    },
  };

  const sizeKey = typeof size === "string" ? size : "sm";
  const sizeConfig = sizeClasses[sizeKey] || sizeClasses.sm;
  
  if (!sizeConfig) {
    // Fallback if somehow sizeConfig is still undefined
    return null;
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
        disabled && "opacity-50"
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
        disabled && "opacity-50"
      );
    }

    return baseClasses;
  };

  // Default check icon
  const DefaultCheckIcon: React.FC<CheckboxIconProps> = ({
    indeterminate,
    className,
  }) => {
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

  return (
    <div
      className={cn(
        getVariantClasses(),
        radiusClass,
        sizeConfig.container,
        disabled && "cursor-not-allowed",
        className
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
  );
}
