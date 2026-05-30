'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, Star } from 'lucide-react';
import { Product } from '@/types';
import { cn, formatPrice, getDiscountedPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discountedPrice = getDiscountedPrice(product.price, product.discountPercentage);
  const displayDiscount = Math.round(product.discountPercentage);
  const showBadge = product.discountPercentage > 5;

  // Star rating helper: maps rating 0-5 to 5 stars
  const renderStars = (rating: number) => {
    const stars = [];
    const roundedRating = Math.round(rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        stars.push(
          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
        );
      } else {
        stars.push(
          <Star key={i} className="w-3 h-3 text-gray-300" />
        );
      }
    }
    return stars;
  };

  return (
    <div
      className="group opacity-0 animate-fadeUp flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'forwards' }}
    >
      {/* Image Area */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-50">
        {/* Next.js Image */}
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top-Left Discount Badge */}
        {showBadge && (
          <span className="absolute top-3 left-3 z-10 bg-brand-rose text-white text-xs font-bold px-2 py-1 rounded-full absolute shadow-sm">
            {displayDiscount}% OFF
          </span>
        )}

        {/* Top-Right Wishlist Heart */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition-colors duration-200"
        >
          <Heart
            size={16}
            className={cn(
              'transition-all duration-300',
              isWishlisted
                ? 'fill-brand-rose text-brand-rose scale-110'
                : 'text-brand-charcoal hover:text-brand-rose'
            )}
          />
        </button>

        {/* Bottom Quick View Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-brand-charcoal/90 text-white text-center py-3 text-xs tracking-[0.2em] uppercase font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out select-none">
          Quick View
        </div>
      </div>

      {/* Info Area */}
      <div className="flex flex-col flex-1 p-4">
        {/* Category */}
        <span className="text-[10px] sm:text-xs text-brand-gold uppercase tracking-widest font-medium mb-1 line-clamp-1">
          {product.category.replace(/-/g, ' ')}
        </span>

        {/* Title */}
        <h3 className="font-display text-sm sm:text-base font-semibold text-brand-charcoal line-clamp-1 mb-2">
          {product.title}
        </h3>

        {/* Star Rating Row */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center gap-0.5">
            {renderStars(product.rating)}
          </div>
          <span className="text-[10px] sm:text-xs text-gray-400 ml-1">
            ({product.rating.toFixed(1)})
          </span>
        </div>

        {/* Price Row */}
        <div className="flex items-baseline mt-auto">
          <span className="font-bold text-sm sm:text-base text-brand-charcoal">
            {formatPrice(discountedPrice)}
          </span>
          {showBadge && (
            <span className="text-xs sm:text-sm text-gray-400 line-through ml-2">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
