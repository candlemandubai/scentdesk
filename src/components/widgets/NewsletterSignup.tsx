"use client";
import { useState } from "react";
import WidgetWrapper from "./WidgetWrapper";
import { ArrowRight, Check, Loader2 } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "You're on the list! We'll be in touch.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  };

  return (
    <WidgetWrapper
      title="olfactal.com"
      info="Olfactal — perfume formulation software with IFRA & constituent compliance checking. Get early beta access."
    >
      <div className="flex flex-col items-center text-center px-2 py-3">
        {/* Olfactal logo */}
        <a
          href="https://olfactal.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-3 group"
        >
          <img
            src="/olfactal-logo.png"
            alt="Olfactal"
            width={48}
            height={48}
            className="rounded-xl group-hover:opacity-80 transition-opacity"
          />
        </a>

        <a
          href="https://olfactal.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <h3 className="text-[14px] font-mono font-bold text-white mb-0.5">
            olfactal.com
          </h3>
        </a>
        <p className="text-[11px] font-mono text-gray-400 mb-3">
          Perfume Formulation Software
        </p>

        <p className="text-[11px] text-gray-400 leading-relaxed mb-4 max-w-[280px]">
          Formulate, manage ingredients & check IFRA and constituent compliance — all in one place. Built for perfumers.
        </p>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-2 py-2">
            <div className="flex items-center gap-2 text-emerald-400 text-[12px] font-mono">
              <Check size={14} />
              <span>{message}</span>
            </div>
            <a
              href="https://olfactal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono text-scent-accent hover:text-scent-accent/80 transition-colors"
            >
              Visit olfactal.com →
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-[320px]">
            <div className="flex gap-1.5">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="you@example.com"
                className="flex-1 bg-scent-bg border border-scent-border rounded-lg px-3 py-2 text-[12px] text-white placeholder-gray-600 focus:outline-none focus:border-scent-accent/50 font-mono"
                required
              />
              <button
                type="submit"
                disabled={status === "loading" || !email}
                className="bg-scent-accent hover:bg-scent-accent/80 disabled:opacity-40 disabled:cursor-not-allowed text-black text-[11px] font-mono font-bold px-3 py-2 rounded-lg transition-colors flex items-center gap-1"
              >
                {status === "loading" ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <>
                    GET ACCESS
                    <ArrowRight size={10} />
                  </>
                )}
              </button>
            </div>
            {status === "error" && (
              <p className="text-red-400 text-[10px] font-mono mt-1.5">{message}</p>
            )}
            <p className="text-[9px] text-gray-600 mt-2">
              Free beta access. By the team behind ScentDesk.
            </p>
          </form>
        )}

        <div className="flex items-center gap-4 mt-4 text-[10px] text-gray-500 font-mono">
          <span>🧪 Formulation</span>
          <span>✅ IFRA Check</span>
          <span>📋 Compliance</span>
        </div>
      </div>
    </WidgetWrapper>
  );
}
