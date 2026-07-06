"use client";

import { useEffect } from "react";
import { useLang } from "@/lib/i18n";
import { content, X_HANDLE } from "@/lib/content";

export default function XFeed() {
  const { lang } = useLang();
  const c = content[lang];

  useEffect(() => {
    if (!X_HANDLE) return;
    const s = document.createElement("script");
    s.src = "https://platform.twitter.com/widgets.js";
    s.async = true;
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
  }, []);

  return (
    <section className="border-b border-black px-4 py-16 sm:px-8">
      <h2 className="mb-8 text-lg font-bold">{c.xHeading}</h2>
      {X_HANDLE ? (
        <div className="max-w-xl border border-black p-2">
          <a
            className="twitter-timeline"
            data-height="500"
            data-theme="light"
            href={`https://twitter.com/${X_HANDLE}?ref_src=twsrc%5Etfw`}
          >
            @{X_HANDLE}
          </a>
        </div>
      ) : (
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener"
          className="inline-block border border-black p-6 hover:bg-black hover:text-white"
        >
          {c.xPending} →
        </a>
      )}
    </section>
  );
}
