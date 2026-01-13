import React, { createContext, useContext, useState, useMemo, type ReactNode } from "react";
import type { Theme, ThemeMode } from "@warp/core";
import { defaultTheme } from "@warp/core/theme";
import { adaptTheme, type RNTheme } from "./adapter";

/**
 * Theme context value
 */
interface ThemeContextValue {
  /** The adapted React Native theme */
  theme: RNTheme;
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
  /** Children */
  children: ReactNode;
}

/**
 * Theme provider component
 * Provides theme context to all children
 */
export function ThemeProvider({
  theme = defaultTheme,
  defaultMode = "light",
  children,
}: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);
  const [coreTheme, setCoreTheme] = useState<Theme>(theme);

  const adaptedTheme = useMemo(() => {
    return adaptTheme(coreTheme, mode);
  }, [coreTheme, mode]);

  const value: ThemeContextValue = useMemo(
    () => ({
      theme: adaptedTheme,
      mode,
      setMode,
      coreTheme,
      setCoreTheme,
    }),
    [adaptedTheme, mode, coreTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
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
