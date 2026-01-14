"use client";

import React from "react";
import { cn } from "../../utils/cn";

export type LoaderType = "spinner" | "dots" | "bars";

export interface LoaderProps {
  /** Size of the loader */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  /** Color of the loader */
  color?: string;
  /** Type of loader animation */
  type?: LoaderType;
  /** Additional className */
  className?: string;
}

const sizeMap = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
};

export function Loader({
  size = "md",
  color = "currentColor",
  type = "spinner",
  className,
}: LoaderProps) {
  const sizeClass = typeof size === "number" ? "" : sizeMap[size];
  const sizeValue = typeof size === "number" ? size : undefined;

  if (type === "dots") {
    return (
      <div
        className={cn("flex items-center gap-1", className)}
        style={sizeValue ? { width: sizeValue, height: sizeValue } : undefined}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "rounded-full bg-current animate-pulse",
              sizeClass || "h-1.5 w-1.5"
            )}
            style={{
              animationDelay: `${i * 0.15}s`,
              color,
            }}
          />
        ))}
      </div>
    );
  }

  if (type === "bars") {
    return (
      <div
        className={cn("flex items-end gap-0.5", className)}
        style={sizeValue ? { width: sizeValue, height: sizeValue } : undefined}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "bg-current animate-pulse",
              sizeClass || "h-3 w-0.5"
            )}
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: "0.6s",
              color,
            }}
          />
        ))}
      </div>
    );
  }

  // Default spinner
  return (
    <svg
      className={cn("animate-spin", sizeClass, className)}
      style={{ color, width: sizeValue, height: sizeValue }}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
