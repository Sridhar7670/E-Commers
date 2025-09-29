// src/app/favorites/page.tsx
import { cookies } from 'next/headers';
import Link from 'next/link';
import FavoritesList from '../components/FavouriteList';


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

// This server-side helper function remains the same
async function getWishlistData(): Promise<WishlistItem[] | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const res = await fetch('http://localhost:3000/wishlist', {
      headers: { 'Authorization': `Bearer ${accessToken}` },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Failed to fetch wishlist data:', error);
    return null;
  }
}

// The main page component is a Server Component
export default async function FavoritesPage() {
  const initialWishlist = await getWishlistData();

  // Scenario 1: User is not logged in or the initial wishlist is empty
  if (!initialWishlist || initialWishlist.length === 0) {
  const cookieStore = await cookies();
    const isLoggedIn = !!cookieStore.get('accessToken')?.value; // Check again for correct message
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {isLoggedIn ? 'Your Wishlist is Empty' : 'Please Login to View Your Wishlist'}
        </h1>
        <p className="text-gray-500 mb-6">
          {isLoggedIn
            ? "You haven't added any items to your wishlist yet. Start exploring!"
            : 'You need to be logged in to save and view your favorite items.'}
        </p>
        <Link 
          href={isLoggedIn ? '/' : '/login'} 
          className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isLoggedIn ? 'Start Shopping' : 'Go to Login'}
        </Link>
      </div>
    );
  }

  // Scenario 2: Wishlist has items, so we render the interactive client component
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold mb-8 border-b border-gray-200 pb-4 text-gray-800">
        My Wishlist
      </h1>
      <FavoritesList initialItems={initialWishlist} />
    </div>
  );
}