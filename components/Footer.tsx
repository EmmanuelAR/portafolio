"use client";

import { useLang } from "@/lib/i18n";
import { content, NAME } from "@/lib/content";

export default function Footer() {
  const { lang } = useLang();
  const c = content[lang];
  return (
    <footer className="border-t border-ink/10">
      <div className="shell flex flex-col gap-3 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] font-mono text-xs tracking-wide text-ink/50 sm:flex-row sm:items-center sm:justify-between">
        <p>
          {c.footer.tagline}
          <span className="mx-2 text-ink/25">·</span>© {new Date().getFullYear()} {NAME}
        </p>
        <p>{c.footer.built}</p>
      </div>
    </footer>
  );
}
