import Link from "next/link";

// One calm message for every error. It never says why a page failed, so a
// missing page and a page someone may not see look exactly the same.
export default function ErrorView({
  code,
  title,
  body,
  onRetry,
}: {
  code: string;
  title: string;
  body: string;
  onRetry?: () => void;
}) {
  const button =
    "inline-flex h-11 items-center rounded-lg px-5 md:h-10 md:px-4.5 text-[15px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

  return (
    <main className="mx-auto flex w-full max-w-[1240px] flex-col items-start px-5 py-28 md:px-8 md:py-40">
      <p className="text-[13px] font-medium tracking-wide text-ink">{code}</p>
      <h1 className="mt-4 max-w-2xl text-4xl font-medium tracking-tight text-balance md:text-5xl">{title}</h1>
      <p className="mt-5 max-w-md text-base leading-7 text-ink">{body}</p>
      <div className="mt-10 flex flex-wrap gap-3">
        {onRetry && (
          <button type="button" onClick={onRetry} className={`${button} bg-ink text-paper hover:underline decoration-1 underline-offset-4`}>
            Try again
          </button>
        )}
        <Link
          href="/"
          className={`${button} ${
            onRetry ? "border border-ink text-ink hover:underline decoration-1 underline-offset-4" : "bg-ink text-paper hover:underline decoration-1 underline-offset-4"
          }`}
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
