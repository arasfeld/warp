// Import Chip and attach Group as static property
import { Chip } from "./chip";
import { ChipGroup } from "./chip-group";

// Attach Group as static property
const ChipWithGroup = Object.assign(Chip, {
  Group: ChipGroup,
}) as typeof Chip & {
  Group: typeof ChipGroup;
};

// Export Chip with static properties
export { ChipWithGroup as Chip };
export type { ChipProps, ChipVariant, ThemeColor, ThemeSize, Radius } from "./chip";
export { ChipGroup } from "./chip-group";
export type { ChipGroupProps } from "./chip-group";
