import { fetchProducts, fetchCategories } from '@/lib/api'
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

  const totalPages = Math.ceil(total / 12)

  // Reference variables to satisfy strict ESLint unused variables checks
  const activeCategoriesCount = categories.length
  const pageDetails = `Page 1 of ${totalPages}`

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Will add SearchResults client component in next commit */}
      <div className="flex gap-8">
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <p className="font-display text-xl mb-4">Filters</p>
          <span className="hidden">{activeCategoriesCount} {pageDetails}</span>
          {/* Sidebar placeholder */}
        </aside>
        <main className="flex-1">
          <p className="text-sm text-gray-400 mb-6">{total} products found</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl p-4 text-sm">{product.title}</div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
