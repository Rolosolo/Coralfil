import { JsonLd } from "@/components/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LayoutGroup } from "@/components/motion-client";

import type { Metadata } from "next";
import { Space_Grotesk, Poppins } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://coralfil.com'),
  title: {
    template: '%s | Coralfil',
    default: 'Marine Restoration Technology | Coralfil',
  },
  description: 'AI-driven restoration for Pacific glass sponge reefs and BC shellfish ecosystems. Reefmaker AI™ v2.0 empowers a resilient blue economy.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://coralfil.com',
    siteName: 'Coralfil',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Coralfil Marine Restoration',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@coralfil',
    creator: '@coralfil',
  },
  alternates: {
    canonical: 'https://coralfil.com',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://coralfil.com/#organization",
        "name": "Coralfil Inc.",
        "url": "https://coralfil.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://coralfil.com/logo.png"
        },
        "sameAs": [
          "https://twitter.com/coralfil",
          "https://linkedin.com/company/coralfil"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "info@coralfil.com",
          "contactType": "customer service"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://coralfil.com/#website",
        "url": "https://coralfil.com",
        "name": "Coralfil Inc.",
        "description": "AI-driven marine restoration at scale.",
        "publisher": {
          "@id": "https://coralfil.com/#organization"
        }
      }
    ]
  };

  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${poppins.variable} antialiased bg-background-light dark:bg-background-dark text-slate-900 dark:text-white`}
      >
        <LayoutGroup id="reefmaker-immersion">
          <JsonLd data={jsonLd} />
          {children}
          <Analytics />
          <SpeedInsights />
        </LayoutGroup>
      </body>
    </html>
  );
}
