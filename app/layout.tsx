import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LINKS, NAME, X_HANDLE } from "@/lib/content";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jbmono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: NAME, url: SITE_URL }],
  creator: NAME,
  keywords: [
    "emmanuel agüero",
    "ear.dev",
    "founder",
    "software engineer",
    "costa rica",
    "cavos",
    "framezz",
    "starknet",
    "web3",
    "fintech",
    "backend",
  ],
  alternates: {
    canonical: "/",
    languages: { en: "/", es: "/?lang=es", "x-default": "/" },
  },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    alternateLocale: ["es_CR"],
    firstName: "Emmanuel",
    lastName: "Agüero Rojas",
    username: X_HANDLE,
  },
  twitter: {
    card: "summary_large_image",
    site: `@${X_HANDLE}`,
    creator: `@${X_HANDLE}`,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: NAME,
  alternateName: "ear.dev",
  url: SITE_URL,
  image: `${SITE_URL}/brand/avatar-logo.png`,
  jobTitle: "Founder & Software Engineer",
  description: SITE_DESCRIPTION,
  email: `mailto:${LINKS.email}`,
  nationality: { "@type": "Country", name: "Costa Rica" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Alajuela",
    addressCountry: "CR",
  },
  sameAs: [
    LINKS.github,
    LINKS.linkedin,
    LINKS.instagram,
    `https://x.com/${X_HANDLE}`,
  ],
  worksFor: [
    { "@type": "Organization", name: "Cavos", url: "https://cavos.xyz/" },
    { "@type": "Organization", name: "Studio Framezz", url: "https://studioframezz.com/en" },
    { "@type": "Organization", name: "Snap Finance" },
    { "@type": "Organization", name: "SpaceXAI" },
  ],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Universidad Nacional, Costa Rica" },
    { "@type": "CollegeOrUniversity", name: "Universidad CENFOTEC" },
  ],
  knowsAbout: [
    "Backend engineering",
    "Fintech",
    "Web3",
    "Starknet",
    "Account abstraction",
    "Next.js",
    "AWS",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Before first paint: flag JS availability (reveal styles only apply when
            GSAP can run) and whether the brand intro should play this session. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var h=document.documentElement;h.classList.add('js');try{if(!sessionStorage.getItem('ear-intro-seen'))h.classList.add('intro')}catch(e){}})()",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${mono.variable} font-sans bg-paper text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
