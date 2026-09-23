"use client";

import { createContext, useContext, useEffect, useState } from "react";

// One switch that pauses every moving thing on the site (the ASCII ribbon and
// the logo strip), as WCAG 2.2.2 asks for content that moves on its own.
// The choice is remembered, and CSS reads it from <html data-motion="paused">.

const MotionContext = createContext<{ paused: boolean; toggle: () => void }>({ paused: false, toggle: () => {} });

const STORAGE_KEY = "envendors-motion";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "paused") setPaused(true);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "paused" : "running";
    try {
      localStorage.setItem(STORAGE_KEY, paused ? "paused" : "running");
    } catch {}
  }, [paused]);

  return <MotionContext.Provider value={{ paused, toggle: () => setPaused((p) => !p) }}>{children}</MotionContext.Provider>;
}

export const useMotionPaused = () => useContext(MotionContext).paused;

// A small round play/pause button. It has no visible text, so its name comes
// from aria-label (for screen readers) and title (a tooltip on hover).
export function MotionToggle({ className = "" }: { className?: string }) {
  const { paused, toggle } = useContext(MotionContext);
  const label = paused ? "Play animations" : "Pause animations";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`inline-flex size-11 items-center justify-center rounded-full border border-ink bg-paper text-ink transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:size-9 motion-reduce:hidden ${className}`}
    >
      {/* Envendors' own play and pause icons (public/brand/icons). */}
      {paused ? (
        <svg aria-hidden="true" viewBox="0 0 128 128" className="size-4" fill="currentColor" stroke="currentColor" strokeWidth="10.6667" strokeLinejoin="round">
          <path d="M100.75 68.512C98.8646 75.6747 89.9558 80.736 72.1371 90.8592C54.9121 100.645 46.2998 105.538 39.3592 103.571C36.4897 102.758 33.8752 101.214 31.7667 99.0864C26.6667 93.9408 26.6667 83.9605 26.6667 64C26.6667 44.0395 26.6667 34.0592 31.7667 28.9137C33.8752 26.7864 36.4897 25.242 39.3592 24.4289C46.2998 22.4621 54.9121 27.355 72.1371 37.141C89.9558 47.2638 98.8646 52.3253 100.75 59.488C101.528 62.4448 101.528 65.5552 100.75 68.512Z" />
        </svg>
      ) : (
        <svg aria-hidden="true" viewBox="0 0 128 128" className="size-4" fill="currentColor" stroke="currentColor" strokeWidth="10.6667">
          <path d="M21.3333 37.3333C21.3333 29.7909 21.3333 26.0196 23.6764 23.6765C26.0195 21.3333 29.7908 21.3333 37.3333 21.3333C44.8757 21.3333 48.647 21.3333 50.9901 23.6765C53.3333 26.0196 53.3333 29.7909 53.3333 37.3333V90.6667C53.3333 98.2091 53.3333 101.98 50.9901 104.324C48.647 106.667 44.8757 106.667 37.3333 106.667C29.7908 106.667 26.0195 106.667 23.6764 104.324C21.3333 101.98 21.3333 98.2091 21.3333 90.6667V37.3333Z" />
          <path d="M74.6667 37.3333C74.6667 29.7909 74.6667 26.0196 77.0097 23.6765C79.3531 21.3333 83.1243 21.3333 90.6667 21.3333C98.2091 21.3333 101.98 21.3333 104.324 23.6765C106.667 26.0196 106.667 29.7909 106.667 37.3333V90.6667C106.667 98.2091 106.667 101.98 104.324 104.324C101.98 106.667 98.2091 106.667 90.6667 106.667C83.1243 106.667 79.3531 106.667 77.0097 104.324C74.6667 101.98 74.6667 98.2091 74.6667 90.6667V37.3333Z" />
        </svg>
      )}
    </button>
  );
}
