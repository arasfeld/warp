"use client";

import React, {
  createContext,
  useEffect,
  useMemo,
  useState,
  useContext,
  type ReactNode,
} from "react";
import type { Theme } from "@warp/core";
import { defaultTheme } from "@warp/core/theme";
import { getThemePreference, saveThemePreference } from "./storage";

/**
 * Extended theme mode that includes 'system' option
 */
export type ExtendedThemeMode = "light" | "dark" | "system";

/**
 * Web theme context value
 * For web, we primarily work with CSS variables, but also expose
 * the theme object for programmatic access if needed
 */
interface ThemeContextValue {
  /** Current theme mode */
  mode: ExtendedThemeMode;
  /** Effective theme mode (resolved from system preference if mode is 'system') */
  effectiveMode: "light" | "dark";
  /** Set theme mode (supports 'light', 'dark', or 'system') */
  setMode: (mode: ExtendedThemeMode) => void;
  /** The core theme object */
  coreTheme: Theme;
  /** Set core theme */
  setCoreTheme: (theme: Theme) => void;
  /** Whether theme preferences are loading from localStorage */
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Theme provider props
 */
export interface ThemeProviderProps {
  /** Core theme to use */
  theme?: Theme;
  /** Initial theme mode (if not provided, will use stored preference or 'system') */
  defaultMode?: ExtendedThemeMode;
  /** Children */
  children: ReactNode;
}

/**
 * Theme provider component for React (web)
 * Provides theme context and manages CSS variables
 * Persists theme preference to localStorage and defaults to system preference
 *
 * @example
 * ```tsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  theme = defaultTheme,
  defaultMode,
  children,
}: ThemeProviderProps) {
  const [mode, setModeState] = useState<ExtendedThemeMode>("system");
  const [coreTheme, setCoreTheme] = useState<Theme>(theme);
  const [isLoading, setIsLoading] = useState(true);

  // Get system color scheme
  const [systemColorScheme, setSystemColorScheme] = useState<"light" | "dark">(
    () => {
      if (typeof window === "undefined") {
        return "light";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
  );

  // Load theme preference from localStorage on mount
  // This runs only on the client after hydration
  useEffect(() => {
    if (typeof window === "undefined") {
      setIsLoading(false);
      return;
    }

    const loadPreference = () => {
      try {
        const stored = getThemePreference();
        if (stored) {
          setModeState(stored.mode);
        } else if (defaultMode !== undefined) {
          // Use provided defaultMode if no stored preference
          setModeState(defaultMode);
        } else {
          // Default to system if no preference and no defaultMode provided
          setModeState("system");
        }
      } catch (error) {
        console.error("Error loading theme preference:", error);
        // Fallback to defaultMode or system
        setModeState(defaultMode ?? "system");
      } finally {
        setIsLoading(false);
      }
    };

    loadPreference();
  }, [defaultMode]);

  // Listen to system color scheme changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setSystemColorScheme(e.matches ? "dark" : "light");
    };

    // Set initial value
    handleChange(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Calculate effective mode (resolved from system if mode is 'system')
  const effectiveMode = useMemo(() => {
    if (mode === "system") {
      return systemColorScheme;
    }
    return mode;
  }, [mode, systemColorScheme]);

  // Update CSS class based on effective mode
  // Only update if it's different from what's already set (to avoid hydration issues)
  useEffect(() => {
    if (typeof document === "undefined") return;

    const htmlElement = document.documentElement;
    const hasDarkClass = htmlElement.classList.contains("dark");

    if (effectiveMode === "dark" && !hasDarkClass) {
      htmlElement.classList.add("dark");
    } else if (effectiveMode === "light" && hasDarkClass) {
      htmlElement.classList.remove("dark");
    }
  }, [effectiveMode]);

  // Handle mode changes and persist to localStorage
  const setMode = (newMode: ExtendedThemeMode) => {
    setModeState(newMode);
    saveThemePreference({ mode: newMode });
  };

  const value: ThemeContextValue = useMemo(
    () => ({
      mode,
      effectiveMode,
      setMode,
      coreTheme,
      setCoreTheme,
      isLoading,
    }),
    [mode, effectiveMode, coreTheme, isLoading]
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
