import ProductGrid from '@/components/ui/ProductGrid'

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-screen-xl 2xl:max-w-screen-2xl py-12 animate-fadeIn">
      <div className="h-8 w-48 bg-gray-200 shimmer rounded-full mb-8" />
      <ProductGrid loading={true} skeletonCount={8} />
    </div>
  )
}
