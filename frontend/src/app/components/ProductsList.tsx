'use client';

import { useState, useEffect, useTransition } from 'react';
import Card from './card';
import SkeletonCard from './SkeletonCard';

// The type definition is correct, no changes needed here.
type Product = {
  id: number;
  Productname: string;
  Productdescription: string;
  imageUrl: string;
  brand: string;
  price: string;
  inStock: boolean;
  category: string;
};
type Category={
    category:string;
}
export default function ProductList({category}:Category) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isloading,Setisloading]=useState(true)

  const BATCH_SIZE = 15; 
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`http://localhost:3000/products/category/${category}`);
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const products: Product[] = await res.json();
        setAllProducts(products);
        Setisloading(false)
        setVisibleProducts(products.slice(0, BATCH_SIZE));
      } catch (error) {
        console.error(error);
      }
      finally{
        Setisloading(false)
      }
    }
    fetchProducts();
  }, []); 
  function handleLoadMore() {
    startTransition(() => {
      const currentLength = visibleProducts.length;
      const nextProducts = allProducts.slice(currentLength, currentLength + BATCH_SIZE);
      setVisibleProducts(prevProducts => [...prevProducts, ...nextProducts]);
    });
  }
  

  const hasMoreProducts = visibleProducts.length < allProducts.length;

  return (
    <>
    { isloading ? (
        <div className='flex flex-row flex-wrap justify-center gap-4 p-4'> {Array(15).fill(0).map((_, index) => <SkeletonCard key={index} />)}</div>
    )
    :
    (
    <>
      <section className="flex flex-row flex-wrap justify-center gap-4 p-3">
        {visibleProducts.map((product) => (
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
      </section>
      <div className="text-center p-4">
        {hasMoreProducts && (
          <button
            onClick={handleLoadMore}
            disabled={isPending}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isPending ? 'Loading...' : 'Load More'}
          </button>
        )}
      </div>
    </>)
    
}
</>
  );
}