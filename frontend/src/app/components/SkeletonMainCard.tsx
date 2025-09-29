export default function SkeletonMainCard() {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden md:flex animate-pulse">
      {/* Image Placeholder */}
      <div className="bg-gray-300 md:w-1/3 h-64 md:h-auto"></div>

      {/* Text Placeholder */}
      <div className="p-6 md:w-2/3 w-full">
        <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-6"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 mb-6"></div>
        
        <div className="flex items-center justify-between">
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            <div className="h-8 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
}