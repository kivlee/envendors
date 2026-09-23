import type { Metadata } from "next";

// Everything search engines and link previews need to know about the site.
// SITE_URL is the public address; set NEXT_PUBLIC_SITE_URL if it ever changes.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://envendors.com").replace(/\/$/, "");
export const SITE_NAME = "Envendors";
export const LEGAL_NAME = "Envendors LLC";

export const SITE_TITLE = "Envendors | Business management and collaboration software";
export const SITE_DESCRIPTION =
  "Envendors builds Kivlee, modular business management and collaboration software. Turn on only the tools your business needs, and pay only for those.";

// What people search for when they need what we make, not only our name.
export const KEYWORDS = [
  "business management software",
  "modular business software",
  "business collaboration software",
  "all-in-one business platform",
  "small business software",
  "team workspace",
  "Kivlee",
  "Envendors",
];

// Per-page metadata: its own title, description and canonical address, carried
// into link previews too. The share image comes from app/opengraph-image.png.
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [SHARE_IMAGE],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${SITE_NAME}`, description, images: [SHARE_IMAGE] },
  };
}

// The card shown when any page is shared (Discord, Slack, X, LinkedIn, iMessage).
const SHARE_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Envendors wordmark above a flowing wave drawn in ASCII characters",
};

// Structured data (schema.org) that tells Google who we are and what Kivlee is.
export const ORGANIZATION_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: LEGAL_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  description: SITE_DESCRIPTION,
  address: { "@type": "PostalAddress", addressCountry: "US" },
  brand: { "@type": "Brand", name: "Kivlee", url: "https://kivlee.io" },
  contactPoint: [
    { "@type": "ContactPoint", contactType: "customer support", url: "https://help.kivlee.io", availableLanguage: ["English"] },
    { "@type": "ContactPoint", contactType: "privacy", email: "privacy@kivlee.io" },
    { "@type": "ContactPoint", contactType: "security", email: "security@kivlee.io" },
  ],
};

export const WEBSITE_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-US",
};

export const KIVLEE_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Kivlee",
  url: "https://kivlee.io",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Business management and collaboration",
  operatingSystem: "Web browser",
  description:
    "A modular platform for business management and collaboration. Every organization turns on only the tools it needs, and pays only for those.",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

// Renders one or more schema.org objects as a JSON-LD script tag.
export function jsonLd(data: object | object[]) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
