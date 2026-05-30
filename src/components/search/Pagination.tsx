'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Calculate pages window centered around current page
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    // Boundary corrections
    start = Math.max(1, start);
    end = Math.min(totalPages, end);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return { pages, showStartEllipsis: start > 1, showEndEllipsis: end < totalPages };
  };

  const { pages, showStartEllipsis, showEndEllipsis } = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-1 sm:gap-2 mt-12 select-none">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
        className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center border border-gray-100 bg-white hover:bg-gray-50 active:bg-gray-100 text-brand-charcoal transition-all shadow-sm',
          currentPage === 1 && 'opacity-40 cursor-not-allowed hover:bg-white active:bg-white'
        )}
      >
        <ChevronLeft size={16} />
      </button>

      {/* Start Ellipsis */}
      {showStartEllipsis && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium hover:bg-gray-100 text-gray-600 transition-colors"
          >
            1
          </button>
          {currentPage > 3 && <span className="text-gray-400 px-1 select-none font-medium">&hellip;</span>}
        </>
      )}

      {/* Page Numbers */}
      {pages.map((page) => {
        const isCurrent = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={isCurrent ? 'page' : undefined}
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all shadow-sm',
              isCurrent
                ? 'bg-brand-rose text-white shadow-md'
                : 'bg-white border border-gray-100 text-gray-600 hover:bg-gray-50 hover:text-brand-charcoal'
            )}
          >
            {page}
          </button>
        );
      })}

      {/* End Ellipsis */}
      {showEndEllipsis && (
        <>
          {currentPage < totalPages - 2 && <span className="text-gray-400 px-1 select-none font-medium">&hellip;</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium hover:bg-gray-100 text-gray-600 transition-colors"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
        className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center border border-gray-100 bg-white hover:bg-gray-50 active:bg-gray-100 text-brand-charcoal transition-all shadow-sm',
          currentPage === totalPages && 'opacity-40 cursor-not-allowed hover:bg-white active:bg-white'
        )}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
