// File: app/cart/page.tsx

import { cookies } from 'next/headers';
import Link from 'next/link';
import CartItemCard from '../components/cartItemCard';
import EmptyCartIcon from '../components/EmptyCart';


// Define types for the expected API response
type Product = {
  id: number;
  Productname: string;
  Productdescription: string;
  imageUrl: string;
  price: string;
  inStock:boolean;
};

type CartItem = {
  id: number;
  product: Product;
  quantity: number;
};

type CartResponse = {
  id: number;
  items: CartItem[];
};

// Helper function to fetch cart data
async function getCartData(): Promise<CartResponse | null> {
 const cookieStore = await cookies();
  const accessToken =  cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    console.log('No access token found.');
    return null; // No token, no cart
  }

  try {
        const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`

    const res = await fetch(`${apiUrl}/cart`, {
      headers: {
        // Pass the cookie to the API route
        'Authorization': `Bearer ${accessToken}`,
      },
      // Carts are dynamic, so we don't want to cache this fetch
      cache: 'no-store', 
    });

    if (!res.ok) {
      // Handle API errors gracefully
      console.error(`API Error: ${res.status} ${res.statusText}`);
      return null;
    }

    const cartData: CartResponse = await res.json();
    return cartData;

  } catch (error) {
    console.error('Failed to fetch cart data:', error);
    return null;
  }
}


// The main page component is async to allow for data fetching
export default async function CartPage() {
  const cart = await getCartData();

  // Scenario 1: Cart is empty or couldn't be fetched
  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <EmptyCartIcon />
        <h1 className="text-3xl font-bold text-[#253D61]  mb-2">Your Cart is Empty</h1>
        <p className="text-gray-500 text-[#253D61]  mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/" className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  // Calculate total price
  const totalPrice = cart.items.reduce((total, item) => {
    return total + (parseFloat(item.product.price) * item.quantity);
  }, 0);

  // Scenario 2: Cart has items
  return (
<div className="container mx-auto px-4 py-8">
  <h1 className="text-4xl font-extrabold mb-8 border-b border-gray-200 pb-4 text-[#253D61]">
    Your Shopping Cart
  </h1>

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
    
    {/* Cart Items Section */}
    <div className="lg:col-span-2">
      {/* Changed to a vertical flex column for a standard list view */}
      <div className="flex flex-col gap-6">
        {cart.items.map((item) => (
          <CartItemCard
            key={item.id}
            itemId={item.id}
            productId={item.product.id}
            name={item.product.Productname}
            description={item.product.Productdescription}
            imageUrl={item.product.imageUrl}
            price={`₹${parseFloat(item.product.price).toFixed(2)}`}
            button_text="Remove"
            inStock={item.product.inStock}
          />
        ))}
      </div>
    </div>

    {/* Order Summary Section */}
    <div className="lg:col-span-1">
      <div className="bg-gray-50 p-6 rounded-2xl shadow-lg sticky top-8">
        <h2 className="text-2xl font-bold mb-5 border-b border-gray-200 pb-3 text-[#253D61]">
          Order Summary
        </h2>
        
        {/* List of items in the summary */}
        <div className="space-y-4 mb-5">
          {cart.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm text-[#253D61]">
              <span className="truncate w-3/5 font-medium">{item.product.Productname} (x{item.quantity})</span>
              <span className="w-2/5 text-right font-mono">₹{(parseFloat(item.product.price) * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        {/* Totals Section */}
        <div className="border-t border-gray-200 pt-4 space-y-4">
          <div className="flex justify-between font-semibold text-[#253D61]">
            <span>Subtotal</span>
            <span className="font-mono">₹{totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className='text-[#253D61]'>Shipping</span>
            <span className="text-green-600 font-medium">FREE</span>
          </div>
          <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg text-[#253D61]">
            <span>Total</span>
            <span className="font-mono">₹{totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <button className="w-full mt-6 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors text-lg">
          Proceed to Checkout
        </button>
      </div>
    </div>
  </div>
</div>
  );
}