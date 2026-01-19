"use client";

import React, { createContext, useContext, useCallback, useMemo } from "react";

import { cn } from "../../utils/cn";
import { InputWrapper, InputLabel } from "../input/input";

/**
 * Radio.Group context value
 */
interface RadioGroupContextValue {
  /** Current value */
  value: string | null;
  /** Handle radio change */
  onChange: (radioValue: string) => void;
  /** Whether a radio is checked */
  isChecked: (radioValue: string) => boolean;
  /** Whether group is disabled */
  disabled?: boolean;
  /** Size for all radios */
  size?: string;
  /** Name for all radios in the group */
  name: string;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

/**
 * Hook to access Radio.Group context
 */
function useRadioGroup() {
  const context = useContext(RadioGroupContext);
  return context;
}

/**
 * Gap size type
 */
type GapSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Radio.Group props
 */
export interface RadioGroupProps {
  /** Radio components and any other elements */
  children: React.ReactNode;
  /** Controlled component value */
  value?: string | null;
  /** Uncontrolled component initial value */
  defaultValue?: string | null;
  /** Called when value changes */
  onChange?: (value: string) => void;
  /** Label for the group */
  label?: React.ReactNode;
  /** Description displayed below the label */
  description?: React.ReactNode;
  /** Error message displayed below the label */
  error?: React.ReactNode;
  /** Sets disabled attribute on all radios */
  disabled?: boolean;
  /** Controls size of the Input.Wrapper */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Adds required attribute to the input and a red asterisk on the right side of label */
  required?: boolean;
  /** If set, the required asterisk is displayed next to the label */
  withAsterisk?: boolean;
  /** Name attribute for all radios (auto-generated if not provided) */
  name?: string;
  /** Orientation of radio buttons (default: vertical) */
  orientation?: "horizontal" | "vertical";
  /** Gap between radio buttons (default: sm) */
  gap?: GapSize;
  /** Additional className */
  className?: string;
}

/**
 * Radio.Group component
 * Manages state of child Radio components
 */
// Gap classes for different sizes
const gapClasses: Record<GapSize, { vertical: string; horizontal: string }> = {
  xs: { vertical: "space-y-1", horizontal: "gap-2" },
  sm: { vertical: "space-y-2", horizontal: "gap-4" },
  md: { vertical: "space-y-3", horizontal: "gap-6" },
  lg: { vertical: "space-y-4", horizontal: "gap-8" },
  xl: { vertical: "space-y-5", horizontal: "gap-10" },
};

export function RadioGroup({
  children,
  value: controlledValue,
  defaultValue = null,
  onChange,
  label,
  description,
  error,
  disabled = false,
  size = "sm",
  required = false,
  withAsterisk = false,
  name: providedName,
  orientation = "vertical",
  gap = "sm",
  className,
}: RadioGroupProps) {
  const generatedName = React.useId();
  const name = providedName || `radio-group-${generatedName}`;

  const [uncontrolledValue, setUncontrolledValue] = React.useState<
    string | null
  >(defaultValue);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : uncontrolledValue;

  const isChecked = useCallback(
    (radioValue: string): boolean => {
      return currentValue === radioValue;
    },
    [currentValue]
  );

  const handleChange = useCallback(
    (radioValue: string) => {
      if (!isControlled) {
        setUncontrolledValue(radioValue);
      }
      onChange?.(radioValue);
    },
    [isControlled, onChange]
  );

  const contextValue = useMemo<RadioGroupContextValue>(
    () => ({
      value: currentValue,
      onChange: handleChange,
      isChecked,
      disabled,
      size,
      name,
    }),
    [currentValue, handleChange, isChecked, disabled, size, name]
  );

  const showAsterisk = withAsterisk || required;

  const gapConfig = gapClasses[gap];
  const layoutClasses = orientation === "horizontal"
    ? cn("flex flex-wrap items-center", gapConfig.horizontal)
    : cn("flex flex-col", gapConfig.vertical);

  const content = (
    <RadioGroupContext.Provider value={contextValue}>
      <div role="radiogroup" className={cn(layoutClasses, className)}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );

  // If we have label, description, or error, wrap with custom layout
  if (label || description || error) {
    return (
      <div className="w-full">
        {label && (
          <InputLabel required={showAsterisk || required} labelElement="div" className="mb-1">
            {label}
          </InputLabel>
        )}
        {description && (
          <div className="text-sm text-muted-foreground mb-3">
            {description}
          </div>
        )}
        {content}
        {error && (
          <div className="text-sm text-error mt-2" role="alert">
            {error}
          </div>
        )}
      </div>
    );
  }

  return content;
}

// Export the hook for Radio component to use
export { useRadioGroup };
