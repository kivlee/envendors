"use client";

import ErrorView from "@/components/error-view";

// The error's message and stack are never shown: they can leak internals.
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <ErrorView
      code="Error"
      title="Something went wrong"
      body="This page didn't load as it should. Try again, and if it keeps happening, come back a little later."
      onRetry={reset}
    />
  );
}
