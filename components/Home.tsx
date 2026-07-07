"use client";

import { LanguageProvider } from "@/lib/i18n";
import type { ContributionData } from "@/lib/github";
import Loader from "./Loader";
import Nav from "./Nav";
import Hero from "./Hero";
import About from "./About";
import GitHubGrid from "./GitHubGrid";
import Ventures from "./Ventures";
import Experience from "./Experience";
import Skills from "./Skills";
import Education from "./Education";
import CVModal from "./CVModal";
import Footer from "./Footer";

export default function Home({
  contributions,
}: {
  contributions: ContributionData;
}) {
  return (
    <LanguageProvider>
      <Loader />
      <CVModal />
      <div id="top">
        <Nav />
        <main>
          <Hero />
          <About />
          <GitHubGrid data={contributions} />
          <Ventures />
          <Experience />
          <Skills />
          <Education />
          <Footer />
        </main>
      </div>
    </LanguageProvider>
  );
}
