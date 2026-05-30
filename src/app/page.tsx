import { fetchFeaturedProducts } from '@/lib/api'
import ProductGrid from '@/components/ui/ProductGrid'

export default async function HomePage() {
  const products = await fetchFeaturedProducts()
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-display text-4xl mb-8">New Arrivals</h1>
      <ProductGrid products={products} />
    </div>
  )
}
