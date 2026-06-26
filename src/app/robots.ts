import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

// robots.txt généré : indexation autorisée + référence au sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
