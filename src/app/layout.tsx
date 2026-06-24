import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { siteConfig } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Veyz · Assistant email IA pour agences immobilières",
    template: "%s · Veyz",
  },
  description: siteConfig.description,
  keywords: [
    "assistant email IA",
    "agence immobilière",
    "gestion des leads immobiliers",
    "réponse automatique leads",
    "relance prospects immobilier",
    "SeLoger Leboncoin leads",
  ],
  authors: [{ name: "Veyz" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Veyz, ne perdez plus jamais un lead immobilier",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Veyz · Assistant email IA pour agences immobilières",
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08090a",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Veyz",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: siteConfig.description,
  url: siteConfig.url,
  inLanguage: "fr-FR",
  audience: {
    "@type": "Audience",
    audienceType: "Agences immobilières",
    geographicArea: { "@type": "Country", name: "France" },
  },
  offers: {
    "@type": "Offer",
    category: "SaaS",
    availability: "https://schema.org/InStock",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
