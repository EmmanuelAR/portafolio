"use client";

import { useLang } from "@/lib/i18n";
import { content, LINKS } from "@/lib/content";
import type { ContributionData } from "@/lib/github";

const LEVELS = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

export default function GitHubGrid({ data }: { data: ContributionData }) {
  const { lang } = useLang();
  const c = content[lang];
  return (
    <section className="border-b border-black px-4 py-16 sm:px-8">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="text-lg font-bold">{c.githubHeading}</h2>
        <a
          href={LINKS.github}
          target="_blank"
          rel="noopener"
          className="text-xs hover:underline"
        >
          @EmmanuelAR · {data.total} contributions
        </a>
      </div>
      {data.weeks.length === 0 ? (
        <p className="text-xs text-black/50">Contribution data unavailable.</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex gap-[3px]">
            {data.weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day, di) => (
                  <div
                    key={di}
                    title={day.date.startsWith("pad") ? "" : `${day.date}: ${day.count}`}
                    className="h-[11px] w-[11px] border border-black/10"
                    style={{ backgroundColor: LEVELS[day.level] }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
