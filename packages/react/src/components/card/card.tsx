"use client";

import React from "react";
import { cn } from "../../utils/cn";

/**
 * Card component props
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card content */
  children?: React.ReactNode;
  /** Whether card has padding */
  padded?: boolean;
  /** Whether card is interactive (hover effects) */
  interactive?: boolean;
}

/**
 * Card header props
 */
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * Card title props
 */
export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  /** Heading level (h1-h6) */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

/**
 * Card description props
 */
export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
}

/**
 * Card content props
 */
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * Card footer props
 */
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
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
  className,
  ...props
}: CardProps) {
  const baseClasses =
    "rounded-lg border border-border bg-background text-foreground shadow-sm";
  const paddedClasses = padded ? "p-6" : "";
  const interactiveClasses = interactive
    ? "transition-colors hover:bg-muted/50 cursor-pointer"
    : "";

  return (
    <div
      className={cn(baseClasses, paddedClasses, interactiveClasses, className)}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Card header component
 * Typically contains title and description
 */
export function CardHeader({
  children,
  className,
  ...props
}: CardHeaderProps) {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props}>
      {children}
    </div>
  );
}

/**
 * Card title component
 * Heading element for card titles
 */
export function CardTitle({
  children,
  as: Component = "h3",
  className,
  ...props
}: CardTitleProps) {
  return (
    <Component
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * Card description component
 * Muted text for card descriptions
 */
export function CardDescription({
  children,
  className,
  ...props
}: CardDescriptionProps) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  );
}

/**
 * Card content component
 * Main content area of the card
 */
export function CardContent({
  children,
  className,
  ...props
}: CardContentProps) {
  return (
    <div className={cn("p-6 pt-0", className)} {...props}>
      {children}
    </div>
  );
}

/**
 * Card footer component
 * Footer area of the card
 */
export function CardFooter({
  children,
  className,
  ...props
}: CardFooterProps) {
  return (
    <div
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    >
      {children}
    </div>
  );
}
