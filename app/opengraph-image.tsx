import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { BRAND } from "@/lib/content";

export const alt = "hi. i'm emmanuel. i build products. cavos, framezz, ear.dev.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadInter(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0" } }
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:woff2|truetype|opentype)'\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function Image() {
  const [font, avatar] = await Promise.all([
    loadInter(),
    readFile(join(process.cwd(), "public/brand/avatar-logo.png")),
  ]);
  const avatarSrc = `data:image/png;base64,${avatar.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#ffffff",
          color: "#000000",
          fontFamily: "Inter, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 96,
            top: 150,
            display: "flex",
            flexDirection: "column",
            fontSize: 92,
            fontWeight: 500,
            letterSpacing: "-0.04em",
            lineHeight: 1.02,
          }}
        >
          <div>hi. i&apos;m emmanuel.</div>
          <div style={{ display: "flex", marginTop: 8 }}>
            <span>i build</span>
            <span
              style={{
                marginLeft: 22,
                background: "rgba(74,144,226,0.5)",
                padding: "0 10px",
                borderRadius: 4,
              }}
            >
              products.
            </span>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 96,
            bottom: 88,
            fontSize: 30,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            color: "rgba(0,0,0,0.6)",
          }}
        >
          cavos · framezz · spacexai · costa rica
        </div>
        <div
          style={{
            position: "absolute",
            left: 96,
            top: 88,
            fontSize: 30,
            fontWeight: 500,
            letterSpacing: "-0.03em",
          }}
        >
          {BRAND}
        </div>
        <img
          src={avatarSrc}
          alt=""
          width={320}
          height={320}
          style={{ position: "absolute", right: 40, bottom: 24 }}
        />
      </div>
    ),
    {
      ...size,
      fonts: font
        ? [{ name: "Inter", data: font, style: "normal" as const, weight: 500 as const }]
        : undefined,
    }
  );
}
