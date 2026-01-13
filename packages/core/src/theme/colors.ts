import type { ColorPalette } from "../types";

/**
 * Default light color palette
 * Inspired by shadcn/ui and modern design systems
 */
export const lightColors: ColorPalette = {
  primary: "hsl(222.2 47.4% 11.2%)",
  secondary: "hsl(210 40% 96.1%)",
  success: "hsl(142.1 76.2% 36.3%)",
  warning: "hsl(38 92% 50%)",
  error: "hsl(0 84.2% 60.2%)",
  info: "hsl(199 89% 48%)",
  background: "hsl(0 0% 100%)",
  foreground: "hsl(222.2 47.4% 11.2%)",
  mutedBackground: "hsl(210 40% 96.1%)",
  mutedForeground: "hsl(215.4 16.3% 46.9%)",
  border: "hsl(214.3 31.8% 91.4%)",
  input: "hsl(214.3 31.8% 91.4%)",
  ring: "hsl(222.2 47.4% 11.2%)",
};

/**
 * Default dark color palette
 * Inspired by shadcn/ui and modern design systems
 */
export const darkColors: ColorPalette = {
  primary: "hsl(210 40% 98%)",
  secondary: "hsl(217.2 32.6% 17.5%)",
  success: "hsl(142.1 70.6% 45.3%)",
  warning: "hsl(38 92% 50%)",
  error: "hsl(0 62.8% 30.6%)",
  info: "hsl(199 89% 48%)",
  background: "hsl(222.2 47.4% 11.2%)",
  foreground: "hsl(210 40% 98%)",
  mutedBackground: "hsl(217.2 32.6% 17.5%)",
  mutedForeground: "hsl(215 20.2% 65.1%)",
  border: "hsl(217.2 32.6% 17.5%)",
  input: "hsl(217.2 32.6% 17.5%)",
  ring: "hsl(212.7 26.8% 83.9%)",
};
