// Services and technologies Envendors builds with, shown as their official logos (from each
// company's files on Wikimedia Commons, Google's own Gmail lockup, and Kivlee's
// brand files, plus the simple-icons PostgreSQL mark). The names and logos are
// trademarks of their owners.
//
// ratio: the logo's width divided by its height. height: its display height
// in px (stacked logos get a little more, so they read at the same size).
// label: text shown beside the logo, for brands whose official mark is a
// symbol only.

export type Brand = { name: string; href: string; src: string; ratio: number; height: number; label?: string };

export const BRANDS: Brand[] = [
  { name: "Google", href: "https://www.google.com", src: "/brands/google.svg", ratio: 2.97, height: 24 },
  { name: "Gmail", href: "https://www.google.com/gmail/", src: "/brands/gmail.png", ratio: 4.41, height: 24 },
  { name: "Google Cloud", href: "https://cloud.google.com", src: "/brands/google-cloud.svg", ratio: 6.45, height: 24 },
  { name: "Stripe", href: "https://stripe.com", src: "/brands/stripe.svg", ratio: 2.4, height: 26 },
  { name: "Kivlee", href: "https://kivlee.io", src: "/brands/kivlee.svg", ratio: 5.28, height: 20 },
  { name: "Amazon", href: "https://www.amazon.com", src: "/brands/amazon.svg", ratio: 3.32, height: 26 },
  { name: "AWS", href: "https://aws.amazon.com", src: "/brands/aws.svg", ratio: 1.67, height: 32 },
  { name: "Ollama", href: "https://ollama.com", src: "/brands/ollama.svg", ratio: 0.68, height: 28, label: "Ollama" },
  { name: "GitHub", href: "https://github.com", src: "/brands/github.svg", ratio: 3.5, height: 24 },
  { name: "Hostinger", href: "https://www.hostinger.com", src: "/brands/hostinger.svg", ratio: 1.77, height: 36 },
  { name: "Cloudflare", href: "https://www.cloudflare.com", src: "/brands/cloudflare.svg", ratio: 3.02, height: 34 },
  { name: "Next.js", href: "https://nextjs.org", src: "/brands/nextjs.svg", ratio: 4.99, height: 20 },
  { name: "React", href: "https://react.dev", src: "/brands/react.svg", ratio: 1.15, height: 24, label: "React" },
  { name: "TypeScript", href: "https://www.typescriptlang.org", src: "/brands/typescript.svg", ratio: 4.04, height: 24 },
  { name: "Tailwind CSS", href: "https://tailwindcss.com", src: "/brands/tailwind.svg", ratio: 8.13, height: 18 },
  { name: "Node.js", href: "https://nodejs.org", src: "/brands/nodejs.svg", ratio: 1.63, height: 34 },
  { name: "PostgreSQL", href: "https://www.postgresql.org", src: "/brands/postgresql.svg", ratio: 1, height: 24, label: "PostgreSQL" },
  { name: "Docker", href: "https://www.docker.com", src: "/brands/docker.svg", ratio: 4.21, height: 26 },
  { name: "nginx", href: "https://nginx.org", src: "/brands/nginx.svg", ratio: 3.67, height: 22 },
];
