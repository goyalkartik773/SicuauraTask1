import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { Analytics } from "@vercel/analytics/next";
import { SITE_CONFIG } from "@/lib/config";
import JsonLd from "@/components/seo/JsonLd";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.url,
    "logo": `${SITE_CONFIG.url}/favicon.ico`,
    "sameAs": [
      `https://twitter.com/${SITE_CONFIG.twitter.replace("@", "")}`
    ]
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <JsonLd schema={organizationSchema} />
        <CartProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-brand-rose focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
            Skip to main content
          </a>
          <div className="relative flex flex-col min-h-screen">
            <Suspense fallback={<div className="h-16 bg-white border-b border-gray-100" />}>
              <Navbar />
            </Suspense>
            <main id="main-content" className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <Analytics />
        </CartProvider>
      </body>
    </html>
  );
}
