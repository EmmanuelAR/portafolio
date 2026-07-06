"use client";

import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";

export default function Projects() {
  const { lang } = useLang();
  const c = content[lang];
  return (
    <section id="projects" className="border-b border-black px-4 py-16 sm:px-8">
      <h2 className="mb-8 text-lg font-bold">{c.projectsHeading}</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {c.projects.map((p, i) => (
          <div key={i} className="border border-black p-5">
            <div className="flex items-baseline justify-between">
              <h3 className="font-bold">{p.name}</h3>
              <span className="text-xs text-black/60">{p.stack}</span>
            </div>
            <p className="mt-3 text-sm text-black/80">{p.blurb}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
