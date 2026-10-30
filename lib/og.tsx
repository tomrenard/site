import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };

// Share image in the site's style: top bar with a rule, big title, one line under it.
export async function ogImage({ title, line, page }: { title: string; line: string; page: string }) {
  const font = await readFile(join(process.cwd(), "assets/fonts/InterTight-Medium.ttf"));
  const ink = "#141414";
  const mute = "#5f5d59";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#e8e6e1",
          color: ink,
          padding: "48px 64px 64px",
          fontFamily: "Inter Tight",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 24, paddingBottom: 20, borderBottom: `2px solid ${ink}` }}>
          <div style={{ width: 16, height: 16, background: ink, marginRight: 14 }} />
          <div style={{ flex: 1 }}>Tom Renard</div>
          <div style={{ display: "flex", alignItems: "center", color: ink, marginRight: 64 }}>
            <div style={{ width: 14, height: 14, background: "#ff3d00", marginRight: 12 }} />
            {page}
          </div>
          <div style={{ color: mute }}>tomrenard.site</div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: title.length > 12 ? 128 : 176, lineHeight: 0.95, letterSpacing: "-0.035em" }}>
          {title}
        </div>
        <div style={{ fontSize: 34, lineHeight: 1.2, letterSpacing: "-0.02em", color: mute, marginTop: 44, maxWidth: 980 }}>
          {line}
        </div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Inter Tight", data: font, weight: 500 }] }
  );
}
