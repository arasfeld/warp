"use client";

import { Button, cn } from "@warp/react";

interface FilterTag {
  id: string;
  label: string;
}

interface FilterTagsProps {
  tags: FilterTag[];
  activeTag?: string;
  onTagClick?: (tagId: string) => void;
}

export function FilterTags({ tags, activeTag, onTagClick }: FilterTagsProps) {
  return (
    <div className="flex gap-4 flex-wrap">
      {tags.map((tag) => (
        <Button
          key={tag.id}
          onClick={() => onTagClick?.(tag.id)}
          variant={activeTag === tag.id ? "filled" : "outline"}
          size="sm"
          className={cn(
            "px-6 py-3 rounded-[10px] text-[0.95rem] font-medium transition-all duration-300",
            activeTag === tag.id
              ? "bg-gradient-to-r from-purple-500 to-blue-500 border-transparent text-white -translate-y-0.5 shadow-lg"
              : "bg-white/5 dark:bg-white/5 border-white/10 dark:border-white/10 text-secondary hover:bg-white/8 dark:hover:bg-white/8"
          )}
        >
          {tag.label}
        </Button>
      ))}
    </div>
  );
}
