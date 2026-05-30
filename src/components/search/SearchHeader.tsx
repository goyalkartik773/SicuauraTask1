'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { SlidersHorizontal, ChevronDown, LayoutGrid, List } from 'lucide-react';
import { SortOption } from '@/types';
import { cn } from '@/lib/utils';

interface SearchHeaderProps {
  query: string;
  total: number;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onFilterToggle: () => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export default function SearchHeader({
  query,
  total,
  sortBy,
  onSortChange,
  onFilterToggle,
  viewMode,
  onViewModeChange,
}: SearchHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sortOptions = [
    { label: 'Default Sorting', value: 'default' as SortOption },
    { label: 'Price: Low to High', value: 'price-asc' as SortOption },
    { label: 'Price: High to Low', value: 'price-desc' as SortOption },
    { label: 'Top Rated', value: 'rating' as SortOption },
  ];

  const currentOption = sortOptions.find((opt) => opt.value === sortBy) || sortOptions[0];

  return (
    <div className="flex flex-col mb-8 select-none">
      {/* Breadcrumb Navigation above heading */}
      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2.5 font-body">
        <Link href="/" className="hover:text-brand-rose transition-colors duration-200">
          Home
        </Link>
        <span className="text-gray-300 font-light font-body">›</span>
        <Link href="/search" className="hover:text-brand-rose transition-colors duration-200">
          Search
        </Link>
        {query && (
          <>
            <span className="text-gray-300 font-light font-body">›</span>
            <span className="text-brand-rose italic font-medium truncate max-w-[150px]">
              &quot;{query}&quot;
            </span>
          </>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
        {/* Left side: Results header and count pill */}
        <div className="flex items-center gap-3 flex-wrap">
          {query ? (
            <h1 className="font-display text-2xl font-semibold text-brand-charcoal">
              Results for &quot;<span className="font-display italic text-brand-rose font-medium">{query}</span>&quot;
            </h1>
          ) : (
            <h1 className="font-display text-2xl font-semibold text-brand-charcoal">
              All Products
            </h1>
          )}
          <span className="bg-brand-rose/10 text-brand-rose text-xs font-semibold px-3 py-1 rounded-full">
            {total} {total === 1 ? 'product' : 'products'}
          </span>
        </div>

        {/* Right side: view toggle, mobile filter toggle & sort select */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Grid / List View Toggle */}
          <div className="flex items-center border border-gray-200 rounded-lg p-0.5 bg-white shadow-xs">
            <button
              onClick={() => onViewModeChange('grid')}
              aria-label="Grid View"
              className={cn(
                'p-1.5 rounded-md transition-all duration-200',
                viewMode === 'grid'
                  ? 'bg-brand-rose/10 text-brand-rose'
                  : 'text-gray-400 hover:text-brand-charcoal'
              )}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              aria-label="List View"
              className={cn(
                'p-1.5 rounded-md transition-all duration-200',
                viewMode === 'list'
                  ? 'bg-brand-rose/10 text-brand-rose'
                  : 'text-gray-400 hover:text-brand-charcoal'
              )}
            >
              <List size={16} />
            </button>
          </div>

          {/* Mobile Filters Button */}
          <button
            onClick={onFilterToggle}
            className="lg:hidden flex items-center justify-center gap-2 border border-gray-200 bg-white rounded-lg px-4 py-2 text-sm text-brand-charcoal hover:bg-gray-50 active:bg-gray-100 font-semibold shadow-xs flex-1 sm:flex-initial"
          >
            <SlidersHorizontal size={16} />
            <span>Filters</span>
          </button>

          {/* Custom Styled Sorting Dropdown */}
          <div ref={dropdownRef} className="relative flex-1 sm:flex-initial w-full sm:w-48">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full sm:w-48 flex items-center justify-between border border-gray-200 bg-white rounded-lg px-3 py-2 text-sm text-brand-charcoal hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-rose focus:border-transparent shadow-xs cursor-pointer font-medium"
            >
              <span className="truncate">{currentOption.label}</span>
              <ChevronDown
                size={16}
                className={cn('transition-transform duration-300 text-gray-400 ml-2 flex-shrink-0', isOpen && 'transform rotate-180')}
              />
            </button>

            {/* Dropdown Options List */}
            {isOpen && (
              <ul className="absolute right-0 mt-1 w-full sm:w-48 bg-white border border-gray-100 rounded-lg shadow-lg z-20 py-1 font-body text-sm animate-fadeUp">
                {sortOptions.map((opt) => {
                  const isSelected = opt.value === sortBy;
                  return (
                    <li key={opt.value}>
                      <button
                        onClick={() => {
                          onSortChange(opt.value);
                          setIsOpen(false);
                        }}
                        className={cn(
                          'w-full text-left px-3 py-2 flex items-center justify-between hover:bg-brand-rose/5 transition-colors duration-150',
                          isSelected ? 'text-brand-rose font-semibold' : 'text-brand-charcoal'
                        )}
                      >
                        <span>{opt.label}</span>
                        {isSelected && <span className="text-brand-rose font-bold text-xs">✓</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
