"use client";

import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";

import { cn } from "../../utils/cn";
import { Toast, ToastVariant } from "./toast";

/**
 * Toast position options
 */
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

/**
 * Toast data for the notification system
 */
export interface ToastData {
  id: string;
  title?: React.ReactNode;
  message?: React.ReactNode;
  variant?: ToastVariant;
  icon?: React.ReactNode;
  withCloseButton?: boolean;
  autoClose?: number | false;
  loading?: boolean;
  position?: ToastPosition;
}

/**
 * Toast store for managing toasts
 */
type ToastListener = (toasts: ToastData[]) => void;

const toastListeners: Set<ToastListener> = new Set();
let toastState: ToastData[] = [];
let toastIdCounter = 0;

function notifyListeners() {
  toastListeners.forEach((listener) => listener([...toastState]));
}

/**
 * Toast notification functions
 */
export const toast = {
  /**
   * Show a toast notification
   */
  show: (options: Omit<ToastData, "id">): string => {
    const id = `toast-${++toastIdCounter}`;
    const newToast: ToastData = {
      id,
      withCloseButton: true,
      autoClose: 5000,
      ...options,
    };
    toastState = [...toastState, newToast];
    notifyListeners();
    return id;
  },

  /**
   * Show a success toast
   */
  success: (
    message: React.ReactNode,
    options?: Omit<ToastData, "id" | "message" | "variant">
  ): string => {
    return toast.show({ message, variant: "success", ...options });
  },

  /**
   * Show an error toast
   */
  error: (
    message: React.ReactNode,
    options?: Omit<ToastData, "id" | "message" | "variant">
  ): string => {
    return toast.show({ message, variant: "error", ...options });
  },

  /**
   * Show a warning toast
   */
  warning: (
    message: React.ReactNode,
    options?: Omit<ToastData, "id" | "message" | "variant">
  ): string => {
    return toast.show({ message, variant: "warning", ...options });
  },

  /**
   * Show an info toast
   */
  info: (
    message: React.ReactNode,
    options?: Omit<ToastData, "id" | "message" | "variant">
  ): string => {
    return toast.show({ message, variant: "info", ...options });
  },

  /**
   * Show a loading toast
   */
  loading: (
    message: React.ReactNode,
    options?: Omit<ToastData, "id" | "message" | "loading">
  ): string => {
    return toast.show({
      message,
      loading: true,
      autoClose: false,
      withCloseButton: false,
      ...options,
    });
  },

  /**
   * Update an existing toast
   */
  update: (id: string, options: Partial<Omit<ToastData, "id">>): void => {
    toastState = toastState.map((t) =>
      t.id === id ? { ...t, ...options } : t
    );
    notifyListeners();
  },

  /**
   * Dismiss a specific toast
   */
  dismiss: (id: string): void => {
    toastState = toastState.filter((t) => t.id !== id);
    notifyListeners();
  },

  /**
   * Dismiss all toasts
   */
  dismissAll: (): void => {
    toastState = [];
    notifyListeners();
  },
};

/**
 * Hook to subscribe to toast state
 */
function useToastState(): ToastData[] {
  const [toasts, setToasts] = useState<ToastData[]>(toastState);

  useEffect(() => {
    const listener: ToastListener = (newToasts) => {
      setToasts(newToasts);
    };
    toastListeners.add(listener);
    return () => {
      toastListeners.delete(listener);
    };
  }, []);

  return toasts;
}

/**
 * Toaster component props
 */
export interface ToasterProps {
  /** Position of the toast container */
  position?: ToastPosition;
  /** Maximum number of toasts to show */
  limit?: number;
  /** Additional className for the container */
  className?: string;
}

/**
 * Toaster component
 * Container for toast notifications - place once at the root of your app
 *
 * @example
 * ```tsx
 * // In your layout/app
 * <Toaster position="top-right" />
 *
 * // Then use toast anywhere
 * toast.success("Saved successfully!")
 * ```
 */
export function Toaster({
  position = "top-right",
  limit = 5,
  className,
}: ToasterProps) {
  const toasts = useToastState();
  // Filter toasts by position - toasts without position go to default, or match this Toaster's position
  const filteredToasts = toasts.filter(
    (t) => t.position === position || (!t.position && position === "top-right")
  );
  const visibleToasts = filteredToasts.slice(-limit);
  const [mounted, setMounted] = useState(false);

  // Handle mounting for portal
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Auto-close effect
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    visibleToasts.forEach((t) => {
      if (typeof t.autoClose === "number" && t.autoClose > 0) {
        const timer = setTimeout(() => {
          toast.dismiss(t.id);
        }, t.autoClose);
        timers.push(timer);
      }
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [visibleToasts]);

  const handleClose = useCallback((id: string) => {
    toast.dismiss(id);
  }, []);

  // Position classes - using inset properties for proper positioning
  const positionClasses: Record<ToastPosition, string> = {
    "top-left": "top-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
  };

  // Flex alignment for toast stacking
  const alignmentClasses: Record<ToastPosition, string> = {
    "top-left": "items-start",
    "top-center": "items-center",
    "top-right": "items-end",
    "bottom-left": "items-start",
    "bottom-center": "items-center",
    "bottom-right": "items-end",
  };

  if (!mounted || visibleToasts.length === 0) {
    return null;
  }

  const toasterContent = (
    <div
      className={cn(
        "fixed flex flex-col gap-2 pointer-events-none",
        positionClasses[position],
        alignmentClasses[position],
        className
      )}
      style={{ zIndex: 99999 }}
      aria-live="polite"
      aria-label="Notifications"
    >
      {visibleToasts.map((t) => (
        <Toast
          key={t.id}
          title={t.title}
          message={t.message}
          variant={t.variant}
          icon={t.icon}
          withCloseButton={t.withCloseButton}
          onClose={() => handleClose(t.id)}
          loading={t.loading}
        />
      ))}
    </div>
  );

  return createPortal(toasterContent, document.body);
}
