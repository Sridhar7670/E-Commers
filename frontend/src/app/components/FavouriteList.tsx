// src/app/components/FavoritesList.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import FavoriteCard from './FavouriteCard';

// Define the type for a single wishlist item
type WishlistItem = {
  id: number;
  Productname: string;
  Productdescription: string;
  imageUrl: string;
  brand: string;
  price: string;
  inStock: boolean;
};

// Define the props for this component
interface FavoritesListProps {
  initialItems: WishlistItem[];
}

export default function FavoritesList({ initialItems }: FavoritesListProps) {
  // 1. Manage the list of items in state, initialized with data from the server
  const [items, setItems] = useState(initialItems);

  // 2. This function updates the client-side state
  const handleItemRemoved = (itemId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  // 3. If the list becomes empty after removing items, show the empty message
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Wishlist is Empty</h1>
        <p className="text-gray-500 mb-6">You haven't added any items to your wishlist yet.</p>
        <Link 
          href="/" 
          className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  // 4. Render the list of cards
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {items.map((item) => (
        <FavoriteCard
          key={item.id}
          id={item.id}
          name={item.Productname}
          brand={item.brand}
          imageUrl={item.imageUrl}
          price={item.price}
          inStock={item.inStock}
          // Pass the handler down to each card
          onItemMoved={handleItemRemoved}
        />
      ))}
    </div>
  );
}