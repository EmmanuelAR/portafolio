import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { NAME, X_HANDLE } from "@/lib/content";
import { hubMeta, pageAlternates, personJsonLd } from "@/lib/meta";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Lang } from "@/lib/i18n";

const defaultMeta = hubMeta.es;

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
  title: defaultMeta.title,
  description: defaultMeta.description,
  applicationName: SITE_NAME,
  authors: [{ name: NAME, url: SITE_URL }],
  creator: NAME,
  keywords: [
    "emmanuel agüero",
    "emmanuel agüero rojas",
    "founder",
    "software engineer",
    "costa rica",
    "asesorías",
    "automation",
    "cavos",
    "framezz",
    "starknet",
    "web3",
    "fintech",
    "backend",
  ],
  alternates: pageAlternates("/", "es"),
  openGraph: {
    type: "profile",
    url: "/",
    siteName: SITE_NAME,
    title: defaultMeta.title,
    description: defaultMeta.description,
    locale: "es_CR",
    alternateLocale: ["en_US"],
    firstName: "Emmanuel",
    lastName: "Agüero Rojas",
    username: X_HANDLE,
  },
  twitter: {
    card: "summary_large_image",
    site: `@${X_HANDLE}`,
    creator: `@${X_HANDLE}`,
    title: defaultMeta.title,
    description: defaultMeta.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const langHeader = headersList.get("x-lang");
  const lang: Lang = langHeader === "en" ? "en" : "es";

  return (
    <html lang={lang} suppressHydrationWarning>
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(lang)) }}
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
