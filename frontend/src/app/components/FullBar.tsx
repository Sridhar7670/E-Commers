"use client"
import React, { useState, useEffect } from 'react';
import Card from "./card";
import { HorizontalScroller } from "./HoizontalScroller";
import SkeletonCard from './SkeletonCard';

type Product = {
  id: number;
  Productname: string;
  Productdescription: string;
  imageUrl: string;
  brand: string;
  price: number;
  inStock: boolean;
  category: string;
};

type FullBarProps = {
    heading: string;
    Url:string;
};

export default function FullBar({ heading,Url }: FullBarProps) {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading,SetLoading]=useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url=encodeURIComponent(Url);
        const response = await fetch(`http://localhost:3000/products/category/${url}`);
        const data = await response.json();
        setProducts(data); 
        SetLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProducts();
  }, []); 

  return (
    <>
      <HorizontalScroller>
        <div className="p-2 bg-transparent rounded-b-lg">
          <h2 className="bg-[#F9FAFB] text-start px-10 pt-4 text-[1.5rem]  rounded-t-lg ">{heading}</h2>
        <div className="shadow-md   pt-0 overflow-x-auto scrollbar-hide ">
         {loading ===true ? (
          <div className="flex whitespace-nowrap gap-6 p-6 pt-4 bg-[#F9FAFB] overflow-x-auto rounded-b-lg scrollbar-hide">
            {/* Create a temporary array to render 4 skeleton cards */}
            {Array(5).fill(0).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
            ): <div className="flex whitespace-nowrap gap-6 p-8 pt-4 bg-[#F9FAFB] overflow-x-auto rounded-b-lg scrollbar-hide">
            {products.map((product) => (
              <Card
                id={product.id}
                key={product.id}
                Productname={product.Productname}
                Productdescription={product.Productdescription}
                imageUrl={product.imageUrl}
                badgeText={`$${product.price}`} // Use price for the badge
                button_text={product.inStock ? 'Add to Cart' : 'Out of Stock'}
                inStock ={ product.inStock? true:false}

              />
            ))}
          </div>
           }

        </div>
        </div>
      </HorizontalScroller>
    </>
  );
}