"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";

export default function About() {
  const { lang } = useLang();
  const c = content[lang];
  return (
    <section id="about" className="border-b border-black px-4 py-16 sm:px-8">
      <h2 className="mb-8 text-lg font-bold">{c.about.heading}</h2>
      <div className="grid gap-8 md:grid-cols-[280px_1fr] md:items-start">
        <Image
          src="/emmanuel.jpg"
          alt="Emmanuel Agüero"
          width={280}
          height={373}
          className="w-full max-w-[280px] border border-black grayscale"
          priority
        />
        <p className="max-w-2xl text-sm leading-relaxed sm:text-base">
          {c.about.body}
        </p>
      </div>
    </section>
  );
}
