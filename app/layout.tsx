import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Emmanuel Agüero — Software Engineer",
  description:
    "Backend & Full-Stack Software Engineer · Blockchain / Web3. Snap Finance, Cavos, Studio Framezz.",
  openGraph: {
    title: "Emmanuel Agüero — Software Engineer",
    description: "Backend & Full-Stack · Blockchain / Web3",
    images: ["/emmanuel.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${mono.variable} font-mono bg-white text-black antialiased`}>
        {children}
      </body>
    </html>
  );
}
