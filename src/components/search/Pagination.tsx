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

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  const getPageNumbers = () => {
    const maxVisible = 5;
    
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    start = Math.max(1, start);
    end = Math.min(totalPages, end);
    
    const length = Math.max(0, end - start + 1);
    const pages = Array.from({ length }, (_, i) => start + i);
    
    return { pages, showStartEllipsis: start > 1, showEndEllipsis: end < totalPages };
  };

  const { pages, showStartEllipsis, showEndEllipsis } = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-1.5 md:gap-2.5 border-t border-gray-100 pt-10 mt-10 select-none">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
        className={cn(
          'w-9 h-9 md:w-auto md:px-5 md:py-2 rounded-full border border-gray-200 bg-white hover:border-brand-rose hover:text-brand-rose text-brand-charcoal flex items-center justify-center md:gap-2 text-xs md:text-sm font-semibold transition-all shadow-xs min-w-[36px] min-h-[36px] md:min-w-0 md:min-h-0',
          currentPage === 1 && 'opacity-40 cursor-not-allowed hover:border-gray-200 hover:text-brand-charcoal hover:bg-white'
        )}
      >
        <ChevronLeft size={14} />
        <span className="hidden md:inline">Prev</span>
      </button>

      {showStartEllipsis && (
        <span className="hidden md:flex items-center gap-1.5">
          <button
            onClick={() => handlePageChange(1)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium hover:bg-gray-100 text-gray-600 transition-colors"
          >
            1
          </button>
          {currentPage > 3 && <span className="text-gray-400 px-1 select-none font-medium">&hellip;</span>}
        </span>
      )}

      {pages.map((page) => {
        const isCurrent = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            aria-current={isCurrent ? 'page' : undefined}
            className={cn(
              'w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold transition-all shadow-xs min-w-[36px] min-h-[36px]',
              isCurrent
                ? 'bg-brand-rose text-white shadow-lg shadow-brand-rose/30'
                : 'bg-white border border-gray-100 text-gray-600 hover:bg-gray-50 hover:text-brand-charcoal hidden md:flex'
            )}
          >
            {page}
          </button>
        );
      })}

      {showEndEllipsis && (
        <span className="hidden md:flex items-center gap-1.5">
          {currentPage < totalPages - 2 && <span className="text-gray-400 px-1 select-none font-medium">&hellip;</span>}
          <button
            onClick={() => handlePageChange(totalPages)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium hover:bg-gray-100 text-gray-600 transition-colors"
          >
            {totalPages}
          </button>
        </span>
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
        className={cn(
          'w-9 h-9 md:w-auto md:px-5 md:py-2 rounded-full border border-gray-200 bg-white hover:border-brand-rose hover:text-brand-rose text-brand-charcoal flex items-center justify-center md:gap-2 text-xs md:text-sm font-semibold transition-all shadow-xs min-w-[36px] min-h-[36px] md:min-w-0 md:min-h-0',
          currentPage === totalPages && 'opacity-40 cursor-not-allowed hover:border-gray-200 hover:text-brand-charcoal hover:bg-white'
        )}
      >
        <span className="hidden md:inline">Next</span>
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
