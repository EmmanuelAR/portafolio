"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { content, type Venture } from "@/lib/content";
import { StatChips } from "./Stat";

function VentureCard({ v }: { v: Venture }) {
  return (
    <a
      href={v.url}
      target="_blank"
      rel="noopener"
      className={`group block border-black p-6 transition-colors hover:bg-black/[0.02] sm:p-8 ${
        v.featured ? "border-2" : "border"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="relative block h-9 w-9 shrink-0">
            <Image
              src={v.logo}
              alt={`${v.name} logo`}
              fill
              className="object-contain"
              sizes="36px"
            />
          </span>
          <h3 className="text-xl font-bold sm:text-2xl">{v.name}</h3>
          {v.featured && (
            <span className="border border-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest">
              flagship
            </span>
          )}
        </div>
        <span aria-hidden className="transition-transform group-hover:translate-x-1">
          →
        </span>
      </div>

      <StatChips items={v.stats} className="mt-4" />
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-black/80">
        {v.blurb}
      </p>
      <p className="mt-4 text-xs text-black/50">{v.tech}</p>
      <span className="mt-4 inline-block text-xs underline underline-offset-2 group-hover:no-underline">
        {v.url.replace("https://", "").replace(/\/$/, "")}
      </span>
    </a>
  );
}

export default function Ventures() {
  const { lang } = useLang();
  const c = content[lang];
  return (
    <section id="work" className="border-b border-black px-4 py-16 sm:px-8">
      <h2 className="mb-8 text-lg font-bold">{c.venturesHeading}</h2>
      <div className="space-y-6">
        {c.ventures.map((v, i) => (
          <VentureCard key={i} v={v} />
        ))}
      </div>
    </section>
  );
}
