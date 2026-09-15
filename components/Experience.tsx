"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import Section from "./Section";
import { Metrics } from "./Stat";

export default function Experience() {
  const { lang } = useLang();
  const c = content[lang];
  return (
    <Section id="story" index="05" label={c.experience.heading}>
      <p data-reveal className="mb-10 max-w-[24ch] text-title font-medium tracking-tight-brand text-balance sm:mb-12">
        {c.experience.intro}
      </p>
      <ol>
        {c.experience.jobs.map((job, i) => (
            <li
              key={i}
              data-reveal
              className="grid min-w-0 items-baseline gap-2 border-t border-ink/10 py-6 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-10 sm:py-7"
            >
              <span className="font-mono text-xs tracking-wide text-ink/45">{job.period}</span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  {job.logo && (
                    <span className="relative block h-6 w-6 shrink-0">
                      <Image src={job.logo} alt="" fill sizes="24px" className="object-contain" />
                    </span>
                  )}
                  <h3 className="text-lg font-medium tracking-tight-brand sm:text-xl">
                    {job.url ? (
                      <a href={job.url} target="_blank" rel="noopener" className="link-grow">
                        {job.org}
                      </a>
                    ) : (
                      job.org
                    )}
                  </h3>
                </div>
                <p className="mt-1 text-[15px] text-ink/55">{job.role}</p>
                {job.stats && <Metrics items={job.stats} className="mt-2" />}
              </div>
            </li>
        ))}
      </ol>
    </Section>
  );
}
