'use client';

import { SlidersHorizontal } from 'lucide-react';
import { SortOption } from '@/types';

interface SearchHeaderProps {
  query: string;
  total: number;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onFilterToggle: () => void;
}

export default function SearchHeader({
  query,
  total,
  sortBy,
  onSortChange,
  onFilterToggle,
}: SearchHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 select-none">
      {/* Left side: Results header */}
      <div>
        {query ? (
          <h1 className="font-display text-2xl font-semibold text-brand-charcoal">
            Results for &quot;<span className="text-brand-rose">{query}</span>&quot;
          </h1>
        ) : (
          <h1 className="font-display text-2xl font-semibold text-brand-charcoal">
            All Products
          </h1>
        )}
        <p className="text-sm text-gray-400 mt-1 font-medium">{total} products found</p>
      </div>

      {/* Right side: mobile filter toggle & sort select */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        {/* Mobile Filters Button */}
        <button
          onClick={onFilterToggle}
          className="lg:hidden flex items-center justify-center gap-2 border border-gray-200 bg-white rounded-lg px-4 py-2 text-sm text-brand-charcoal hover:bg-gray-50 active:bg-gray-100 font-semibold shadow-sm flex-1 sm:flex-initial"
        >
          <SlidersHorizontal size={16} />
          <span>Filters</span>
        </button>

        {/* Sorting Dropdown */}
        <div className="relative flex-1 sm:flex-initial">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="w-full sm:w-48 border border-gray-200 bg-white rounded-lg px-3 py-2 text-sm text-brand-charcoal focus:ring-2 focus:ring-brand-rose focus:border-transparent outline-none shadow-sm cursor-pointer font-medium"
          >
            <option value="default">Default Sorting</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>
    </div>
  );
}
