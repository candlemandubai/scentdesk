"use client";
import { useState, useEffect } from "react";
import WidgetWrapper from "./WidgetWrapper";
import { fragranceHubs } from "@/data/mockData";

export default function WorldClock() {
  const [times, setTimes] = useState<Record<string, string>>({});
  const [marketStatus, setMarketStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    function updateTimes() {
      const newTimes: Record<string, string> = {};
      const newStatus: Record<string, boolean> = {};
      fragranceHubs.forEach((hub) => {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: hub.timezone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        newTimes[hub.city] = formatter.format(now);

        const hourFormatter = new Intl.DateTimeFormat("en-US", {
          timeZone: hub.timezone,
          hour: "numeric",
          hour12: false,
        });
        const hour = parseInt(hourFormatter.format(now));
        newStatus[hub.city] = hour >= 9 && hour < 18;
      });
      setTimes(newTimes);
      setMarketStatus(newStatus);
    }

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <WidgetWrapper title="Fragrance Capitals" info="Live time in major fragrance industry hubs: Grasse, New York, Geneva, Dubai, Tokyo, and São Paulo.">
      <div className="space-y-2">
        {fragranceHubs.map((hub) => (
          <div key={hub.city} className="flex items-center justify-between py-1.5 hover:bg-white/[0.02] rounded px-1 -mx-1">
            <div className="flex items-center gap-2.5">
              <span className="text-base">{hub.emoji}</span>
              <div>
                <div className="text-[13px] text-white font-medium">{hub.city}</div>
                <div className="text-[10px] text-gray-500 font-mono">{hub.label}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[16px] font-mono font-bold text-white tracking-wider">
                {times[hub.city] || "--:--:--"}
              </div>
              <div className={`text-[9px] font-mono font-semibold ${
                marketStatus[hub.city] ? "text-emerald-400" : "text-gray-600"
              }`}>
                {marketStatus[hub.city] ? "BUSINESS HOURS" : "CLOSED"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </WidgetWrapper>
  );
}
