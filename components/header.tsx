"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SmartLink from "@/components/smart-link";

type MenuLink = { label: string; href: string };
type NavItem = { label: string; href?: string; items?: MenuLink[] };

const NAV: NavItem[] = [
  {
    label: "Products",
    items: [{ label: "Kivlee", href: "https://kivlee.io" }],
  },
  {
    label: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  { label: "Legal", href: "/legal" },
  { label: "News", href: "/news" },
];

const KIVLEE_LINKS: MenuLink[] = [
  { label: "Sign in", href: "https://app.kivlee.io" },
  { label: "Help centre", href: "https://help.kivlee.io" },
  { label: "System status", href: "https://status.kivlee.io" },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

function MenuPanel({
  id,
  items,
  align = "left",
}: {
  id: string;
  items: MenuLink[];
  align?: "left" | "right";
}) {
  return (
    // The top padding is a transparent bridge, so the pointer can travel from the
    // trigger into the panel without leaving the hover area.
    <div id={id} className={`absolute top-full z-50 pt-3 ${align === "right" ? "right-0" : "-left-6"}`}>
      <ul className="min-w-60 rounded-2xl bg-paper px-6 py-5 shadow-[0_2px_4px_rgba(19,19,19,0.03),0_12px_32px_rgba(19,19,19,0.07)]">
        {items.map((item) => (
          <li key={item.href}>
            <SmartLink
              href={item.href}
              className="flex items-center gap-1.5 rounded-sm py-1 text-base whitespace-nowrap text-ink decoration-1 underline-offset-[6px] transition-colors hover:text-ink hover:underline focus-visible:text-ink focus-visible:underline focus-visible:outline-none"
            >
              {item.label}
            </SmartLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

// A large, full-width link for the phone menu.
function MobileLink({ href, children }: { href: string; children: React.ReactNode }) {
  const className =
    "flex min-h-12 items-center gap-2 text-2xl font-medium tracking-tight decoration-1 underline-offset-[6px] active:underline";
  return (
    <SmartLink href={href} className={className} iconClassName="size-6">
      {children}
    </SmartLink>
  );
}

const isMouse = (e: { nativeEvent: Event }) =>
  "pointerType" in e.nativeEvent && (e.nativeEvent as PointerEvent).pointerType === "mouse";

export default function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const state = useRef({ open, mobileOpen });
  state.current = { open, mobileOpen };

  // Close menus on a click outside the header and on Escape. Escape also puts
  // keyboard focus back on the button that opened the menu, so nobody gets lost.
  useEffect(() => {
    const onPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const { open: current, mobileOpen: phone } = state.current;
      if (current) {
        ref.current?.querySelector<HTMLElement>(`[aria-controls="menu-${current}"]`)?.focus();
        setOpen(null);
      }
      if (phone) {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Close everything when the page changes, e.g. after tapping a menu link.
  const pathname = usePathname();
  useEffect(() => {
    setMobileOpen(false);
    setOpen(null);
  }, [pathname]);

  // While the phone menu is open, the page behind it can't scroll and can't be
  // reached by Tab or a screen reader, and focus starts on the first menu link.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const behind = [document.getElementById("content"), document.querySelector("footer")].filter(
      (el): el is HTMLElement => el !== null,
    );
    behind.forEach((el) => (el.inert = true));
    document.querySelector<HTMLElement>("#mobile-menu a")?.focus();
    return () => {
      document.body.style.overflow = previous;
      behind.forEach((el) => (el.inert = false));
    };
  }, [mobileOpen]);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  // A mouse opens a menu by hovering; touch and keyboard open it with a click.
  const hover = (key: string) => ({
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (closeTimer.current) clearTimeout(closeTimer.current);
      setOpen(key);
    },
    onPointerLeave: (e: React.PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      closeTimer.current = setTimeout(() => setOpen((cur) => (cur === key ? null : cur)), 150);
    },
    // Tabbing past the last link in a menu closes it.
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen((cur) => (cur === key ? null : cur));
    },
  });

  // A mouse click keeps a hover-opened menu open instead of toggling it shut.
  const toggle = (key: string, e: React.MouseEvent) =>
    setOpen((cur) => (isMouse(e) ? key : cur === key ? null : key));

  return (
    <header ref={ref} className="sticky top-0 z-40 bg-paper">
      <div className="mx-auto flex h-17 max-w-[1240px] items-center justify-between px-5 md:px-8">
        <Link href="/" aria-label="Envendors LLC, home" className={`rounded-sm ${focusRing}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/envendors-wordmark-black.svg"
            alt=""
            width={147}
            height={17}
            className="h-[17px] w-auto"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          <ul className="flex items-center gap-6">
            {NAV.map((item) =>
              item.items ? (
                <li key={item.label} className="relative" {...hover(item.label)}>
                  <button
                    type="button"
                    aria-expanded={open === item.label}
                    aria-controls={`menu-${item.label}`}
                    onClick={(e) => toggle(item.label, e)}
                    className={`flex h-10 items-center gap-1.5 rounded-md text-[15px] text-ink transition-colors hover:text-ink hover:underline aria-expanded:text-ink aria-expanded:underline decoration-1 underline-offset-[6px] ${focusRing}`}
                  >
                    {item.label}
                    <Chevron open={open === item.label} />
                  </button>
                  {open === item.label && (
                    <MenuPanel id={`menu-${item.label}`} items={item.items} />
                  )}
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href!}
                    className={`flex h-10 items-center rounded-md text-[15px] text-ink transition-colors hover:text-ink hover:underline decoration-1 underline-offset-[6px] ${focusRing}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>

          <div className="relative flex h-9 items-stretch rounded-lg bg-ink text-paper" {...hover("kivlee")}>
            <SmartLink
              href="https://kivlee.io"
              className={`flex items-center gap-1.5 rounded-l-lg px-3.5 text-[15px] font-medium transition-colors hover:underline decoration-1 underline-offset-4 ${focusRing}`}
            >
              Try Kivlee
            </SmartLink>
            <span aria-hidden="true" className="my-2.5 w-px bg-paper" />
            <button
              type="button"
              aria-label="More Kivlee links"
              aria-expanded={open === "kivlee"}
              aria-controls="menu-kivlee"
              onClick={(e) => toggle("kivlee", e)}
              className={`flex w-9 items-center justify-center rounded-r-lg transition-colors hover:underline decoration-1 underline-offset-4 ${focusRing}`}
            >
              <Chevron open={open === "kivlee"} />
            </button>
            {open === "kivlee" && <MenuPanel id="menu-kivlee" items={KIVLEE_LINKS} align="right" />}
          </div>
        </nav>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          ref={toggleRef}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
          className={`-mr-2 flex size-11 items-center justify-center rounded-md text-ink md:hidden ${focusRing}`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 9h16M4 15h16" />}
          </svg>
        </button>
      </div>

      {/* On phones the menu covers the whole screen below the header, with big,
          easy-to-tap links. The page behind it doesn't scroll while it is open. */}
      {mobileOpen && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="fixed inset-x-0 top-17 bottom-0 z-40 flex flex-col overflow-y-auto overscroll-contain border-t border-ink bg-paper px-5 pt-2 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:hidden"
        >
          <ul className="divide-y divide-ink">
            {NAV.map((item) => (
              <li key={item.label} className="py-4">
                {item.items ? (
                  <>
                    <p className="text-[13px] font-medium tracking-wide">{item.label}</p>
                    <ul className="mt-1">
                      {item.items.map((sub) => (
                        <li key={sub.href}>
                          <MobileLink href={sub.href}>{sub.label}</MobileLink>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <MobileLink href={item.href!}>{item.label}</MobileLink>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-8">
            <SmartLink
              href="https://kivlee.io"
              className="flex h-12 items-center justify-center gap-1.5 rounded-lg bg-ink text-base font-medium text-paper"
            >
              Try Kivlee
            </SmartLink>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {KIVLEE_LINKS.map((link) => (
                <SmartLink
                  key={link.href}
                  href={link.href}
                  className="flex h-11 items-center justify-center gap-1 rounded-lg border border-ink text-[14px] font-medium"
                >
                  {link.label}
                </SmartLink>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
