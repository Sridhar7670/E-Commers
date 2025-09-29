const SkeletonCard = () => {
  return (
    // 1. The main container, with the same size and border as the original card.
    <div className="flex-shrink-0 w-64 md:w-72 rounded-lg border border-gray-200 bg-white shadow-sm">
      
      {/* 2. The image placeholder */}
      <div className="h-40 w-full rounded-t-lg bg-gray-300 animate-pulse"></div>

      {/* 3. The content wrapper with padding */}
      <div className="p-4">

        {/* 4. Product name and badge placeholders */}
        <div className="mb-2 flex items-center justify-between">
          <div className="h-5 w-3/4 rounded-md bg-gray-300 animate-pulse"></div>
          <div className="h-5 w-10 rounded-full bg-gray-300 animate-pulse"></div>
        </div>

        {/* 5. The description placeholder */}
        <div className="mb-4 h-4 w-full rounded-md bg-gray-300 animate-pulse"></div>
        
        {/* 6. The button placeholder */}
        <div className="h-10 w-full rounded-lg bg-gray-300 animate-pulse"></div>

      </div>
    </div>
  );
};

export default SkeletonCard;