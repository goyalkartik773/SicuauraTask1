'use client';

import { X } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';
import { FilterState, SortOption } from '@/types';
import { cn } from '@/lib/utils';

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: Partial<FilterState>) => void;
  onClose?: () => void;
}

export default function FilterSidebar({ filters, onChange, onClose }: FilterSidebarProps) {
  const minPrice = filters.minPrice ?? 0;
  const maxPrice = filters.maxPrice ?? 5000;
  const activeCategory = filters.category || 'all';
  const activeSort = filters.sortBy || 'default';

  // Determine if any filters are actively changed from the defaults
  const isAnyFilterActive =
    (filters.q && filters.q !== '') ||
    (activeCategory && activeCategory !== 'all') ||
    minPrice > 0 ||
    maxPrice < 5000 ||
    activeSort !== 'default';

  const handleClearAll = () => {
    onChange({
      q: '',
      category: 'all',
      minPrice: 0,
      maxPrice: 5000,
      sortBy: 'default',
      page: 1,
    });
  };

  const sortOptions = [
    { label: 'Default', value: 'default' as SortOption },
    { label: 'Price: Low to High', value: 'price-asc' as SortOption },
    { label: 'Price: High to Low', value: 'price-desc' as SortOption },
    { label: 'Top Rated', value: 'rating' as SortOption },
  ];

  return (
    <aside className="w-full h-full flex flex-col bg-white">
      {/* Header Row */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-xl font-semibold text-brand-charcoal">Filters</h2>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close filters"
            className="lg:hidden p-1.5 hover:bg-gray-100 rounded-full text-brand-charcoal"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Clear All Link */}
      {isAnyFilterActive && (
        <div className="mb-6">
          <button
            onClick={handleClearAll}
            className="text-xs font-semibold text-brand-rose hover:underline"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Scrollable filters container */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-8 scrollbar-hide">
        {/* Section 1: Categories */}
        <div>
          <h3 className="text-xs tracking-widest text-gray-400 uppercase font-semibold mb-3">
            Category
          </h3>
          <div className="flex flex-col gap-1">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => onChange({ category: cat.slug, page: 1 })}
                  className={cn(
                    'w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors duration-200 font-body font-medium',
                    isSelected
                      ? 'bg-brand-rose text-white shadow-sm'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  )}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Price Range */}
        <div>
          <h3 className="text-xs tracking-widest text-gray-400 uppercase font-semibold mb-3">
            Price Range
          </h3>
          <div className="text-sm font-body font-medium text-gray-600 mb-4">
            ₹{minPrice.toLocaleString('en-IN')} &ndash; ₹{maxPrice.toLocaleString('en-IN')}
          </div>
          
          <div className="space-y-4">
            {/* Min Price Slider */}
            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Min Price</span>
                <span>₹{minPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={minPrice}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  onChange({ minPrice: Math.min(val, maxPrice), page: 1 });
                }}
                className="w-full accent-brand-rose h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Max Price Slider */}
            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Max Price</span>
                <span>₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={maxPrice}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  onChange({ maxPrice: Math.max(val, minPrice), page: 1 });
                }}
                className="w-full accent-brand-rose h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Sort Options */}
        <div>
          <h3 className="text-xs tracking-widest text-gray-400 uppercase font-semibold mb-3">
            Sort By
          </h3>
          <div className="flex flex-col gap-1">
            {sortOptions.map((opt) => {
              const isSelected = activeSort === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => onChange({ sortBy: opt.value, page: 1 })}
                  className={cn(
                    'w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors duration-200 font-body font-medium',
                    isSelected
                      ? 'bg-brand-rose text-white shadow-sm'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
