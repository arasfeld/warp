import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  type ReactNode,
} from "react";
import { View } from "react-native";
import { useColorScheme, colorScheme } from "nativewind";
import type { Theme, ThemeMode } from "@warp/core";
import { defaultTheme, getColors } from "@warp/core/theme";
import { adaptTheme, type RNTheme } from "./adapter";
import { createThemeVars } from "./css-vars";

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
  /** NativeWind color scheme value */
  colorScheme: "light" | "dark" | null;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Theme provider props
 */
export interface ThemeProviderProps {
  /** Core theme to use */
  theme?: Theme;
  /** Initial theme mode. If not provided, uses system preference */
  defaultMode?: ThemeMode;
  /** Whether to allow manual theme switching (default: true) */
  enableManualToggle?: boolean;
  /** Children */
  children: ReactNode;
}

/**
 * Theme provider component
 * Provides theme context to all children
 * Follows NativeWind v4 best practices for dynamic theming
 */
export function ThemeProvider({
  theme = defaultTheme,
  defaultMode,
  enableManualToggle = true,
  children,
}: ThemeProviderProps) {
  // Use NativeWind's useColorScheme to get system preference
  const { colorScheme: systemColorScheme } = useColorScheme();

  // Determine initial mode: use defaultMode if provided, otherwise follow system
  const initialMode =
    defaultMode || (systemColorScheme === "dark" ? "dark" : "light");

  const [manualMode, setManualMode] = useState<ThemeMode | null>(
    enableManualToggle ? null : initialMode
  );
  const [coreTheme, setCoreTheme] = useState<Theme>(theme);

  // Current mode: manual override takes precedence, then system preference
  const currentMode: ThemeMode = useMemo(() => {
    if (manualMode !== null) {
      return manualMode;
    }
    return systemColorScheme === "dark" ? "dark" : "light";
  }, [manualMode, systemColorScheme]);

  // Sync NativeWind colorScheme with our mode
  useEffect(() => {
    if (enableManualToggle && manualMode !== null) {
      colorScheme.set(manualMode);
    }
  }, [manualMode, enableManualToggle]);

  const adaptedTheme = useMemo(() => {
    return adaptTheme(coreTheme, currentMode);
  }, [coreTheme, currentMode]);

  // Create CSS variables object using NativeWind's vars()
  const themeVars = useMemo(() => {
    const colors = getColors(coreTheme, currentMode);
    return createThemeVars(colors, currentMode === "dark");
  }, [coreTheme, currentMode]);

  const setMode = (mode: ThemeMode) => {
    if (enableManualToggle) {
      setManualMode(mode);
    }
  };

  const value: ThemeContextValue = useMemo(
    () => ({
      theme: adaptedTheme,
      mode: currentMode,
      setMode,
      coreTheme,
      setCoreTheme,
      colorScheme: systemColorScheme ?? null,
    }),
    [adaptedTheme, currentMode, coreTheme, systemColorScheme]
  );

  // Apply theme vars via inline styles (NativeWind v4 recommended approach)
  // The wrapper View needs to take full space and pass through layout
  return (
    <ThemeContext.Provider value={value}>
      <View style={[themeVars, { flex: 1 }]}>{children}</View>
    </ThemeContext.Provider>
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
