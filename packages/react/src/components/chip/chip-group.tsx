"use client";

import React, { createContext, useContext, useCallback, useMemo } from "react";
import { cn } from "../../utils/cn";

/**
 * Chip.Group context value
 */
interface ChipGroupContextValue {
  /** Current value(s) */
  value: string | string[] | null;
  /** Multiple selection mode */
  multiple: boolean;
  /** Handle chip change */
  onChange: (chipValue: string, checked: boolean) => void;
  /** Whether a chip is checked */
  isChecked: (chipValue: string) => boolean;
}

const ChipGroupContext = createContext<ChipGroupContextValue | null>(null);

/**
 * Hook to access Chip.Group context
 */
function useChipGroup() {
  const context = useContext(ChipGroupContext);
  return context;
}

/**
 * Chip.Group props
 */
export interface ChipGroupProps {
  /** Chip components and any other elements */
  children: React.ReactNode;
  /** If set, multiple values can be selected */
  multiple?: boolean;
  /** Controlled component value */
  value?: string | string[] | null;
  /** Uncontrolled component initial value */
  defaultValue?: string | string[] | null;
  /** Called when value changes */
  onChange?: (value: string | string[]) => void;
  /** Additional className */
  className?: string;
}

/**
 * Chip.Group component
 * Manages state of child Chip components
 */
export function ChipGroup({
  children,
  multiple = false,
  value: controlledValue,
  defaultValue,
  onChange,
  className,
}: ChipGroupProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<
    string | string[] | null
  >(defaultValue ?? (multiple ? [] : null));

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : uncontrolledValue;

  const isChecked = useCallback(
    (chipValue: string): boolean => {
      if (multiple) {
        const values = (currentValue as string[]) || [];
        return values.includes(chipValue);
      } else {
        return currentValue === chipValue;
      }
    },
    [currentValue, multiple]
  );

  const handleChange = useCallback(
    (chipValue: string, checked: boolean) => {
      if (multiple) {
        const values = ((currentValue as string[]) || []).filter(Boolean);
        let newValue: string[];
        
        if (checked) {
          newValue = [...values, chipValue];
        } else {
          newValue = values.filter((v) => v !== chipValue);
        }

        if (!isControlled) {
          setUncontrolledValue(newValue);
        }
        onChange?.(newValue);
      } else {
        const newValue = checked ? chipValue : null;
        if (!isControlled) {
          setUncontrolledValue(newValue);
        }
        onChange?.(newValue as string);
      }
    },
    [currentValue, multiple, isControlled, onChange]
  );

  const contextValue = useMemo<ChipGroupContextValue>(
    () => ({
      value: currentValue,
      multiple,
      onChange: handleChange,
      isChecked,
    }),
    [currentValue, multiple, handleChange, isChecked]
  );

  return (
    <ChipGroupContext.Provider value={contextValue}>
      <div className={cn("inline-flex flex-wrap gap-2", className)}>
        {children}
      </div>
    </ChipGroupContext.Provider>
  );
}

// Export the hook for Chip component to use
export { useChipGroup };
