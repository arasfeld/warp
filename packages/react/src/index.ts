/**
 * @warp/react
 * React (web) components for Warp UI
 */

// Export theme system
export { ThemeProvider, useTheme, updateCSSVariables } from "./theme";
export type { ThemeProviderProps } from "./theme";

// Export components
// Import Button to ensure static properties are attached
import { Button, ButtonGroup, ButtonGroupSection } from "./components/button";

// Ensure static properties are attached (they should be from button/index.ts, but double-check)
(Button as any).Group = ButtonGroup;
(Button as any).GroupSection = ButtonGroupSection;

export { Button, ButtonGroup, ButtonGroupSection };
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  MantineColor,
  GradientConfig,
  ButtonGroupProps,
  ButtonGroupSectionProps,
} from "./components/button";

export { Loader } from "./components/loader";
export type { LoaderProps, LoaderType } from "./components/loader";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./components/card";
export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
} from "./components/card";

export { Text, Heading } from "./components/text";
export type {
  TextProps,
  HeadingProps,
  TextSize,
  TextWeight,
  TextColor,
} from "./components/text";

export { Input } from "./components/input";
export type { InputProps, InputSize, InputVariant } from "./components/input";

// Export utilities
export { cn } from "./utils/cn";
