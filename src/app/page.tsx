import { fetchFeaturedProducts } from '@/lib/api'
import HeroSection from '@/components/home/HeroSection'
import CategoryRow from '@/components/home/CategoryRow'
import FeaturedBanner from '@/components/home/FeaturedBanner'
import NewArrivalsSection from '@/components/home/NewArrivalsSection'

export const metadata = {
  title: 'GG Fashion – Elegance Redefined',
  description: 'Shop India\'s finest ethnic wear — sarees, lehengas, suits and more.',
}

export default async function HomePage() {
  const products = await fetchFeaturedProducts()
  return (
    <>
      <HeroSection />
      <CategoryRow />
      <FeaturedBanner />
      <NewArrivalsSection products={products} />
    </>
  )
}
