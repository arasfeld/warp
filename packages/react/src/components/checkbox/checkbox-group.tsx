"use client";

import React, { createContext, useContext, useCallback, useMemo } from "react";
import { cn } from "../../utils/cn";
import {
  InputWrapper,
  InputLabel,
  InputDescription,
  InputError,
} from "../input/input";

/**
 * Checkbox.Group context value
 */
interface CheckboxGroupContextValue {
  /** Current value(s) */
  value: string[];
  /** Handle checkbox change */
  onChange: (checkboxValue: string, checked: boolean) => void;
  /** Whether a checkbox is checked */
  isChecked: (checkboxValue: string) => boolean;
  /** Whether group is disabled */
  disabled?: boolean;
  /** Size for all checkboxes */
  size?: string;
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(
  null
);

/**
 * Hook to access Checkbox.Group context
 */
function useCheckboxGroup() {
  const context = useContext(CheckboxGroupContext);
  return context;
}

/**
 * Checkbox.Group props
 */
export interface CheckboxGroupProps {
  /** Checkbox components and any other elements */
  children: React.ReactNode;
  /** Controlled component value */
  value?: string[];
  /** Uncontrolled component initial value */
  defaultValue?: string[];
  /** Called when value changes */
  onChange?: (value: string[]) => void;
  /** Label for the group */
  label?: React.ReactNode;
  /** Description displayed below the label */
  description?: React.ReactNode;
  /** Error message displayed below the label */
  error?: React.ReactNode;
  /** Sets disabled attribute on all checkboxes */
  disabled?: boolean;
  /** Controls size of the Input.Wrapper */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | (string & {});
  /** Adds required attribute to the input and a red asterisk on the right side of label */
  required?: boolean;
  /** If set, the required asterisk is displayed next to the label */
  withAsterisk?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Checkbox.Group component
 * Manages state of child Checkbox components
 */
export function CheckboxGroup({
  children,
  value: controlledValue,
  defaultValue,
  onChange,
  label,
  description,
  error,
  disabled = false,
  size = "sm",
  required = false,
  withAsterisk = false,
  className,
}: CheckboxGroupProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string[]>(
    defaultValue || []
  );

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : uncontrolledValue;

  const isChecked = useCallback(
    (checkboxValue: string): boolean => {
      return currentValue.includes(checkboxValue);
    },
    [currentValue]
  );

  const handleChange = useCallback(
    (checkboxValue: string, checked: boolean) => {
      let newValue: string[];

      if (checked) {
        newValue = [...currentValue, checkboxValue];
      } else {
        newValue = currentValue.filter((v) => v !== checkboxValue);
      }

      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onChange?.(newValue);
    },
    [currentValue, isControlled, onChange]
  );

  const contextValue = useMemo<CheckboxGroupContextValue>(
    () => ({
      value: currentValue,
      onChange: handleChange,
      isChecked,
      disabled,
      size: typeof size === "string" ? size : "sm",
    }),
    [currentValue, handleChange, isChecked, disabled, size]
  );

  const showAsterisk = withAsterisk || required;

  const content = (
    <CheckboxGroupContext.Provider value={contextValue}>
      <div className={cn("space-y-2", className)}>{children}</div>
    </CheckboxGroupContext.Provider>
  );

  // If we have label, description, or error, wrap with InputWrapper
  if (label || description || error) {
    const normalizedSize = typeof size === "string" ? (size as "xs" | "sm" | "md" | "lg" | "xl") : "sm";
    return (
      <InputWrapper
        id={undefined}
        size={normalizedSize}
        error={error}
        description={description}
      >
        {label && (
          <InputLabel
            required={showAsterisk || required}
            labelElement="div"
          >
            {label}
          </InputLabel>
        )}
        {content}
      </InputWrapper>
    );
  }

  return content;
}

// Export the hook for Checkbox component to use
export { useCheckboxGroup };
