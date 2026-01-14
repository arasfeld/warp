/**
 * Convert HSL color string to hex
 * React Native StyleSheet doesn't reliably support HSL strings
 */

/**
 * Parse HSL color string and convert to hex
 * Supports formats: "hsl(222.2 47.4% 11.2%)" or "hsl(222, 47.4%, 11.2%)"
 */
function hslToHex(hsl: string): string {
  // Handle HSL format: hsl(222.2 47.4% 11.2%)
  const match = hsl.match(/hsl\(([\d.]+)[,\s]+([\d.]+)%[,\s]+([\d.]+)%\)/);
  if (!match || !match[1] || !match[2] || !match[3]) {
    // If it's already a hex color, return it
    if (hsl.startsWith("#")) {
      return hsl;
    }
    // Fallback to the original string
    return hsl;
  }

  const h = parseFloat(match[1]) / 360;
  const s = parseFloat(match[2]) / 100;
  const l = parseFloat(match[3]) / 100;

  // HSL to RGB conversion
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  // Convert to hex
  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Normalize color for React Native (convert HSL to hex if needed)
 */
export function normalizeColor(color: string): string {
  if (color.startsWith("hsl(")) {
    return hslToHex(color);
  }
  // Already hex or other format, return as-is
  return color;
}
