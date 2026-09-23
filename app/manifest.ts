import type { MetadataRoute } from "next";

import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";
import { asset } from "@/lib/paths";

// Written once at build time into a plain file (the site is a static export).
export const dynamic = "force-static";

// Lets phones and browsers install the site with the right name, colors and icon.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} LLC`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: asset("/"),
    display: "standalone",
    background_color: "#f5f3f0",
    theme_color: "#f5f3f0",
    icons: [
      { src: asset("/icon-512.png"), sizes: "512x512", type: "image/png", purpose: "any" },
      { src: asset("/icon-maskable-512.png"), sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
