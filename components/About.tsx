"use client";

import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import Section from "./Section";
import Marked from "./Marked";

export default function About() {
  const { lang } = useLang();
  const c = content[lang];
  const [first, ...rest] = c.about.paragraphs;
  return (
    <Section id="about" index="02" label={c.about.heading}>
      <p data-reveal className="max-w-[22ch] text-title font-medium tracking-tight-brand text-balance wrap-anywhere">
        <Marked text={first} />
      </p>
      <div className="mt-8 max-w-[52ch] space-y-5 text-lg leading-[1.5] text-ink/80 sm:mt-10">
        {rest.map((p, i) => (
          <p key={i} data-reveal>
            <Marked text={p} />
          </p>
        ))}
      </div>
    </Section>
  );
}
