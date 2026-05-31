import { fetchFeaturedProducts } from '@/lib/api';
import HeroSection from '@/components/home/HeroSection';
import CategoryRow from '@/components/home/CategoryRow';
import FeaturedBanner from '@/components/home/FeaturedBanner';
import NewArrivalsSection from '@/components/home/NewArrivalsSection';
import { SITE_CONFIG } from '@/lib/config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} – Elegance Redefined`,
  description: SITE_CONFIG.description,
  openGraph: {
    title: `${SITE_CONFIG.name} – Elegance Redefined`,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
};

export default async function HomePage() {
  const products = await fetchFeaturedProducts();
  return (
    <main>
      <HeroSection />
      <CategoryRow />
      <FeaturedBanner />
      <NewArrivalsSection products={products} />
    </main>
  );
}
