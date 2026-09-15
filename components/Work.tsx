"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { content, type Venture, type Project } from "@/lib/content";
import Section from "./Section";
import Marked from "./Marked";
import { Metrics } from "./Stat";

function Case({ v, i }: { v: Venture; i: number }) {
  const host = v.url.replace("https://", "").replace(/\/.*$/, "");
  return (
    <article className="border-t border-ink/10 py-10 first:border-t-0 first:pt-0 sm:py-12">
      <a
        href={v.url}
        target="_blank"
        rel="noopener"
        className="group block"
        aria-label={`${v.name} — ${host}`}
      >
        <div data-reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div className="flex min-w-0 items-center gap-4">
            <span className="relative block h-10 w-10 shrink-0 sm:h-12 sm:w-12">
              <Image src={v.logo} alt="" fill sizes="48px" className="object-contain" />
            </span>
            <h3 className="min-w-0 text-title font-medium tracking-tight-brand wrap-anywhere">{v.name}</h3>
          </div>
          <span className="mono-label flex items-center gap-2">
            <span className="text-ink/35">0{i + 1}</span>
            <span className="link-grow text-ink/70 group-hover:text-ink">{host}</span>
            <span aria-hidden className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              ↗
            </span>
          </span>
        </div>

        <p data-reveal className="mt-5 max-w-[26ch] text-lead text-balance sm:mt-6">
          <Marked text={v.tagline} />
        </p>
        {v.blurb && (
          <p data-reveal className="mt-4 max-w-[52ch] text-base leading-[1.55] text-ink/70">
            {v.blurb}
          </p>
        )}
        <div data-reveal className="mt-4 flex flex-col gap-1.5">
          <Metrics items={v.stats} />
          {v.tech && <p className="font-mono text-xs tracking-wide text-ink/40">{v.tech}</p>}
        </div>
      </a>
    </article>
  );
}

function Experiment({ p }: { p: Project }) {
  return (
    <li data-reveal className="grid min-w-0 gap-2 border-t border-ink/10 py-5 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-8">
      <div>
        <h4 className="text-base font-medium tracking-tight-brand">{p.name}</h4>
        <p className="mt-1 font-mono text-[11px] tracking-wide text-ink/45">{p.stack}</p>
      </div>
      <p className="max-w-[48ch] text-[15px] leading-[1.5] text-ink/70">{p.blurb}</p>
    </li>
  );
}

export default function Work() {
  const { lang } = useLang();
  const c = content[lang];
  return (
    <Section id="work" index="03" label={c.work.heading}>
      {c.work.ventures.map((v, i) => (
        <Case key={v.name} v={v} i={i} />
      ))}
      {c.work.projects.length > 0 && (
        <div className="mt-8 sm:mt-10">
          <p data-reveal className="mono-label mb-2">{c.work.experimentsHeading}</p>
          <ul>
            {c.work.projects.map((p) => (
              <Experiment key={p.name} p={p} />
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
