"use client";
import { useAdminStore } from "@/store/adminStore";

/**
 * Hook to check if a monetization feature is enabled in admin.
 * Usage: const { isEnabled } = useMonetization("m-newsletter");
 */
export function useMonetization(featureId: string): { isEnabled: boolean } {
  const { features } = useAdminStore();
  const monetization = features.find((f) => f.id === "monetization");

  if (!monetization?.enabled) return { isEnabled: false };

  const sub = monetization.subFeatures?.find((sf) => sf.id === featureId);
  return { isEnabled: sub?.enabled ?? false };
}

/**
 * Check multiple monetization features at once.
 */
export function useMonetizationFlags() {
  const { features } = useAdminStore();
  const monetization = features.find((f) => f.id === "monetization");

  const isOn = (id: string) => {
    if (!monetization?.enabled) return false;
    return monetization.subFeatures?.find((sf) => sf.id === id)?.enabled ?? false;
  };

  return {
    newsletter: isOn("m-newsletter"),
    affiliates: isOn("m-affiliates"),
    paywall: isOn("m-paywall"),
    sponsored: isOn("m-sponsored"),
  };
}
