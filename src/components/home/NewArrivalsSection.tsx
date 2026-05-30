import Link from 'next/link';
import { Product } from '@/types';
import ProductGrid from '@/components/ui/ProductGrid';

interface NewArrivalsSectionProps {
  products: Product[];
}

export default function NewArrivalsSection({ products }: NewArrivalsSectionProps) {
  return (
    <section className="bg-gradient-to-b from-brand-cream to-white py-20 px-4 md:px-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10 select-none">
          <div>
            <span className="text-xs tracking-[0.2em] text-brand-gold font-medium uppercase mb-1 block">
              ✦ Fresh Drops ✦
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-brand-charcoal">
              New <span className="font-display italic font-light text-brand-rose">Arrivals</span>
            </h2>
          </div>
          <Link
            href="/search"
            className="text-xs sm:text-sm font-semibold tracking-wider text-brand-rose hover:text-brand-rose/90 transition-colors duration-200 uppercase flex items-center gap-1 group underline-offset-4"
          >
            <span>View All Products</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-1">→</span>
          </Link>
        </div>

        {/* Product Grid Render */}
        <ProductGrid products={products} />

        {/* E-Commerce elegant Load More style divider */}
        <div className="relative flex justify-center items-center mt-16 pt-4">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-6 text-xs tracking-wider text-gray-400 font-body relative -top-px uppercase">
              Showing 8 of 194 products
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
