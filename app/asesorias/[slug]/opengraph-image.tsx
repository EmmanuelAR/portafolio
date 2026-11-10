import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NAME } from "@/lib/content";
import { getAdvisory } from "@/lib/asesorias";

export const alt = "El empleado que no se cansa — Emmanuel Agüero Rojas";
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

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const advisory = getAdvisory(slug);
  const title = advisory?.es.title ?? "Asesoría";
  const tagline = advisory?.es.tagline ?? "";

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
            maxWidth: 900,
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "rgba(0,0,0,0.6)",
              marginTop: 24,
            }}
          >
            {tagline}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 96,
            bottom: 88,
            fontSize: 28,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            color: "rgba(0,0,0,0.6)",
          }}
        >
          90 minutos · automatización con ia
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
          {NAME}
        </div>
        <img
          src={avatarSrc}
          alt=""
          width={280}
          height={280}
          style={{ position: "absolute", right: 60, bottom: 40 }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: font
        ? [{ name: "Inter", data: font, style: "normal" as const, weight: 500 as const }]
        : undefined,
    }
  );
}
