/**
 * Theme exports
 */

export { ThemeProvider, useTheme } from "./context";
export type { ExtendedThemeMode, ThemeProviderProps } from "./context";
export { updatePaletteCSSVariables, updateThemeCSSVariables } from "./css-vars-palette";
export { getThemePreference, saveThemePreference } from "./storage";
export type { ThemePreference } from "./storage";
