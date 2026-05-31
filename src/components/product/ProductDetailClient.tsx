'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Heart, 
  Star, 
  ShoppingBag, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Truck, 
  Award, 
  X,
  Package
} from 'lucide-react';
import { Product } from '@/types';
import { cn, formatPrice, getDiscountedPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import ProductGrid from '@/components/ui/ProductGrid';
import { getProductGallery } from '@/lib/imageMap';

interface ProductDetailClientProps {
  product: Product;
  similarProducts: Product[];
}

function ProductAccordion({ title, defaultOpen = false, children }: { title: string, defaultOpen?: boolean, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left font-display font-medium text-sm tracking-wide text-brand-charcoal hover:text-brand-rose transition-colors"
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {isOpen && (
        <div className="pb-4 space-y-2 animate-fadeUp">
          {children}
        </div>
      )}
    </div>
  );
}

export default function ProductDetailClient({ product, similarProducts }: ProductDetailClientProps) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedMessage, setAddedMessage] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const images = getProductGallery(product);
  const discountedPrice = getDiscountedPrice(product.price, product.discountPercentage);
  const displayDiscount = Math.round(product.discountPercentage);
  const showBadge = product.discountPercentage > 5;

  const renderStars = (rating: number) => {
    const stars = [];
    const roundedRating = Math.round(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={cn(
            "w-4 h-4", 
            i <= roundedRating ? "fill-amber-400 text-amber-400" : "text-gray-300"
          )} 
        />
      );
    }
    return stars;
  };

  const swatchColors = [
    { hex: '#8B7355', name: 'Desert Khaki' },
    { hex: '#1C1C1E', name: 'Ebony Charcoal' },
    { hex: '#C5384B', name: 'Crimson Rose' },
    { hex: '#4A6741', name: 'Sage Green' },
    { hex: '#D4A853', name: 'GG Gold' }
  ];
  const startIdx = product.id % 5;
  const productColors = [
    swatchColors[startIdx],
    swatchColors[(startIdx + 1) % 5],
    swatchColors[(startIdx + 2) % 5],
  ];

  const getProductDetails = (cat: string) => {
    const isBeauty = cat.includes('beauty') || cat.includes('fragrance');
    if (isBeauty) {
      return [
        { label: "Ingredients", value: "Natural plant extracts, Organic essential oils, Purified aqua base" },
        { label: "Usage", value: "Apply evenly to skin or hair. Perfect for daily luxury care routines" },
        { label: "Safety", value: "Dermatologically tested, Cruelty-free, Organic botanical source" }
      ];
    }
    return [
      { label: "Fabric", value: "Premium hand-woven Banarasi silk blend with gold zari borders" },
      { label: "Pattern", value: "Classic editorial floral motifs with custom hand-carved block prints" },
      { label: "Length", value: "Saree: 5.5 meters, Unstitched Blouse: 0.8 meters" }
    ];
  };

  const detailsList = getProductDetails(product.category);

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const handleQuantityChange = (increment: boolean) => {
    if (increment) {
      setQuantity(prev => prev + 1);
    } else {
      setQuantity(prev => Math.max(1, prev - 1));
    }
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleColorSelect = (index: number) => {
    setSelectedColorIndex(index);
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = () => {
    addItem({
      product,
      quantity,
      size: selectedSize,
      color: productColors[selectedColorIndex].name
    });
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2500);
  };

  const handleBuyNow = () => {
    addItem({
      product,
      quantity,
      size: selectedSize,
      color: productColors[selectedColorIndex].name
    });
    setAddedMessage(true);
    setTimeout(() => {
      setAddedMessage(false);
      window.location.href = '/search';
    }, 500);
  };

  const REVIEWS = [
    { name: 'Hetal Shah', location: 'India', rating: 5, date: 'Feb 16, 2026', text: 'Beautiful dress, perfect size. I ordered for my sister\'s wedding and it arrived on time. The fabric quality is exceptional!', verified: true },
    { name: 'Indu Valavala', location: 'India', rating: 5, date: 'Feb 02, 2026', text: 'This is my second jewelry order from GG Fashion. I loved them both. They arrived well packed and exactly as shown in pictures.', verified: true },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-screen-xl 2xl:max-w-screen-2xl py-8 animate-fadeUp">
      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-8 font-body select-none">
        <Link href="/" className="hover:text-brand-rose transition-colors duration-200">Home</Link>
        <span className="text-gray-300 font-light">›</span>
        <Link 
          href={`/search?category=${product.category}`} 
          className="hover:text-brand-rose transition-colors duration-200 uppercase tracking-wider text-[10px] font-semibold"
        >
          {product.category.replace(/-/g, ' ')}
        </Link>
        <span className="text-gray-300 font-light">›</span>
        <span className="text-brand-rose italic font-medium truncate max-w-[200px]">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="flex flex-col">
          <div className="relative aspect-[4/3] md:aspect-[4/5] rounded-3xl overflow-hidden bg-gray-50 group/gallery border border-gray-100">
            {!imageErrors[selectedImage] ? (
              <Image
                src={images[selectedImage]}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
                className="object-cover animate-fadeIn"
                onError={() => handleImageError(selectedImage)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50">
                <Package className="w-20 h-20 text-gray-300" />
              </div>
            )}

            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-brand-charcoal hover:text-brand-rose transition-colors z-10 opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-brand-charcoal hover:text-brand-rose transition-colors z-10 opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            <button
              onClick={handleWishlistToggle}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-brand-charcoal hover:text-brand-rose transition-colors min-w-[44px] min-h-[44px]"
              aria-label="Wishlist"
            >
              <Heart 
                className={cn(
                  "w-5 h-5 transition-transform duration-300", 
                  isWishlisted ? "fill-brand-rose text-brand-rose scale-110 animate-[heartPop_0.3s_ease-out]" : "text-brand-charcoal"
                )} 
              />
            </button>

            <button
              onClick={() => setIsZoomOpen(true)}
              className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-brand-charcoal hover:text-brand-rose transition-colors z-10 min-w-[44px] min-h-[44px]"
              aria-label="Zoom image"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>

          {images.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto pb-1 scrollbar-hide select-none">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    "w-14 h-14 md:w-20 md:h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 flex-shrink-0 relative",
                    selectedImage === idx ? "border-brand-rose scale-95 shadow-sm" : "border-transparent hover:border-gray-300"
                  )}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    sizes="80px"
                    quality={90}
                    className="object-cover"
                    onError={() => handleImageError(idx)}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col select-none">
          <span className="text-xs tracking-[0.3em] uppercase text-brand-gold font-semibold mb-2 block">
            GG FASHION
          </span>

          <h1 className="font-display text-3xl lg:text-4xl font-semibold text-brand-charcoal leading-tight mb-4">
            {product.title}
          </h1>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-0.5">
              {renderStars(product.rating)}
            </div>
            <span className="text-xs text-gray-500 font-medium">
              {product.rating.toFixed(1)} stars
            </span>
            <span className="text-xs text-gray-300 font-light">|</span>
            <button 
              onClick={() => {
                const element = document.getElementById('reviews-section');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-brand-rose text-xs font-semibold underline hover:text-brand-rose/90 transition-colors"
            >
              Read {product.stock} Reviews
            </button>
          </div>

          <div className="bg-brand-cream rounded-2xl p-3 md:p-5 mb-6 border border-gray-100">
            <div className="flex items-center flex-wrap">
              <span className="font-display text-3xl sm:text-4xl font-bold text-brand-charcoal">
                {formatPrice(discountedPrice)}
              </span>
              {showBadge && (
                <>
                  <span className="text-lg text-gray-400 line-through ml-3.5">
                    {formatPrice(product.price)}
                  </span>
                  <span className="bg-brand-rose text-white text-xs font-bold px-3 py-1 rounded-full ml-3.5 shadow-sm">
                    {displayDiscount}% OFF
                  </span>
                </>
              )}
            </div>
            <p className="text-[10px] sm:text-xs text-gray-400 mt-1.5 font-medium">
              Inclusive of all taxes &bull; Custom packaging included
            </p>
          </div>

          <p className="text-gray-500 text-sm leading-relaxed mb-6 font-body">
            {product.description}
          </p>

          <div className="mb-6 border-t border-gray-100">
            <ProductAccordion title="PRODUCT DETAILS" defaultOpen={true}>
              {detailsList.map((item, idx) => (
                <div key={idx} className="flex text-xs font-body leading-relaxed">
                  <span className="w-24 text-gray-400 font-medium uppercase tracking-wider text-[9px]">{item.label}</span>
                  <span className="flex-1 text-gray-600 font-medium">{item.value}</span>
                </div>
              ))}
            </ProductAccordion>

            <ProductAccordion title="SHIPPING & RETURNS" defaultOpen={false}>
              <div className="text-xs font-body text-gray-600 font-medium">
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-rose" />
                  <span>Free Shipping on orders above ₹2,999</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-rose" />
                  <span>Delivery: 5&ndash;7 business days across India</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-rose" />
                  <span>7-day hassle-free return and exchange policy</span>
                </p>
              </div>
            </ProductAccordion>
          </div>

          <div className="mb-6">
            <h3 className="text-[10px] tracking-[0.2em] font-bold text-gray-400 uppercase mb-3">
              SELECT SIZE
            </h3>
            <div className="flex gap-2.5 flex-wrap">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => {
                const isSelected = size === selectedSize;
                return (
                  <button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    className={cn(
                      "w-10 h-10 md:w-12 md:h-12 rounded-full border text-xs font-semibold flex items-center justify-center transition-all duration-300 shadow-2xs min-w-[40px] min-h-[40px] md:min-w-0 md:min-h-0",
                      isSelected 
                        ? "border-brand-charcoal bg-brand-charcoal text-white scale-95" 
                        : "border-gray-200 text-gray-600 hover:border-brand-rose hover:text-brand-rose bg-white"
                    )}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-[10px] tracking-[0.2em] font-bold text-gray-400 uppercase mb-3">
              SELECT COLOR
            </h3>
            <div className="flex gap-4 items-center">
              {productColors.map((color, idx) => {
                const isSelected = idx === selectedColorIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => handleColorSelect(idx)}
                    className={cn(
                      "w-10 h-10 rounded-full border-2 transition-all duration-300 relative shadow-2xs cursor-pointer",
                      isSelected 
                        ? "border-brand-charcoal ring-2 ring-offset-2 ring-brand-charcoal scale-95" 
                        : "border-transparent hover:scale-105"
                    )}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    aria-label={`Select color ${color.name}`}
                  />
                );
              })}
            </div>
            <p className="text-xs text-gray-400 mt-2 font-medium tracking-wide">
              Color: <span className="text-brand-rose italic font-semibold">{productColors[selectedColorIndex].name}</span>
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex items-center border border-gray-200 rounded-xl bg-white h-14 shadow-2xs justify-between px-3 w-full md:w-32 flex-shrink-0">
              <button
                onClick={() => handleQuantityChange(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-brand-rose transition-colors text-lg font-bold min-w-[44px] min-h-[44px]"
                aria-label="Decrease quantity"
              >
                &ndash;
              </button>
              <span className="w-10 text-center font-body font-bold text-brand-charcoal text-sm">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(true)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-brand-rose transition-colors text-lg font-bold min-w-[44px] min-h-[44px]"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-3 w-full">
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-brand-rose text-white h-14 rounded-xl font-medium tracking-[0.2em] text-xs uppercase hover:bg-brand-charcoal transition-colors duration-300 shadow-lg shadow-brand-rose/25 min-h-[44px]"
              >
                BUY NOW
              </button>
              
              <button
                onClick={handleAddToCart}
                className="flex-1 border-2 border-brand-charcoal bg-transparent text-brand-charcoal h-14 rounded-xl font-medium tracking-[0.2em] text-xs uppercase hover:bg-brand-charcoal hover:text-white transition-all duration-300 flex items-center justify-center gap-2 min-h-[44px]"
              >
                <ShoppingBag size={14} />
                <span>ADD TO CART</span>
              </button>
            </div>
          </div>

          {addedMessage && (
            <div className="mb-6 p-3.5 bg-green-50 text-green-700 text-xs font-semibold rounded-xl border border-green-100 flex items-center gap-2 animate-[fadeUp_0.2s_ease-out]">
              <span className="text-base">✓</span> Added to shopping bag! (Size: {selectedSize}, Color: {productColors[selectedColorIndex].name})
            </div>
          )}

          <div className="grid grid-cols-3 md:flex gap-4 md:gap-6 py-6 border-t border-gray-100 mt-4 select-none">
            <div className="flex flex-col items-center gap-1.5 text-center flex-1">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-rose/10 flex items-center justify-center text-brand-rose flex-shrink-0">
                <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <span className="text-[9px] md:text-[10px] tracking-wider text-gray-500 font-semibold uppercase leading-tight">Secure Pay</span>
              <span className="text-[8px] md:text-[9px] text-gray-400 font-medium leading-none">100% Protected</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center flex-1">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-rose/10 flex items-center justify-center text-brand-rose flex-shrink-0">
                <Truck className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <span className="text-[9px] md:text-[10px] tracking-wider text-gray-500 font-semibold uppercase leading-tight">Fast Delivery</span>
              <span className="text-[8px] md:text-[9px] text-gray-400 font-medium leading-none">5-7 Days</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center flex-1">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-rose/10 flex items-center justify-center text-brand-rose flex-shrink-0">
                <Award className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <span className="text-[9px] md:text-[10px] tracking-wider text-gray-500 font-semibold uppercase leading-tight">Genuine Items</span>
              <span className="text-[8px] md:text-[9px] text-gray-400 font-medium leading-none">Curated Luxury</span>
            </div>
          </div>
        </div>
      </div>

      {similarProducts.length > 0 && (
        <div className="border-t border-gray-100 pt-12 mb-16 select-none">
          <div className="flex justify-between items-end mb-8">
            <h2 className="font-display text-3xl font-light text-brand-charcoal">
              Similar <span className="text-brand-rose italic font-extralight">Collection</span>
            </h2>
            <Link 
              href={`/search?category=${product.category}`}
              className="text-[10px] tracking-[0.2em] font-bold text-brand-rose hover:text-brand-charcoal transition-colors uppercase border-b border-brand-rose pb-0.5"
            >
              VIEW ALL PRODUCTS
            </Link>
          </div>
          <ProductGrid products={similarProducts} />
        </div>
      )}

      <div id="reviews-section" className="border-t border-gray-100 pt-16">
        <h2 className="font-display text-3xl font-light text-brand-charcoal mb-10">
          Ratings & <span className="text-brand-rose font-bold">Reviews</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="bg-brand-cream border border-gray-100 rounded-3xl p-8 text-center flex flex-col items-center justify-center select-none h-fit">
            <span className="font-display text-7xl font-bold text-brand-charcoal leading-none mb-4">
              4.5
            </span>
            <div className="flex items-center gap-1 mb-2">
              {renderStars(4.5)}
            </div>
            <p className="text-xs text-gray-400 font-semibold tracking-wider uppercase mb-6">
              Based on 14 Reviews
            </p>
            <button className="w-full border-2 border-brand-rose text-brand-rose hover:bg-brand-rose hover:text-white px-6 py-3 rounded-full text-xs tracking-widest font-bold uppercase transition-all duration-300 bg-white">
              Write a Review
            </button>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="divide-y divide-gray-100">
              {REVIEWS.map((review, idx) => (
                <div key={idx} className="py-6 first:pt-0 last:pb-0">
                  <div className="flex justify-between items-start flex-wrap gap-2 mb-2 select-none">
                    <div>
                      <span className="font-body font-bold text-brand-charcoal text-sm mr-2">{review.name}</span>
                      {review.verified && (
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px] font-bold px-2 py-0.5 rounded-full">
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400 font-body">{review.date}</span>
                  </div>
                  
                  <div className="flex items-center gap-0.5 mb-3 select-none">
                    {renderStars(review.rating)}
                  </div>
                  
                  <p className="text-xs sm:text-sm text-gray-600 font-body leading-relaxed font-medium">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center gap-2 pt-6 select-none border-t border-gray-100/50">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-rose cursor-pointer" />
              <span className="w-2 h-2 rounded-full bg-gray-200 hover:bg-gray-400 transition-colors cursor-pointer" />
              <span className="w-2 h-2 rounded-full bg-gray-200 hover:bg-gray-400 transition-colors cursor-pointer" />
              <span className="text-gray-400 text-sm ml-1 select-none font-bold cursor-pointer hover:text-brand-rose transition-colors">&rsaquo;</span>
            </div>
          </div>
        </div>
      </div>

      {isZoomOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col justify-center items-center p-4 backdrop-blur-md animate-fadeUp">
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50"
            aria-label="Close zoom modal"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="relative w-full max-w-3xl h-[80vh] rounded-2xl overflow-hidden select-none">
            <Image
              src={images[selectedImage]}
              alt={`Zoomed ${product.title}`}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              quality={90}
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
