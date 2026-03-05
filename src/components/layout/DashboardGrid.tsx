// If you're reading this, you're probably a dev who loves fragrance too.
// We see you. PRs welcome, ideas welcome, coffee chats welcome.
// → hello@olfactal.com | @candlemandubai

"use client";
import { useMemo, useCallback, useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { useDashboardStore } from "@/store/dashboardStore";
import { useAnalyticsStore } from "@/store/analyticsStore";
import { createEvent } from "@/lib/analytics";
import type { WidgetType } from "@/types";
import { GripVertical } from "lucide-react";
import { DragHandleProvider } from "@/components/widgets/WidgetWrapper";

// Widget imports — only real-data widgets
import NewsFeed, { NewsMarket, NewsLaunches, NewsMaterials, NewsHome } from "@/components/widgets/NewsFeed";
import WorldClock from "@/components/widgets/WorldClock";
import RegulatoryUpdates from "@/components/widgets/RegulatoryUpdates";
import EventsCalendar from "@/components/widgets/EventsCalendar";
import Schools from "@/components/widgets/Schools";
import Suppliers from "@/components/widgets/Suppliers";
import UsefulApps from "@/components/widgets/UsefulApps";
import NewsletterSignup from "@/components/widgets/NewsletterSignup";
import DailyBrief from "@/components/widgets/DailyBrief";
import PerfumerSpotlight from "@/components/widgets/PerfumerSpotlight";
import JobsBoard from "@/components/widgets/JobsBoard";
import CommunityFeed from "@/components/widgets/CommunityFeed";
import YouTubeFeed from "@/components/widgets/YouTubeFeed";
import StockTracker from "@/components/widgets/StockTracker";

const widgetComponents: Record<WidgetType, React.ComponentType> = {
  "news-feed": NewsFeed,
  "news-market": NewsMarket,
  "news-launches": NewsLaunches,
  "news-materials": NewsMaterials,
  "news-home": NewsHome,
  "world-clock": WorldClock,
  "regulatory-updates": RegulatoryUpdates,
  "events-calendar": EventsCalendar,
  "schools": Schools,
  "suppliers": Suppliers,
  "useful-apps": UsefulApps,
  "newsletter-signup": NewsletterSignup,
  "daily-brief": DailyBrief,
  "perfumer-spotlight": PerfumerSpotlight,
  "jobs-board": JobsBoard,
  "community-feed": CommunityFeed,
  "youtube-feed": YouTubeFeed,
  "stock-tracker": StockTracker,
};

const BREAKPOINTS = { lg: 1200, md: 900, sm: 0 } as const;

function getBreakpoint(width: number): keyof typeof BREAKPOINTS {
  if (width >= BREAKPOINTS.lg) return "lg";
  if (width >= BREAKPOINTS.md) return "md";
  return "sm";
}

export default function DashboardGrid() {
  const activeTab = useDashboardStore((s) => s.activeTab);
  const widgets = useDashboardStore((s) => s.widgets);
  const reorderWidgets = useDashboardStore((s) => s.reorderWidgets);
  const trackEvent = useAnalyticsStore((s) => s.trackEvent);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1280);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const measure = () => setContainerWidth(node.offsetWidth);
    measure();
    const ro = new ResizeObserver(() => measure());
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  const bp = getBreakpoint(containerWidth);

  const tabWidgets = useMemo(
    () => widgets.filter((w) => w.tab === activeTab && w.enabled),
    [widgets, activeTab]
  );

  const handleWidgetClick = useCallback(
    (widgetId: string) => {
      trackEvent(createEvent("widget_click", { widget: widgetId }));
    },
    [trackEvent]
  );

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;
      const from = result.source.index;
      const to = result.destination.index;
      if (from === to) return;

      // Get IDs of tab widgets in current order
      const ids = tabWidgets.map((w) => w.id);
      const [moved] = ids.splice(from, 1);
      ids.splice(to, 0, moved);
      reorderWidgets(activeTab, ids);
      trackEvent(createEvent("widget_click", { widget: "drag-reorder" }));
    },
    [tabWidgets, activeTab, reorderWidgets, trackEvent]
  );

  return (
    <div className="p-2 min-h-screen" ref={containerRef}>
      {tabWidgets.length > 0 ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId={`tab-${activeTab}`}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="grid grid-cols-12 gap-2"
              >
                {tabWidgets.map((widget, index) => {
                  const Component = widgetComponents[widget.type];
                  if (!Component) return null;
                  const span = bp === "sm" ? 12 : bp === "md" ? Math.min(widget.w, 9) : widget.w;
                  return (
                    <Draggable key={widget.id} draggableId={widget.id} index={index}>
                      {(dragProvided, snapshot) => (
                        <div
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          id={widget.id}
                          className={`min-h-[200px] relative group/drag ${snapshot.isDragging ? "z-50 opacity-90" : ""}`}
                          style={{
                            gridColumn: `span ${span}`,
                            ...dragProvided.draggableProps.style,
                          }}
                          onClick={() => handleWidgetClick(widget.id)}
                        >
                          <DragHandleProvider value={
                            <div
                              {...dragProvided.dragHandleProps}
                              className="p-1 rounded opacity-0 group-hover/drag:opacity-60 hover:!opacity-100 cursor-grab active:cursor-grabbing transition-opacity text-gray-500 hover:text-gray-300"
                              title="Drag to reorder"
                            >
                              <GripVertical size={14} />
                            </div>
                          }>
                            <Component />
                          </DragHandleProvider>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <div className="flex flex-col items-center justify-center h-[60vh] text-gray-600">
          <div className="text-6xl mb-4 opacity-20">📊</div>
          <p className="text-[14px] font-mono">No widgets enabled for this tab</p>
          <p className="text-[12px] text-gray-700 mt-1">Enable widgets in the Admin Dashboard</p>
        </div>
      )}
    </div>
  );
}
