import GlyphField from "@/components/glyph-field";
import LogoStrip from "@/components/logo-strip";
import { MotionToggle } from "@/components/motion";
import { BRANDS } from "@/components/brands";
import { Button, Container, Section } from "@/components/page";
import { KIVLEE_LD, jsonLd } from "@/lib/seo";
import { asset } from "@/lib/paths";

// The ribbon washes into each logo from the strip below, one after another.
const RIBBON_LOGOS = BRANDS.map((brand) => asset(brand.src));

const PRINCIPLES = [
  {
    title: "Simple by default",
    body: "Software should do what people need and stay out of the way. We remove before we add.",
  },
  {
    title: "Secure by design",
    body: "Every organization's data is kept apart, and permissions are checked on the server, never only in the browser.",
  },
  {
    title: "Built to last",
    body: "We make small, careful changes, and each one is tested before it reaches anyone who depends on it.",
  },
  {
    title: "Honest pricing",
    body: "You pay for the tools you use. No bundles you don't need, no surprises on the invoice.",
  },
];

// Plain answers to what people ask before choosing business software.
const FAQ = [
  {
    q: "What does Envendors do?",
    a: "Envendors is a software company. We design, build, host and support our own business software, so there is one team responsible for it from the first line of code to the help you get.",
  },
  {
    q: "What is Kivlee?",
    a: "Kivlee is a modular platform for business management and collaboration. Instead of juggling separate apps, your organization works in one place and switches on only the tools it needs.",
  },
  {
    q: "How is Kivlee priced?",
    a: "You pay for the modules you turn on, and nothing else. There are no bundles of features you will never use.",
  },
  {
    q: "Is our data safe in Kivlee?",
    a: "Every organization's data is kept separate, and permissions are checked on the server for every request, never only in the browser.",
  },
  {
    q: "How do I get started?",
    a: "Visit kivlee.io to create your organization's workspace. If you have questions first, the Kivlee help centre and our contact page are the fastest way to reach us.",
  },
];

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
};

export default function Home() {
  return (
    <main>
      <section className="flex min-h-[calc(100svh-4.25rem)] flex-col">
        <Container className="pt-16 md:pt-24">
          <h1 className="max-w-4xl text-[2.625rem] leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl md:text-7xl">
            We build software that businesses run on.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-pretty">
            Envendors is a software company. We design, build and run business management and collaboration software,
            starting with Kivlee.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="https://kivlee.io">Explore Kivlee</Button>
            <Button href="/about" variant="outline">
              About us
            </Button>
          </div>
        </Container>
        <div className="relative min-h-72 flex-1">
          <GlyphField className="absolute inset-0" shapes={RIBBON_LOGOS} />
          <MotionToggle className="absolute right-5 bottom-5 md:right-8" />
        </div>
      </section>

      <LogoStrip />

      <Section label="What we do">
        <p className="max-w-2xl text-2xl leading-9 font-medium tracking-tight text-pretty md:text-3xl md:leading-11">
          We own our products from end to end: the design, the engineering, the servers they run on and the support
          behind them.
        </p>
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          <div>
            <h3 className="font-medium">Design</h3>
            <p className="mt-2 leading-7">Calm, clear interfaces that people understand the first time they use them.</p>
          </div>
          <div>
            <h3 className="font-medium">Engineering</h3>
            <p className="mt-2 leading-7">Modern web technology, written to be read, tested and maintained for years.</p>
          </div>
          <div>
            <h3 className="font-medium">Operations</h3>
            <p className="mt-2 leading-7">We host, monitor and support what we build, so there is one team to call.</p>
          </div>
        </div>
      </Section>

      <Section label="Our product">
        <h3 className="text-4xl font-medium tracking-tight md:text-5xl">Kivlee</h3>
        <p className="mt-5 max-w-xl text-lg leading-8 text-pretty">
          A modular platform for business management and collaboration. Every organization turns on only the tools it
          needs, and pays only for those.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="https://kivlee.io">Visit kivlee.io</Button>
          <Button href="https://app.kivlee.io" variant="outline">
            Sign in
          </Button>
        </div>
      </Section>

      <Section label="How we work">
        <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <li key={p.title}>
              <h3 className="font-medium">{p.title}</h3>
              <p className="mt-2 leading-7">{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section label="Questions">
        <div className="divide-y divide-ink border-y border-ink">
          {FAQ.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-medium tracking-tight decoration-1 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink [&::-webkit-details-marker]:hidden">
                {item.q}
                <span aria-hidden="true" className="shrink-0 text-2xl leading-none transition-transform group-open:rotate-45 motion-reduce:transition-none">
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-6 leading-7">{item.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* What Kivlee is and the answers above, for Google. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd([KIVLEE_LD, FAQ_LD])} />

      <Container className="pb-24 md:pb-32">
        <div className="border-t border-ink pt-14 md:pt-20">
          <h2 className="max-w-2xl text-3xl font-medium tracking-tight text-balance md:text-5xl">
            Have something to build, or a question about Kivlee?
          </h2>
          <div className="mt-8">
            <Button href="/contact">Get in touch</Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
