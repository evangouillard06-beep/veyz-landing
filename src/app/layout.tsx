import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { siteConfig } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Veyz — Répondez à vos leads immobiliers avant vos concurrents",
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
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Veyz — Répondez à vos leads immobiliers avant vos concurrents",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Veyz — Répondez à vos leads immobiliers avant vos concurrents",
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0E1A",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: "Veyz",
      url: siteConfig.url,
      logo: `${siteConfig.url}/apple-icon`,
      description: siteConfig.description,
      areaServed: { "@type": "Country", name: "France" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteConfig.url}/#software`,
      name: "Veyz",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: siteConfig.description,
      url: siteConfig.url,
      inLanguage: "fr-FR",
      publisher: { "@id": `${siteConfig.url}/#organization` },
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
    },
  ],
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
