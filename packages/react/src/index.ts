/**
 * @warp/react
 * React (web) components for Warp UI
 */

// Export theme system
export {
  ThemeProvider,
  updatePaletteCSSVariables,
  updateThemeCSSVariables,
  useTheme,
} from "./theme";
export type { ThemeProviderProps } from "./theme";

// Export components
// Button with static properties (already attached in button/index.ts)
export { Button, ButtonGroup, ButtonGroupSection } from "./components/button";
export type {
  ButtonGroupProps,
  ButtonGroupSectionProps,
  ButtonProps,
  ButtonSize,
  ButtonVariant,
  GradientConfig,
} from "./components/button";

export { Loader } from "./components/loader";
export type { LoaderProps, LoaderType } from "./components/loader";

// Card with static properties (already attached in card/index.ts)
export { Card, CardSection } from "./components/card";
export type { CardProps, CardSectionProps } from "./components/card";

export { Text } from "./components/text";
export type {
  Gradient,
  TextColor,
  TextProps,
  TextSize,
  TextTruncate,
  TextWeight,
  ThemeColor,
  ThemeSize,
} from "./components/text";

export { Heading } from "./components/heading";
export type {
  Gradient as HeadingGradient,
  HeadingOrder,
  HeadingProps,
  HeadingSize,
  TextWrap,
} from "./components/heading";

// Chip with static properties (already attached in chip/index.ts)
export { Chip, ChipGroup } from "./components/chip";
export type {
  ChipProps,
  ChipGroupProps,
  ChipVariant,
} from "./components/chip";

// Checkbox with static properties (already attached in checkbox/index.ts)
export { Checkbox, CheckboxGroup, CheckboxIndicator } from "./components/checkbox";
export type {
  CheckboxProps,
  CheckboxGroupProps,
  CheckboxIndicatorProps,
  CheckboxVariant,
} from "./components/checkbox";

// Input with static properties (already attached in input/index.ts)
export {
  Input,
  InputClearButton,
  InputDescription,
  InputError,
  InputLabel,
  InputPlaceholder,
  InputWrapper,
} from "./components/input";
export type {
  InputProps,
  InputSize,
  InputVariant,
  InputWrapperProps,
} from "./components/input";

// Export utilities
export { cn } from "./utils/cn";
