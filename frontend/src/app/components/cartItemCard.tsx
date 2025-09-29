// File: components/CartItemCard.tsx

"use client";

import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Define the props the component will accept
type CartItemCardProps = {
  itemId: number;
  productId: number;
  name: string;
  imageUrl: string;
  price: string;
  description:string;
  button_text:string;
  inStock:boolean
};

export default function CartItemCard({
  itemId,
  productId,
  name,
  imageUrl,
  price,
  description
}: CartItemCardProps) {
  const router = useRouter();

  // This function will handle all API interactions
  const updateCart = async (event: React.MouseEvent<HTMLButtonElement>,action: 'add' | 'reduce' | 'remove', quantity = 1) => {
     event.preventDefault(); 
    const accessToken = Cookies.get('accessToken');
    if (!accessToken) {
      alert('Please log in to modify your cart.');
      return;
    }

    let url = '';
    let options: RequestInit = {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    };

    if (action === 'remove' ) {
      url = `http://localhost:3000/cart/${productId}`;
      options.method = 'DELETE';
    } else if (action === 'add') {
      url = `http://localhost:3000/cart/add/${productId}?quantity=${quantity}`;
      options.method = 'POST';
    } else if (action === 'reduce') {
      url = `http://localhost:3000/cart/reduce/${productId}?quantity=${quantity}`;
      options.method = 'POST';
    }

    try {
      const res = await fetch(url, options);
      if (res.ok) {
        // Refresh the page to show the updated cart state from the server
        router.refresh();
      } else {
        alert('Failed to update cart.');
      }
    } catch (error) {
      console.error('Cart update error:', error);
      alert('An error occurred.');
    }
  };

  return (
    <Link href={`/product/${productId}`}>
    <div className="flex items-center bg-white shadow-md rounded-lg p-3 gap-4">
      {/* Image */}
      <div className="flex-shrink-0">
        <img
          src={imageUrl}
          alt={name}
          width={80}
          height={80}
          className="rounded-md object-cover aspect-square"
        />
      </div>

      {/* Details */}
      <div className="flex-grow">
        <h4 className="font-bold text-gray-800 truncate">{name}</h4>
        <p className="text-sm text-gray-500 my-1 flex-grow">{description.substring(0, 50)}...</p>
        <p className="text-gray-600 font-semibold">{price}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2 border border-gray-200 rounded-full p-1">
        <button
          onClick={(e) => updateCart(e,'reduce')}
          className="w-7 h-7 flex items-center justify-center bg-[#253D61]  rounded-full hover:bg-gray-200 text-lg font-bold"
          aria-label="Reduce quantity"
        >
          -
        </button>
        <button
          onClick={(e) => updateCart(e,'add')}
          className="w-7 h-7 flex items-center justify-center bg-[#253D61]  rounded-full hover:bg-gray-200 text-lg font-bold"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      {/* Remove Button */}
      <button
        onClick={(e) => updateCart(e,'remove')}
        className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors"
        aria-label="Remove item"
      >
       X
      </button>
    </div>
    </Link>
  );
}