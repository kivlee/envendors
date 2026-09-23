import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

// Written once at build time into a plain file (the site is a static export).
export const dynamic = "force-static";

// Everyone may crawl everything, and here is the map.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
