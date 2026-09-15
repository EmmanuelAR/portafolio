"use client";

import { useRef } from "react";
import { useLang } from "@/lib/i18n";
import { content, LINKS, TOP_LANGUAGES } from "@/lib/content";
import type { ContributionData } from "@/lib/github";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import Section from "./Section";

const LEVELS = ["rgba(0,0,0,0.06)", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

export default function GitHubGrid({ data }: { data: ContributionData }) {
  const { lang } = useLang();
  const c = content[lang];
  const grid = useRef<HTMLDivElement>(null);
  const langs = data.languages?.length ? data.languages : TOP_LANGUAGES;

  // Cells sweep in left→right once the grid scrolls into view.
  useGSAP(
    () => {
      if (!grid.current) return;
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from("[data-week]", {
          opacity: 0,
          y: 6,
          duration: 0.5,
          ease: "power2.out",
          stagger: { each: 0.012 },
          scrollTrigger: { trigger: grid.current, start: "top 85%", once: true },
        });
      });
    },
    { scope: grid, dependencies: [data.weeks.length] }
  );

  const nf = new Intl.NumberFormat(lang === "es" ? "es-CR" : "en-US");

  return (
    <Section index="04" label={c.github.heading}>
      <div data-reveal className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <p className="text-title font-medium tracking-tight-brand">
          {nf.format(data.total)}
          <span className="ml-3 text-lead text-ink/50">{c.github.contributions}</span>
        </p>
        <a
          href={LINKS.github}
          target="_blank"
          rel="noopener"
          className="link-grow font-mono text-xs tracking-wide text-ink/60 hover:text-ink"
        >
          @EmmanuelAR ↗
        </a>
      </div>

      <div ref={grid} data-reveal className="mt-10 min-w-0 overflow-x-auto">
        {data.weeks.length === 0 ? (
          <p className="font-mono text-xs text-ink/50">{c.github.unavailable}</p>
        ) : (
          <div
            className="grid gap-[3px]"
            style={{ gridTemplateColumns: `repeat(${data.weeks.length}, minmax(0, 1fr))` }}
          >
            {data.weeks.map((week, wi) => (
              <div key={wi} data-week className="grid grid-rows-7 gap-[3px]">
                {week.map((day, di) => (
                  <div
                    key={di}
                    title={day.date.startsWith("pad") ? "" : `${day.date}: ${day.count}`}
                    className="aspect-square w-full rounded-[2px]"
                    style={{
                      backgroundColor: day.date.startsWith("pad") ? "transparent" : LEVELS[day.level],
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <div data-reveal className="mt-8 grid gap-6 font-mono text-xs tracking-wide text-ink/60 sm:grid-cols-2">
        {data.stats && (
          <p className="leading-relaxed">
            {nf.format(data.stats.commits)} {c.github.commits}
            <span className="mx-2 text-ink/25">·</span>
            {nf.format(data.stats.pullRequests)} {c.github.prs}
            {data.stats.currentStreak > 0 && (
              <>
                <span className="mx-2 text-ink/25">·</span>
                {c.github.streak(data.stats.currentStreak)}
              </>
            )}
          </p>
        )}
        <p className="leading-relaxed">
          <span className="text-ink/40">{c.github.topLangs}: </span>
          {langs.join(", ").toLowerCase()}
        </p>
      </div>
    </Section>
  );
}
