"use client";
import { useState, useEffect, useCallback, useRef } from "react";

interface UseLiveDataOptions<T> {
  url: string;
  refreshInterval?: number; // ms
  fallbackData: T;
  enabled?: boolean;
}

interface LiveDataResult<T> {
  data: T;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  refetch: () => void;
  isStale: boolean;
}

export function useLiveData<T>({
  url,
  refreshInterval = 60000,
  fallbackData,
  enabled = true,
}: UseLiveDataOptions<T>): LiveDataResult<T> {
  const [data, setData] = useState<T>(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isStale, setIsStale] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    try {
      setIsStale(true);
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
      setLastUpdated(json.lastUpdated || new Date().toISOString());
      setError(null);
      setIsStale(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fetch failed");
      setIsStale(false);
    } finally {
      setLoading(false);
    }
  }, [url, enabled]);

  useEffect(() => {
    fetchData();

    if (enabled && refreshInterval > 0) {
      intervalRef.current = setInterval(fetchData, refreshInterval);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchData, refreshInterval, enabled]);

  return { data, loading, error, lastUpdated, refetch: fetchData, isStale };
}
