"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn, useTheme } from "@warp/react";

export function ThemeToggle() {
  const { effectiveMode, isLoading, setMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    // Toggle between light and dark only
    const currentEffective = effectiveMode;
    setMode(currentEffective === "light" ? "dark" : "light");
  };

  const getIcon = () => {
    return effectiveMode === "light" ? (
      <Moon className="w-5 h-5 relative z-10" />
    ) : (
      <Sun className="w-5 h-5 relative z-10" />
    );
  };

  const getLabel = () => {
    return effectiveMode === "light" ? "Light" : "Dark";
  };

  // Render placeholder during SSR and initial load to prevent hydration mismatch
  if (!mounted || isLoading) {
    return (
      <div className="w-11 h-11 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 flex items-center justify-center">
        <div className="w-5 h-5" />
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        className={cn(
          "w-11 h-11 rounded-full border border-black/10 dark:border-white/10",
          "bg-black/5 dark:bg-white/5",
          "flex items-center justify-center",
          "transition-all duration-300 relative overflow-hidden",
          "text-foreground",
          "hover:bg-black/10 dark:hover:bg-white/10",
          "hover:rotate-180 hover:scale-110",
          "hover:border-purple-500",
          "before:content-[''] before:absolute before:inset-0",
          "before:bg-gradient-to-br before:from-purple-500 before:to-cyan-400",
          "before:opacity-0 before:transition-opacity before:duration-300",
          "hover:before:opacity-20"
        )}
        onClick={toggleTheme}
        aria-label={`Current theme: ${getLabel()}. Click to toggle theme.`}
        title={getLabel()}
      >
        {getIcon()}
      </button>
    </div>
  );
}
