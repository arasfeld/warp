"use client";

import React, { forwardRef, useState } from "react";

import { cn } from "../../utils/cn";

/**
 * Alert variant types
 */
export type AlertVariant = "default" | "destructive" | "warning" | "info" | "success";

/**
 * Alert component props
 */
export interface AlertProps extends Omit<React.ComponentProps<"div">, "title"> {
  /** Alert variant */
  variant?: AlertVariant;
  /** Alert title */
  title?: React.ReactNode;
  /** Alert description/content */
  children?: React.ReactNode;
  /** Show close button */
  withCloseButton?: boolean;
  /** Close button aria-label */
  closeButtonLabel?: string;
  /** Icon to display */
  icon?: React.ReactNode;
  /** Called when close button is clicked */
  onClose?: () => void;
}

/**
 * Alert component
 * Displays important messages with semantic styling
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = "default",
      title,
      children,
      withCloseButton = false,
      closeButtonLabel = "Dismiss",
      icon,
      onClose,
      className,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
      setIsVisible(false);
      onClose?.();
    };

    if (!isVisible) {
      return null;
    }

    const variantStyles = {
      default: "bg-surface border border-divider text-text-primary",
      destructive: "bg-error/10 border-error/20 text-error",
      warning: "bg-warning/10 border-warning/20 text-warning",
      info: "bg-info/10 border-info/20 text-info",
      success: "bg-success/10 border-success/20 text-success",
    };

    const iconStyles = {
      default: "text-text-secondary",
      destructive: "text-error",
      warning: "text-warning",
      info: "text-info",
      success: "text-success",
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          // Base styles
          "relative w-full rounded-lg border p-4 text-sm",
          // Flex layout for icon + content
          "flex gap-3 items-start",
          variantStyles[variant],
          className
        )}
        {...props}
      >
      {/* Icon */}
      {icon && (
        <div className={cn("flex-shrink-0 [&>svg]:size-4", iconStyles[variant])}>
          {icon}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <div
            className="font-medium leading-tight mb-1"
            data-slot="alert-title"
          >
            {title}
          </div>
        )}
        
        {children && (
          <div
            className="text-text-secondary leading-relaxed text-sm"
            data-slot="alert-description"
          >
            {children}
          </div>
        )}
      </div>

      {/* Close button */}
      {withCloseButton && (
        <button
          type="button"
          onClick={handleClose}
          aria-label={closeButtonLabel}
          className={cn(
            "absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100",
            "focus:outline-none focus:ring-2 focus:ring-action-hover focus:ring-offset-2",
            iconStyles[variant]
          )}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
  }
);

Alert.displayName = "Alert";
