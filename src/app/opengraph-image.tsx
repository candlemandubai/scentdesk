import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ScentDesk — Fragrance Industry Intelligence Terminal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0e17 0%, #111827 50%, #0a0e17 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "linear-gradient(rgba(200,169,126,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,126,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            display: "flex",
          }}
        />

        {/* Top border accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, transparent, #c8a97e, transparent)",
            display: "flex",
          }}
        />

        {/* Accent dot */}
        <div
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            backgroundColor: "#c8a97e",
            marginBottom: "24px",
            display: "flex",
          }}
        />

        {/* Logo text */}
        <div
          style={{
            display: "flex",
            fontSize: "72px",
            fontWeight: 700,
            letterSpacing: "8px",
            marginBottom: "16px",
          }}
        >
          <span style={{ color: "#e5e7eb" }}>SCENT</span>
          <span style={{ color: "#c8a97e" }}>DESK</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "22px",
            color: "#6b7280",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: "40px",
            display: "flex",
          }}
        >
          Fragrance Industry Intelligence Terminal
        </div>

        {/* Data points row */}
        <div
          style={{
            display: "flex",
            gap: "32px",
            alignItems: "center",
          }}
        >
          {[
            { label: "MARKET DATA", value: "$125B+" },
            { label: "RAW MATERIALS", value: "LIVE" },
            { label: "REGULATORY", value: "IFRA/EU" },
            { label: "LAUNCHES", value: "REAL-TIME" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "16px 24px",
                border: "1px solid #1e2d3d",
                borderRadius: "8px",
                backgroundColor: "rgba(26, 35, 50, 0.6)",
              }}
            >
              <span style={{ fontSize: "24px", color: "#c8a97e", fontWeight: 600 }}>
                {item.value}
              </span>
              <span style={{ fontSize: "10px", color: "#6b7280", letterSpacing: "2px", marginTop: "4px" }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            fontSize: "14px",
            color: "#374151",
            letterSpacing: "3px",
            display: "flex",
          }}
        >
          scentdesk.app
        </div>
      </div>
    ),
    { ...size }
  );
}
