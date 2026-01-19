"use client";

import React, { forwardRef } from "react";

import { Input, InputWrapper } from "../input/input";
import type { InputProps, InputSize, InputVariant, InputWrapperProps } from "../input/input";

/**
 * TextInput component props
 * Combines Input and Input.Wrapper props
 */
export interface TextInputProps
  extends Omit<InputProps, "component" | "multiline">,
    Omit<InputWrapperProps, "children" | "id" | "size" | "error"> {
  /** Input size */
  size?: InputSize;
  /** Input variant */
  variant?: InputVariant;
  /** Error state or message */
  error?: boolean | React.ReactNode;
}

/**
 * TextInput component
 * Capture string input from user with label, description, and error support
 *
 * @example
 * ```tsx
 * <TextInput
 *   label="Email"
 *   placeholder="your@email.com"
 *   description="We'll never share your email"
 * />
 *
 * <TextInput
 *   label="Username"
 *   error="Username is required"
 *   required
 * />
 * ```
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
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
      // Input props
      size = "sm",
      variant = "default",
      radius,
      disabled,
      error,
      withErrorStyles = true,
      leftSection,
      rightSection,
      leftSectionWidth,
      rightSectionWidth,
      leftSectionPointerEvents,
      rightSectionPointerEvents,
      leftSectionProps,
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
    const hasWrapper = label || description || error;

    const inputElement = (
      <Input
        ref={ref}
        id={id}
        type="text"
        size={size}
        variant={variant}
        radius={radius}
        disabled={disabled}
        error={error}
        withErrorStyles={withErrorStyles}
        leftSection={leftSection}
        rightSection={rightSection}
        leftSectionWidth={leftSectionWidth}
        rightSectionWidth={rightSectionWidth}
        leftSectionPointerEvents={leftSectionPointerEvents}
        rightSectionPointerEvents={rightSectionPointerEvents}
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

TextInput.displayName = "TextInput";
