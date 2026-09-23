import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Container, PageIntro, Prose } from "@/components/page";

export const metadata: Metadata = pageMetadata({
  title: "Privacy policy",
  description:
    "How Envendors LLC handles information on this website: what we collect, why, how long we keep it and your rights.",
  path: "/privacy",
});

export default function Privacy() {
  return (
    <main>
      <PageIntro
        eyebrow="Legal"
        title="Privacy policy"
        lead="This policy covers envendors.com. Kivlee has its own privacy notice."
      />
      <Container className="pb-24 md:pb-32">
        <p className="mb-10 text-[13px] font-medium tracking-wide">Draft, not yet in effect. Last updated 23 September 2026.</p>
        <Prose>
          <h2>Who we are</h2>
          <p>
            This website is run by Envendors LLC, a company in the United States. When this policy says
            &ldquo;we&rdquo;, it means Envendors LLC.
          </p>

          <h2>What we collect</h2>
          <p>This website has no accounts, no forms and no advertising. When you visit, our servers record:</p>
          <ul>
            <li>your IP address, the pages you request and the time of the request;</li>
            <li>technical details your browser sends, such as its type and language.</li>
          </ul>
          <p>We use these records only to keep the site running, secure and free of abuse.</p>

          <h2>Cookies</h2>
          <p>
            We use only cookies that are strictly necessary for the site to work. We do not use cookies for analytics,
            advertising or tracking you across other websites.
          </p>

          <h2>Sharing</h2>
          <p>
            We do not sell your information. We share it only with service providers that host and protect this site,
            and only as far as they need to do that job, or when the law requires it.
          </p>

          <h2>How long we keep it</h2>
          <p>Server records are kept for a short period and then deleted, unless we need them to look into abuse.</p>

          <h2>Your rights</h2>
          <p>
            Depending on where you live, you may have the right to see, correct or delete information about you. To
            make a request, write to <a href="mailto:privacy@kivlee.io">privacy@kivlee.io</a>.
          </p>

          <h2>Children</h2>
          <p>Our services are not meant for anyone under 16.</p>

          <h2>Changes</h2>
          <p>If we change this policy, we will update it here and change the date at the top.</p>
        </Prose>
      </Container>
    </main>
  );
}
