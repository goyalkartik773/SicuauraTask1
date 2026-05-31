'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star, ShoppingBag, Package } from 'lucide-react';
import { Product } from '@/types';
import { cn, formatPrice, getDiscountedPrice } from '@/lib/utils';
import { getProductImage } from '@/lib/imageMap';

interface ProductCardProps {
  product: Product;
  index?: number;
  viewMode?: 'grid' | 'list';
}

function StarRating({ rating }: { rating: number }) {
  const stars = [];
  const roundedRating = Math.round(rating);
  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      stars.push(<Star key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 text-amber-400" />);
    } else {
      stars.push(<Star key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-300" />);
    }
  }
  return <>{stars}</>;
}

export default function ProductCard({ product, index = 0, viewMode = 'grid' }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);

  const discountedPrice = getDiscountedPrice(product.price, product.discountPercentage);
  const displayDiscount = Math.round(product.discountPercentage);
  const showBadge = product.discountPercentage > 5;

  const swatchColors = ['#C5384B', '#1C1C1E', '#D4A853', '#8B7355', '#4A6741'];
  const startIdx = product.id % 5;
  const productSwatches = [
    swatchColors[startIdx],
    swatchColors[(startIdx + 1) % 5],
    swatchColors[(startIdx + 2) % 5],
  ];

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleImageError = () => setImageError(true);

  const isList = viewMode === 'list';

  if (isList) {
    return (
      <Link
        href={`/product/${product.id}`}
        className="group opacity-0 animate-fadeUp flex flex-row bg-white rounded-2xl overflow-hidden border border-gray-50 hover:border-brand-rose/20 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(197,56,75,0.15)] transition-all duration-300 w-full cursor-pointer animate-fadeIn"
        style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'forwards' }}
      >
        <div className="relative w-32 xs:w-40 sm:w-56 aspect-[3/4] flex-shrink-0 overflow-hidden bg-gray-50 select-none">
          {!imageError ? (
            <Image
              src={getProductImage(product)}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              quality={85}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50">
              <Package className="w-12 h-12 text-gray-300" />
            </div>
          )}

          {showBadge && (
            <span
              className="absolute top-0 left-3 z-10 bg-brand-rose text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 pb-2 sm:pb-3 pt-0.5 sm:pt-1.5 shadow-sm text-center tracking-wider min-w-[28px] sm:min-w-[36px]"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)' }}
            >
              {displayDiscount}%
            </span>
          )}

          <button
            onClick={handleWishlistToggle}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-3 right-3 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition-colors duration-200"
          >
            <Heart
              className={cn(
                'transition-all duration-300 w-3.5 h-3.5 sm:w-4 sm:h-4',
                isWishlisted
                  ? 'fill-brand-rose text-brand-rose animate-[heartPop_0.3s_ease-out]'
                  : 'text-brand-charcoal hover:text-brand-rose'
              )}
            />
          </button>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-charcoal to-brand-charcoal/80 text-white text-center py-3 text-[10px] tracking-[0.2em] uppercase font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex items-center justify-center gap-1.5">
            <ShoppingBag size={12} />
            <span>Quick View</span>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-3 sm:p-5 md:p-6 justify-between select-none">
          <div className="space-y-1.5">
            <span className="text-[9px] xs:text-[10px] sm:text-xs text-brand-gold uppercase tracking-widest font-medium block">
              {product.category.replace(/-/g, ' ')}
            </span>
            <h3 className="font-display text-xs sm:text-sm md:text-lg font-semibold text-brand-charcoal line-clamp-1">
              {product.title}
            </h3>
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-0.5">
                <StarRating rating={product.rating} />
              </div>
              <span className="text-[9px] sm:text-xs text-gray-400 ml-1">
                ({product.rating.toFixed(1)})
              </span>
            </div>
            {product.description && (
              <p className="text-xs text-gray-500 font-body line-clamp-2 pt-1 leading-relaxed hidden sm:block">
                {product.description}
              </p>
            )}
          </div>
          <div className="pt-3 border-t border-gray-50 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-baseline">
              <span className="font-bold text-xs sm:text-sm md:text-base text-brand-charcoal">
                {formatPrice(discountedPrice)}
              </span>
              {showBadge && (
                <span className="text-[10px] sm:text-xs text-gray-400 line-through ml-2">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            <div className="flex gap-1">
              {productSwatches.map((color, idx) => (
                <span
                  key={idx}
                  className="w-2.5 h-2.5 rounded-full border border-gray-100 shadow-2xs"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/product/${product.id}`}
      className="group opacity-0 animate-fadeUp flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-50 hover:border-brand-rose/20 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(197,56,75,0.15)] transition-all duration-300 cursor-pointer animate-fadeIn"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'forwards' }}
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-50 select-none">
        {!imageError ? (
          <Image
            src={getProductImage(product)}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            quality={85}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50">
            <Package className="w-16 h-16 text-gray-300" />
          </div>
        )}

        {showBadge && (
          <span
            className="absolute top-0 left-3 z-10 bg-brand-rose text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 pb-2 sm:pb-3 pt-0.5 sm:pt-1.5 shadow-sm text-center tracking-wider min-w-[28px] sm:min-w-[36px]"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)' }}
          >
            {displayDiscount}%
          </span>
        )}

        <button
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition-colors duration-200"
        >
          <Heart
            className={cn(
              'transition-all duration-300 w-3.5 h-3.5 sm:w-4 sm:h-4',
              isWishlisted
                ? 'fill-brand-rose text-brand-rose scale-110 animate-[heartPop_0.3s_ease-out]'
                : 'text-brand-charcoal hover:text-brand-rose'
            )}
          />
        </button>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-charcoal to-brand-charcoal/80 text-white text-center py-3 text-[10px] tracking-[0.2em] uppercase font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex items-center justify-center gap-1.5">
          <ShoppingBag size={12} />
          <span>Quick View</span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-2 sm:p-4 select-none">
        <span className="text-[9px] xs:text-[10px] sm:text-xs text-brand-gold uppercase tracking-widest font-medium mb-1 line-clamp-1">
          {product.category.replace(/-/g, ' ')}
        </span>
        <h3 className="font-display text-xs sm:text-sm lg:text-base font-semibold text-brand-charcoal line-clamp-1 mb-2">
          {product.title}
        </h3>
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center gap-0.5">
            <StarRating rating={product.rating} />
          </div>
          <span className="text-[9px] sm:text-xs text-gray-400 ml-1">
            ({product.rating.toFixed(1)})
          </span>
        </div>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50 flex-wrap gap-2">
          <div className="flex items-baseline">
            <span className="font-bold text-xs sm:text-sm md:text-base text-brand-charcoal">
              {formatPrice(discountedPrice)}
            </span>
            {showBadge && (
              <span className="text-[9px] sm:text-xs text-gray-400 line-through ml-1.5">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <div className="flex gap-1">
            {productSwatches.map((color, idx) => (
              <span
                key={idx}
                className="w-2.5 h-2.5 rounded-full border border-gray-100 shadow-2xs"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
