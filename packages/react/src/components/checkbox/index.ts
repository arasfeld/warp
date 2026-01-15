// Import Checkbox and attach Group, Indicator as static properties
import { Checkbox } from "./checkbox";
import { CheckboxGroup } from "./checkbox-group";
import { CheckboxIndicator } from "./checkbox-indicator";

// Attach Group and Indicator as static properties
const CheckboxWithGroup = Object.assign(Checkbox, {
  Group: CheckboxGroup,
  Indicator: CheckboxIndicator,
}) as typeof Checkbox & {
  Group: typeof CheckboxGroup;
  Indicator: typeof CheckboxIndicator;
};

// Export Checkbox with static properties
export { CheckboxWithGroup as Checkbox };
export type {
  CheckboxProps,
  CheckboxVariant,
  CheckboxIconProps,
  ThemeColor,
  ThemeSize,
  Radius,
} from "./checkbox";
export { CheckboxGroup } from "./checkbox-group";
export type { CheckboxGroupProps } from "./checkbox-group";
export { CheckboxIndicator } from "./checkbox-indicator";
export type { CheckboxIndicatorProps } from "./checkbox-indicator";
