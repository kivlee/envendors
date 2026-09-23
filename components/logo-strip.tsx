import { BRANDS, type Brand } from "@/components/brands";

// Enough copies of the list to overfill even very wide screens, so the loop
// never shows a gap. The track holds this set twice and slides by one set.
const SET = [...BRANDS, ...BRANDS];

function Wordmark({ brand, hidden }: { brand: Brand; hidden: boolean }) {
  return (
    <a
      href={brand.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={hidden ? undefined : `${brand.name} (opens in a new tab)`}
      tabIndex={hidden ? -1 : undefined}
      className="group/logo flex h-12 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
    >
      {/* One line under the whole logo on hover, drawn from the left, like a link underline. */}
      <span className="relative flex items-center gap-2.5 text-[19px] font-medium tracking-tight whitespace-nowrap after:absolute after:inset-x-0 after:-bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-200 group-hover/logo:after:scale-x-100 group-focus-visible/logo:after:scale-x-100 motion-reduce:after:transition-none">
        {/* The official logo, painted in ink through a mask so it matches the site. */}
        <span
          aria-hidden="true"
          className="block shrink-0 bg-ink"
          style={{
            width: brand.height * brand.ratio,
            height: brand.height,
            maskImage: `url(${brand.src})`,
            WebkitMaskImage: `url(${brand.src})`,
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
          }}
        />
        {brand.label}
      </span>
    </a>
  );
}

// An endless strip of the services we build with, drifting right to left.
// It pauses while hovered or focused, so each logo can be clicked, and stands
// still (scrollable by hand) for visitors who prefer reduced motion.
export default function LogoStrip() {
  return (
    <section aria-labelledby="logo-strip-label" className="py-14 md:py-20">
      <p id="logo-strip-label" className="px-5 text-center text-[13px] font-medium tracking-wide">
        Tools and platforms we build with
      </p>
      <div className="group mt-8 overflow-hidden motion-reduce:overflow-x-auto">
        <ul className="flex w-max animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none"
          // About 9 seconds per logo keeps the same calm speed however many logos there are.
          style={{ animationDuration: `${BRANDS.length * 9}s` }}
        >
          {[0, 1].map((copy) =>
            SET.map((brand, i) => {
              // Only the very first run of logos is for screen readers and Tab;
              // every repeat is decoration for the loop.
              const hidden = copy > 0 || i >= BRANDS.length;
              return (
                <li
                  key={`${copy}-${i}`}
                  aria-hidden={hidden || undefined}
                  className={`pr-16 ${hidden ? "motion-reduce:hidden" : ""}`}
                >
                  <Wordmark brand={brand} hidden={hidden} />
                </li>
              );
            }),
          )}
        </ul>
      </div>
    </section>
  );
}
