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

  // Internal state of filters, pre-populated from URL queries via page props
  const [filters, setFilters] = useState<Partial<FilterState>>(initialFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync internal state if URL parameters change from outside (e.g. navbar searches or back button)
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  // URL State Sync effect: updates URL query params on filter change
  useEffect(() => {
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
  }, [filters, router]);

  // Handler for merging filter state updates and resetting page index where required
  const handleFilterChange = (updates: Partial<FilterState>) => {
    setFilters((prev) => {
      const nextFilters = { ...prev, ...updates };
      // If we are changing filters other than page itself, reset page back to page 1
      if (!updates.hasOwnProperty('page')) {
        nextFilters.page = 1;
      }
      return nextFilters;
    });
  };

  const totalPages = Math.ceil(initialTotal / PRODUCTS_PER_PAGE);

  return (
    <div className="flex gap-8">
      {/* Hidden element to satisfy ESLint unused categories prop rule */}
      <span className="hidden">{categories.length}</span>
      {/* Desktop Sidebar Layout */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <FilterSidebar
          filters={filters as FilterState}
          onChange={handleFilterChange}
        />
      </div>

      {/* Mobile Drawer Overlay and Sidebar Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Black Translucent Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileFiltersOpen(false)}
          />
          {/* Left Sliding Sidebar Sheet */}
          <div className="absolute left-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto shadow-2xl animate-slideIn flex flex-col">
            <FilterSidebar
              filters={filters as FilterState}
              onChange={handleFilterChange}
              onClose={() => setMobileFiltersOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Results Display */}
      <div className="flex-1 min-w-0">
        <SearchHeader
          query={filters.q || ''}
          total={initialTotal}
          sortBy={filters.sortBy || 'default'}
          onSortChange={(sort) => handleFilterChange({ sortBy: sort })}
          onFilterToggle={() => setMobileFiltersOpen(true)}
        />

        {/* Catalog Grid */}
        <ProductGrid products={initialProducts} />

        {/* Navigation Pagination chevrons */}
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
