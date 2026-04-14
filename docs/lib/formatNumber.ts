/**
 * Formats a number into a compact string representation
 * @param num - The number to format
 * @returns Formatted string (e.g., 1000 -> "1k", 1234 -> "1.2k", 999 -> "999")
 */
export function formatCompactNumber(num: number): string {
  if (num < 1000) {
    return num.toString();
  }

  const thousands = num / 1000;
  const rounded = Math.round(thousands * 10) / 10;

  // If the rounded value is a whole number, show without decimal
  if (rounded % 1 === 0) {
    return `${Math.round(rounded)}k`;
  }

  // Otherwise show one decimal place
  return `${rounded}k`;
}
