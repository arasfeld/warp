import React from "react";
import {
  TextInput,
  View,
  Text,
  type TextInputProps,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from "react-native";
import { useTheme } from "../../theme";
import { cn } from "../../utils/cn";

/**
 * Input size variants
 */
export type InputSize = "sm" | "md" | "lg";

/**
 * Input variant styles
 */
export type InputVariant = "default" | "outline" | "filled";

/**
 * Input component props
 */
export interface InputProps extends Omit<TextInputProps, "style"> {
  /** Input size */
  size?: InputSize;
  /** Input variant */
  variant?: InputVariant;
  /** Whether input has an error state */
  error?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Label text */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Custom container style */
  containerStyle?: StyleProp<ViewStyle>;
  /** Custom input style */
  inputStyle?: StyleProp<TextStyle>;
}

/**
 * Input component
 * Text input with variants, sizes, and error states
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   placeholder="Enter your email"
 *   keyboardType="email-address"
 *   error={hasError}
 *   errorMessage="Invalid email"
 * />
 * ```
 */
export function Input({
  size = "md",
  variant = "default",
  error = false,
  errorMessage,
  label,
  helperText,
  containerStyle,
  inputStyle,
  ...props
}: InputProps) {
  const { theme } = useTheme();

  const sizeClasses = {
    sm: "px-3 py-2 min-h-[36px] text-sm",
    md: "px-4 py-3 min-h-[40px] text-base",
    lg: "px-4 py-4 min-h-[44px] text-lg",
  };

  const variantClasses = {
    default:
      "border border-input bg-background",
    outline:
      "border-2 border-border bg-transparent",
    filled:
      "border-0 bg-muted",
  };

  const errorClasses = error ? "border-error" : "";

  const inputClasses = cn(
    "flex w-full rounded-md text-foreground",
    "placeholder:text-muted-foreground",
    sizeClasses[size],
    variantClasses[variant],
    errorClasses
  );

  // Get placeholder color from theme (already normalized)
  const placeholderColor = theme.colors.mutedForeground || theme.colors.foreground;

  return (
    <View style={containerStyle} className="w-full">
      {label && (
        <Text className="text-sm font-medium text-foreground mb-1.5">
          {label}
        </Text>
      )}
      <TextInput
        className={inputClasses}
        style={inputStyle}
        placeholderTextColor={placeholderColor}
        {...props}
      />
      {error && errorMessage && (
        <Text className="mt-1.5 text-sm text-error">
          {errorMessage}
        </Text>
      )}
      {!error && helperText && (
        <Text className="mt-1.5 text-sm text-muted-foreground">
          {helperText}
        </Text>
      )}
    </View>
  );
}
