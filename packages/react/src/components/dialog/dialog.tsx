"use client";

import React, {
  forwardRef,
  useEffect,
  useCallback,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { cn } from "../../utils/cn";

/**
 * Dialog size options
 */
export type DialogSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";

/**
 * Dialog component props
 */
export interface DialogProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Whether dialog is open */
  opened: boolean;
  /** Called when dialog should close */
  onClose: () => void;
  /** Dialog title */
  title?: React.ReactNode;
  /** Whether to show close button */
  withCloseButton?: boolean;
  /** Close on escape key press */
  closeOnEscape?: boolean;
  /** Close on clicking overlay */
  closeOnClickOutside?: boolean;
  /** Dialog size */
  size?: DialogSize;
  /** Center dialog vertically */
  centered?: boolean;
  /** Border radius */
  radius?: string | number;
  /** Whether to render overlay */
  withOverlay?: boolean;
  /** Overlay opacity */
  overlayOpacity?: number;
  /** Overlay blur */
  overlayBlur?: number;
  /** Additional className for the dialog content */
  className?: string;
  /** Children content */
  children?: React.ReactNode;
}

/**
 * Dialog component
 * Modal dialog for focused interactions
 *
 * @example
 * ```tsx
 * const [opened, setOpened] = useState(false);
 *
 * <Button onClick={() => setOpened(true)}>Open Dialog</Button>
 * <Dialog opened={opened} onClose={() => setOpened(false)} title="Confirm">
 *   Are you sure you want to continue?
 * </Dialog>
 * ```
 */
export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      opened,
      onClose,
      title,
      withCloseButton = true,
      closeOnEscape = true,
      closeOnClickOutside = true,
      size = "md",
      centered = true,
      radius = "lg",
      withOverlay = true,
      overlayOpacity = 0.5,
      overlayBlur = 0,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    // Handle mounting for portal
    useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
    }, []);

    // Handle escape key
    useEffect(() => {
      if (!opened || !closeOnEscape) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [opened, closeOnEscape, onClose]);

    // Lock body scroll when open
    useEffect(() => {
      if (opened) {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
          document.body.style.overflow = originalOverflow;
        };
      }
    }, [opened]);

    // Focus trap and initial focus
    useEffect(() => {
      if (!opened) return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      // Focus the dialog or first focusable element
      const focusableElements = dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length > 0 && focusableElements[0]) {
        focusableElements[0].focus();
      } else if (dialog) {
        dialog.focus();
      }
    }, [opened]);

    const handleOverlayClick = useCallback(
      (e: React.MouseEvent) => {
        if (closeOnClickOutside && e.target === e.currentTarget) {
          onClose();
        }
      },
      [closeOnClickOutside, onClose]
    );

    // Size classes
    const sizeClasses: Record<DialogSize, string> = {
      xs: "max-w-xs",
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      full: "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]",
    };

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
      return radiusMap[radius] || "rounded-lg";
    };

    const radiusStyle: React.CSSProperties =
      typeof radius === "number" ? { borderRadius: `${radius}px` } : {};

    if (!mounted || !opened) {
      return null;
    }

    const overlayStyle: React.CSSProperties = {
      backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
      ...(overlayBlur > 0 && { backdropFilter: `blur(${overlayBlur}px)` }),
    };

    const dialogContent = (
      <div
        className={cn(
          "fixed inset-0 z-[9999] flex",
          centered ? "items-center" : "items-start pt-[10vh]",
          "justify-center p-4"
        )}
        aria-modal="true"
        role="dialog"
        aria-labelledby={title ? "dialog-title" : undefined}
      >
        {/* Overlay - clickable to close */}
        {withOverlay && (
          <div
            className="absolute inset-0 transition-opacity"
            style={{
              backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
              ...(overlayBlur > 0 && { backdropFilter: `blur(${overlayBlur}px)` }),
            }}
            onClick={closeOnClickOutside ? onClose : undefined}
            aria-hidden="true"
          />
        )}

        {/* Dialog */}
        <div
          ref={(node) => {
            // Handle both refs
            (dialogRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          className={cn(
            "relative w-full bg-white dark:bg-gray-900 shadow-xl",
            "transform transition-all",
            "focus:outline-none",
            sizeClasses[size],
            getRadiusClass(),
            className
          )}
          style={radiusStyle}
          tabIndex={-1}
          {...props}
        >
          {/* Header */}
          {(title || withCloseButton) && (
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
              {title && (
                <h2
                  id="dialog-title"
                  className="text-lg font-semibold text-foreground"
                >
                  {title}
                </h2>
              )}
              {withCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className={cn(
                    "p-2 -mr-2 rounded-md transition-colors",
                    "text-muted-foreground hover:text-foreground",
                    "hover:bg-action-hover",
                    !title && "ml-auto"
                  )}
                  aria-label="Close dialog"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="px-6 pb-6">{children}</div>
        </div>
      </div>
    );

    return createPortal(dialogContent, document.body);
  }
);

Dialog.displayName = "Dialog";

/**
 * Dialog.Header component props
 */
export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Dialog.Header component
 * Optional header section for custom dialog layouts
 */
export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("px-6 pt-6 pb-2", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DialogHeader.displayName = "DialogHeader";

/**
 * Dialog.Body component props
 */
export interface DialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Dialog.Body component
 * Main content area with optional scrolling
 */
export const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("px-6 py-4 overflow-y-auto", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DialogBody.displayName = "DialogBody";

/**
 * Dialog.Footer component props
 */
export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Dialog.Footer component
 * Footer section for actions
 */
export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "px-6 py-4 flex items-center justify-end gap-3",
          "border-t border-divider",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DialogFooter.displayName = "DialogFooter";
