import { fetchFeaturedProducts } from '@/lib/api'
import HeroSection from '@/components/home/HeroSection'
import ProductGrid from '@/components/ui/ProductGrid'

export default async function HomePage() {
  const products = await fetchFeaturedProducts()
  return (
    <div className="w-full flex flex-col">
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="text-center mb-12">
          <span className="text-xs tracking-[0.2em] text-brand-gold font-medium uppercase mb-2 block">Curated Collection</span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-brand-charcoal">New Arrivals</h2>
          <div className="w-12 h-0.5 bg-brand-rose mx-auto mt-4" />
        </div>
        <ProductGrid products={products} />
      </div>
    </div>
  )
}
