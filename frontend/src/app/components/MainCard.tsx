"use client"
import Cookies from 'js-cookie';

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

export default function MainCard({ product }: { product: Product }) {

  const handleAddToCart = async () => {
    // Prevent action if the product is out of stock
    if (!product.inStock) return;

    // Get the authentication token from cookies
    const accessToken = Cookies.get('accessToken');

    if (!accessToken) {
      alert('You must be logged in to add items to your cart.');
      // Optionally, you could redirect to a login page here
      return;
    }

    try {
          const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`

      const res = await fetch(`${apiUrl}/cart/add/${product.id}?quantity=1`, {
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
<div className="bg-white shadow-xl rounded-2xl overflow-hidden md:flex items-center max-w-4xl mx-auto">
  
  {/* Image Section */}
  <div className="md:w-1/2 p-4">
    <img 
      src={product.imageUrl} 
      alt={product.Productname}  
      className="w-full h-full object-contain rounded-lg aspect-square" 
    />
  </div>

  {/* Details Section */}
  <div className="p-6 md:w-1/2 flex flex-col justify-between h-full">
    
    {/* Product Info */}
    <div>
      <p className="text-sm text-[#253D61] font-medium mb-1">By {product.brand}</p>
      <h1 className="text-4xl text-[#253D61] font-bold mb-3 leading-tight">{product.Productname}</h1>
      <p className="text-[#253D61] mb-6">{product.Productdescription}</p>
    </div>

    {/* Action Area */}
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-3xl font-extrabold text-[#253D61]">${product.price}</p>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${product.inStock ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      <button  
        className={`w-full rounded-lg py-3 px-4 font-semibold text-lg transition-colors ${product.inStock
          ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
          :"bg-gray-200 text-gray-500 cursor-not-allowed"}
        `}
        onClick={handleAddToCart}
        disabled={!product.inStock}
      >
        Add to Cart
      </button>
    </div>

  </div>
</div>
  );
}