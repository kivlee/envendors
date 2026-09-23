import Link from "next/link";
import SmartLink from "@/components/smart-link";
import { asset } from "@/lib/paths";

type FooterLink = { label: string; href: string };
type FooterColumn = { title: string; links: FooterLink[] };

const COLUMNS: FooterColumn[] = [
  {
    title: "Products",
    links: [
      { label: "Kivlee", href: "https://kivlee.io" },
      { label: "Sign in to Kivlee", href: "https://app.kivlee.io" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "News", href: "/news" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Help and security",
    links: [
      { label: "Help centre", href: "https://help.kivlee.io" },
      { label: "System status", href: "https://status.kivlee.io" },
      { label: "Report a security issue", href: "mailto:security@kivlee.io" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
      { label: "Privacy requests", href: "mailto:privacy@kivlee.io" },
    ],
  },
];

function FooterAnchor({ href, children }: { href: string; children: React.ReactNode }) {
  const className =
    "inline-flex min-h-11 items-center gap-1 text-[15px] text-paper decoration-1 md:min-h-0 md:py-1 md:text-[13px] underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper";
  return (
    <SmartLink href={href} className={className}>
      {children}
    </SmartLink>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 pt-16 pb-12 md:px-8 lg:grid-cols-[1fr_3fr] lg:pt-20">
        <div className="flex flex-col justify-between gap-10">
          <Link
            href="/"
            aria-label="Envendors LLC, home"
            className="w-fit rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/brand/envendors-mark-white.svg")} alt="" width={40} height={40} className="-ml-[11px] size-10" />
          </Link>
          <p className="hidden text-[13px] leading-5 text-paper lg:block">
            © {new Date().getFullYear()} Envendors LLC.
            <br />
            Kivlee is a product of Envendors LLC.
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h2 className="mb-2 text-[13px] font-semibold text-paper">{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterAnchor href={link.href}>{link.label}</FooterAnchor>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <p className="text-[13px] leading-5 text-paper lg:hidden">
          © {new Date().getFullYear()} Envendors LLC.
          <br />
          Kivlee is a product of Envendors LLC.
        </p>
      </div>
    </footer>
  );
}
