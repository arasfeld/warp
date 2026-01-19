"use client";

import React, {
  forwardRef,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";

import { cn } from "../../utils/cn";

/**
 * Slider size options
 */
export type SliderSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Slider mark definition
 */
export interface SliderMark {
  value: number;
  label?: React.ReactNode;
}

/**
 * Slider component props
 */
export interface SliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Current value (controlled) */
  value?: number;
  /** Default value (uncontrolled) */
  defaultValue?: number;
  /** Called when value changes */
  onChange?: (value: number) => void;
  /** Called when slider interaction ends */
  onChangeEnd?: (value: number) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step value */
  step?: number;
  /** Slider size */
  size?: SliderSize;
  /** Slider color */
  color?: string;
  /** Border radius of track and thumb */
  radius?: string | number;
  /** Whether slider is disabled */
  disabled?: boolean;
  /** Marks to display on the track */
  marks?: SliderMark[];
  /** Label format function or element */
  label?: ((value: number) => React.ReactNode) | React.ReactNode | null;
  /** Whether to show label on hover */
  labelAlwaysOn?: boolean;
  /** Whether to show label transition */
  labelTransition?: boolean;
  /** Thumb aria-label */
  thumbLabel?: string;
  /** Whether to show label */
  showLabelOnHover?: boolean;
  /** Precision for rounding */
  precision?: number;
  /** Invert selection (filled area on right) */
  inverted?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Clamp value between min and max
 */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Get decimal places in a number
 */
function getDecimalPlaces(num: number): number {
  const str = num.toString();
  const decimalIndex = str.indexOf(".");
  return decimalIndex === -1 ? 0 : str.length - decimalIndex - 1;
}

/**
 * Round to step precision
 */
function roundToStep(value: number, step: number, min: number): number {
  const steps = Math.round((value - min) / step);
  const result = min + steps * step;
  // Fix floating point precision issues
  const decimalPlaces = Math.max(getDecimalPlaces(step), getDecimalPlaces(min));
  return Number(result.toFixed(decimalPlaces));
}

/**
 * Get percentage position from value
 */
function getPositionFromValue(value: number, min: number, max: number): number {
  return ((value - min) / (max - min)) * 100;
}

/**
 * Get value from percentage position
 */
function getValueFromPosition(
  position: number,
  min: number,
  max: number,
  step: number
): number {
  const raw = min + (position / 100) * (max - min);
  return roundToStep(raw, step, min);
}

/**
 * Slider component
 * Input for selecting a value from a range
 *
 * @example
 * ```tsx
 * <Slider defaultValue={50} />
 *
 * <Slider
 *   min={0}
 *   max={100}
 *   step={10}
 *   marks={[
 *     { value: 0, label: '0%' },
 *     { value: 50, label: '50%' },
 *     { value: 100, label: '100%' },
 *   ]}
 * />
 * ```
 */
export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value: controlledValue,
      defaultValue = 0,
      onChange,
      onChangeEnd,
      min = 0,
      max = 100,
      step = 1,
      size = "md",
      color,
      radius,
      disabled = false,
      marks,
      label,
      labelAlwaysOn = false,
      labelTransition = true,
      thumbLabel,
      showLabelOnHover = true,
      precision,
      inverted = false,
      className,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);

    const isControlled = controlledValue !== undefined;
    const currentValue = clamp(
      isControlled ? controlledValue : internalValue,
      min,
      max
    );

    const position = getPositionFromValue(currentValue, min, max);

    // Update value
    const setValue = useCallback(
      (newValue: number) => {
        const clamped = clamp(roundToStep(newValue, step, min), min, max);
        const rounded =
          precision !== undefined
            ? parseFloat(clamped.toFixed(precision))
            : clamped;

        if (!isControlled) {
          setInternalValue(rounded);
        }
        onChange?.(rounded);
      },
      [isControlled, onChange, min, max, step, precision]
    );

    // Get value from mouse/touch position
    const getValueFromEvent = useCallback(
      (clientX: number): number => {
        if (!trackRef.current) return currentValue;

        const rect = trackRef.current.getBoundingClientRect();
        const percent = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
        return getValueFromPosition(percent, min, max, step);
      },
      [currentValue, min, max, step]
    );

    // Handle mouse/touch move
    const handleMove = useCallback(
      (clientX: number) => {
        if (disabled) return;
        const newValue = getValueFromEvent(clientX);
        setValue(newValue);
      },
      [disabled, getValueFromEvent, setValue]
    );

    // Handle mouse down on track
    const handleTrackMouseDown = useCallback(
      (e: React.MouseEvent) => {
        if (disabled) return;
        e.preventDefault();
        setIsDragging(true);
        handleMove(e.clientX);
      },
      [disabled, handleMove]
    );

    // Handle touch start on track
    const handleTrackTouchStart = useCallback(
      (e: React.TouchEvent) => {
        if (disabled) return;
        const touch = e.touches[0];
        if (!touch) return;
        setIsDragging(true);
        handleMove(touch.clientX);
      },
      [disabled, handleMove]
    );

    // Handle drag end
    const handleDragEnd = useCallback(() => {
      if (isDragging) {
        setIsDragging(false);
        onChangeEnd?.(currentValue);
      }
    }, [isDragging, onChangeEnd, currentValue]);

    // Add/remove global event listeners for dragging
    useEffect(() => {
      if (!isDragging) return;

      const handleMouseMove = (e: MouseEvent) => {
        handleMove(e.clientX);
      };

      const handleTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        if (!touch) return;
        handleMove(touch.clientX);
      };

      const handleEnd = () => {
        handleDragEnd();
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleEnd);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleEnd);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleEnd);
      };
    }, [isDragging, handleMove, handleDragEnd]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;

        let newValue = currentValue;

        switch (e.key) {
          case "ArrowRight":
          case "ArrowUp":
            e.preventDefault();
            newValue = currentValue + step;
            break;
          case "ArrowLeft":
          case "ArrowDown":
            e.preventDefault();
            newValue = currentValue - step;
            break;
          case "Home":
            e.preventDefault();
            newValue = min;
            break;
          case "End":
            e.preventDefault();
            newValue = max;
            break;
          default:
            return;
        }

        setValue(newValue);
        onChangeEnd?.(clamp(newValue, min, max));
      },
      [disabled, currentValue, step, min, max, setValue, onChangeEnd]
    );

    // Size classes
    const sizeConfig: Record<SliderSize, { track: string; thumb: string }> = {
      xs: { track: "h-1", thumb: "h-3 w-3" },
      sm: { track: "h-1.5", thumb: "h-4 w-4" },
      md: { track: "h-2", thumb: "h-5 w-5" },
      lg: { track: "h-2.5", thumb: "h-6 w-6" },
      xl: { track: "h-3", thumb: "h-7 w-7" },
    };

    // Radius classes
    const getRadiusClass = () => {
      if (radius === undefined) return "rounded-full";
      if (typeof radius === "number") return "";
      const radiusMap: Record<string, string> = {
        xs: "rounded-sm",
        sm: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      };
      return radiusMap[radius] || "rounded-full";
    };

    const radiusStyle: React.CSSProperties =
      typeof radius === "number" ? { borderRadius: `${radius}px` } : {};

    // Format label
    const formatLabel = (val: number): React.ReactNode => {
      if (label === null) return null;
      if (typeof label === "function") return label(val);
      if (label !== undefined) return label;
      return val;
    };

    const showLabel =
      label !== null && (labelAlwaysOn || (showLabelOnHover && (isDragging || isHovered)));

    // Color classes for theme colors
    const getColorClasses = () => {
      if (!color) return { track: "bg-primary", border: "border-primary", mark: "bg-primary" };
      const colorMap: Record<string, { track: string; border: string; mark: string }> = {
        primary: { track: "bg-primary", border: "border-primary", mark: "bg-primary" },
        secondary: { track: "bg-secondary", border: "border-secondary", mark: "bg-secondary" },
        success: { track: "bg-success", border: "border-success", mark: "bg-success" },
        warning: { track: "bg-warning", border: "border-warning", mark: "bg-warning" },
        error: { track: "bg-error", border: "border-error", mark: "bg-error" },
      };
      return colorMap[color] || { track: "bg-primary", border: "border-primary", mark: "bg-primary" };
    };

    const colorClasses = getColorClasses();

    return (
      <div
        ref={ref}
        className={cn(
          "relative py-4",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {/* Track container - this is what we position relative to */}
        <div
          ref={trackRef}
          className={cn(
            "relative w-full cursor-pointer",
            sizeConfig[size].track,
            getRadiusClass(),
            "bg-gray-200 dark:bg-gray-700",
            disabled && "cursor-not-allowed"
          )}
          style={radiusStyle}
          onMouseDown={handleTrackMouseDown}
          onTouchStart={handleTrackTouchStart}
        >
          {/* Filled track */}
          <div
            className={cn(
              "absolute top-0 h-full",
              getRadiusClass(),
              colorClasses.track
            )}
            style={{
              ...radiusStyle,
              ...(inverted
                ? { right: 0, width: `${100 - position}%` }
                : { left: 0, width: `${position}%` }),
            }}
          />

          {/* Marks */}
          {marks?.map((mark) => {
            const markPosition = getPositionFromValue(mark.value, min, max);
            const isActive = inverted
              ? mark.value >= currentValue
              : mark.value <= currentValue;

            return (
              <div
                key={mark.value}
                className="absolute top-1/2 -translate-y-1/2"
                style={{ left: `${markPosition}%` }}
              >
                <div
                  className={cn(
                    "w-1.5 h-1.5 rounded-full -translate-x-1/2",
                    isActive ? colorClasses.mark : "bg-gray-400 dark:bg-gray-500"
                  )}
                />
                {mark.label && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-text-secondary whitespace-nowrap">
                    {mark.label}
                  </div>
                )}
              </div>
            );
          })}

          {/* Thumb - inside track for proper positioning */}
          <div
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={currentValue}
            aria-label={thumbLabel}
            aria-disabled={disabled}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 -translate-x-1/2",
              "bg-white border-2 shadow-md",
              "transition-transform",
              !disabled && "hover:scale-110 focus:scale-110",
              !disabled && "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              isDragging && "scale-110",
              sizeConfig[size].thumb,
              getRadiusClass(),
              colorClasses.border
            )}
            style={{
              left: `${position}%`,
              ...radiusStyle,
            }}
            onKeyDown={handleKeyDown}
          >
            {/* Label tooltip */}
            {showLabel && (
              <div
                className={cn(
                  "absolute bottom-full left-1/2 -translate-x-1/2 mb-2",
                  "px-2 py-1 rounded text-xs font-medium",
                  "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900",
                  "whitespace-nowrap",
                  labelTransition && "transition-opacity duration-150",
                  showLabel ? "opacity-100" : "opacity-0"
                )}
              >
                {formatLabel(currentValue)}
                {/* Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";
