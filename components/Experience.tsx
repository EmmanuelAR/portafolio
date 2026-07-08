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
        {c.jobs.map((job, i) => {
          const founder = job.kind === "founder";
          return (
            <div
              key={i}
              className={`border-l-2 pl-4 ${founder ? "border-black" : "border-black/30"}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${
                      founder
                        ? "border border-black bg-black text-white"
                        : "border border-black/40 text-black/60"
                    }`}
                  >
                    {c.roleTags[job.kind]}
                  </span>
                  <h3 className="font-bold">
                    {job.role} —{" "}
                    {job.url ? (
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener"
                        className="underline"
                      >
                        {job.org}
                      </a>
                    ) : (
                      job.org
                    )}
                  </h3>
                </div>
                <span className="text-xs text-black/60">{job.period}</span>
              </div>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-black/80">
                {job.bullets.map((b, bi) => (
                  <li key={bi}>{b}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
