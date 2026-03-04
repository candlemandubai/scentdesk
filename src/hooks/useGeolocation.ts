"use client";
import { useState, useEffect } from "react";
import type { GeoLocation } from "@/types";

const DEFAULT_LOCATION: GeoLocation = {
  lat: 48.8566,
  lng: 2.3522,
  city: "Paris",
  country: "France",
  region: "Europe",
};

export function useGeolocation() {
  const [location, setLocation] = useState<GeoLocation>(DEFAULT_LOCATION);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const region = getRegionFromCoords(latitude, longitude);
        setLocation({
          lat: latitude,
          lng: longitude,
          city: region.city,
          country: region.country,
          region: region.region,
        });
        setLoading(false);
      },
      () => {
        setError("Location access denied");
        setLoading(false);
      },
      { timeout: 5000 }
    );
  }, []);

  return { location, loading, error, setLocation };
}

function getRegionFromCoords(lat: number, lng: number): { city: string; country: string; region: string } {
  if (lat > 35 && lat < 71 && lng > -10 && lng < 40) return { city: "Paris", country: "France", region: "Europe" };
  if (lat > 24 && lat < 50 && lng > -130 && lng < -60) return { city: "New York", country: "USA", region: "North America" };
  if (lat > 12 && lat < 35 && lng > 35 && lng < 60) return { city: "Dubai", country: "UAE", region: "Middle East" };
  if (lat > -10 && lat < 55 && lng > 60 && lng < 150) return { city: "Tokyo", country: "Japan", region: "Asia" };
  if (lat > -60 && lat < 15 && lng > -80 && lng < -30) return { city: "São Paulo", country: "Brazil", region: "Latin America" };
  if (lat > -40 && lat < 35 && lng > -20 && lng < 55) return { city: "Cairo", country: "Egypt", region: "Africa" };
  return { city: "Paris", country: "France", region: "Europe" };
}
