import React from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate a unique ID for component instances
 */
export function generateId(prefix = "warp") {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if a value is a valid React element
 */
export function isValidElement(value: any): value is React.ReactElement {
  return React.isValidElement(value);
}
