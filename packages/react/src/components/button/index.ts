// Import Button and attach static properties before exporting
import { Button } from "./button";
import { ButtonGroup, ButtonGroupSection } from "./button-group";

// Attach static properties (they're also attached in button.tsx, but ensure they're here too)
(Button as any).Group = ButtonGroup;
(Button as any).GroupSection = ButtonGroupSection;

// Export Button with static properties
export { Button };
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  MantineColor,
  GradientConfig,
  LoaderProps as ButtonLoaderProps,
} from "./button";
export { ButtonGroup, ButtonGroupSection } from "./button-group";
export type {
  ButtonGroupProps,
  ButtonGroupSectionProps,
} from "./button-group";
