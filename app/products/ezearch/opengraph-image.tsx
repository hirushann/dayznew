import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { ezearch } from "@/content/products";
import { site } from "@/content/site";

export const alt = `${ezearch.name} — ${ezearch.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Mirrors the tokens in globals.css (ImageResponse can't read CSS variables).
const BG = "#0a0a0b";
const FG = "#ededed";
const MUTED = "#a1a1a6";
const ACCENT = "#9bca3e";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public", ezearch.logo.src));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: `radial-gradient(circle at 85% 15%, rgba(155,202,62,0.22), ${BG} 55%)`,
        color: FG,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <img src={logoSrc} width={338} height={80} alt="" />
        <div
          style={{
            display: "flex",
            border: `2px solid ${ACCENT}`,
            color: ACCENT,
            borderRadius: 999,
            padding: "6px 16px",
            fontSize: 20,
            letterSpacing: 2,
          }}
        >
          {ezearch.badge.toUpperCase()}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
          {ezearch.tagline}
        </div>
        <div style={{ fontSize: 30, color: MUTED }}>
          {`4.4 ms median search · live in 3 minutes · by ${site.name}`}
        </div>
      </div>
      <div style={{ height: 6, width: 160, background: ACCENT, borderRadius: 999 }} />
    </div>,
    size,
  );
}
