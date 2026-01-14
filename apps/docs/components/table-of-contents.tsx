"use client";

import { cn } from "@warp/react";

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TableOfContentsItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  if (items.length === 0) return null;

  return (
    <aside
      className={cn(
        "fixed right-0 top-16 h-[calc(100vh-4rem)] w-64 border-l border-border bg-background overflow-y-auto p-4",
        className
      )}
    >
      <div className="sticky top-4">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Table of contents
        </h3>
        <nav className="space-y-1">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "block text-sm transition-colors hover:text-foreground",
                item.level === 1 && "font-medium text-foreground",
                item.level === 2 && "pl-4 text-muted-foreground",
                item.level === 3 && "pl-8 text-muted-foreground"
              )}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
