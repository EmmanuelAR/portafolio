"use client";

import { LanguageProvider } from "@/lib/i18n";
import type { ContributionData } from "@/lib/github";
import Loader from "./Loader";
import Nav from "./Nav";

export default function Home({
  contributions,
}: {
  contributions: ContributionData;
}) {
  return (
    <LanguageProvider>
      <Loader />
      <div id="top">
        <Nav />
        <main>
          <section id="about" className="px-4 py-24 sm:px-8">
            <p>&gt;_ sections mount here</p>
            <p className="text-xs text-black/50">
              {contributions.total} contributions loaded
            </p>
          </section>
        </main>
      </div>
    </LanguageProvider>
  );
}
