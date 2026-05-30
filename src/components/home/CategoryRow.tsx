'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { LayoutGrid } from 'lucide-react';

export default function CategoryRow() {
  const router = useRouter();

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

  return (
    <section className="w-full bg-white py-16 px-4 md:px-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="text-center mb-10 select-none">
          <span className="text-xs tracking-[0.3em] text-gray-400 font-medium uppercase mb-2 block">
            Celebrate every occasion in style
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-light text-brand-charcoal">
            Shop By <span className="text-brand-rose font-bold">Category</span>
          </h2>
          <div className="w-12 h-0.5 bg-brand-gold mx-auto mt-4" />
        </div>

        {/* Categories Row */}
        <div className="flex gap-6 overflow-x-auto pb-4 justify-start md:justify-center scrollbar-hide">
          {visibleCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleCategoryClick(cat.slug)}
              className="flex flex-col items-center gap-3 cursor-pointer group min-w-[90px] md:min-w-[110px]"
            >
              {/* Circle Graphic */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-brand-rose transition-all duration-300 relative shadow-sm hover:shadow-md flex items-center justify-center bg-brand-cream">
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
              <span className="text-xs font-body font-medium text-gray-600 group-hover:text-brand-rose transition-colors duration-200 text-center line-clamp-1 max-w-[85px] md:max-w-[105px]">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
