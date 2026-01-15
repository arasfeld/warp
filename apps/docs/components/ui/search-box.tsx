"use client";

import { Search } from "lucide-react";
import { Input, cn } from "@warp/react";

interface SearchBoxProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function SearchBox({
  placeholder = "Search components...",
  value,
  onChange,
  className,
}: SearchBoxProps) {
  return (
    <div className={cn("flex-1 min-w-[300px] relative", className)}>
      <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary pointer-events-none z-10" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        variant="filled"
        className={cn(
          "w-full pl-14 pr-6 py-4",
          "bg-white/5 dark:bg-white/5",
          "border border-white/10 dark:border-white/10",
          "rounded-xl text-primary text-base",
          "font-sans transition-all duration-300",
          "focus:bg-white/8 dark:focus:bg-white/8",
          "focus:border-purple-500 focus:shadow-[0_0_0_3px_rgba(168,85,247,0.1)]",
          "placeholder:text-secondary"
        )}
      />
    </div>
  );
}
