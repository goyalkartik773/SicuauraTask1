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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SearchResults
        initialProducts={products}
        initialTotal={total}
        initialFilters={filters}
        categories={categories}
      />
    </div>
  )
}
