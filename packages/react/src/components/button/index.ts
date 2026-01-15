// Import Button and attach static properties before exporting
import { Button } from "./button";
import { ButtonGroup, ButtonGroupSection } from "./button-group";

// Attach static properties (they're also attached in button.tsx, but ensure they're here too)
const ButtonWithGroup = Object.assign(Button, {
  Group: ButtonGroup,
  GroupSection: ButtonGroupSection,
}) as typeof Button & {
  Group: typeof ButtonGroup;
  GroupSection: typeof ButtonGroupSection;
};

// Export Button with static properties
export { ButtonWithGroup as Button };
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  ThemeColor,
  GradientConfig,
  LoaderProps as ButtonLoaderProps,
} from "./button";
export { ButtonGroup, ButtonGroupSection } from "./button-group";
export type {
  ButtonGroupProps,
  ButtonGroupSectionProps,
} from "./button-group";
