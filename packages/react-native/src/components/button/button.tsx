import React from "react";
import { Pressable, Text, type PressableProps, type TextStyle, type ViewStyle } from "react-native";
import { useTheme, type RNTheme } from "../../theme";

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
  children: React.ReactNode;
  /** Button variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Custom style override */
  style?: ViewStyle;
  /** Custom text style override */
  textStyle?: TextStyle;
  /** Whether button is disabled */
  disabled?: boolean;
}

/**
 * Button component
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
  variant = "primary",
  size = "md",
  style,
  textStyle,
  disabled = false,
  ...pressableProps
}: ButtonProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[`${size}Size`],
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <Pressable
      style={buttonStyle}
      disabled={disabled}
      {...pressableProps}
    >
      {({ pressed }) => (
        <Text
          style={[
            textStyles,
            pressed && styles.pressed,
          ]}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
}

const createStyles = (theme: RNTheme) => ({
  base: {
    borderRadius: 8,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary || theme.colors.mutedBackground,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.colors.border || theme.colors.foreground,
  },
  smSize: {
    paddingHorizontal: theme.spacing[3] || 12,
    paddingVertical: theme.spacing[2] || 8,
    minHeight: 32,
  },
  mdSize: {
    paddingHorizontal: theme.spacing[4] || 16,
    paddingVertical: theme.spacing[3] || 12,
    minHeight: 40,
  },
  lgSize: {
    paddingHorizontal: theme.spacing[6] || 24,
    paddingVertical: theme.spacing[4] || 16,
    minHeight: 48,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: "600" as const,
  },
  primaryText: {
    color: theme.colors.foreground, // Will need better contrast handling
  },
  secondaryText: {
    color: theme.colors.foreground,
  },
  outlineText: {
    color: theme.colors.foreground,
  },
  smText: {
    fontSize: theme.typography.fontSize.sm || 14,
  },
  mdText: {
    fontSize: theme.typography.fontSize.base || 16,
  },
  lgText: {
    fontSize: theme.typography.fontSize.lg || 18,
  },
  disabledText: {
    opacity: 0.7,
  },
  pressed: {
    opacity: 0.8,
  },
});
