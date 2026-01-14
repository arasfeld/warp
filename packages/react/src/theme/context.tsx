"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  type ReactNode,
} from "react";
import type { Theme, ThemeMode } from "@warp/core";
import { defaultTheme, getColors } from "@warp/core/theme";
import { updateCSSVariables } from "./css-vars";

/**
 * Web theme context value
 * For web, we primarily work with CSS variables, but also expose
 * the theme object for programmatic access if needed
 */
interface ThemeContextValue {
  /** Current theme mode */
  mode: ThemeMode;
  /** Set theme mode */
  setMode: (mode: ThemeMode) => void;
  /** The core theme object */
  coreTheme: Theme;
  /** Set core theme */
  setCoreTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Theme provider props
 */
export interface ThemeProviderProps {
  /** Core theme to use */
  theme?: Theme;
  /** Initial theme mode */
  defaultMode?: ThemeMode;
  /** Whether to follow system preference (default: false for web) */
  followSystem?: boolean;
  /** Children */
  children: ReactNode;
}

/**
 * Theme provider component for React (web)
 * Provides theme context and manages CSS variables
 *
 * @example
 * ```tsx
 * <ThemeProvider defaultMode="light">
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  theme = defaultTheme,
  defaultMode = "light",
  followSystem = false,
  children,
}: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);
  const [coreTheme, setCoreTheme] = useState<Theme>(theme);

  // Update CSS variables when theme or mode changes
  useEffect(() => {
    const colors = getColors(coreTheme, mode);
    updateCSSVariables(colors, mode === "dark");

    // Optionally add/remove dark class for Tailwind dark mode
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [coreTheme, mode]);

  // Follow system preference if enabled
  useEffect(() => {
    if (!followSystem) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setMode(e.matches ? "dark" : "light");
    };

    // Set initial mode
    setMode(mediaQuery.matches ? "dark" : "light");

    // Listen for changes
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [followSystem]);

  const value: ThemeContextValue = useMemo(
    () => ({
      mode,
      setMode,
      coreTheme,
      setCoreTheme,
    }),
    [mode, coreTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/**
 * Hook to access theme
 * @throws Error if used outside ThemeProvider
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
