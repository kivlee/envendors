import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Container, PageIntro } from "@/components/page";
import SmartLink from "@/components/smart-link";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Get help with Kivlee, report a bug, report a security issue or make a privacy request. Every channel reaches the Envendors team directly.",
  path: "/contact",
});

const CHANNELS = [
  {
    title: "Kivlee support",
    body: "Guides, answers to common questions and help with your account.",
    label: "help.kivlee.io",
    href: "https://help.kivlee.io",
  },
  {
    title: "Report a bug",
    body: "Something in Kivlee not working as it should? Tell us what happened and we will look into it.",
    label: "Open the bug form",
    href: "https://help.kivlee.io/report-a-bug",
  },
  {
    title: "Security",
    body: "Found a vulnerability? Please report it privately, and give us a chance to fix it before sharing it.",
    label: "security@kivlee.io",
    href: "mailto:security@kivlee.io",
  },
  {
    title: "Privacy",
    body: "Questions about your data, or a request to see, correct or delete it.",
    label: "privacy@kivlee.io",
    href: "mailto:privacy@kivlee.io",
  },
];

export default function Contact() {
  return (
    <main>
      <PageIntro
        eyebrow="Contact"
        title="Get in touch."
        lead="Pick the channel that fits, and it will reach the right people directly."
      />
      <Container className="pb-24 md:pb-32">
        <ul className="grid border-t border-ink sm:grid-cols-2">
          {CHANNELS.map((c) => (
            <li key={c.title} className="border-b border-ink py-10 sm:odd:pr-10 sm:even:border-l sm:even:pl-10">
              <h2 className="text-xl font-medium tracking-tight">{c.title}</h2>
              <p className="mt-3 max-w-md leading-7">{c.body}</p>
              <SmartLink
                href={c.href}
                className="mt-5 inline-flex items-center gap-1 rounded-sm font-medium underline decoration-1 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                {c.label}
              </SmartLink>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
