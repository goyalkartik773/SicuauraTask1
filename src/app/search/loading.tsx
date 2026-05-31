import ProductGrid from '@/components/ui/ProductGrid'

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-screen-xl 2xl:max-w-screen-2xl py-8 animate-fadeIn">
      <div className="flex gap-8">
        {/* Sidebar skeleton */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="space-y-3">
            <div className="h-6 w-24 bg-gray-200 shimmer rounded-full" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-10 w-full bg-gray-200 shimmer rounded-lg" />
            ))}
          </div>
        </div>
        {/* Results grid skeleton */}
        <div className="flex-1">
          <div className="h-8 w-48 bg-gray-200 shimmer rounded-full mb-6" />
          <ProductGrid loading={true} skeletonCount={12} />
        </div>
      </div>
    </div>
  )
}
