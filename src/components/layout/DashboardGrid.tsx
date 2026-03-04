"use client";
import { useMemo, useCallback, useRef } from "react";
import { ResponsiveGridLayout, useContainerWidth, verticalCompactor } from "react-grid-layout";
import type { LayoutItem, ResponsiveLayouts, Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useDashboardStore } from "@/store/dashboardStore";
import { useAnalyticsStore } from "@/store/analyticsStore";
import { createEvent } from "@/lib/analytics";
import type { WidgetType } from "@/types";

// Widget imports
import NewsFeed from "@/components/widgets/NewsFeed";
import RawMaterialsPrices from "@/components/widgets/RawMaterialsPrices";
import MarketOverview from "@/components/widgets/MarketOverview";
import AIInsights from "@/components/widgets/AIInsights";
import BrandLaunches from "@/components/widgets/BrandLaunches";
import FragranceIndex from "@/components/widgets/FragranceIndex";
import TopSellers from "@/components/widgets/TopSellers";
import MarketHeatmap from "@/components/widgets/MarketHeatmap";
import WorldClock from "@/components/widgets/WorldClock";
import RegulatoryUpdates from "@/components/widgets/RegulatoryUpdates";
import CommunityFeed from "@/components/widgets/CommunityFeed";
import HomeFragranceMarket from "@/components/widgets/HomeFragranceMarket";
import CandlesTracker from "@/components/widgets/CandlesTracker";
import DiffusersMarket from "@/components/widgets/DiffusersMarket";
import RoomSprays from "@/components/widgets/RoomSprays";
import TrendingIngredients from "@/components/widgets/TrendingIngredients";
import SupplyChain from "@/components/widgets/SupplyChain";
import Sustainability from "@/components/widgets/Sustainability";
import RegionalData from "@/components/widgets/RegionalData";
import EventsCalendar from "@/components/widgets/EventsCalendar";
import JobsBoard from "@/components/widgets/JobsBoard";
import Schools from "@/components/widgets/Schools";
import SeasonalTrends from "@/components/widgets/SeasonalTrends";
import ConsumerTrends from "@/components/widgets/ConsumerTrends";
import FragranceFamilies from "@/components/widgets/FragranceFamilies";
import SocialBuzz from "@/components/widgets/SocialBuzz";
import Suppliers from "@/components/widgets/Suppliers";
import FragranceOfTheDay from "@/components/widgets/FragranceOfTheDay";
import QuickConverter from "@/components/widgets/QuickConverter";

const widgetComponents: Record<WidgetType, React.ComponentType> = {
  "news-feed": NewsFeed,
  "raw-materials-prices": RawMaterialsPrices,
  "market-overview": MarketOverview,
  "ai-insights": AIInsights,
  "brand-launches": BrandLaunches,
  "fragrance-index": FragranceIndex,
  "top-sellers": TopSellers,
  "market-heatmap": MarketHeatmap,
  "world-clock": WorldClock,
  "regulatory-updates": RegulatoryUpdates,
  "community-feed": CommunityFeed,
  "home-fragrance-market": HomeFragranceMarket,
  "candles-tracker": CandlesTracker,
  "diffusers-market": DiffusersMarket,
  "room-sprays": RoomSprays,
  "trending-ingredients": TrendingIngredients,
  "supply-chain": SupplyChain,
  "sustainability": Sustainability,
  "regional-data": RegionalData,
  "events-calendar": EventsCalendar,
  "jobs-board": JobsBoard,
  "schools": Schools,
  "seasonal-trends": SeasonalTrends,
  "consumer-trends": ConsumerTrends,
  "fragrance-families": FragranceFamilies,
  "social-buzz": SocialBuzz,
  "suppliers": Suppliers,
  "fragrance-of-the-day": FragranceOfTheDay,
  "quick-converter": QuickConverter,
};

export default function DashboardGrid() {
  const { activeTab, widgets, updateLayouts } = useDashboardStore();
  const { trackEvent } = useAnalyticsStore();
  const { width, containerRef } = useContainerWidth({ initialWidth: 1280 });

  const tabWidgets = useMemo(
    () => widgets.filter((w) => w.tab === activeTab && w.enabled),
    [widgets, activeTab]
  );

  const layouts: ResponsiveLayouts = useMemo(() => {
    const lg: LayoutItem[] = tabWidgets.map((w) => ({
      i: w.id,
      x: w.x,
      y: w.y,
      w: w.w,
      h: w.h,
      minW: w.minW || 2,
      minH: w.minH || 2,
    }));

    const md: LayoutItem[] = tabWidgets.map((w) => ({
      i: w.id,
      x: w.x % 9,
      y: w.y,
      w: Math.min(w.w, 9),
      h: w.h,
      minW: w.minW || 2,
      minH: w.minH || 2,
    }));

    const sm: LayoutItem[] = tabWidgets.map((w, index) => ({
      i: w.id,
      x: 0,
      y: index * w.h,
      w: 6,
      h: w.h,
      minW: 2,
      minH: w.minH || 2,
    }));

    return { lg, md, sm };
  }, [tabWidgets]);

  const handleLayoutChange = useCallback(
    (layout: Layout, allLayouts: ResponsiveLayouts) => {
      const lgLayout = allLayouts.lg;
      if (!lgLayout) return;

      const updatedWidgets = widgets.map((w) => {
        const layoutItem = lgLayout.find((l) => l.i === w.id);
        if (layoutItem) {
          return { ...w, x: layoutItem.x, y: layoutItem.y, w: layoutItem.w, h: layoutItem.h };
        }
        return w;
      });
      updateLayouts(updatedWidgets);
    },
    [widgets, updateLayouts]
  );

  const handleWidgetClick = (widgetId: string) => {
    trackEvent(createEvent("widget_click", { widget: widgetId }));
  };

  return (
    <div className="p-2 min-h-screen" ref={containerRef}>
      {width > 0 && (
        <ResponsiveGridLayout
          className="layout"
          width={width}
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 900, sm: 0 }}
          cols={{ lg: 12, md: 9, sm: 6 }}
          rowHeight={80}
          margin={[8, 8]}
          containerPadding={[0, 0]}
          onLayoutChange={handleLayoutChange}
          dragConfig={{ enabled: true, handle: ".widget-header" }}
          resizeConfig={{ enabled: true, handles: ["se"] }}
          compactor={verticalCompactor}
        >
          {tabWidgets.map((widget) => {
            const Component = widgetComponents[widget.type];
            if (!Component) return null;
            return (
              <div key={widget.id} onClick={() => handleWidgetClick(widget.id)}>
                <Component />
              </div>
            );
          })}
        </ResponsiveGridLayout>
      )}

      {tabWidgets.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[60vh] text-gray-600">
          <div className="text-6xl mb-4 opacity-20">📊</div>
          <p className="text-[14px] font-mono">No widgets enabled for this tab</p>
          <p className="text-[12px] text-gray-700 mt-1">Enable widgets in the Admin Dashboard</p>
        </div>
      )}
    </div>
  );
}
