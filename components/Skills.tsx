"use client";

import { useLang } from "@/lib/i18n";
import { content, SKILLS } from "@/lib/content";

export default function Skills() {
  const { lang } = useLang();
  const c = content[lang];
  return (
    <section className="border-b border-black px-4 py-16 sm:px-8">
      <h2 className="mb-8 text-lg font-bold">{c.skillsHeading}</h2>
      <div className="flex flex-wrap gap-2">
        {SKILLS.map((s) => (
          <span key={s} className="border border-black px-3 py-1 text-xs">
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}
