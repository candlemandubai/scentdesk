"use client";
import { useState, useEffect, useCallback } from "react";

const NAMESPACE = "scentdesk-app";
const BASE_URL = "https://abacus.jasoncameron.dev";

/**
 * Persistent page-view counter via Abacus API (free, no signup).
 * Also provides approximate "live viewers" via heartbeat pattern.
 */
export function useViewCounter() {
  const [totalViews, setTotalViews] = useState<number | null>(null);
  const [liveViewers, setLiveViewers] = useState<number>(1);

  // Hit the counter once on mount (increments total views)
  useEffect(() => {
    fetch(`${BASE_URL}/hit/${NAMESPACE}/page-views`)
      .then((r) => r.json())
      .then((d) => setTotalViews(d.value))
      .catch(() => {});
  }, []);

  // Live viewers — heartbeat approach using a rolling window counter
  useEffect(() => {
    const minute = Math.floor(Date.now() / 60000); // current minute bucket

    // Register this viewer in current minute bucket
    fetch(`${BASE_URL}/hit/${NAMESPACE}/live-${minute}`)
      .then((r) => r.json())
      .then((d) => setLiveViewers(Math.max(1, d.value)))
      .catch(() => {});

    // Heartbeat every 30s — keep registering in the current minute
    const interval = setInterval(() => {
      const currentMinute = Math.floor(Date.now() / 60000);
      fetch(`${BASE_URL}/hit/${NAMESPACE}/live-${currentMinute}`)
        .then((r) => r.json())
        .then((d) => setLiveViewers(Math.max(1, d.value)))
        .catch(() => {});
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const refreshCount = useCallback(() => {
    fetch(`${BASE_URL}/get/${NAMESPACE}/page-views`)
      .then((r) => r.json())
      .then((d) => setTotalViews(d.value))
      .catch(() => {});
  }, []);

  return { totalViews, liveViewers, refreshCount };
}
