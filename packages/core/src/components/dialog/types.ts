/**
 * Dialog size options
 */
export type DialogSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";

/**
 * Base Dialog props (platform-agnostic)
 */
export interface DialogBaseProps {
  /** Whether dialog is open */
  opened?: boolean;
  /** Called when dialog should close */
  onClose?: () => void;
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
  /** Whether to trap focus inside dialog */
  trapFocus?: boolean;
  /** Border radius */
  radius?: string | number;
  /** Whether to render overlay */
  withOverlay?: boolean;
  /** Overlay opacity */
  overlayOpacity?: number;
  /** Overlay blur */
  overlayBlur?: number;
}
