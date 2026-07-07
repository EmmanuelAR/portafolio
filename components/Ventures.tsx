"use client";

import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";

export default function Ventures() {
  const { lang } = useLang();
  const c = content[lang];
  return (
    <section id="work" className="border-b border-black px-4 py-16 sm:px-8">
      <h2 className="mb-8 text-lg font-bold">{c.venturesHeading}</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {c.ventures.map((v, i) => (
          <a
            key={i}
            href={v.url}
            target="_blank"
            rel="noopener"
            className="group border border-black p-6 transition-colors hover:bg-black hover:text-white"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">{v.name}</h3>
              <span aria-hidden>→</span>
            </div>
            <p className="mt-3 text-sm opacity-80">{v.blurb}</p>
            <p className="mt-4 text-xs opacity-60">
              {v.url.replace("https://", "")}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
