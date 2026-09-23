import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Container, PageIntro } from "@/components/page";
import SmartLink from "@/components/smart-link";

export const metadata: Metadata = pageMetadata({
  title: "News",
  description:
    "Product announcements from Envendors and Kivlee, the modular business management and collaboration platform.",
  path: "/news",
});

// Newest first. Each entry is a short announcement; add new ones to the top.
const POSTS = [
  {
    date: "2026-09-28",
    title: "Kivlee opens to everyone",
    body: "Kivlee, our modular platform for business management and collaboration, opens its doors. Organizations can sign up, switch on the tools they need and start working together.",
    href: "https://kivlee.io",
  },
];

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(
    new Date(iso),
  );

export default function News() {
  return (
    <main>
      <PageIntro eyebrow="News" title="What's new." lead="Announcements from Envendors and Kivlee." />
      <Container className="pb-24 md:pb-32">
        <ol className="border-t border-ink">
          {POSTS.map((post) => (
            <li key={post.title} className="grid gap-4 border-b border-ink py-10 md:grid-cols-[1fr_2fr]">
              <time dateTime={post.date} className="text-[13px] font-medium tracking-wide">
                {formatDate(post.date)}
              </time>
              <div>
                <h2 className="text-2xl font-medium tracking-tight">{post.title}</h2>
                <p className="mt-3 max-w-2xl leading-7">{post.body}</p>
                <SmartLink
                  href={post.href}
                  className="mt-5 inline-flex items-center gap-1 rounded-sm font-medium underline decoration-1 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  Read more<span className="sr-only"> about {post.title}</span>
                </SmartLink>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </main>
  );
}
