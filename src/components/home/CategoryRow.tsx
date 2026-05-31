'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { LayoutGrid, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { getProductImage } from '@/lib/imageMap';

const VISIBLE_CATEGORIES = [
  { slug: 'all', name: 'All Collection', isAll: true },
  { slug: 'beauty', name: 'Beauty', image: getProductImage({ id: 1, category: 'beauty' }) },
  { slug: 'womens-dresses', name: 'Women\'s Dresses', image: getProductImage({ id: 1, category: 'womens-dresses' }) },
  { slug: 'mens-shirts', name: 'Men\'s Shirts', image: getProductImage({ id: 1, category: 'mens-shirts' }) },
  { slug: 'tops', name: 'Tops', image: getProductImage({ id: 1, category: 'tops' }) },
  { slug: 'womens-jewellery', name: 'Women\'s Jewellery', image: getProductImage({ id: 1, category: 'womens-jewellery' }) },
  { slug: 'womens-bags', name: 'Women\'s Bags', image: getProductImage({ id: 1, category: 'womens-bags' }) },
] as const;

export default function CategoryRow() {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (slug: string) => {
    router.push(`/search?category=${slug}`);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 240;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="w-full bg-[linear-gradient(rgba(250,247,242,0)_0%,rgba(250,247,242,1)_100%)] py-16 px-4 sm:px-6 lg:px-8 xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto border-b border-gray-100">
      <div className="max-w-7xl mx-auto xl:max-w-screen-xl 2xl:max-w-screen-2xl">
        <div className="text-center mb-10 select-none">
          <span className="text-xs tracking-[0.3em] text-gray-400 font-medium uppercase mb-2 block">
            Celebrate every occasion in style
          </span>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-light text-brand-charcoal">
            Shop By <span className="text-brand-rose font-bold relative pb-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-brand-gold after:to-brand-rose">Category</span>
          </h2>
          <div className="w-12 h-px bg-brand-gold mx-auto mt-6" />
        </div>

        <div className="relative px-4 sm:px-6">
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md flex md:hidden items-center justify-center z-10 text-brand-charcoal hover:text-brand-rose transition-colors min-w-[44px] min-h-[44px]"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md flex md:hidden items-center justify-center z-10 text-brand-charcoal hover:text-brand-rose transition-colors min-w-[44px] min-h-[44px]"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto md:overflow-x-visible md:flex-wrap pb-4 justify-start md:justify-center scrollbar-hide scroll-smooth animate-fadeIn"
          >
            {VISIBLE_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategoryClick(cat.slug)}
                className="flex flex-col items-center gap-3 cursor-pointer group min-w-[75px] md:min-w-[100px] lg:min-w-[110px]"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden relative flex items-center justify-center bg-brand-cream ring-2 ring-transparent ring-offset-2 group-hover:ring-brand-rose group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-brand-rose/20 transition-all duration-300 ease-out shadow-sm">
                  {'isAll' in cat ? (
                    <LayoutGrid className="w-6 h-6 md:w-8 md:h-8 text-brand-charcoal group-hover:text-brand-rose transition-colors duration-300" />
                  ) : (
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 768px) 64px, (max-width: 1024px) 80px, 96px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>

                <span className="text-[10px] md:text-xs font-body font-medium text-gray-600 group-hover:text-brand-rose group-hover:-translate-y-1 transition-all duration-300 text-center line-clamp-1 max-w-[70px] md:max-w-[95px] lg:max-w-[105px]">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
