import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Static export has no server, so the card is rendered once at build time.
export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.role}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #16181D 0%, #0F1012 45%, #08090B 100%)",
          padding: 72,
          color: "#F2F3F5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 12, height: 12, borderRadius: 99, background: "#7B8CFF" }} />
          <div style={{ fontSize: 26, letterSpacing: 6, color: "#9AA0AC" }}>
            {site.role.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>
            Venkat Thanmai Kumar
          </div>
          <div style={{ fontSize: 34, color: "#9AA0AC", maxWidth: 900, lineHeight: 1.35 }}>
            I build production software end to end, from the data model to the last pixel.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #262932",
            paddingTop: 28,
            fontSize: 26,
            color: "#9AA0AC",
          }}
        >
          <div style={{ display: "flex" }}>.NET · React · SQL Server · Azure · AI</div>
          <div style={{ display: "flex", color: "#7B8CFF" }}>Bangalore, India</div>
        </div>
      </div>
    ),
    size,
  );
}
