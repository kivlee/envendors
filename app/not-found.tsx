import type { Metadata } from "next";
import ErrorView from "@/components/error-view";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <ErrorView
      code="Error 404"
      title="We couldn't find this page"
      body="The link may be out of date, or the address may have a typo. Check it, or start again from the home page."
    />
  );
}
