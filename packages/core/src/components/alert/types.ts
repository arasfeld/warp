/**
 * Alert component types
 * Platform-agnostic type definitions for the Alert component
 */

/**
 * Alert variant types
 */
export type AlertVariant = "default" | "destructive" | "warning" | "info" | "success";

/**
 * Base Alert props (platform-agnostic)
 * These props are shared between web and native implementations
 */
export interface AlertBaseProps {
  /** Alert variant */
  variant?: AlertVariant;
  /** Alert title */
  title?: React.ReactNode;
  /** Show close button */
  withCloseButton?: boolean;
  /** Close button aria-label */
  closeButtonLabel?: string;
  /** Icon to display */
  icon?: React.ReactNode;
  /** Called when close button is clicked */
  onClose?: () => void;
}
