"use client";

import React, { forwardRef, useState, useCallback } from "react";
import { Star } from "lucide-react";

import { cn } from "../../utils/cn";

/**
 * Rating size options
 */
export type RatingSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Rating component props
 */
export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Current value (controlled) */
  value?: number;
  /** Default value (uncontrolled) */
  defaultValue?: number;
  /** Called when value changes */
  onChange?: (value: number) => void;
  /** Number of symbols to display */
  count?: number;
  /** Rating size */
  size?: RatingSize;
  /** Rating color */
  color?: string;
  /** Empty symbol color */
  emptyColor?: string;
  /** Whether rating is read-only */
  readOnly?: boolean;
  /** Whether to allow fractional values (half stars) */
  fractions?: number;
  /** Whether to highlight only selected items (vs all items up to selected) */
  highlightSelectedOnly?: boolean;
  /** Custom symbol component */
  emptySymbol?: React.ReactNode;
  /** Custom filled symbol component */
  fullSymbol?: React.ReactNode;
  /** Name for form submission */
  name?: string;
  /** Get symbol label for accessibility */
  getSymbolLabel?: (value: number) => string;
  /** Additional className */
  className?: string;
}

/**
 * Rating component
 * Star rating input
 *
 * @example
 * ```tsx
 * <Rating defaultValue={3} />
 *
 * <Rating
 *   count={10}
 *   fractions={2}
 *   onChange={(value) => console.log(value)}
 * />
 * ```
 */
export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value: controlledValue,
      defaultValue = 0,
      onChange,
      count = 5,
      size = "md",
      color,
      emptyColor,
      readOnly = false,
      fractions = 1,
      highlightSelectedOnly = false,
      emptySymbol,
      fullSymbol,
      name,
      getSymbolLabel,
      className,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;
    const displayValue = hoverValue ?? currentValue;

    // Update value
    const setValue = useCallback(
      (newValue: number) => {
        if (readOnly) return;
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      },
      [isControlled, onChange, readOnly]
    );

    // Handle click on symbol
    const handleClick = useCallback(
      (index: number, fraction: number) => {
        if (readOnly) return;
        const newValue = index + fraction / fractions;
        // Allow clicking same value to reset to 0
        setValue(newValue === currentValue ? 0 : newValue);
      },
      [readOnly, fractions, currentValue, setValue]
    );

    // Handle hover
    const handleHover = useCallback(
      (index: number, fraction: number) => {
        if (readOnly) return;
        setHoverValue(index + fraction / fractions);
      },
      [readOnly, fractions]
    );

    // Handle mouse leave
    const handleMouseLeave = useCallback(() => {
      setHoverValue(null);
    }, []);

    // Handle keyboard
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (readOnly) return;

        const step = 1 / fractions;
        let newValue = currentValue;

        switch (e.key) {
          case "ArrowRight":
          case "ArrowUp":
            e.preventDefault();
            newValue = Math.min(currentValue + step, count);
            break;
          case "ArrowLeft":
          case "ArrowDown":
            e.preventDefault();
            newValue = Math.max(currentValue - step, 0);
            break;
          case "Home":
            e.preventDefault();
            newValue = 0;
            break;
          case "End":
            e.preventDefault();
            newValue = count;
            break;
          default:
            return;
        }

        setValue(newValue);
      },
      [readOnly, currentValue, fractions, count, setValue]
    );

    // Size configuration
    const sizeConfig: Record<RatingSize, { icon: string; gap: string }> = {
      xs: { icon: "h-3 w-3", gap: "gap-0.5" },
      sm: { icon: "h-4 w-4", gap: "gap-1" },
      md: { icon: "h-5 w-5", gap: "gap-1" },
      lg: { icon: "h-6 w-6", gap: "gap-1.5" },
      xl: { icon: "h-8 w-8", gap: "gap-2" },
    };

    // Color classes for theme colors
    const getFilledColorClass = () => {
      if (!color) return "text-yellow-400";
      const colorMap: Record<string, string> = {
        primary: "text-primary",
        secondary: "text-secondary",
        success: "text-success",
        warning: "text-warning",
        error: "text-error",
      };
      return colorMap[color] || "text-yellow-400";
    };

    const filledColorClass = getFilledColorClass();

    // Default symbol label
    const defaultGetSymbolLabel = (value: number) => `${value} star${value !== 1 ? "s" : ""}`;

    // Render a single symbol
    const renderSymbol = (index: number) => {
      const symbolElements: React.ReactNode[] = [];

      for (let fraction = 1; fraction <= fractions; fraction++) {
        const symbolValue = index + fraction / fractions;
        const isActive = highlightSelectedOnly
          ? displayValue === symbolValue
          : displayValue >= symbolValue;
        const isFractional = !highlightSelectedOnly &&
          displayValue > index + (fraction - 1) / fractions &&
          displayValue < symbolValue;

        const fillPercent = isFractional
          ? ((displayValue - index) * fractions - (fraction - 1)) * 100
          : isActive
            ? 100
            : 0;

        symbolElements.push(
          <button
            key={`${index}-${fraction}`}
            type="button"
            className={cn(
              "relative focus:outline-none",
              !readOnly && "cursor-pointer",
              readOnly && "cursor-default"
            )}
            style={{
              width: fractions > 1 ? `${100 / fractions}%` : "100%",
            }}
            onClick={() => handleClick(index, fraction)}
            onMouseEnter={() => handleHover(index, fraction)}
            tabIndex={-1}
            aria-hidden="true"
          >
            {/* Background (empty) symbol */}
            <span
              className={cn(
                "block",
                sizeConfig[size].icon,
                emptyColor ? "" : "text-gray-300 dark:text-gray-600"
              )}
              style={emptyColor ? { color: emptyColor } : {}}
            >
              {emptySymbol || <Star className="h-full w-full fill-current" />}
            </span>

            {/* Foreground (filled) symbol - clipped */}
            <span
              className={cn(
                "absolute inset-0 overflow-hidden",
                sizeConfig[size].icon,
                filledColorClass
              )}
              style={{
                width: `${fillPercent}%`,
              }}
            >
              {fullSymbol || <Star className="h-full w-full fill-current" />}
            </span>
          </button>
        );
      }

      const iconWidth = sizeConfig[size].icon.split(" ")[0]?.replace("h-", "") ?? "5";
      return (
        <div
          key={index}
          className="relative flex"
          style={{ width: iconWidth }}
        >
          {symbolElements}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={count}
        aria-valuenow={currentValue}
        aria-valuetext={
          (getSymbolLabel || defaultGetSymbolLabel)(currentValue)
        }
        aria-readonly={readOnly}
        tabIndex={readOnly ? -1 : 0}
        className={cn(
          "inline-flex",
          sizeConfig[size].gap,
          readOnly ? "pointer-events-none" : "",
          !readOnly && "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded",
          className
        )}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {Array.from({ length: count }, (_, index) => renderSymbol(index))}

        {/* Hidden input for form submission */}
        {name && (
          <input
            type="hidden"
            name={name}
            value={currentValue}
          />
        )}
      </div>
    );
  }
);

Rating.displayName = "Rating";
