import ProductGrid from '@/components/ui/ProductGrid'

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="h-8 w-48 bg-gray-200 shimmer rounded-full mb-8" />
      <ProductGrid loading={true} skeletonCount={8} />
    </div>
  )
}
