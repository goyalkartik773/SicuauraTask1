'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Truck, 
  Lock, 
  RotateCcw, 
  CheckCircle, 
  Trash2, 
  ArrowLeft 
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice, getDiscountedPrice } from '@/lib/utils';

export default function CartPageClient() {
  const {
    items,
    removeItem,
    updateQuantity,
    itemCount,
    subtotal,
    totalDiscount,
    finalTotal,
    couponApplied,
    applyCoupon,
    removeCoupon,
    clearCart
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [wishlistAlert, setWishlistAlert] = useState(false);

  // Date 7 days from now
  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  const deliveryDate = getDeliveryDate();

  // Coupon apply click
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    
    const success = applyCoupon(couponCode);
    if (success) {
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try SAVE10');
    }
  };

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      clearCart();
      setCheckoutSuccess(false);
    }, 4000);
  };

  const handleMoveToWishlist = (id: number, size: string, color: string) => {
    removeItem(id, size, color);
    setWishlistAlert(true);
    setTimeout(() => setWishlistAlert(false), 2500);
  };

  // Base total (discounted subtotal + totalDiscount)
  const bagTotalUSD = subtotal + totalDiscount;
  
  const subtotalINR = subtotal * 83;
  const shippingChargeINR = subtotalINR >= 2000 || itemCount === 0 ? 0 : 99;
  const shippingChargeUSD = shippingChargeINR / 83;

  const couponDiscountUSD = couponApplied ? subtotal * 0.1 : 0;

  if (items.length === 0 && !checkoutSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center select-none animate-fadeUp">
        <div className="w-24 h-24 rounded-full bg-brand-rose/5 flex items-center justify-center mx-auto mb-6 text-brand-rose/40">
          <ShoppingBag size={48} />
        </div>
        <h1 className="font-display text-3xl font-light text-brand-charcoal mb-3">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-gray-400 text-sm mb-8 font-body">
          Explore our seasonal collection and discover unique hand-crafted styles.
        </p>
        <Link
          href="/search"
          className="inline-block bg-brand-rose text-white px-8 py-3.5 rounded-xl text-xs tracking-widest font-semibold uppercase hover:bg-brand-charcoal transition-all duration-300 shadow-md shadow-brand-rose/25"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fadeUp">
      {/* Checkout Success Modal Overlay */}
      {checkoutSuccess && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeUp">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border border-gray-100 select-none">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100">
              <CheckCircle size={32} />
            </div>
            <h2 className="font-display text-2xl font-semibold text-brand-charcoal mb-2">Order Confirmed!</h2>
            <p className="text-sm text-gray-500 font-body mb-6">
              Thank you for shopping with GG Fashion. Your order has been placed successfully and delivers by {deliveryDate}.
            </p>
            <p className="text-[10px] text-gray-400 font-medium">Redirecting you shortly...</p>
          </div>
        </div>
      )}

      {/* Wishlist Move Success banner alert */}
      {wishlistAlert && (
        <div className="fixed bottom-6 right-6 z-40 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-xl border border-emerald-100 p-4 shadow-lg animate-[fadeUp_0.2s_ease-out] flex items-center gap-2">
          <CheckCircle size={16} />
          <span>Product successfully moved to your wishlist!</span>
        </div>
      )}

      {/* Header Block */}
      <div className="flex items-baseline gap-3 mb-8 border-b border-gray-100 pb-5 select-none">
        <h1 className="font-display text-3xl font-light text-brand-charcoal">
          Shopping <span className="text-brand-rose italic font-extralight">Bag</span>
        </h1>
        <span className="text-gray-400 font-body text-sm font-semibold tracking-wide">
          ({itemCount} {itemCount === 1 ? 'item' : 'items'})
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Discount Savings Notification Banner */}
          {totalDiscount > 0 && (
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-3 select-none">
              <CheckCircle className="text-emerald-600 w-5 h-5 flex-shrink-0" />
              <p className="text-emerald-800 text-xs sm:text-sm font-medium font-body leading-none">
                Congratulations! You&apos;ve saved <span className="font-bold">{formatPrice(totalDiscount)}</span> on this order.
              </p>
            </div>
          )}

          {/* Items Map */}
          <div className="divide-y divide-gray-100 select-none">
            {items.map((item) => {
              const discountedVal = getDiscountedPrice(item.product.price, item.product.discountPercentage);
              const showOriginalPrice = item.product.discountPercentage > 5;
              
              return (
                <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-5 py-6 first:pt-0 last:pb-0">
                  {/* Item Image */}
                  <Link 
                    href={`/product/${item.product.id}`}
                    className="relative w-24 h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-50 border border-gray-100 block cursor-pointer group"
                  >
                    <Image
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      fill
                      sizes="96px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  {/* Item Description */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      {/* Brand Label */}
                      <span className="text-[10px] tracking-[0.25em] uppercase text-brand-gold font-bold block mb-1">
                        GG FASHION
                      </span>

                      {/* Product Title */}
                      <Link 
                        href={`/product/${item.product.id}`}
                        className="font-display text-base font-semibold text-brand-charcoal hover:text-brand-rose transition-colors leading-tight line-clamp-1 block cursor-pointer"
                      >
                        {item.product.title}
                      </Link>

                      {/* Meta selections */}
                      <p className="text-[11px] text-gray-400 font-semibold tracking-wider uppercase mt-1">
                        Size: <span className="text-brand-charcoal">{item.size}</span> &bull; Color: <span className="text-brand-charcoal">{item.color}</span>
                      </p>

                      {/* Delivery Date estimate */}
                      <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1.5 mt-2">
                        <Truck size={12} className="flex-shrink-0" />
                        <span>Delivers by {deliveryDate}</span>
                      </div>
                    </div>

                    {/* Price Block */}
                    <div className="flex items-baseline mt-3">
                      <span className="font-bold text-sm sm:text-base text-brand-charcoal">
                        {formatPrice(discountedVal * item.quantity)}
                      </span>
                      {showOriginalPrice && (
                        <span className="text-xs text-gray-400 line-through ml-2">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right side of Item: Qty selector and operations */}
                  <div className="flex flex-col items-end justify-between w-24">
                    {/* Qty Selector box */}
                    <div className="flex items-center border border-gray-200 rounded-lg bg-white p-0.5 shadow-2xs">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.size, item.color)}
                        disabled={item.quantity === 1}
                        className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-brand-rose transition-colors disabled:opacity-30 disabled:hover:text-gray-400 font-bold"
                        aria-label="Decrease quantity"
                      >
                        &ndash;
                      </button>
                      <span className="w-6 text-center text-xs font-body font-bold text-brand-charcoal">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.size, item.color)}
                        className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-brand-rose transition-colors font-bold"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Action controllers */}
                    <div className="flex flex-col gap-1.5 items-end mt-4">
                      <button
                        onClick={() => handleMoveToWishlist(item.product.id, item.size, item.color)}
                        className="text-[10px] tracking-wide text-gray-400 hover:text-brand-rose uppercase font-bold underline transition-colors bg-transparent border-none cursor-pointer"
                      >
                        MOVE TO WISHLIST
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id, item.size, item.color)}
                        className="text-[10px] tracking-wide text-gray-400 hover:text-brand-rose uppercase font-bold underline transition-colors flex items-center gap-1 bg-transparent border-none cursor-pointer"
                      >
                        <Trash2 size={10} className="flex-shrink-0" />
                        <span>REMOVE</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Order Pricing Summary */}
        <div className="select-none">
          <div className="sticky top-24 space-y-6">
            {/* Coupon Application card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
              <h3 className="text-[10px] tracking-[0.2em] font-bold text-gray-400 uppercase mb-3">
                COUPONS
              </h3>
              
              {!couponApplied ? (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter Coupon Code"
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-body font-medium focus:ring-1 focus:ring-brand-rose focus:border-brand-rose outline-none placeholder:text-gray-300"
                  />
                  <button
                    type="submit"
                    className="bg-brand-charcoal text-white px-5 py-2.5 rounded-xl text-[10px] tracking-widest font-semibold uppercase hover:bg-brand-rose transition-colors duration-300"
                  >
                    APPLY
                  </button>
                </form>
              ) : (
                <div className="bg-green-50 border border-green-100 rounded-xl p-3 flex items-center justify-between text-xs font-body text-green-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-green-600 flex-shrink-0" />
                    <span className="font-semibold">SAVE10 applied! 10% discount added.</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-[10px] uppercase font-bold text-brand-rose underline cursor-pointer bg-transparent border-none hover:text-brand-charcoal ml-2"
                  >
                    Remove
                  </button>
                </div>
              )}

              {couponError && (
                <p className="text-red-500 text-[10px] mt-2 font-body font-medium leading-none">
                  {couponError}
                </p>
              )}
              
              {!couponApplied && (
                <p className="text-[9px] text-gray-400 mt-2 font-medium">
                  Use coupon code <span className="font-bold text-brand-gold">SAVE10</span> to save 10% on your order.
                </p>
              )}
            </div>

            {/* Price Details Summary Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs">
              <h3 className="text-[10px] tracking-[0.2em] font-bold text-gray-400 uppercase mb-4">
                PRICE DETAILS
              </h3>
              
              <div className="space-y-3 font-body text-xs font-semibold text-gray-500 border-t border-gray-100 pt-4">
                {/* Bag Total */}
                <div className="flex justify-between items-center py-0.5">
                  <span>Bag Total ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                  <span className="text-brand-charcoal">{formatPrice(bagTotalUSD)}</span>
                </div>

                {/* Bag Discount */}
                {totalDiscount > 0 && (
                  <div className="flex justify-between items-center py-0.5">
                    <span>Bag Discount</span>
                    <span className="text-emerald-600">-{formatPrice(totalDiscount)}</span>
                  </div>
                )}

                {/* Coupon discount */}
                {couponApplied && (
                  <div className="flex justify-between items-center py-0.5">
                    <span>Coupon Discount</span>
                    <span className="text-emerald-600">-{formatPrice(couponDiscountUSD)}</span>
                  </div>
                )}

                {/* Shipping cost */}
                <div className="flex justify-between items-center py-0.5">
                  <span>Shipping</span>
                  {shippingChargeINR === 0 ? (
                    <span className="text-emerald-600 uppercase">FREE</span>
                  ) : (
                    <span className="text-brand-charcoal">{formatPrice(shippingChargeUSD)}</span>
                  )}
                </div>

                {/* Segment Divider */}
                <div className="border-t border-dashed border-gray-100 my-4" />

                {/* Total Payable */}
                <div className="flex justify-between items-center text-sm font-bold text-brand-charcoal">
                  <span>Total Payable</span>
                  <span className="text-base text-brand-rose">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleCheckout}
                className="w-full bg-brand-rose text-white py-4 rounded-xl font-medium tracking-widest text-xs uppercase hover:bg-brand-charcoal transition-colors duration-300 shadow-lg shadow-brand-rose/25 mt-6"
              >
                PROCEED TO CHECKOUT
              </button>

              {/* Trust Indicators footer */}
              <div className="flex justify-around mt-6 border-t border-gray-50 pt-4 text-[9px] text-gray-400 font-semibold tracking-wider uppercase select-none">
                <div className="flex flex-col items-center gap-1.5">
                  <Lock size={14} className="text-brand-rose/50" />
                  <span>100% Secure</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <Truck size={14} className="text-brand-rose/50" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <RotateCcw size={14} className="text-brand-rose/50" />
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>
            
            {/* Back to Catalog collection selector */}
            <Link
              href="/search"
              className="flex items-center justify-center gap-1.5 text-xs text-brand-rose hover:text-brand-charcoal transition-colors uppercase font-bold"
            >
              <ArrowLeft size={12} />
              <span>Back to Collection</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
