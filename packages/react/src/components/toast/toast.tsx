"use client";

import React, { forwardRef } from "react";
import { AlertCircle, CheckCircle2, Info, X, XCircle } from "lucide-react";

import { cn } from "../../utils/cn";
import { Loader } from "../loader";

/**
 * Toast variant/type
 */
export type ToastVariant = "default" | "success" | "error" | "warning" | "info";

/**
 * Toast component props
 */
export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Toast title */
  title?: React.ReactNode;
  /** Toast message/description */
  message?: React.ReactNode;
  /** Toast variant for styling */
  variant?: ToastVariant;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Whether to show close button */
  withCloseButton?: boolean;
  /** Close button click handler */
  onClose?: () => void;
  /** Whether toast is loading */
  loading?: boolean;
  /** Custom color */
  color?: string;
  /** Border radius */
  radius?: string | number;
  /** Additional className */
  className?: string;
  /** Children content (alternative to message) */
  children?: React.ReactNode;
}

/**
 * Toast component
 * Display brief notifications
 *
 * @example
 * ```tsx
 * <Toast title="Success" message="Your changes have been saved" variant="success" />
 * ```
 */
export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      title,
      message,
      variant = "default",
      icon,
      withCloseButton = true,
      onClose,
      loading = false,
      color,
      radius = "md",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const content = message ?? children;

    // Variant configuration
    const variantConfig: Record<
      ToastVariant,
      { icon: React.ReactNode; classes: string }
    > = {
      default: {
        icon: null,
        classes: "bg-white dark:bg-gray-900 border-divider",
      },
      success: {
        icon: <CheckCircle2 className="h-5 w-5 text-success" />,
        classes: "bg-white dark:bg-gray-900 border-success/50",
      },
      error: {
        icon: <XCircle className="h-5 w-5 text-error" />,
        classes: "bg-white dark:bg-gray-900 border-error/50",
      },
      warning: {
        icon: <AlertCircle className="h-5 w-5 text-warning" />,
        classes: "bg-white dark:bg-gray-900 border-warning/50",
      },
      info: {
        icon: <Info className="h-5 w-5 text-info" />,
        classes: "bg-white dark:bg-gray-900 border-info/50",
      },
    };

    const config = variantConfig[variant];

    // Radius classes
    const getRadiusClass = () => {
      if (typeof radius === "number") return "";
      const radiusMap: Record<string, string> = {
        xs: "rounded-sm",
        sm: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
      };
      return radiusMap[radius] || "rounded-md";
    };

    const radiusStyle: React.CSSProperties =
      typeof radius === "number" ? { borderRadius: `${radius}px` } : {};

    // Determine the icon to show
    const displayIcon = loading ? (
      <Loader size="sm" />
    ) : icon !== undefined ? (
      icon
    ) : (
      config.icon
    );

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "pointer-events-auto w-[360px] border shadow-lg",
          "flex items-start gap-3 p-4",
          getRadiusClass(),
          config.classes,
          className
        )}
        style={radiusStyle}
        {...props}
      >
        {displayIcon && (
          <div className="flex-shrink-0 mt-0.5">{displayIcon}</div>
        )}
        <div className="flex-1 min-w-0">
          {title && (
            <div className="font-medium text-text-primary">
              {title}
            </div>
          )}
          {content && (
            <div
              className={cn(
                "text-sm text-text-secondary",
                title && "mt-1"
              )}
            >
              {content}
            </div>
          )}
        </div>
        {withCloseButton && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex-shrink-0 p-1 rounded-md transition-colors text-text-secondary hover:text-text-primary hover:bg-action-hover"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);

Toast.displayName = "Toast";
