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

export default function ProductCard({ product, index = 0, viewMode = 'grid' }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);

  const discountedPrice = getDiscountedPrice(product.price, product.discountPercentage);
  const displayDiscount = Math.round(product.discountPercentage);
  const showBadge = product.discountPercentage > 5;

  // Swatch colors logic: display 3 consistent colors based on product.id % 5
  const swatchColors = ['#C5384B', '#1C1C1E', '#D4A853', '#8B7355', '#4A6741'];
  const startIdx = product.id % 5;
  const productSwatches = [
    swatchColors[startIdx],
    swatchColors[(startIdx + 1) % 5],
    swatchColors[(startIdx + 2) % 5],
  ];

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

  const isList = viewMode === 'list';

  // Horizontal list view layout
  if (isList) {
    return (
      <Link
        href={`/product/${product.id}`}
        className="group opacity-0 animate-fadeUp flex flex-row bg-white rounded-2xl overflow-hidden border border-gray-50 hover:border-brand-rose/20 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(197,56,75,0.15)] transition-all duration-300 w-full cursor-pointer"
        style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'forwards' }}
      >
        {/* Left side: Image Area */}
        <div className="relative w-40 sm:w-56 aspect-[3/4] flex-shrink-0 overflow-hidden bg-gray-50 select-none">
          {!imageError ? (
            <Image
              src={getProductImage(product)}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              quality={85}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50">
              <Package className="w-12 h-12 text-gray-300" />
            </div>
          )}

          {/* Ribbon shape discount badge */}
          {showBadge && (
            <span
              className="absolute top-0 left-3 z-10 bg-brand-rose text-white text-[10px] font-bold px-2 pb-3 pt-1.5 shadow-sm text-center tracking-wider"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)', minWidth: '36px' }}
            >
              {displayDiscount}%
            </span>
          )}

          {/* Wishlist Heart */}
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
              size={15}
              className={cn(
                'transition-all duration-300',
                isWishlisted
                  ? 'fill-brand-rose text-brand-rose animate-[heartPop_0.3s_ease-out]'
                  : 'text-brand-charcoal hover:text-brand-rose'
              )}
            />
          </button>

          {/* Quick View Overlay with ShoppingBag icon */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-charcoal to-brand-charcoal/80 text-white text-center py-3 text-[10px] tracking-[0.2em] uppercase font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex items-center justify-center gap-1.5">
            <ShoppingBag size={12} />
            <span>Quick View</span>
          </div>
        </div>

        {/* Right side: Info Area */}
        <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between select-none">
          <div className="space-y-1.5">
            {/* Category */}
            <span className="text-[10px] sm:text-xs text-brand-gold uppercase tracking-widest font-medium block">
              {product.category.replace(/-/g, ' ')}
            </span>

            {/* Title */}
            <h3 className="font-display text-base sm:text-lg font-semibold text-brand-charcoal line-clamp-1">
              {product.title}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-0.5">
                {renderStars(product.rating)}
              </div>
              <span className="text-[10px] sm:text-xs text-gray-400 ml-1">
                ({product.rating.toFixed(1)})
              </span>
            </div>

            {/* Short description */}
            {product.description && (
              <p className="text-xs text-gray-500 font-body line-clamp-2 pt-1 leading-relaxed hidden sm:block">
                {product.description}
              </p>
            )}
          </div>

          <div className="pt-3 border-t border-gray-50 flex items-center justify-between flex-wrap gap-3">
            {/* Price block */}
            <div className="flex items-baseline">
              <span className="font-bold text-sm sm:text-base text-brand-charcoal">
                {formatPrice(discountedPrice)}
              </span>
              {showBadge && (
                <span className="text-xs text-gray-400 line-through ml-2">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Color Swatches */}
            <div className="flex gap-1">
              {productSwatches.map((color, idx) => (
                <span
                  key={idx}
                  className="w-3 h-3 rounded-full border border-gray-100 shadow-2xs"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid view layout
  return (
    <Link
      href={`/product/${product.id}`}
      className="group opacity-0 animate-fadeUp flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-50 hover:border-brand-rose/20 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(197,56,75,0.15)] transition-all duration-300 cursor-pointer"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'forwards' }}
    >
      {/* Image Area */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-50 select-none">
        {/* Next.js Image */}
        {!imageError ? (
          <Image
            src={getProductImage(product)}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            quality={85}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50">
            <Package className="w-16 h-16 text-gray-300" />
          </div>
        )}

        {/* Ribbon shape discount badge */}
        {showBadge && (
          <span
            className="absolute top-0 left-3 z-10 bg-brand-rose text-white text-[10px] font-bold px-2 pb-3 pt-1.5 shadow-sm text-center tracking-wider"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)', minWidth: '36px' }}
          >
            {displayDiscount}%
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
                ? 'fill-brand-rose text-brand-rose scale-110 animate-[heartPop_0.3s_ease-out]'
                : 'text-brand-charcoal hover:text-brand-rose'
            )}
          />
        </button>

        {/* Bottom Quick View Overlay with ShoppingBag icon */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-charcoal to-brand-charcoal/80 text-white text-center py-3 text-[10px] tracking-[0.2em] uppercase font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex items-center justify-center gap-1.5">
          <ShoppingBag size={12} />
          <span>Quick View</span>
        </div>
      </div>

      {/* Info Area */}
      <div className="flex flex-col flex-1 p-4 select-none">
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

        {/* Price & Swatch Row */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50 flex-wrap gap-2">
          <div className="flex items-baseline">
            <span className="font-bold text-sm sm:text-base text-brand-charcoal">
              {formatPrice(discountedPrice)}
            </span>
            {showBadge && (
              <span className="text-[10px] sm:text-xs text-gray-400 line-through ml-1.5">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Color Swatches */}
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
