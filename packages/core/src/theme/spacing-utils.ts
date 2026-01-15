/**
 * Spacing function utility
 * Creates a spacing multiplier function
 *
 * @param baseUnit - Base spacing unit (default: 8px)
 * @returns Function that multiplies the base unit
 *
 * @example
 * const spacing = createSpacing(8);
 * spacing(1) // "8px"
 * spacing(2) // "16px"
 * spacing(0.5) // "4px"
 */
export function createSpacing(baseUnit: number = 8) {
  return (multiplier: number): string => {
    return `${multiplier * baseUnit}px`;
  };
}

/**
 * Default spacing function with 8px base unit
 */
export const spacing = createSpacing(8);
