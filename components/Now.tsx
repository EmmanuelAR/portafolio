"use client";

import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import Section from "./Section";
import Marked from "./Marked";

export default function Now() {
  const { lang } = useLang();
  const c = content[lang];
  return (
    <Section index="01" label={c.now.heading}>
      <ol className="divide-y divide-ink/10">
        {c.now.items.map((item, i) => {
          const inner = (
            <>
              <span className="mono-label w-28 shrink-0 pt-[0.55em] sm:w-32">
                {item.status}
              </span>
              <span className="min-w-0 text-lead wrap-anywhere">
                <Marked text={item.text} />
                {item.url && (
                  <span
                    aria-hidden
                    className="ml-2 inline-block text-ink/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink"
                  >
                    ↗
                  </span>
                )}
              </span>
            </>
          );
          const cls = "group flex flex-col gap-2 py-6 sm:flex-row sm:gap-8 sm:py-7";
          return (
            <li key={i} data-reveal data-reveal-delay={String(i * 0.06)}>
              {item.url ? (
                <a href={item.url} target="_blank" rel="noopener" className={cls}>
                  {inner}
                </a>
              ) : (
                <div className={cls}>{inner}</div>
              )}
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
