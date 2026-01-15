// Import Card and attach Section as static property
import { Card as CardBase, CardSection } from "./card";

// Attach Section as static property
const Card = Object.assign(CardBase, {
  Section: CardSection,
}) as typeof CardBase & {
  Section: typeof CardSection;
};

export { Card, CardSection };
export type { CardProps, CardSectionProps } from "./card";
