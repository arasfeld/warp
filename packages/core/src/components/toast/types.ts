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
 * Toast variant/type
 */
export type ToastVariant = "default" | "success" | "error" | "warning" | "info";

/**
 * Base Toast props (platform-agnostic)
 */
export interface ToastBaseProps {
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
  /** Auto-close duration in ms (0 to disable) */
  autoClose?: number | false;
  /** Whether toast is loading */
  loading?: boolean;
  /** Custom color */
  color?: string;
  /** Border radius */
  radius?: string | number;
}

/**
 * Toast data for the toast system
 */
export interface ToastData extends ToastBaseProps {
  /** Unique toast ID */
  id: string;
}
