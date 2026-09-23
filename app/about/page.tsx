import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Button, Container, PageIntro, Section } from "@/components/page";

export const metadata: Metadata = pageMetadata({
  title: "About us: the company behind Kivlee",
  description:
    "Envendors LLC is an American software company that designs, builds and runs Kivlee, modular business management and collaboration software for growing teams.",
  path: "/about",
});

export default function About() {
  return (
    <main>
      <PageIntro
        eyebrow="About"
        title="Software, made carefully."
        lead="Envendors LLC is an American software company. We design, build and run software that organizations use to manage their work, and we stay responsible for it long after it ships."
      />

      <Section label="Who we are">
        <div className="max-w-2xl space-y-5 text-lg leading-8">
          <p>
            We are a product company. Instead of building to order for clients, we make our own software and look after
            it every day: we write it, host it, keep it secure and answer when someone needs help.
          </p>
          <p>
            That means every decision we make is one we will live with. It keeps us careful, and it keeps our products
            simple.
          </p>
        </div>
      </Section>

      <Section label="What we make">
        <h3 className="text-3xl font-medium tracking-tight">Kivlee</h3>
        <p className="mt-4 max-w-2xl text-lg leading-8">
          Our first product is a modular platform for business management and collaboration. Organizations switch on
          only the tools they need, from notes to orders to finance, and pay for those alone. As they grow, they add
          more.
        </p>
        <div className="mt-8">
          <Button href="https://kivlee.io">Visit kivlee.io</Button>
        </div>
      </Section>

      <Section label="What we believe">
        <dl className="grid gap-10 sm:grid-cols-2">
          <div>
            <dt className="font-medium">Privacy is the default</dt>
            <dd className="mt-2 leading-7">
              We collect what a product needs to work and nothing more. We don&apos;t sell data, and we don&apos;t
              follow people around the web.
            </dd>
          </div>
          <div>
            <dt className="font-medium">Security is not a feature</dt>
            <dd className="mt-2 leading-7">
              Separation between customers, server-side permission checks and a clear audit trail are part of the
              foundation, not extras.
            </dd>
          </div>
          <div>
            <dt className="font-medium">Quiet software is good software</dt>
            <dd className="mt-2 leading-7">
              The best tools fade into the background. We design for focus, not for attention.
            </dd>
          </div>
          <div>
            <dt className="font-medium">Fair and plain</dt>
            <dd className="mt-2 leading-7">
              Clear prices, plain language and no lock-in. If you leave, your data leaves with you.
            </dd>
          </div>
        </dl>
      </Section>

      <Container className="pb-24 md:pb-32">
        <div className="border-t border-ink pt-14 md:pt-20">
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">Want to talk?</h2>
          <div className="mt-8">
            <Button href="/contact">Contact us</Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
