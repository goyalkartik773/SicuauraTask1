import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
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
  title: {
    default: "GG Fashion",
    template: "%s | GG Fashion",
  },
  description: "Curated premium fashion, accessories, and lifestyle products designed for the modern wardrobe.",
  openGraph: {
    title: "GG Fashion",
    description: "Curated premium fashion, accessories, and lifestyle products designed for the modern wardrobe.",
    url: "https://gg-fashion.vercel.app",
    siteName: "GG Fashion",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <CartProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-brand-rose focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
            Skip to main content
          </a>
          <div className="relative flex flex-col min-h-screen">
            <Suspense fallback={<div className="h-16 bg-white border-b border-gray-100" />}>
              <Navbar />
            </Suspense>
            <main id="main-content" className="min-h-screen">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
