"use client";

import { useLang } from "@/lib/i18n";
import { content, LINKS, X_HANDLE } from "@/lib/content";

export default function Footer() {
  const { lang } = useLang();
  const c = content[lang];
  return (
    <footer id="contact" className="px-4 py-16 sm:px-8">
      <h2 className="mb-8 text-lg font-bold">{c.contact.heading}</h2>
      <div className="flex flex-col gap-2 text-sm">
        <a href={`mailto:${c.contact.email}`} className="hover:underline">
          {c.contact.email}
        </a>
        <span>{c.contact.phone}</span>
        <div className="mt-4 flex flex-wrap gap-4">
          <a href={LINKS.github} target="_blank" rel="noopener" className="hover:underline">GitHub</a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener" className="hover:underline">LinkedIn</a>
          <a href={X_HANDLE ? `https://x.com/${X_HANDLE}` : "https://x.com"} target="_blank" rel="noopener" className="hover:underline">X</a>
          <a href={LINKS.instagram} target="_blank" rel="noopener" className="hover:underline">Instagram</a>
        </div>
        <p className="mt-8 text-xs text-black/50">built with Next.js · © 2026 Emmanuel Agüero</p>
      </div>
    </footer>
  );
}
