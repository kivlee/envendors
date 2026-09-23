import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export const isExternal = (href: string) => /^https?:\/\//.test(href);

// The arrow that marks a link leaving this site.
export function ExternalIcon({ className = "size-[0.9em]" }: { className?: string }) {
  return <HugeiconsIcon icon={ArrowUpRight01Icon} aria-hidden="true" strokeWidth={1.75} className={`shrink-0 ${className}`} />;
}

// One link for the whole site: pages on this site navigate in place, other
// websites open in a new tab and carry the arrow, and email links open the mail app.
export default function SmartLink({
  href,
  className,
  children,
  icon = true,
  iconClassName,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  icon?: boolean;
  iconClassName?: string;
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  if (!isExternal(href)) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      {icon && <ExternalIcon className={iconClassName} />}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
