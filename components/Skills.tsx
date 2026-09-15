"use client";

import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import Section from "./Section";

export default function Skills() {
  const { lang } = useLang();
  const c = content[lang];
  return (
    <Section index="06" label={c.skills.heading}>
      <dl className="divide-y divide-ink/10">
        {c.skills.groups.map((g) => (
          <div
            key={g.label}
            data-reveal
            className="grid min-w-0 gap-2 py-5 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-10"
          >
            <dt className="mono-label pt-[0.45em]">{g.label}</dt>
            <dd className="min-w-0 text-lg leading-[1.5] tracking-tight-brand wrap-anywhere sm:text-xl">
              {g.items.map((s, i) => (
                <span key={s}>
                  {i > 0 && <span className="mx-2 text-ink/25">·</span>}
                  {s}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
