'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  const minPrice = filters.minPrice ?? 0;
  const maxPrice = filters.maxPrice ?? 5000;
  const activeCategory = filters.category || 'all';
  const activeSort = filters.sortBy || 'default';

  // Live range states during dragging
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);

  // Sync internal slider states if parent props update from outside
  useEffect(() => {
    setLocalMinPrice(minPrice);
  }, [minPrice]);

  useEffect(() => {
    setLocalMaxPrice(maxPrice);
  }, [maxPrice]);

  // Determine if any filters are actively changed from the defaults
  const isAnyFilterActive =
    (filters.q && filters.q !== '') ||
    (activeCategory && activeCategory !== 'all' && activeCategory !== '') ||
    minPrice > 0 ||
    maxPrice < 5000 ||
    activeSort !== 'default';

  const handleClearAll = () => {
    // Reset to exact specified state parameters
    onChange({
      q: '',
      category: '',
      minPrice: 0,
      maxPrice: 5000,
      sortBy: 'default',
      page: 1,
    });
    router.push('/search');
  };

  const sortOptions = [
    { label: 'Default', value: 'default' as SortOption },
    { label: 'Price: Low to High', value: 'price-asc' as SortOption },
    { label: 'Price: High to Low', value: 'price-desc' as SortOption },
    { label: 'Top Rated', value: 'rating' as SortOption },
  ];

  // Calculate active filter count for the badge next to the Filters header
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.q && filters.q.trim() !== '') count++;
    if (activeCategory && activeCategory !== 'all' && activeCategory !== '') count++;
    if (minPrice > 0 || maxPrice < 5000) count++;
    if (activeSort && activeSort !== 'default') count++;
    return count;
  };
  const activeFilterCount = getActiveFilterCount();

  return (
    <aside className="w-full h-full flex flex-col bg-white border-r border-gray-100 pr-8">
      {/* Header Row */}
      <div className="flex flex-col mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-2xl italic font-light text-brand-charcoal">Filters</h2>
            {activeFilterCount > 0 && (
              <span className="bg-brand-rose text-white w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center animate-[heartPop_0.3s_ease-out]">
                {activeFilterCount}
              </span>
            )}
          </div>
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
        <div className="w-8 h-0.5 bg-brand-gold mt-1" />
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
          <h3 className="text-[10px] tracking-[0.3em] text-gray-400 uppercase font-semibold mb-4">
            Category
          </h3>
          <div className="flex flex-col gap-1.5">
            {CATEGORIES.map((cat) => {
              // Highlight 'All Collection' (all) if activeCategory is empty ('') or 'all'
              const isSelected =
                (cat.slug === 'all' && (activeCategory === 'all' || activeCategory === '')) ||
                activeCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => onChange({ category: cat.slug === 'all' ? '' : cat.slug, page: 1 })}
                  className={cn(
                    'w-full text-left px-3 py-2 rounded-lg text-xs tracking-wide transition-all duration-300 font-body flex items-center',
                    isSelected
                      ? 'bg-brand-rose/10 border border-brand-rose text-brand-rose font-medium'
                      : 'bg-transparent border border-gray-100 text-gray-600 hover:border-brand-rose/40 hover:bg-brand-rose/5 hover:text-brand-rose'
                  )}
                >
                  {isSelected && <span className="mr-1.5 text-brand-rose">•</span>}
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Price Range */}
        <div>
          <h3 className="text-[10px] tracking-[0.3em] text-gray-400 uppercase font-semibold mb-4">
            Price Range
          </h3>
          <div className="text-sm font-body font-medium text-gray-600 mb-3">
            ₹{localMinPrice.toLocaleString('en-IN')} &ndash; ₹{localMaxPrice.toLocaleString('en-IN')}
          </div>

          {/* Thin colored track bar visualizer */}
          <div className="relative w-full h-1 bg-gray-100 rounded-full mb-6">
            <div
              className="absolute bg-brand-rose/30 h-1 rounded-full"
              style={{
                left: `${(localMinPrice / 5000) * 100}%`,
                width: `${((localMaxPrice - localMinPrice) / 5000) * 100}%`,
              }}
            />
          </div>
          
          <div className="space-y-4">
            {/* Min Price Slider */}
            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Min Price</span>
                <span>₹{localMinPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={localMinPrice}
                onInput={(e) => {
                  const val = Number(e.currentTarget.value);
                  setLocalMinPrice(Math.min(val, localMaxPrice));
                }}
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
                <span>₹{localMaxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={localMaxPrice}
                onInput={(e) => {
                  const val = Number(e.currentTarget.value);
                  setLocalMaxPrice(Math.max(val, localMinPrice));
                }}
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
          <h3 className="text-[10px] tracking-[0.3em] text-gray-400 uppercase font-semibold mb-4">
            Sort By
          </h3>
          <div className="flex flex-col gap-1.5">
            {sortOptions.map((opt) => {
              const isSelected = activeSort === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => onChange({ sortBy: opt.value, page: 1 })}
                  className={cn(
                    'w-full text-left px-3 py-2 rounded-lg text-xs tracking-wide transition-all duration-300 font-body flex items-center',
                    isSelected
                      ? 'bg-brand-rose/10 border border-brand-rose text-brand-rose font-medium'
                      : 'bg-transparent border border-gray-100 text-gray-600 hover:border-brand-rose/40 hover:bg-brand-rose/5 hover:text-brand-rose'
                  )}
                >
                  {isSelected && <span className="mr-1.5 text-brand-rose">•</span>}
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
