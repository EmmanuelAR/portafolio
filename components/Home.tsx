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
import Projects from "./Projects";
import Skills from "./Skills";
import CVModal from "./CVModal";
import XFeed from "./XFeed";
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
          <Projects />
          <XFeed />
          <Footer />
        </main>
      </div>
    </LanguageProvider>
  );
}
