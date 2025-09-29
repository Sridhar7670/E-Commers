import SkeletonMainCard from "@/app/components/SkeletonMainCard"; // Adjust path if needed
import SkeletonSmallCard from "@/app/components/skeletonSmallCard";


export default function ProductLoadingPage() {
  return (
    <main className="container mx-auto p-4 bg-[#FFFFFF] mt-5">
      {/* Skeleton for the main product card */}
      <SkeletonMainCard />

      <div className="mt-12 flex flex-col gap-[16px]">
        {/* Skeleton for the "You may also like" heading */}
        <div className="h-8 w-1/3 bg-gray-300 rounded animate-pulse mb-4 "></div>
        
        {/* Skeleton grid for related products, using your array idea */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array(5).fill(0).map((_, index) => (
            <SkeletonSmallCard key={index} />
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array(5).fill(0).map((_, index) => (
            <SkeletonSmallCard key={index} />
          ))}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array(5).fill(0).map((_, index) => (
            <SkeletonSmallCard key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}