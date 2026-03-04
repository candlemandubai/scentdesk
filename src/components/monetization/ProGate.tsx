"use client";
import { ReactNode } from "react";
import { useMonetization } from "@/hooks/useMonetization";
import { Lock, Zap } from "lucide-react";

interface ProGateProps {
  children: ReactNode;
  /** Short label for what this widget is */
  feature: string;
}

// Widgets that require Pro when paywall is enabled
export const PRO_WIDGET_IDS = [
  "raw-materials-prices",
  "supply-chain",
  "ai-insights",
  "regional-data",
  "sustainability",
  "trending-ingredients",
];

/**
 * Wraps a widget and shows a Pro upgrade prompt instead of the content
 * when the m-paywall feature is enabled and the user doesn't have Pro.
 *
 * For now, there's no user auth — this just shows the gate UI.
 * When you add Stripe/auth, check user.isPro here.
 */
export default function ProGate({ children, feature }: ProGateProps) {
  const { isEnabled } = useMonetization("m-paywall");

  // TODO: Replace with actual user auth check
  const userIsPro = false;

  if (!isEnabled || userIsPro) {
    return <>{children}</>;
  }

  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
      {/* Blurred preview behind the gate */}
      <div className="absolute inset-0 opacity-20 blur-sm pointer-events-none">
        {children}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-scent-accent/10 flex items-center justify-center mb-3">
          <Lock size={20} className="text-scent-accent" />
        </div>

        <h3 className="text-[14px] font-mono font-bold text-white mb-1">
          Pro Feature
        </h3>
        <p className="text-[11px] text-gray-400 mb-4 max-w-[260px] leading-relaxed">
          {feature} is available with ScentDesk Pro.
          Get real-time data, AI insights, and premium analytics.
        </p>

        <button
          onClick={() => {
            // TODO: Open Stripe checkout or auth modal
            window.open("https://scentdesk.app/pro", "_blank");
          }}
          className="flex items-center gap-1.5 bg-scent-accent hover:bg-scent-accent/80 text-black text-[11px] font-mono font-bold px-4 py-2 rounded-lg transition-colors"
        >
          <Zap size={12} />
          Upgrade to Pro — $9/mo
        </button>

        <p className="text-[9px] text-gray-600 mt-2">
          7-day free trial • Cancel anytime
        </p>
      </div>
    </div>
  );
}
