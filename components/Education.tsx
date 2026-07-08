"use client";

import { useLang } from "@/lib/i18n";
import { content, EDUCATION, CERTIFICATIONS, type Credential } from "@/lib/content";

function Row({ item, small }: { item: Credential; small?: boolean }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <div>
        <h3 className={small ? "text-sm font-bold" : "font-bold"}>{item.title}</h3>
        <p className="text-xs text-black/60">{item.org}</p>
      </div>
      <div className="flex items-center gap-3">
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener"
            className="text-xs underline underline-offset-2 hover:no-underline"
          >
            credential ↗
          </a>
        )}
        <span className="shrink-0 text-xs text-black/50">{item.period}</span>
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
    <section className="border-b border-black px-4 py-16 sm:px-8">
      <h2 className="mb-6 text-lg font-bold">{c.educationHeading}</h2>
      <div className="space-y-6">
        {EDUCATION.map((e, i) => (
          <Row key={i} item={e} />
        ))}
      </div>

      <h2 className="mb-6 mt-12 text-lg font-bold">{c.certificationsHeading}</h2>
      <div className="space-y-5">
        {primaryCerts.map((e, i) => (
          <Row key={i} item={e} small />
        ))}
      </div>

      {moreCerts.length > 0 && (
        <details className="group mt-5">
          <summary className="cursor-pointer list-none text-xs text-black/60 underline underline-offset-2 hover:text-black">
            {c.moreCertsLabel} ({moreCerts.length}){" "}
            <span className="inline-block transition-transform group-open:rotate-90">
              →
            </span>
          </summary>
          <div className="mt-5 space-y-5">
            {moreCerts.map((e, i) => (
              <Row key={i} item={e} small />
            ))}
          </div>
        </details>
      )}
    </section>
  );
}
