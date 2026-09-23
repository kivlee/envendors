import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { MotionProvider } from "@/components/motion";
import { KEYWORDS, LEGAL_NAME, ORGANIZATION_LD, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL, WEBSITE_LD, jsonLd } from "@/lib/seo";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  keywords: KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: LEGAL_NAME, url: SITE_URL }],
  creator: LEGAL_NAME,
  publisher: LEGAL_NAME,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: "/",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
};

// Colors the phone browser bar to match the page.
export const viewport: Viewport = {
  themeColor: "#f5f3f0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col bg-paper font-sans text-ink antialiased">
        {/* The first thing a keyboard reaches: jump past the header straight to the page. */}
        <a
          href="#content"
          className="sr-only z-50 rounded-lg bg-ink text-[15px] font-medium text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:px-4 focus:py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Skip to content
        </a>
        {/* Who we are, for Google: our organization and this website. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd([ORGANIZATION_LD, WEBSITE_LD])} />
        <MotionProvider>
          <Header />
          <div id="content" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </div>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
