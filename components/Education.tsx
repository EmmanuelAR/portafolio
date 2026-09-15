"use client";

import { useLang } from "@/lib/i18n";
import { content, EDUCATION, CERTIFICATIONS, type Credential } from "@/lib/content";
import Section from "./Section";

function Row({ item, label }: { item: Credential; label: string }) {
  return (
    <div className="grid min-w-0 gap-1 py-5 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-10">
      <span className="font-mono text-xs leading-relaxed tracking-wide text-ink/55">{item.period}</span>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <div>
          <h3 className="text-lg font-medium tracking-tight-brand">{item.title}</h3>
          <p className="mt-0.5 text-sm text-ink/55">{item.org}</p>
        </div>
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener"
            className="link-grow font-mono text-xs tracking-wide text-ink/60 hover:text-ink"
          >
            {label} ↗
          </a>
        )}
      </div>
    </div>
  );
}

export default function Education() {
  const { lang } = useLang();
  const c = content[lang];
  const primaryCerts = CERTIFICATIONS.filter((e) => !e.secondary);
  const moreCerts = CERTIFICATIONS.filter((e) => e.secondary);
  return (
    <Section index="07" label={c.education.heading}>
      <div data-reveal className="divide-y divide-ink/10">
        {EDUCATION.map((e, i) => (
          <Row key={i} item={e} label={c.education.credentialLabel} />
        ))}
      </div>

      <p data-reveal className="mono-label mt-14 mb-2">{c.education.certificationsHeading}</p>
      <div data-reveal className="divide-y divide-ink/10">
        {primaryCerts.map((e, i) => (
          <Row key={i} item={e} label={c.education.credentialLabel} />
        ))}
      </div>

      {moreCerts.length > 0 && (
        <details data-reveal className="group mt-2">
          <summary className="link-grow inline-block cursor-pointer list-none py-3 font-mono text-xs tracking-wide text-ink/60 hover:text-ink [&::-webkit-details-marker]:hidden">
            {c.education.moreCertsLabel} ({moreCerts.length}){" "}
            <span aria-hidden className="inline-block transition-transform duration-300 group-open:rotate-90">
              →
            </span>
          </summary>
          <div className="divide-y divide-ink/10">
            {moreCerts.map((e, i) => (
              <Row key={i} item={e} label={c.education.credentialLabel} />
            ))}
          </div>
        </details>
      )}
    </Section>
  );
}
