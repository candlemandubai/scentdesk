"use client";
import { useState } from "react";
import WidgetWrapper, { CountBadge } from "./WidgetWrapper";
import { mockEvents } from "@/data/mockData";
import { MapPin, ExternalLink, Instagram } from "lucide-react";

type EventType = "all" | "trade-show" | "conference" | "workshop" | "launch" | "webinar";

export default function EventsCalendar() {
  const [filter, setFilter] = useState<EventType>("all");
  const filtered = filter === "all" ? mockEvents : mockEvents.filter((e) => e.type === filter);

  const types: { label: string; value: EventType }[] = [
    { label: "All", value: "all" },
    { label: "Trade Shows", value: "trade-show" },
    { label: "Conferences", value: "conference" },
    { label: "Workshops", value: "workshop" },
  ];

  const typeColors: Record<string, string> = {
    "trade-show": "badge-gold",
    conference: "badge-blue",
    workshop: "badge-purple",
    launch: "badge-green",
    webinar: "badge-amber",
  };

  return (
    <WidgetWrapper
      title="Upcoming Events"
      badge={<CountBadge count={mockEvents.length} />}
      info="Global fragrance industry events, trade shows, conferences, and workshops. Click any event to visit its official website."
    >
      <div className="flex gap-1.5 mb-3 flex-wrap">
        {types.map((t) => (
          <button
            key={t.value}
            onClick={() => setFilter(t.value)}
            className={`text-[10px] font-mono font-semibold px-2 py-1 rounded transition-colors ${
              filter === t.value
                ? "bg-scent-accent/20 text-scent-accent"
                : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
            }`}
          >
            {t.label.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((event) => {
          const eventDate = new Date(event.date);
          const isUpcoming = eventDate > new Date();
          const daysUntil = Math.ceil((eventDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

          return (
            <div
              key={event.id}
              className="group flex gap-3 hover:bg-white/[0.02] rounded p-1.5 -mx-1.5 cursor-pointer"
              onClick={() => window.open(event.url || "#", "_blank", "noopener,noreferrer")}
            >
              <div className="shrink-0 w-12 text-center">
                <div className="text-[10px] font-mono text-gray-500 uppercase">
                  {eventDate.toLocaleDateString("en", { month: "short" })}
                </div>
                <div className="text-[18px] font-mono font-bold text-white">
                  {eventDate.getDate()}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[12px] text-gray-200 font-medium group-hover:text-white transition-colors">
                    {event.name}
                  </span>
                  <ExternalLink size={10} className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
                <div className="flex items-center gap-2">
                  <span className={`badge ${typeColors[event.type] || "badge-blue"}`}>{event.type.replace("-", " ")}</span>
                  <span className="flex items-center gap-1 text-[10px] text-gray-500">
                    <MapPin size={9} /> {event.city}, {event.country}
                  </span>
                  {event.instagram && (
                    <a
                      href={event.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-scent-accent transition-colors"
                      onClick={(e) => e.stopPropagation()}
                      title="Instagram"
                    >
                      <Instagram size={10} />
                    </a>
                  )}
                </div>
                {isUpcoming && daysUntil > 0 && (
                  <span className="text-[10px] font-mono text-scent-accent mt-0.5 block">
                    {daysUntil}d away
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </WidgetWrapper>
  );
}
