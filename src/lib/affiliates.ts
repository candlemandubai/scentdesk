/**
 * Affiliate link management.
 * Appends tracking tags to outbound retailer/product URLs when enabled.
 *
 * To configure: update AFFILIATE_TAGS with your actual affiliate IDs.
 * The system auto-detects the domain and appends the right tag.
 */

interface AffiliateConfig {
  domain: string;
  param: string;
  tag: string;
}

// Configure your affiliate tags here
const AFFILIATE_TAGS: AffiliateConfig[] = [
  { domain: "amazon.com", param: "tag", tag: "scentdesk-20" },
  { domain: "amazon.co.uk", param: "tag", tag: "scentdesk-21" },
  { domain: "fragrantica.com", param: "ref", tag: "scentdesk" },
  { domain: "notino.com", param: "ref", tag: "scentdesk" },
  { domain: "sephora.com", param: "om_mmc", tag: "aff-scentdesk" },
  { domain: "fragrancenet.com", param: "ref", tag: "scentdesk" },
  { domain: "luckyscent.com", param: "ref", tag: "scentdesk" },
  { domain: "perfumerssupplyhouse.com", param: "ref", tag: "scentdesk" },
];

/**
 * Append affiliate tag to a URL if the domain matches a configured affiliate.
 * Returns the original URL if no match or if the tag is already present.
 */
export function affiliateUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace("www.", "");

    const config = AFFILIATE_TAGS.find((c) => hostname.includes(c.domain));
    if (!config) return url;

    // Don't double-tag
    if (parsed.searchParams.has(config.param)) return url;

    parsed.searchParams.set(config.param, config.tag);
    return parsed.toString();
  } catch {
    return url;
  }
}

/**
 * Check if a URL would get an affiliate tag.
 */
export function isAffiliateDomain(url: string): boolean {
  try {
    const hostname = new URL(url).hostname.replace("www.", "");
    return AFFILIATE_TAGS.some((c) => hostname.includes(c.domain));
  } catch {
    return false;
  }
}

/**
 * Get all configured affiliate domains (for admin display).
 */
export function getAffiliatePartners(): { domain: string; tag: string }[] {
  return AFFILIATE_TAGS.map((c) => ({ domain: c.domain, tag: c.tag }));
}
