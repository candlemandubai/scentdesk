/**
 * Sanitize HTML by stripping all tags properly.
 * More robust than simple regex — handles edge cases like
 * unclosed tags, attributes with event handlers, etc.
 */
export function stripHtml(html: string): string {
  if (!html) return "";

  // First decode HTML entities
  let text = html
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ");

  // Remove all HTML tags (including self-closing, comments, CDATA)
  text = text
    .replace(/<!--[\s\S]*?-->/g, "") // HTML comments
    .replace(/<!\[CDATA\[[\s\S]*?\]\]>/g, "") // CDATA sections
    .replace(/<script[\s\S]*?<\/script>/gi, "") // script tags with content
    .replace(/<style[\s\S]*?<\/style>/gi, "") // style tags with content
    .replace(/<[^>]*>/g, ""); // all remaining tags

  // Clean up whitespace
  text = text.replace(/\s+/g, " ").trim();

  return text;
}

/**
 * Validate that a URL is safe (http/https only).
 * Prevents javascript: and data: protocol attacks.
 */
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}

/**
 * Sanitize a URL - returns "#" if invalid
 */
export function sanitizeUrl(url: string): string {
  return isValidUrl(url) ? url : "#";
}
