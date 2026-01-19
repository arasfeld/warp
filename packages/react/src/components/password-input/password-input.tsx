"use client";

import React, { forwardRef, useState, useCallback } from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "../../utils/cn";
import { Input, InputWrapper } from "../input/input";
import type { InputProps, InputSize, InputVariant, InputWrapperProps } from "../input/input";

/**
 * PasswordInput component props
 */
export interface PasswordInputProps
  extends Omit<InputProps, "component" | "multiline" | "type" | "rightSection">,
    Omit<InputWrapperProps, "children" | "id" | "size" | "error"> {
  /** Input size */
  size?: InputSize;
  /** Input variant */
  variant?: InputVariant;
  /** Error state or message */
  error?: boolean | React.ReactNode;
  /** Controlled visibility state */
  visible?: boolean;
  /** Called when visibility changes */
  onVisibilityChange?: (visible: boolean) => void;
  /** Default visibility state (uncontrolled) */
  defaultVisible?: boolean;
  /** Custom visibility toggle icon */
  visibilityToggleIcon?: (props: { reveal: boolean }) => React.ReactNode;
  /** Button label for accessibility */
  visibilityToggleButtonProps?: React.ComponentPropsWithoutRef<"button">;
  /** Hide visibility toggle button */
  hideToggle?: boolean;
}

/**
 * Default visibility toggle icon
 */
function DefaultVisibilityIcon({ reveal }: { reveal: boolean }) {
  const Icon = reveal ? EyeOff : Eye;
  return <Icon className="h-4 w-4" />;
}

/**
 * PasswordInput component
 * Password input with visibility toggle
 *
 * @example
 * ```tsx
 * <PasswordInput
 *   label="Password"
 *   placeholder="Enter your password"
 * />
 *
 * // Controlled visibility
 * const [visible, setVisible] = useState(false);
 * <PasswordInput
 *   label="Password"
 *   visible={visible}
 *   onVisibilityChange={setVisible}
 * />
 * ```
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      // Wrapper props
      label,
      description,
      required,
      withAsterisk,
      inputWrapperOrder,
      labelElement,
      labelProps,
      descriptionProps,
      errorProps,
      inputContainer,
      // Password-specific props
      visible: controlledVisible,
      onVisibilityChange,
      defaultVisible = false,
      visibilityToggleIcon: VisibilityIcon = DefaultVisibilityIcon,
      visibilityToggleButtonProps,
      hideToggle = false,
      // Input props
      size = "sm",
      variant = "default",
      radius,
      disabled,
      error,
      withErrorStyles = true,
      leftSection,
      leftSectionWidth,
      leftSectionPointerEvents,
      leftSectionProps,
      rightSectionWidth,
      rightSectionPointerEvents,
      rightSectionProps,
      pointer,
      withAria = true,
      wrapperProps,
      inputSize,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const [uncontrolledVisible, setUncontrolledVisible] = useState(defaultVisible);

    // Determine if controlled or uncontrolled
    const isControlled = controlledVisible !== undefined;
    const visible = isControlled ? controlledVisible : uncontrolledVisible;

    const toggleVisibility = useCallback(() => {
      const newVisible = !visible;
      if (!isControlled) {
        setUncontrolledVisible(newVisible);
      }
      onVisibilityChange?.(newVisible);
    }, [visible, isControlled, onVisibilityChange]);

    const hasWrapper = label || description || error;

    // Visibility toggle button
    const visibilityToggle = !hideToggle && !disabled && (
      <button
        type="button"
        onClick={toggleVisibility}
        className={cn(
          "flex items-center justify-center rounded transition-colors",
          "text-text-secondary hover:text-text-primary",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        )}
        aria-label={visible ? "Hide password" : "Show password"}
        tabIndex={-1}
        {...visibilityToggleButtonProps}
      >
        <VisibilityIcon reveal={visible} />
      </button>
    );

    const inputElement = (
      <Input
        ref={ref}
        id={id}
        type={visible ? "text" : "password"}
        size={size}
        variant={variant}
        radius={radius}
        disabled={disabled}
        error={error}
        withErrorStyles={withErrorStyles}
        leftSection={leftSection}
        rightSection={visibilityToggle}
        leftSectionWidth={leftSectionWidth}
        rightSectionWidth={rightSectionWidth}
        leftSectionPointerEvents={leftSectionPointerEvents}
        rightSectionPointerEvents="auto"
        leftSectionProps={leftSectionProps}
        rightSectionProps={rightSectionProps}
        pointer={pointer}
        withAria={withAria}
        wrapperProps={wrapperProps}
        inputSize={inputSize}
        required={required}
        className={className}
        {...props}
      />
    );

    if (!hasWrapper) {
      return inputElement;
    }

    return (
      <InputWrapper
        id={id}
        label={label}
        description={description}
        error={typeof error === "boolean" ? undefined : error}
        required={required}
        withAsterisk={withAsterisk}
        size={size}
        inputWrapperOrder={inputWrapperOrder}
        labelElement={labelElement}
        labelProps={labelProps}
        descriptionProps={descriptionProps}
        errorProps={errorProps}
        inputContainer={inputContainer}
      >
        {inputElement}
      </InputWrapper>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
