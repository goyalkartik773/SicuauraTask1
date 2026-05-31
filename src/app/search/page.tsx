import { fetchProducts, fetchCategories } from '@/lib/api';
import SearchResults from '@/components/search/SearchResults';
import type { FilterState } from '@/types';

interface SearchPageProps {
  searchParams: {
    q?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    page?: string;
  };
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const q = searchParams.q || '';
  return {
    title: q ? `Results for "${q}"` : 'Shop All Products',
    description: `Browse our collection${q ? ` of ${q}` : ''} — sarees, suits, lehengas and more.`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const q = searchParams.q || '';
  const category = searchParams.category || '';
  const minPrice = Number(searchParams.minPrice) || 0;
  const maxPrice = Number(searchParams.maxPrice) || 5000;
  const sortBy = (searchParams.sortBy as FilterState['sortBy']) || 'default';
  const page = Number(searchParams.page) || 1;

  const filters: Partial<FilterState> = {
    q,
    category,
    minPrice,
    maxPrice,
    sortBy,
    page,
  };

  const [{ products, total }, categories] = await Promise.all([
    fetchProducts(filters),
    fetchCategories(),
  ]);

  return (
    <div className="max-w-7xl mx-auto xl:max-w-screen-xl 2xl:max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gradient-to-r from-brand-charcoal to-[#2a1a1f] text-white py-6 px-4 md:py-10 md:px-8 mb-8 rounded-2xl shadow-sm animate-fadeIn">
        <p className="text-xs tracking-[0.3em] text-brand-gold uppercase mb-2">✦ Discover</p>
        <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-light select-none">
          {q ? <>Results for <span className="font-display italic text-brand-rose font-medium">&quot;{q}&quot;</span></> : 'Our Collection'}
        </h1>
      </div>
      <SearchResults
        initialProducts={products}
        initialTotal={total}
        initialFilters={filters}
        categories={categories}
      />
    </div>
  );
}
