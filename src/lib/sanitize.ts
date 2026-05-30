// Sanitization and Validation Utilities

/**
 * Strips HTML tags from a string to prevent XSS payloads.
 */
export function sanitizeString(val: string): string {
  if (!val) return '';
  return val
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .replace(/[&<>"']/g, (m) => {
      switch (m) {
        case '&': return '&amp;';
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#039;';
        default: return m;
      }
    })
    .trim();
}

/**
 * Validates Indian Mobile Numbers.
 * Must be exactly 10 digits and start with 6, 7, 8, or 9.
 */
export function isValidIndianMobile(mobile: string): boolean {
  const cleanMobile = mobile.replace(/[\s-+]/g, ''); // strip spaces, hyphens, plus sign
  // Check if it's 10 digits starting with 6-9
  // Allow country code prefix 91 or 0
  const mobileRegex = /^(?:(?:\+?91|0)?[6-9]\d{9})$/;
  return mobileRegex.test(cleanMobile);
}

/**
 * Validates text length to prevent buffer bloat/DDoS payloads.
 */
export function validateLength(val: string, min: number, max: number): boolean {
  if (!val) return min === 0;
  return val.length >= min && val.length <= max;
}
