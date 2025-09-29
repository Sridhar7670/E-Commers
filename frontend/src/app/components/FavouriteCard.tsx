"use client";

import type { FC } from 'react';
import Cookies from 'js-cookie';

// Define the component's props
interface FavoriteCardProps {
  id: number;
  name: string;
  brand: string;
  imageUrl: string;
  price: string;
  inStock: boolean;
  onItemMoved: (itemId: number) => void;
}

const FavoriteCard: FC<FavoriteCardProps> = ({ id, name, brand, imageUrl, price, inStock, onItemMoved }) => {

  // A single, robust function to handle the entire "move" operation
  const handleMoveToCart = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!inStock) return;

    const accessToken = Cookies.get('accessToken');
    if (!accessToken) {
      alert('You must be logged in to move items.');
      return;
    }

    try {
      // Step 1: Add the item to the cart
      const addToCartRes = await fetch(`http://localhost:3000/cart/add/${id}?quantity=1`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });

      if (!addToCartRes.ok) {
        throw new Error('Failed to add item to cart.');
      }

      // Step 2: Only if Step 1 is successful, remove the item from the wishlist
      const removeFromWishlistRes = await fetch(`http://localhost:3000/wishlist/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });

      if (!removeFromWishlistRes.ok) {
        throw new Error('Added to cart, but failed to remove from wishlist.');
      }

      alert('Product moved to cart successfully!');

      // Step 3: Tell the parent component to remove this card from the UI
      onItemMoved(id);

    } catch (error: any) {
      console.error('An error occurred during the move operation:', error);
      alert(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative w-full h-56">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <p className="text-sm text-gray-500 mb-1">{brand}</p>
        <h3 className="text-lg font-bold text-gray-800 truncate">{name}</h3>
        <div className="flex items-center justify-between mt-4">
          <p className="text-xl font-semibold text-gray-900">₹{parseFloat(price).toFixed(2)}</p>
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              inStock
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        <button 
          className="w-full mt-4 bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed" 
          onClick={handleMoveToCart}
          disabled={!inStock}
        >
          Move to Cart
        </button>
      </div>
    </div>
  );
};

export default FavoriteCard;