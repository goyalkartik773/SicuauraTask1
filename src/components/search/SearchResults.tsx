'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product, Category, FilterState } from '@/types';
import FilterSidebar from './FilterSidebar';
import SearchHeader from './SearchHeader';
import Pagination from './Pagination';
import ProductGrid from '@/components/ui/ProductGrid';
import { PRODUCTS_PER_PAGE } from '@/lib/constants';

interface SearchResultsProps {
  initialProducts: Product[];
  initialTotal: number;
  initialFilters: Partial<FilterState>;
  categories: Category[];
}

export default function SearchResults({
  initialProducts,
  initialTotal,
  initialFilters,
  categories,
}: SearchResultsProps) {
  const router = useRouter();

  const [filters, setFilters] = useState<Partial<FilterState>>(initialFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      
      if (filters.q) params.set('q', filters.q);
      if (filters.category && filters.category !== 'all') params.set('category', filters.category);
      if (filters.minPrice !== undefined && filters.minPrice > 0) params.set('minPrice', String(filters.minPrice));
      if (filters.maxPrice !== undefined && filters.maxPrice < 5000) params.set('maxPrice', String(filters.maxPrice));
      if (filters.sortBy && filters.sortBy !== 'default') params.set('sortBy', filters.sortBy);
      if (filters.page && filters.page > 1) params.set('page', String(filters.page));

      const queryStr = params.toString();
      const targetUrl = queryStr ? `/search?${queryStr}` : '/search';
      
      router.push(targetUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(timer);
  }, [filters, router]);

  const handleFilterChange = (updates: Partial<FilterState>) => {
    setFilters((prev) => {
      const nextFilters = { ...prev, ...updates };
      if (!updates.hasOwnProperty('page')) {
        nextFilters.page = 1;
      }
      return nextFilters;
    });
  };

  const totalPages = Math.ceil(initialTotal / PRODUCTS_PER_PAGE);

  return (
    <div className="flex gap-8 max-w-7xl mx-auto xl:max-w-screen-xl 2xl:max-w-screen-2xl px-4 sm:px-6 lg:px-8">
      <span className="hidden">{categories.length}</span>
      <div className="hidden lg:block w-56 xl:w-64 flex-shrink-0">
        <FilterSidebar
          filters={filters as FilterState}
          onChange={handleFilterChange}
        />
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 z-40 transition-opacity animate-fadeIn"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-[85vw] max-w-sm bg-white z-50 overflow-y-auto p-6 shadow-2xl animate-slideIn flex flex-col">
            <FilterSidebar
              filters={filters as FilterState}
              onChange={handleFilterChange}
              onClose={() => setMobileFiltersOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <SearchHeader
          query={filters.q || ''}
          total={initialTotal}
          sortBy={filters.sortBy || 'default'}
          onSortChange={(sort) => handleFilterChange({ sortBy: sort })}
          onFilterToggle={() => setMobileFiltersOpen(true)}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        <ProductGrid products={initialProducts} viewMode={viewMode} />

        {totalPages > 1 && (
          <Pagination
            currentPage={filters.page || 1}
            totalPages={totalPages}
            onPageChange={(page) => handleFilterChange({ page })}
          />
        )}
      </div>
    </div>
  );
}
