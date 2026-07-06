"use client";

import { LanguageProvider } from "@/lib/i18n";
import type { ContributionData } from "@/lib/github";
import Loader from "./Loader";
import Nav from "./Nav";
import Hero from "./Hero";
import About from "./About";

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
          <Hero />
          <About />
        </main>
      </div>
    </LanguageProvider>
  );
}
