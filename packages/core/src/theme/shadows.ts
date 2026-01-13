import type { ShadowDefinition } from "../types";

/**
 * Shadow definitions
 * Platform-agnostic shadow definitions
 * Platform adapters convert these to CSS box-shadow or React Native shadow props
 */
export const shadows: Record<string, ShadowDefinition> = {
  none: {
    offsetX: 0,
    offsetY: 0,
    blur: 0,
    spread: 0,
    color: "transparent",
    opacity: 0,
  },
  sm: {
    offsetX: 0,
    offsetY: 1,
    blur: 2,
    spread: 0,
    color: "rgb(0, 0, 0)",
    opacity: 0.05,
  },
  base: {
    offsetX: 0,
    offsetY: 1,
    blur: 3,
    spread: 0,
    color: "rgb(0, 0, 0)",
    opacity: 0.1,
  },
  md: {
    offsetX: 0,
    offsetY: 4,
    blur: 6,
    spread: -1,
    color: "rgb(0, 0, 0)",
    opacity: 0.1,
  },
  lg: {
    offsetX: 0,
    offsetY: 10,
    blur: 15,
    spread: -3,
    color: "rgb(0, 0, 0)",
    opacity: 0.1,
  },
  xl: {
    offsetX: 0,
    offsetY: 20,
    blur: 25,
    spread: -5,
    color: "rgb(0, 0, 0)",
    opacity: 0.1,
  },
  "2xl": {
    offsetX: 0,
    offsetY: 25,
    blur: 50,
    spread: -12,
    color: "rgb(0, 0, 0)",
    opacity: 0.25,
  },
  inner: {
    offsetX: 0,
    offsetY: 2,
    blur: 4,
    spread: 0,
    color: "rgb(0, 0, 0)",
    opacity: 0.05,
  },
} as const;
