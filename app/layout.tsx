import type { Metadata, Viewport } from "next";
import { fontDisplay, fontSans, fontMono } from "@/styles/fonts";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { Header } from "@/components/layout/Header";
import { NavToggle } from "@/components/layout/NavToggle";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { PageTransitionShell } from "@/components/layout/PageTransitionShell";
import { PersonJsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "Fahamedul Islam",
    "Bangladesh football",
    "Bangladesh national team",
    "Bangladeshi footballer",
    "Forward",
    "BPL",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.description,
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.description,
    creator: SITE.twitter,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070707",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-midnight text-text font-sans antialiased">
        <PersonJsonLd />
        <LenisProvider>
          <ScrollProgress />
          <Header />
          <NavToggle />
          <main className="relative">
            <PageTransitionShell>{children}</PageTransitionShell>
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
