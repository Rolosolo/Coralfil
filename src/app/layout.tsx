import { JsonLd } from "@/components/JsonLd";

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
  metadataBase: new URL('https://coralfill.com'),
  title: {
    template: '%s | CoralFil',
    default: 'Marine Restoration Technology | CoralFil',
  },
  description: 'Restoring reefs at the speed of nature. AI-driven coral synthesis and restoration technology.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://coralfill.com',
    siteName: 'CoralFil',
    images: [
      {
        url: '/og-image.jpg', // Placeholder, assuming public/og-image.jpg
        width: 1200,
        height: 630,
        alt: 'CoralFil Marine Restoration',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@coralfill',
    creator: '@coralfill',
  },
  alternates: {
    canonical: './',
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
        "@id": "https://coralfill.com/#organization",
        "name": "CoralFil",
        "url": "https://coralfill.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://coralfill.com/logo.png"
        },
        "sameAs": [
          "https://twitter.com/coralfill",
          "https://linkedin.com/company/coralfill"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "info@coralfill.com",
          "contactType": "customer service"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://coralfill.com/#website",
        "url": "https://coralfill.com",
        "name": "CoralFil",
        "description": "AI-driven coral synthesis at scale.",
        "publisher": {
          "@id": "https://coralfill.com/#organization"
        }
      }
    ]
  };

  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${poppins.variable} antialiased bg-background-light dark:bg-background-dark text-slate-900 dark:text-white`}
      >
        <JsonLd data={jsonLd} />
        {children}
      </body>
    </html>
  );
}
