"use client";
import { ReactNode } from "react";
import { useMonetization } from "@/hooks/useMonetization";
import { affiliateUrl } from "@/lib/affiliates";

interface AffiliateLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/**
 * Smart link component that appends affiliate tracking tags when
 * the m-affiliates monetization feature is enabled in admin.
 *
 * Drop-in replacement for <a> tags on outbound product/retailer links.
 */
export default function AffiliateLink({ href, children, className }: AffiliateLinkProps) {
  const { isEnabled } = useMonetization("m-affiliates");

  const finalUrl = isEnabled ? affiliateUrl(href) : href;

  return (
    <a
      href={finalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
