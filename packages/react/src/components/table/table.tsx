"use client";

import React, { forwardRef, createContext, useContext } from "react";

import { cn } from "../../utils/cn";

/**
 * Table layout options
 */
export type TableLayout = "auto" | "fixed";

/**
 * Table spacing options
 */
export type TableSpacing = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Table context for sharing props with sub-components
 */
interface TableContextValue {
  striped?: boolean | "odd" | "even";
  highlightOnHover?: boolean;
  withColumnBorders?: boolean;
  withRowBorders?: boolean;
  verticalSpacing?: TableSpacing;
  horizontalSpacing?: TableSpacing;
}

const TableContext = createContext<TableContextValue>({});

function useTableContext() {
  return useContext(TableContext);
}

/**
 * Table component props
 */
export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Horizontal padding of each cell */
  horizontalSpacing?: TableSpacing;
  /** Vertical padding of each cell */
  verticalSpacing?: TableSpacing;
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
  /** If true, header will stick to top when scrolling */
  stickyHeader?: boolean;
  /** Offset for sticky header (e.g., for fixed navbar) */
  stickyHeaderOffset?: number;
  /** Additional className */
  className?: string;
  /** Children (thead, tbody, tfoot, etc.) */
  children?: React.ReactNode;
}

/**
 * Table component
 * Display data in rows and columns
 *
 * @example
 * ```tsx
 * <Table>
 *   <Table.Thead>
 *     <Table.Tr>
 *       <Table.Th>Name</Table.Th>
 *       <Table.Th>Email</Table.Th>
 *     </Table.Tr>
 *   </Table.Thead>
 *   <Table.Tbody>
 *     <Table.Tr>
 *       <Table.Td>John Doe</Table.Td>
 *       <Table.Td>john@example.com</Table.Td>
 *     </Table.Tr>
 *   </Table.Tbody>
 * </Table>
 * ```
 */
export const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      horizontalSpacing = "md",
      verticalSpacing = "sm",
      fontSize = "sm",
      withTableBorder = false,
      withColumnBorders = false,
      withRowBorders = true,
      striped = false,
      highlightOnHover = false,
      layout = "auto",
      stickyHeader = false,
      stickyHeaderOffset = 0,
      className,
      children,
      style,
      ...props
    },
    ref
  ) => {
    // Font size classes
    const fontSizeClasses: Record<string, string> = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    };

    const contextValue: TableContextValue = {
      striped,
      highlightOnHover,
      withColumnBorders,
      withRowBorders,
      verticalSpacing,
      horizontalSpacing,
    };

    return (
      <TableContext.Provider value={contextValue}>
        <div
          className={cn(
            "w-full overflow-auto",
            stickyHeader && "relative"
          )}
        >
          <table
            ref={ref}
            className={cn(
              "w-full border-collapse",
              fontSizeClasses[fontSize],
              layout === "fixed" && "table-fixed",
              withTableBorder && "border border-divider",
              className
            )}
            style={{
              ...style,
              ...(stickyHeader && { "--sticky-header-offset": `${stickyHeaderOffset}px` } as React.CSSProperties),
            }}
            {...props}
          >
            {children}
          </table>
        </div>
      </TableContext.Provider>
    );
  }
);

Table.displayName = "Table";

/**
 * Table.Thead component props
 */
export interface TableTheadProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  /** Additional className */
  className?: string;
  /** Children (tr elements) */
  children?: React.ReactNode;
}

/**
 * Table.Thead component
 */
export const TableThead = forwardRef<HTMLTableSectionElement, TableTheadProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={cn(
          "bg-background-paper",
          "[&_th]:font-semibold [&_th]:text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
      </thead>
    );
  }
);

TableThead.displayName = "TableThead";

/**
 * Table.Tbody component props
 */
export interface TableTbodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  /** Additional className */
  className?: string;
  /** Children (tr elements) */
  children?: React.ReactNode;
}

/**
 * Table.Tbody component
 */
export const TableTbody = forwardRef<HTMLTableSectionElement, TableTbodyProps>(
  ({ className, children, ...props }, ref) => {
    const { striped, highlightOnHover, withRowBorders } = useTableContext();

    return (
      <tbody
        ref={ref}
        className={cn(
          withRowBorders && "[&_tr]:border-b [&_tr]:border-divider [&_tr:last-child]:border-0",
          striped === true || striped === "odd"
            ? "[&_tr:nth-child(odd)]:bg-action-hover/50"
            : striped === "even"
              ? "[&_tr:nth-child(even)]:bg-action-hover/50"
              : "",
          highlightOnHover && "[&_tr:hover]:bg-action-hover",
          className
        )}
        {...props}
      >
        {children}
      </tbody>
    );
  }
);

TableTbody.displayName = "TableTbody";

/**
 * Table.Tfoot component props
 */
export interface TableTfootProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  /** Additional className */
  className?: string;
  /** Children (tr elements) */
  children?: React.ReactNode;
}

/**
 * Table.Tfoot component
 */
export const TableTfoot = forwardRef<HTMLTableSectionElement, TableTfootProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <tfoot
        ref={ref}
        className={cn(
          "bg-background-paper border-t border-divider",
          "[&_td]:font-medium",
          className
        )}
        {...props}
      >
        {children}
      </tfoot>
    );
  }
);

TableTfoot.displayName = "TableTfoot";

/**
 * Table.Tr component props
 */
export interface TableTrProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Additional className */
  className?: string;
  /** Children (th or td elements) */
  children?: React.ReactNode;
}

/**
 * Table.Tr component
 */
export const TableTr = forwardRef<HTMLTableRowElement, TableTrProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn("transition-colors", className)}
        {...props}
      >
        {children}
      </tr>
    );
  }
);

TableTr.displayName = "TableTr";

/**
 * Table.Th component props
 */
export interface TableThProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Additional className */
  className?: string;
  /** Children content */
  children?: React.ReactNode;
}

/**
 * Table.Th component
 */
export const TableTh = forwardRef<HTMLTableCellElement, TableThProps>(
  ({ className, children, ...props }, ref) => {
    const { withColumnBorders, verticalSpacing, horizontalSpacing } =
      useTableContext();

    // Spacing classes
    const vSpacingClasses: Record<TableSpacing, string> = {
      xs: "py-1",
      sm: "py-2",
      md: "py-3",
      lg: "py-4",
      xl: "py-5",
    };

    const hSpacingClasses: Record<TableSpacing, string> = {
      xs: "px-2",
      sm: "px-3",
      md: "px-4",
      lg: "px-5",
      xl: "px-6",
    };

    return (
      <th
        ref={ref}
        className={cn(
          "text-left",
          vSpacingClasses[verticalSpacing || "sm"],
          hSpacingClasses[horizontalSpacing || "md"],
          withColumnBorders && "border-x border-divider first:border-l-0 last:border-r-0",
          className
        )}
        {...props}
      >
        {children}
      </th>
    );
  }
);

TableTh.displayName = "TableTh";

/**
 * Table.Td component props
 */
export interface TableTdProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /** Additional className */
  className?: string;
  /** Children content */
  children?: React.ReactNode;
}

/**
 * Table.Td component
 */
export const TableTd = forwardRef<HTMLTableCellElement, TableTdProps>(
  ({ className, children, ...props }, ref) => {
    const { withColumnBorders, verticalSpacing, horizontalSpacing } =
      useTableContext();

    // Spacing classes
    const vSpacingClasses: Record<TableSpacing, string> = {
      xs: "py-1",
      sm: "py-2",
      md: "py-3",
      lg: "py-4",
      xl: "py-5",
    };

    const hSpacingClasses: Record<TableSpacing, string> = {
      xs: "px-2",
      sm: "px-3",
      md: "px-4",
      lg: "px-5",
      xl: "px-6",
    };

    return (
      <td
        ref={ref}
        className={cn(
          vSpacingClasses[verticalSpacing || "sm"],
          hSpacingClasses[horizontalSpacing || "md"],
          withColumnBorders && "border-x border-divider first:border-l-0 last:border-r-0",
          className
        )}
        {...props}
      >
        {children}
      </td>
    );
  }
);

TableTd.displayName = "TableTd";

/**
 * Table.Caption component props
 */
export interface TableCaptionProps
  extends React.HTMLAttributes<HTMLTableCaptionElement> {
  /** Additional className */
  className?: string;
  /** Children content */
  children?: React.ReactNode;
}

/**
 * Table.Caption component
 */
export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <caption
      ref={ref}
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </caption>
  );
});

TableCaption.displayName = "TableCaption";

/**
 * Table.ScrollContainer component props
 */
export interface TableScrollContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Minimum width for the table */
  minWidth?: number | string;
  /** Additional className */
  className?: string;
  /** Children content */
  children?: React.ReactNode;
}

/**
 * Table.ScrollContainer component
 * Wrapper for horizontal scrolling on small screens
 */
export const TableScrollContainer = forwardRef<
  HTMLDivElement,
  TableScrollContainerProps
>(({ minWidth, className, children, style, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("w-full overflow-x-auto", className)}
      style={style}
      {...props}
    >
      <div style={{ minWidth: minWidth }}>{children}</div>
    </div>
  );
});

TableScrollContainer.displayName = "TableScrollContainer";
