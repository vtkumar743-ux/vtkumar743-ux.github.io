import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Not preloaded: this face is only used for small labels and figures, so it should
// not compete with the hero for bandwidth on a phone. `swap` covers the gap.
const mono = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false,
});

const title = `Full-Stack Software Engineer & UI/UX Developer in Bangalore | ${site.short}`;
const description =
  "Full-stack software engineer in Bangalore building .NET and React platforms, APIs and AI agent systems. Open to full-time roles and freelance projects, remote worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "full stack developer Bangalore",
    "dotnet developer",
    "react developer",
    "ASP.NET Core",
    "UI UX developer",
    "freelance software engineer India",
    "AI agent developer",
  ],
  alternates: { canonical: site.url },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title,
    description,
    url: site.url,
    siteName: site.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Full-Stack Software Engineer",
    email: `mailto:${site.email}`,
    telephone: site.phone,
    url: site.url,
    address: { "@type": "PostalAddress", addressLocality: "Bangalore", addressCountry: "IN" },
    sameAs: [site.github, site.linkedin],
    knowsAbout: [".NET", "ASP.NET Core", "React", "TypeScript", "SQL Server", "Azure", "AI agents"],
  };

  return (
    <html
      lang="en"
      // The bootstrap script below adds `js` to this element before React hydrates,
      // so its class list legitimately differs from the server HTML.
      suppressHydrationWarning
      className={`${sora.variable} ${inter.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        {/* Runs before paint: marks JS as available so reveal animations may hide
            content. Without it everything stays visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              `var d=document.documentElement;d.classList.add('js');` +
              // If the bundle never hydrates, drop back to everything visible.
              // Reveal clears this timer as soon as its observer is attached.
              `window.__revealFallback=setTimeout(function(){d.classList.remove('js')},2500);`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-text">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:font-medium focus:text-bg"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Reveal />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
