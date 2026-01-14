import React from "react";
import {
  ActivityIndicator,
  Pressable,
  Text as RNText,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { useTheme } from "../../theme";
import { cn } from "../../utils/cn";

/**
 * Button variant
 */
export type ButtonVariant = "primary" | "secondary" | "outline";

/**
 * Button size
 */
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Button props
 */
export interface ButtonProps extends Omit<PressableProps, "style"> {
  /** Button text/content */
  children?: React.ReactNode;
  /** Button variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Custom style override */
  style?: StyleProp<ViewStyle>;
  /** Custom text style override */
  textStyle?: StyleProp<TextStyle>;
  /** Whether button is disabled */
  disabled?: boolean;
  /** Whether button is in loading state */
  loading?: boolean;
}

/**
 * Button component
 * Uses CSS variables via Tailwind classes (shadcn/ui approach)
 * Uses NativeWind v4's `active:` pseudo-class for pressed states
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onPress={() => console.log('pressed')}>
 *   Click me
 * </Button>
 * ```
 */
export function Button({
  children,
  disabled = false,
  loading = false,
  size = "md",
  style,
  textStyle,
  variant = "primary",
  ...props
}: ButtonProps) {
  const { theme } = useTheme();

  // Base classes - layout and structure
  const baseClasses = "items-center justify-center flex-row rounded-md";

  // Variant classes using CSS variables (defined in tailwind.config.js)
  // Use `active:` prefix for pressed state (NativeWind v4)
  const variantClasses = {
    primary: "bg-primary active:opacity-80",
    secondary: "bg-secondary active:opacity-70",
    outline:
      "bg-background border border-border active:bg-muted active:opacity-90",
  };

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-2 min-h-[32px]",
    md: "px-4 py-3 min-h-[40px]",
    lg: "px-6 py-4 min-h-[48px]",
  };

  // Text size classes
  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  // Text variant classes using CSS variables
  const textVariantClasses = {
    primary: "text-primary-foreground",
    secondary: "text-secondary-foreground",
    outline: "text-foreground",
  };

  const buttonClassName = cn(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    disabled && "opacity-50"
  );

  const textClassName = cn(
    "font-medium text-center",
    textSizeClasses[size],
    textVariantClasses[variant],
    disabled && "opacity-50"
  );

  return (
    <Pressable
      disabled={disabled || loading}
      className={buttonClassName}
      style={style}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === "primary"
              ? "#ffffff" // Primary buttons have white text, so use white spinner
              : theme.colors.primary
          }
          size="small"
        />
      ) : (
        <RNText className={textClassName} style={textStyle}>
          {children}
        </RNText>
      )}
    </Pressable>
  );
}
