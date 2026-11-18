import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ReactElement, ReactNode } from "react";
import { NAME } from "./content";
import type { Lang } from "./i18n";
import { landingOgLines, ogCard, type OgLine } from "./ogCopy";

export const OG_SIZE = { width: 1200, height: 630 };

export function langFromRequest(request: Request): Lang {
  return new URL(request.url).searchParams.get("lang") === "en" ? "en" : "es";
}

function Line({ line, size }: { line: OgLine; size: number }) {
  const style = {
    display: "flex" as const,
    fontSize: size,
    fontWeight: 500 as const,
    letterSpacing: "-0.04em",
    lineHeight: 1.05,
    whiteSpace: "nowrap" as const,
  };
  if (!line.highlight || !line.text.includes(line.highlight)) {
    return <div style={style}>{line.text}</div>;
  }
  const at = line.text.indexOf(line.highlight);
  const before = line.text.slice(0, at).trimEnd();
  const after = line.text.slice(at + line.highlight.length);
  return (
    <div style={style}>
      {before ? <span>{before}</span> : null}
      <span
        style={{
          marginLeft: before ? 16 : 0,
          background: "rgba(74,144,226,0.5)",
          padding: "0 10px",
          borderRadius: 4,
        }}
      >
        {line.highlight}
      </span>
      {after ? <span>{after}</span> : null}
    </div>
  );
}

function Frame({
  avatar,
  footer,
  children,
}: {
  avatar: string;
  footer: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#ffffff",
        color: "#000000",
        fontFamily: "Inter",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 72,
          fontSize: 28,
          fontWeight: 500,
          letterSpacing: "-0.03em",
          display: "flex",
        }}
      >
        {NAME}
      </div>
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 168,
          display: "flex",
          flexDirection: "column",
          width: 780,
        }}
      >
        {children}
      </div>
      <div
        style={{
          position: "absolute",
          left: 80,
          bottom: 64,
          fontSize: 26,
          fontWeight: 500,
          letterSpacing: "-0.02em",
          color: "rgba(0,0,0,0.6)",
          display: "flex",
        }}
      >
        {footer}
      </div>
      {/* Satori paints a raw image; next/image cannot run inside ImageResponse. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={avatar}
        alt=""
        width={240}
        height={240}
        style={{ position: "absolute", right: 48, bottom: 40 }}
      />
    </div>
  );
}

async function loadAssets(): Promise<{ font: ArrayBuffer; avatar: string }> {
  const [font, avatar] = await Promise.all([
    readFile(join(process.cwd(), "assets/Inter-Medium.woff")),
    readFile(join(process.cwd(), "public/brand/avatar-logo.png")),
  ]);
  return {
    font: font.buffer.slice(font.byteOffset, font.byteOffset + font.byteLength),
    avatar: `data:image/png;base64,${avatar.toString("base64")}`,
  };
}

function imageResponse(node: ReactElement, font: ArrayBuffer) {
  return new ImageResponse(node, {
    ...OG_SIZE,
    fonts: [{ name: "Inter", data: font, style: "normal", weight: 500 }],
  });
}

export async function renderCardOg(kind: "home" | "portafolio" | "asesorias", lang: Lang) {
  const card = ogCard(kind, lang);
  const { font, avatar } = await loadAssets();
  const size = kind === "home" ? 72 : kind === "asesorias" ? 60 : 64;
  return imageResponse(
    <Frame avatar={avatar} footer={card.footer}>
      {card.lines.map((line) => (
        <Line key={line.text} line={line} size={size} />
      ))}
    </Frame>,
    font
  );
}

export async function renderLandingOg(lang: Lang) {
  const card = landingOgLines(lang);
  const { font, avatar } = await loadAssets();
  return imageResponse(
    <Frame avatar={avatar} footer={card.footer}>
      {card.titleLines.map((text) => (
        <Line key={text} line={{ text }} size={68} />
      ))}
      <div
        style={{
          display: "flex",
          marginTop: 28,
          fontSize: 30,
          fontWeight: 500,
          letterSpacing: "-0.02em",
          lineHeight: 1.25,
          color: "rgba(0,0,0,0.6)",
          whiteSpace: "nowrap",
        }}
      >
        {card.tagline}
      </div>
    </Frame>,
    font
  );
}
