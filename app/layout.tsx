import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Providers } from "@/components/providers/providers";
import { JsonLd } from "@/components/seo/json-ld";
import { Cursor } from "@/components/ui/cursor";
import { Preloader } from "@/components/ui/preloader";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { site } from "@/content/site";
import { INTRO_KEY } from "@/lib/motion";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const display = Bricolage_Grotesque({ variable: "--ff-display", subsets: ["latin"] });
const serif = Instrument_Serif({
  variable: "--ff-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: { type: "website", siteName: site.name, locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0a0a0b", colorScheme: "dark" };

// Runs before paint so repeat visitors in the same session never see the preloader flash.
const introScript = `try{if(sessionStorage.getItem("${INTRO_KEY}"))document.documentElement.dataset.intro="seen"}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} ${serif.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <JsonLd />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="bg-accent text-accent-ink rounded-pill sr-only z-[100] px-4 py-2 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <Providers>
          <Preloader />
          <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <Cursor />
        </Providers>
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
