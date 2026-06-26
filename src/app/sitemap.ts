import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

// sitemap.xml généré. Landing une seule page : URL de prod (apex).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
