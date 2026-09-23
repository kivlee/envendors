"use client";

import ErrorView from "@/components/error-view";
import "./globals.css";

// Shown only when the root layout itself fails, so it brings its own html and body.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-paper font-sans text-ink antialiased">
        <ErrorView
          code="Error"
          title="Something went wrong"
          body="The site didn't load as it should. Try again, and if it keeps happening, come back a little later."
          onRetry={reset}
        />
      </body>
    </html>
  );
}
