/**
 * Theme storage utilities for persisting theme preferences in localStorage
 */

const STORAGE_KEY = "warp-theme-preference";

export type ThemePreference = {
  mode: "light" | "dark" | "system";
};

/**
 * Get theme preference from localStorage
 */
export function getThemePreference(): ThemePreference | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validate the stored value
      if (
        parsed &&
        typeof parsed === "object" &&
        ["light", "dark", "system"].includes(parsed.mode)
      ) {
        return parsed as ThemePreference;
      }
    }
  } catch (error) {
    console.error("Error reading theme preference from localStorage:", error);
  }

  return null;
}

/**
 * Save theme preference to localStorage
 */
export function saveThemePreference(preference: ThemePreference): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preference));
  } catch (error) {
    console.error("Error saving theme preference to localStorage:", error);
  }
}
