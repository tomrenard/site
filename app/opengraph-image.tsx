import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Tom Renard, Senior Product Engineer";

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
          background: "#fff8f5",
          color: "#171717",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ fontSize: 68, fontWeight: 600, letterSpacing: "-0.02em" }}>
            Tom Renard
          </div>
          <div style={{ fontSize: 40, color: "#525252" }}>
            Senior Product Engineer
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: 28, color: "#525252", maxWidth: "900px" }}>
            Frontend deep. Ships across the stack. Owns the outcome after the
            ship.
          </div>
          <div style={{ fontSize: 24, color: "#a3a3a3" }}>tomrenard.site</div>
        </div>
      </div>
    ),
    size
  );
}
