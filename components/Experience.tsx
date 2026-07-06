"use client";

import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";

export default function Experience() {
  const { lang } = useLang();
  const c = content[lang];
  return (
    <section className="border-b border-black px-4 py-16 sm:px-8">
      <h2 className="mb-8 text-lg font-bold">{c.experienceHeading}</h2>
      <div className="space-y-10">
        {c.jobs.map((job, i) => (
          <div key={i} className="border-l-2 border-black pl-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-bold">
                {job.role} —{" "}
                {job.url ? (
                  <a href={job.url} target="_blank" rel="noopener" className="underline">
                    {job.org}
                  </a>
                ) : (
                  job.org
                )}
              </h3>
              <span className="text-xs text-black/60">{job.period}</span>
            </div>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-black/80">
              {job.bullets.map((b, bi) => (
                <li key={bi}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
