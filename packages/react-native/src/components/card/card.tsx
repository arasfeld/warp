import React from "react";
import { View, Text, type StyleProp, type ViewStyle, type TextStyle } from "react-native";
import { cn } from "../../utils/cn";

/**
 * Card component props
 */
export interface CardProps {
  /** Card content */
  children?: React.ReactNode;
  /** Whether card has padding */
  padded?: boolean;
  /** Whether card is interactive (pressed effects) */
  interactive?: boolean;
  /** Custom style override */
  style?: StyleProp<ViewStyle>;
}

/**
 * Card header props
 */
export interface CardHeaderProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Card title props
 */
export interface CardTitleProps {
  children?: React.ReactNode;
  /** Heading level (affects font size) */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  style?: StyleProp<TextStyle>;
}

/**
 * Card description props
 */
export interface CardDescriptionProps {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

/**
 * Card content props
 */
export interface CardContentProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Card footer props
 */
export interface CardFooterProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Card component
 * Container component with optional header, content, and footer sections
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *     <CardDescription>Description</CardDescription>
 *   </CardHeader>
 *   <CardContent>Content</CardContent>
 *   <CardFooter>Footer</CardFooter>
 * </Card>
 * ```
 */
export function Card({
  children,
  padded = false,
  interactive = false,
  style,
  ...props
}: CardProps) {
  const baseClasses = "rounded-lg border border-border bg-background";
  const paddedClasses = padded ? "p-6" : "";
  const interactiveClasses = interactive
    ? "active:opacity-70"
    : "";

  return (
    <View
      className={cn(baseClasses, paddedClasses, interactiveClasses)}
      style={style}
      {...props}
    >
      {children}
    </View>
  );
}

/**
 * Card header component
 * Typically contains title and description
 */
export function CardHeader({
  children,
  style,
  ...props
}: CardHeaderProps) {
  return (
    <View
      className="flex-col space-y-1.5 p-6"
      style={style}
      {...props}
    >
      {children}
    </View>
  );
}

/**
 * Card title component
 * Heading element for card titles
 */
export function CardTitle({
  children,
  level = 3,
  style,
  ...props
}: CardTitleProps) {
  const levelClasses = {
    1: "text-4xl font-bold",
    2: "text-3xl font-bold",
    3: "text-2xl font-semibold",
    4: "text-xl font-semibold",
    5: "text-lg font-semibold",
    6: "text-base font-semibold",
  };

  return (
    <Text
      className={cn(levelClasses[level], "leading-none tracking-tight text-foreground")}
      style={style}
      {...props}
    >
      {children}
    </Text>
  );
}

/**
 * Card description component
 * Muted text for card descriptions
 */
export function CardDescription({
  children,
  style,
  ...props
}: CardDescriptionProps) {
  return (
    <Text
      className="text-sm text-muted-foreground"
      style={style}
      {...props}
    >
      {children}
    </Text>
  );
}

/**
 * Card content component
 * Main content area of the card
 */
export function CardContent({
  children,
  style,
  ...props
}: CardContentProps) {
  return (
    <View
      className="p-6 pt-0"
      style={style}
      {...props}
    >
      {children}
    </View>
  );
}

/**
 * Card footer component
 * Footer area of the card
 */
export function CardFooter({
  children,
  style,
  ...props
}: CardFooterProps) {
  return (
    <View
      className="flex-row items-center p-6 pt-0"
      style={style}
      {...props}
    >
      {children}
    </View>
  );
}
