"use client";

import { LanguageProvider } from "@/lib/i18n";
import type { ContributionData } from "@/lib/github";
import Loader from "./Loader";
import Nav from "./Nav";
import Hero from "./Hero";
import Now from "./Now";
import About from "./About";
import Work from "./Work";
import GitHubGrid from "./GitHubGrid";
import Experience from "./Experience";
import Skills from "./Skills";
import Talk from "./Talk";
import Footer from "./Footer";
import CVModal from "./CVModal";
import MotionRoot from "./MotionRoot";

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
        <MotionRoot>
          <main>
            <Hero />
            <Now />
            <About />
            <Work />
            <GitHubGrid data={contributions} />
            <Experience />
            <Skills />
            <Talk />
          </main>
          <Footer />
        </MotionRoot>
      </div>
    </LanguageProvider>
  );
}
