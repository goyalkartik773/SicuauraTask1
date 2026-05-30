import { fetchProducts, fetchCategories } from '@/lib/api'
import SearchResults from '@/components/search/SearchResults'
import type { FilterState } from '@/types'

interface SearchPageProps {
  searchParams: {
    q?: string
    category?: string
    minPrice?: string
    maxPrice?: string
    sortBy?: string
    page?: string
  }
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const q = searchParams.q || ''
  return {
    title: q ? `Results for "${q}"` : 'Shop All Products',
    description: `Browse our collection${q ? ` of ${q}` : ''} — sarees, suits, lehengas and more.`,
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const filters: Partial<FilterState> = {
    q: searchParams.q || '',
    category: searchParams.category || '',
    minPrice: Number(searchParams.minPrice) || 0,
    maxPrice: Number(searchParams.maxPrice) || 5000,
    sortBy: (searchParams.sortBy as FilterState['sortBy']) || 'default',
    page: Number(searchParams.page) || 1,
  }

  // fetch products and categories in parallel
  const [{ products, total }, categories] = await Promise.all([
    fetchProducts(filters),
    fetchCategories(),
  ])

  const query = searchParams.q || ''

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-brand-charcoal to-[#2a1a1f] text-white py-10 px-6 sm:px-8 mb-8 rounded-2xl shadow-sm">
        <p className="text-xs tracking-[0.3em] text-brand-gold uppercase mb-2">✦ Discover</p>
        <h1 className="font-display text-3xl sm:text-4xl font-light select-none">
          {query ? <>Results for <span className="font-display italic text-brand-rose font-medium">&quot;{query}&quot;</span></> : 'Our Collection'}
        </h1>
      </div>
      <SearchResults
        initialProducts={products}
        initialTotal={total}
        initialFilters={filters}
        categories={categories}
      />
    </div>
  )
}
