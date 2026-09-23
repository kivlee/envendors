import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Container, PageIntro, Prose } from "@/components/page";

export const metadata: Metadata = pageMetadata({
  title: "Terms of service",
  description:
    "The terms for using the Envendors website, including how we show other companies’ names and logos.",
  path: "/terms",
});

export default function Terms() {
  return (
    <main>
      <PageIntro
        eyebrow="Legal"
        title="Terms of service"
        lead="These terms cover envendors.com. Using Kivlee is covered by Kivlee's own terms."
      />
      <Container className="pb-24 md:pb-32">
        <p className="mb-10 text-[13px] font-medium tracking-wide">Draft, not yet in effect. Last updated 23 September 2026.</p>
        <Prose>
          <h2>Using this website</h2>
          <p>
            You may browse this website and share links to it. Please don&apos;t try to disrupt it, break its security,
            or use it for anything unlawful.
          </p>

          <h2>Our content</h2>
          <p>
            The text, the Envendors name and logo, and the design of this website belong to Envendors LLC. You may not
            copy or reuse them without our written permission, except as the law allows.
          </p>

          <h2>Other companies&apos; names and logos</h2>
          <p>
            This website shows the names and logos of services we build with, such as Google, Stripe and Cloudflare.
            They are trademarks of their owners. We show them only to name the tools we use; it does not mean those
            companies endorse, sponsor or partner with Envendors LLC.
          </p>

          <h2>Links to other sites</h2>
          <p>
            This website links to other sites, including Kivlee. Those sites have their own terms, and we are not
            responsible for sites we do not run.
          </p>

          <h2>No warranty</h2>
          <p>
            We work to keep this website accurate and available, but we provide it &ldquo;as is&rdquo;, without
            promises that it will always be complete, current or online.
          </p>

          <h2>Limits on liability</h2>
          <p>
            To the extent the law allows, Envendors LLC is not liable for losses that come from using, or being unable
            to use, this website.
          </p>

          <h2>Changes</h2>
          <p>We may update these terms. The date at the top shows when they last changed.</p>

          <h2>Contact</h2>
          <p>
            Questions about these terms? Write to <a href="mailto:privacy@kivlee.io">privacy@kivlee.io</a>.
          </p>
        </Prose>
      </Container>
    </main>
  );
}
