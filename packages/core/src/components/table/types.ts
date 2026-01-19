/**
 * Table layout options
 */
export type TableLayout = "auto" | "fixed";

/**
 * Table vertical spacing options
 */
export type TableVerticalSpacing = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Table horizontal spacing options
 */
export type TableHorizontalSpacing = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Base Table props (platform-agnostic)
 */
export interface TableBaseProps {
  /** If true, table will have horizontal borders between rows */
  horizontalSpacing?: TableHorizontalSpacing;
  /** Vertical padding of each cell */
  verticalSpacing?: TableVerticalSpacing;
  /** Font size of table content */
  fontSize?: "xs" | "sm" | "md" | "lg" | "xl";
  /** If true, table will have border */
  withTableBorder?: boolean;
  /** If true, table will have borders between columns */
  withColumnBorders?: boolean;
  /** If true, table will have borders between rows */
  withRowBorders?: boolean;
  /** If true, table rows will have striped background */
  striped?: boolean | "odd" | "even";
  /** If true, table rows will be highlighted on hover */
  highlightOnHover?: boolean;
  /** Table layout algorithm */
  layout?: TableLayout;
  /** If true, table will capture space and have sticky header */
  stickyHeader?: boolean;
  /** Offset for sticky header (e.g., for fixed navbar) */
  stickyHeaderOffset?: number;
}
