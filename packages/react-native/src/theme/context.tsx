import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from 'react';
import { useColorScheme, View } from 'react-native';
import type { Theme, ThemeMode } from '@warp/core';
import { defaultTheme } from '@warp/core/theme';
import { adaptTheme, type RNTheme } from './adapter';

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
  /** Color scheme value */
  colorScheme: 'light' | 'dark' | null;
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
 */
export function ThemeProvider({
  theme = defaultTheme,
  defaultMode,
  enableManualToggle = true,
  children,
}: ThemeProviderProps) {
  const systemColorScheme = useColorScheme();

  const initialMode =
    defaultMode || (systemColorScheme === 'dark' ? 'dark' : 'light');

  const [manualMode, setManualMode] = useState<ThemeMode | null>(
    enableManualToggle ? null : initialMode,
  );
  const [coreTheme, setCoreTheme] = useState<Theme>(theme);

  const currentMode: ThemeMode = useMemo(() => {
    if (manualMode !== null) {
      return manualMode;
    }
    return systemColorScheme === 'dark' ? 'dark' : 'light';
  }, [manualMode, systemColorScheme]);

  const adaptedTheme = useMemo(() => {
    return adaptTheme(coreTheme, currentMode);
  }, [coreTheme, currentMode]);

  const setMode = useCallback(
    (mode: ThemeMode) => {
      if (enableManualToggle) {
        setManualMode(mode);
      }
    },
    [enableManualToggle],
  );

  const value: ThemeContextValue = useMemo(
    () => ({
      theme: adaptedTheme,
      mode: currentMode,
      setMode,
      coreTheme,
      setCoreTheme,
      colorScheme: systemColorScheme ?? null,
    }),
    [adaptedTheme, currentMode, setMode, coreTheme, systemColorScheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <View style={{ flex: 1 }}>{children}</View>
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
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
