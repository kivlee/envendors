import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import SmartLink, { ExternalIcon, isExternal } from "@/components/smart-link";
import { Container, PageIntro } from "@/components/page";

export const metadata: Metadata = pageMetadata({
  title: "Legal",
  description:
    "Privacy policy, terms of service and company information for Envendors LLC, the maker of Kivlee.",
  path: "/legal",
});

const DOCUMENTS = [
  { title: "Privacy policy", body: "What we collect on this website, why, and your rights.", href: "/privacy" },
  { title: "Terms of service", body: "The rules for using this website.", href: "/terms" },
  {
    title: "Kivlee policies",
    body: "Kivlee has its own terms and privacy notice, found in the Kivlee help centre.",
    href: "https://help.kivlee.io",
  },
];

export default function Legal() {
  return (
    <main>
      <PageIntro eyebrow="Legal" title="Policies and legal information." />
      <Container className="pb-16">
        <ul className="border-t border-ink">
          {DOCUMENTS.map((d) => {
            return (
              <li key={d.title} className="border-b border-ink">
                <SmartLink
                  href={d.href}
                  icon={false}
                  className="group block py-8 decoration-1 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  <span className="inline-flex items-center gap-1.5 text-xl font-medium tracking-tight group-hover:underline">
                    {d.title}
                    {isExternal(d.href) && <ExternalIcon />}
                  </span>
                  <span className="mt-2 block leading-7">{d.body}</span>
                </SmartLink>
              </li>
            );
          })}
        </ul>
      </Container>
      <Container className="pb-24 md:pb-32">
        <h2 className="text-[13px] font-medium tracking-wide">Company</h2>
        <p className="mt-4 leading-7">
          Envendors LLC, United States.
          <br />
          Privacy: <a className="underline decoration-1 underline-offset-4" href="mailto:privacy@kivlee.io">privacy@kivlee.io</a>
          <br />
          Security: <a className="underline decoration-1 underline-offset-4" href="mailto:security@kivlee.io">security@kivlee.io</a>
        </p>
      </Container>
    </main>
  );
}
