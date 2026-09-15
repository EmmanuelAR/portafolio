"use client";

import { useLang } from "@/lib/i18n";
import { content, LINKS, SOCIALS } from "@/lib/content";
import { useMagnetic } from "@/lib/useMagnetic";
import BookCall from "./BookCall";
import Marked from "./Marked";

export default function Talk() {
  const { lang } = useLang();
  const c = content[lang];
  const emailRef = useMagnetic<HTMLAnchorElement>(5);

  return (
    <section id="talk" className="border-t border-ink/10 scroll-mt-20">
      <div className="shell py-20 sm:py-28 lg:py-36">
        <h2
          data-reveal
          className="max-w-[16ch] text-display font-medium tracking-brand text-balance wrap-anywhere"
        >
          <Marked text={c.talk.heading} />
        </h2>
        <p data-reveal className="mt-6 max-w-[36ch] text-lead text-ink/70 sm:mt-8">
          {c.talk.body}
        </p>

        <div data-reveal className="mt-10 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap">
          <BookCall className="btn btn-primary w-full sm:w-auto" />
          <a ref={emailRef} href={`mailto:${LINKS.email}`} className="btn btn-secondary w-full sm:w-auto">
            {c.cta.email}
          </a>
        </div>

        <div data-reveal className="mt-14 flex flex-wrap items-baseline gap-x-6 gap-y-3 sm:mt-16">
          <span className="mono-label">{c.talk.socialsLabel}</span>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  className="link-grow text-base text-ink/70 hover:text-ink"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
