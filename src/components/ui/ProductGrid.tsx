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

export default function ProductGrid({
  products = [],
  loading = false,
  skeletonCount = 12,
  viewMode = 'grid',
}: ProductGridProps) {
  const isList = viewMode === 'list';
  
  if (loading) {
    return (
      <div className={isList ? "flex flex-col gap-6" : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <SkeletonCard key={index} index={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
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

  return (
    <div className={isList ? "flex flex-col gap-6" : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"}>
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} viewMode={viewMode} />
      ))}
    </div>
  );
}
