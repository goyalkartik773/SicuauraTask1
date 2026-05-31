interface SkeletonCardProps {
  index?: number;
}

export default function SkeletonCard({ index = 0 }: SkeletonCardProps) {
  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm">
      <div 
        className="w-full aspect-[3/4] bg-gray-200 shimmer"
        style={{ 
          animationDelay: `${index * 100}ms`,
          animationFillMode: 'both'
        }} 
      />

      <div className="p-4 flex flex-col flex-1">
        <div 
          className="h-3 w-1/3 rounded-full bg-gray-200 shimmer mb-2"
          style={{ 
            animationDelay: `${index * 100 + 50}ms`,
            animationFillMode: 'both'
          }}
        />

        <div 
          className="h-4 w-3/4 rounded-full bg-gray-200 shimmer mb-3"
          style={{ 
            animationDelay: `${index * 100 + 100}ms`,
            animationFillMode: 'both'
          }}
        />

        <div 
          className="h-3 w-1/2 rounded-full bg-gray-200 shimmer mt-auto"
          style={{ 
            animationDelay: `${index * 100 + 150}ms`,
            animationFillMode: 'both'
          }}
        />
      </div>
    </div>
  );
}
