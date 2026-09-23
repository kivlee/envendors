// Where the site lives. A normal build serves it from the root of a domain.
// The GitHub Pages build sets NEXT_PUBLIC_BASE_PATH=/envendors, because the site
// then lives at kivlee.github.io/envendors, and puts each page in its own folder.
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
export const TRAILING_SLASH = process.env.NEXT_PUBLIC_TRAILING_SLASH === "1";

// A file in public/, e.g. asset("/brands/google.svg"). Next.js prefixes its own
// links and scripts automatically, but not plain <img> tags, CSS urls or manifests.
export const asset = (path: string) => `${BASE_PATH}${path}`;
