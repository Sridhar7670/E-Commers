export default function SkeletonSmallCard() {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-32 bg-gray-300"></div>
      <div className="p-4">
        {/* Text Placeholders */}
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
}