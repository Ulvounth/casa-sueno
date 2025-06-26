/**
 * Converts a Date object to a timezone-safe YYYY-MM-DD string
 * This avoids the timezone shift issues that can occur with toISOString()
 */
export function formatDateSafe(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Parse a date string and ensure it's interpreted in local timezone
 */
export function parseDateSafe(dateString: string): Date {
  return new Date(dateString + "T00:00:00");
}
