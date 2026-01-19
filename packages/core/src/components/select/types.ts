/**
 * Select component types
 * Platform-agnostic type definitions for the Select component
 */

/**
 * Select option data
 */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

/**
 * Select size variants (matches Input size)
 */
export type SelectSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Select variant styles (matches Input variant)
 */
export type SelectVariant = "default" | "filled" | "unstyled";

/**
 * Base Select props (platform-agnostic)
 * These props are shared between web and native implementations
 */
export interface SelectBaseProps {
  /** Select size */
  size?: SelectSize;
  /** Select variant */
  variant?: SelectVariant;
  /** Options data */
  data?: SelectOption[];
  /** Controlled value */
  value?: string | string[] | null;
  /** Default value */
  defaultValue?: string | string[] | null;
  /** Whether multiple selection is allowed */
  multiple?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Whether select is disabled */
  disabled?: boolean;
  /** Error state */
  error?: boolean | string;
  /** Whether select is searchable */
  searchable?: boolean;
  /** Whether to show clear button */
  clearable?: boolean;
  /** Maximum dropdown height */
  maxDropdownHeight?: number | string;
}
