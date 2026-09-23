import type { MetadataRoute } from "next";

import { TRAILING_SLASH } from "@/lib/paths";
import { SITE_URL } from "@/lib/seo";

// Written once at build time into a plain file (the site is a static export).
export const dynamic = "force-static";

// Every public page, so search engines find and revisit them.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/news", priority: 0.7, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
    { path: "/legal", priority: 0.3, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  ];
  return pages.map((p) => ({ url: `${SITE_URL}${p.path}${TRAILING_SLASH ? "/" : ""}`, lastModified, changeFrequency: p.changeFrequency, priority: p.priority }));
}
