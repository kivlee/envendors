import SmartLink from "@/components/smart-link";

// Shared building blocks, so every page has the same width, rhythm and type.

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-5 md:px-8 ${className}`}>{children}</div>;
}

export function PageIntro({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <Container className="pt-20 pb-16 md:pt-28 md:pb-20">
      <p className="text-[13px] font-medium tracking-wide">{eyebrow}</p>
      <h1 className="mt-4 max-w-3xl text-4xl font-medium tracking-tight text-balance md:text-6xl">{title}</h1>
      {lead && <p className="mt-6 max-w-2xl text-lg leading-8 text-pretty">{lead}</p>}
    </Container>
  );
}

// A titled band with a hairline on top: the section label sits left, content right.
export function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Container>
      <section className="grid gap-8 border-t border-ink py-14 md:grid-cols-[1fr_2fr] md:py-20">
        <h2 className="text-[13px] font-medium tracking-wide">{label}</h2>
        <div>{children}</div>
      </section>
    </Container>
  );
}

// Long-form text such as the legal pages.
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-2xl text-base leading-7 [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-4 [&_h2]:mt-12 [&_h2]:text-xl [&_h2]:font-medium [&_h2]:tracking-tight [&_h2:first-child]:mt-0 [&_li]:mt-2 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5">
      {children}
    </div>
  );
}

const buttonBase =
  "inline-flex h-11 items-center gap-1.5 rounded-lg px-5 md:h-10 md:px-4.5 text-[15px] font-medium decoration-1 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export function Button({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
}) {
  const className = `${buttonBase} ${variant === "solid" ? "bg-ink text-paper" : "border border-ink text-ink"}`;
  return (
    <SmartLink href={href} className={className}>
      {children}
    </SmartLink>
  );
}
