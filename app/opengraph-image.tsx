import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Colours mirror the tokens in globals.css (ImageResponse can't read CSS variables).
const BG = "#0a0a0b";
const FG = "#ededed";
const MUTED = "#a1a1a6";
const ACCENT = "#9bca3e";
const PAPER = "#f3f2ee";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/brand-logo.png"));
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
        background: `radial-gradient(circle at 80% 20%, rgba(155,202,62,0.25), ${BG} 55%)`,
        color: FG,
      }}
    >
      <div
        style={{
          display: "flex",
          background: PAPER,
          borderRadius: 999,
          padding: "14px 28px",
          alignSelf: "flex-start",
        }}
      >
        <img src={logoSrc} width={243} height={100} alt="" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1, letterSpacing: -2 }}>
          {site.motto}
        </div>
        <div style={{ fontSize: 30, color: MUTED }}>
          {`Custom software, web & mobile apps — ${site.address.locality}, Sri Lanka`}
        </div>
      </div>
      <div style={{ height: 6, width: 160, background: ACCENT, borderRadius: 999 }} />
    </div>,
    size,
  );
}
