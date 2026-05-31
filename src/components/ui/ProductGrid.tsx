import { Product } from '@/types';
import ProductCard from './ProductCard';
import SkeletonCard from './SkeletonCard';
import { ShoppingBag } from 'lucide-react';

interface ProductGridProps {
  products?: Product[];
  loading?: boolean;
  skeletonCount?: number;
  viewMode?: 'grid' | 'list';
}

function EmptyState() {
  return (
    <div className="grid grid-cols-1 w-full">
      <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
        <ShoppingBag size={48} className="text-gray-300 mx-auto mb-4" />
        <p className="font-display text-2xl text-gray-400 font-medium">No products found</p>
        <p className="text-sm text-gray-400 mt-2">Try adjusting your search or filters</p>
      </div>
    </div>
  );
}

export default function ProductGrid({
  products = [],
  loading = false,
  skeletonCount = 12,
  viewMode = 'grid',
}: ProductGridProps) {
  const isList = viewMode === 'list';
  const containerClass = isList 
    ? "flex flex-col gap-6" 
    : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-4 lg:gap-6";

  if (loading) {
    return (
      <div className={containerClass}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <SkeletonCard key={index} index={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className={containerClass}>
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} viewMode={viewMode} />
      ))}
    </div>
  );
}
