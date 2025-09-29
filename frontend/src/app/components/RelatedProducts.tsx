"use client";
import { useState } from 'react';
import SmallCard from './smallcard';

type Product = {
  id: number;
  Productname: string;
  imageUrl: string;
  price: string;
};

type RelatedProductsProps = {
  products: Product[];
};

const INITIAL_DISPLAY_COUNT = 10;

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_DISPLAY_COUNT);

  const showMoreProducts = () => {
    
    setVisibleCount(visibleCount+10); 
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4  scrollbar-hide">
        {products.slice(0, visibleCount).map((product) => (
          <SmallCard key={product.id} product={product} />
        ))}
      </div>

      {/* Only show the button if there are more products to display */}
      {products.length > visibleCount && (
        <div className="text-center mt-8 ">
          <button
            onClick={showMoreProducts}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
}