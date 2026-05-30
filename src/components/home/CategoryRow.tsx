'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { LayoutGrid, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

export default function CategoryRow() {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // The 6 specific categories to display, plus "All"
  const visibleCategories = [
    { slug: 'all', name: 'All Collection', isAll: true },
    { slug: 'beauty', name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80' },
    { slug: 'womens-dresses', name: 'Women\'s Dresses', image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=200&q=80' },
    { slug: 'mens-shirts', name: 'Men\'s Shirts', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200&q=80' },
    { slug: 'tops', name: 'Tops', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=200&q=80' },
    { slug: 'womens-jewellery', name: 'Women\'s Jewellery', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&q=80' },
    { slug: 'womens-bags', name: 'Women\'s Bags', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&q=80' },
  ];

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
    <section className="w-full bg-[linear-gradient(rgba(250,247,242,0)_0%,rgba(250,247,242,1)_100%)] py-16 px-4 md:px-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="text-center mb-10 select-none">
          <span className="text-xs tracking-[0.3em] text-gray-400 font-medium uppercase mb-2 block">
            Celebrate every occasion in style
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-light text-brand-charcoal">
            Shop By <span className="text-brand-rose font-bold relative pb-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-brand-gold after:to-brand-rose">Category</span>
          </h2>
          <div className="w-12 h-px bg-brand-gold mx-auto mt-6" />
        </div>

        {/* Categories Row with Arrows */}
        <div className="relative px-4 sm:px-6">
          {/* Left Arrow (Mobile/Tablet only) */}
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center z-10 lg:hidden text-brand-charcoal hover:text-brand-rose transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {/* Right Arrow (Mobile/Tablet only) */}
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center z-10 lg:hidden text-brand-charcoal hover:text-brand-rose transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 justify-start md:justify-center scrollbar-hide scroll-smooth"
          >
            {visibleCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategoryClick(cat.slug)}
                className="flex flex-col items-center gap-3 cursor-pointer group min-w-[90px] md:min-w-[110px]"
              >
                {/* Circle Graphic */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden relative flex items-center justify-center bg-brand-cream ring-2 ring-transparent ring-offset-2 group-hover:ring-brand-rose group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-brand-rose/20 transition-all duration-300 ease-out shadow-sm">
                  {cat.isAll ? (
                    <LayoutGrid className="w-8 h-8 text-brand-charcoal group-hover:text-brand-rose transition-colors duration-300" />
                  ) : (
                    <Image
                      src={cat.image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&q=80'}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 768px) 80px, 96px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>

                {/* Category Label */}
                <span className="text-xs font-body font-medium text-gray-600 group-hover:text-brand-rose group-hover:-translate-y-1 transition-all duration-300 text-center line-clamp-1 max-w-[85px] md:max-w-[105px]">
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
