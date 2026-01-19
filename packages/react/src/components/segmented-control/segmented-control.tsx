"use client";

import React, { forwardRef, useState, useRef, useEffect, useCallback } from "react";

import { cn } from "../../utils/cn";

/**
 * SegmentedControl size options
 */
export type SegmentedControlSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * SegmentedControl item definition
 */
export interface SegmentedControlItem {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

/**
 * SegmentedControl component props
 */
export interface SegmentedControlProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Data array for segments */
  data: (string | SegmentedControlItem)[];
  /** Current value (controlled) */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Called when value changes */
  onChange?: (value: string) => void;
  /** Control size */
  size?: SegmentedControlSize;
  /** Border radius */
  radius?: string | number;
  /** Control color */
  color?: string;
  /** Whether control is disabled */
  disabled?: boolean;
  /** Full width control */
  fullWidth?: boolean;
  /** Orientation */
  orientation?: "horizontal" | "vertical";
  /** Animate indicator movement */
  transitionDuration?: number;
  /** Whether to animate */
  transitionTimingFunction?: string;
  /** Name for form submission */
  name?: string;
  /** Read-only mode */
  readOnly?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Normalize data item to SegmentedControlItem format
 */
function normalizeItem(item: string | SegmentedControlItem): SegmentedControlItem {
  if (typeof item === "string") {
    return { value: item, label: item };
  }
  return item;
}

/**
 * SegmentedControl component
 * Linear set of segments, similar to a tab bar
 *
 * @example
 * ```tsx
 * <SegmentedControl
 *   data={['React', 'Angular', 'Vue']}
 *   defaultValue="React"
 * />
 *
 * <SegmentedControl
 *   data={[
 *     { value: 'preview', label: 'Preview' },
 *     { value: 'code', label: 'Code' },
 *     { value: 'export', label: 'Export', disabled: true },
 *   ]}
 * />
 * ```
 */
export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(
  (
    {
      data,
      value: controlledValue,
      defaultValue,
      onChange,
      size = "sm",
      radius,
      color,
      disabled = false,
      fullWidth = false,
      orientation = "horizontal",
      transitionDuration = 200,
      transitionTimingFunction = "ease",
      name,
      readOnly = false,
      className,
      ...props
    },
    ref
  ) => {
    const normalizedData = data.map(normalizeItem);
    const initialValue = defaultValue ?? normalizedData[0]?.value ?? "";

    const [internalValue, setInternalValue] = useState(initialValue);
    const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
    const controlRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    // Update indicator position
    const updateIndicator = useCallback(() => {
      const activeItem = itemRefs.current.get(currentValue);
      const container = controlRef.current;

      if (!activeItem || !container) {
        setIndicatorStyle({ opacity: 0 });
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();

      if (orientation === "horizontal") {
        setIndicatorStyle({
          width: itemRect.width,
          height: itemRect.height,
          transform: `translateX(${itemRect.left - containerRect.left}px)`,
          opacity: 1,
        });
      } else {
        setIndicatorStyle({
          width: itemRect.width,
          height: itemRect.height,
          transform: `translateY(${itemRect.top - containerRect.top}px)`,
          opacity: 1,
        });
      }
    }, [currentValue, orientation]);

    // Update indicator on value change and mount
    useEffect(() => {
      updateIndicator();
    }, [updateIndicator]);

    // Update on resize
    useEffect(() => {
      const handleResize = () => updateIndicator();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [updateIndicator]);

    // Handle item click
    const handleClick = useCallback(
      (value: string) => {
        if (disabled || readOnly) return;

        const item = normalizedData.find((d) => d.value === value);
        if (item?.disabled) return;

        if (!isControlled) {
          setInternalValue(value);
        }
        onChange?.(value);
      },
      [disabled, readOnly, normalizedData, isControlled, onChange]
    );

    // Handle keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled || readOnly) return;

        const enabledItems = normalizedData.filter((item) => !item.disabled);
        const currentIndex = enabledItems.findIndex((item) => item.value === currentValue);

        let newIndex = currentIndex;

        const isHorizontal = orientation === "horizontal";
        const nextKey = isHorizontal ? "ArrowRight" : "ArrowDown";
        const prevKey = isHorizontal ? "ArrowLeft" : "ArrowUp";

        switch (e.key) {
          case nextKey:
            e.preventDefault();
            newIndex = (currentIndex + 1) % enabledItems.length;
            break;
          case prevKey:
            e.preventDefault();
            newIndex = (currentIndex - 1 + enabledItems.length) % enabledItems.length;
            break;
          case "Home":
            e.preventDefault();
            newIndex = 0;
            break;
          case "End":
            e.preventDefault();
            newIndex = enabledItems.length - 1;
            break;
          default:
            return;
        }

        const newValue = enabledItems[newIndex]?.value;
        if (newValue) {
          handleClick(newValue);
          itemRefs.current.get(newValue)?.focus();
        }
      },
      [disabled, readOnly, normalizedData, currentValue, orientation, handleClick]
    );

    // Size configuration
    const sizeConfig: Record<SegmentedControlSize, { padding: string; text: string; height: string }> = {
      xs: { padding: "px-2 py-1", text: "text-xs", height: "h-7" },
      sm: { padding: "px-3 py-1.5", text: "text-sm", height: "h-9" },
      md: { padding: "px-4 py-2", text: "text-sm", height: "h-10" },
      lg: { padding: "px-5 py-2.5", text: "text-base", height: "h-11" },
      xl: { padding: "px-6 py-3", text: "text-base", height: "h-12" },
    };

    // Radius classes
    const getRadiusClass = () => {
      if (radius === undefined) return "rounded-lg";
      if (typeof radius === "number") return "";
      const radiusMap: Record<string, string> = {
        xs: "rounded-sm",
        sm: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      };
      return radiusMap[radius] || "rounded-lg";
    };

    // Color classes for selected text
    const getSelectedColorClass = () => {
      if (!color) return "text-foreground";
      const colorMap: Record<string, string> = {
        primary: "text-primary",
        secondary: "text-secondary",
        success: "text-success",
        warning: "text-warning",
        error: "text-error",
      };
      return colorMap[color] || "text-foreground";
    };

    const selectedColorClass = getSelectedColorClass();

    const radiusStyle: React.CSSProperties =
      typeof radius === "number" ? { borderRadius: `${radius}px` } : {};

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-orientation={orientation}
        className={cn(
          "relative inline-flex p-1",
          "bg-gray-100 dark:bg-gray-800",
          getRadiusClass(),
          orientation === "vertical" && "flex-col",
          fullWidth && "w-full",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        style={radiusStyle}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {/* Animated indicator */}
        <div
          className={cn(
            "absolute bg-white dark:bg-gray-700 shadow-sm",
            getRadiusClass()
          )}
          style={{
            ...radiusStyle,
            ...indicatorStyle,
            transition: `transform ${transitionDuration}ms ${transitionTimingFunction}, width ${transitionDuration}ms ${transitionTimingFunction}, height ${transitionDuration}ms ${transitionTimingFunction}`,
          }}
          aria-hidden="true"
        />

        {/* Control container for measuring */}
        <div
          ref={controlRef}
          className={cn(
            "relative flex",
            orientation === "vertical" && "flex-col",
            fullWidth && "w-full"
          )}
        >
          {normalizedData.map((item) => {
            const isSelected = item.value === currentValue;
            const isDisabled = disabled || item.disabled;

            return (
              <button
                key={item.value}
                ref={(el) => {
                  if (el) {
                    itemRefs.current.set(item.value, el);
                  } else {
                    itemRefs.current.delete(item.value);
                  }
                }}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-disabled={isDisabled}
                tabIndex={isSelected ? 0 : -1}
                disabled={isDisabled}
                className={cn(
                  "relative z-10 flex items-center justify-center font-medium",
                  "transition-colors duration-150",
                  sizeConfig[size].padding,
                  sizeConfig[size].text,
                  getRadiusClass(),
                  fullWidth && "flex-1",
                  isSelected
                    ? selectedColorClass
                    : "text-text-secondary hover:text-text-primary",
                  isDisabled && "cursor-not-allowed opacity-50",
                  !isDisabled && !readOnly && "cursor-pointer"
                )}
                onClick={() => handleClick(item.value)}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Hidden input for form submission */}
        {name && (
          <input type="hidden" name={name} value={currentValue} />
        )}
      </div>
    );
  }
);

SegmentedControl.displayName = "SegmentedControl";
