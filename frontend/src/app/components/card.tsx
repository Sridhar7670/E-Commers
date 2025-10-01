"use client"
import Link from 'next/link';
import React from 'react';
import Cookies from 'js-cookie';

type TourCardProps = {
  id:number;
  Productname: string;
  Productdescription: string;
  badgeText: string;   //this is price 
  imageUrl: string;
  button_text:string;
  inStock:boolean

};

export default function Card({ id,Productname, Productdescription, badgeText, imageUrl ,button_text,inStock}: TourCardProps) {
  // Add this function inside your Card component, next to handleAddToCart
const handleAddToWishlist = async (event: React.MouseEvent<HTMLButtonElement>) => {
  // Prevent the parent <Link> from navigating
  event.preventDefault();
  event.stopPropagation();

  const accessToken = Cookies.get('accessToken');

  if (!accessToken) {
    alert('You must be logged in to add items to your wishlist.');
    return;
  }

  try {
    // Make the POST request to your wishlist endpoint with the product ID
        const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`

    const res = await fetch(`${apiUrl}/wishlist/${id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (res.ok) {
      alert('Product added to wishlist successfully!');
    } else {
      const errorData = await res.json();
      alert(`Failed to add product to wishlist: ${errorData.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('An error occurred while adding to wishlist:', error);
    alert('An error occurred. Please try again.');
  }
};
const handleAddToCart = async (event:React.MouseEvent<HTMLButtonElement>) => {
 event.preventDefault(); 
    // Prevent action if the product is out of stock

    if (!inStock) return;

    // Get the authentication token from cookies
    const accessToken = Cookies.get('accessToken');

    if (!accessToken) {
      alert('You must be logged in to add items to your cart.');
      // Optionally, you could redirect to a login page here
      return;
    }

    try {
          const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`

      const res = await fetch(`${apiUrl}/cart/add/${id}?quantity=1`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (res.ok) {
        alert('Product added to cart successfully!');
        // Optionally, you could refresh the cart data or show a toast notification
      } else {
        const errorData = await res.json();
        alert(`Failed to add product to cart: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('An error occurred while adding to cart:', error);
      alert('An error occurred. Please try again.');
    }
  };


  return (
    <Link href={`/product/${id}`} className="flex-shrink-0 w-64 md:w-72 rounded-lg border border-gray-200 bg-white shadow-sm cursor-pointer block !max-h-[300px]">
      <div>
        <img
          className="h-40 w-full rounded-t-lg object-cover"
          src={imageUrl}
          alt={Productname}
        />
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center flex-wrap justify-between">
          <p className="font-medium text-gray-900 truncate">{Productname}</p>
          <span className="rounded-full bg-pink-100 px-2.5 py-0.5 text-xs font-semibold text-pink-800">
            {badgeText}
          </span>
        </div>

        <p className="mb-4 text-sm text-gray-500 truncate">{Productdescription}</p>
        
        {/* The button is now just for show, as the whole card is a link. 
            'tabIndex="-1"' prevents it from being focusable twice (once for the link, once for the button).
        */}
        {/* Container for both buttons */}
        <div className="flex items-center gap-2">
          <button
            tabIndex={-1}
            className={`flex-1 rounded-lg py-2 px-4 font-semibold transition-colors ${
              inStock
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            onClick={handleAddToCart}
            disabled={!inStock}
          >
            {button_text}
          </button>
          
          {/* New "Add to Wishlist" Button */}
          <button
            tabIndex={-1}
            className="flex-shrink-0 rounded-lg bg-pink-100 p-2 text-pink-700 hover:bg-pink-200 transition-colors"
            onClick={handleAddToWishlist}
            aria-label="Add to wishlist"
          >
            {/* Heart Icon SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );

}