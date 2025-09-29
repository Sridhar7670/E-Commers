
import MainCard from "@/app/components/MainCard";
import RelatedProducts from "@/app/components/RelatedProducts";

// Define the shape of our Product data
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

// const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
async function getProduct(id: string): Promise<Product> {
  // In a real app, use environment variables for the URL
//   await delay(5000);
  const res = await fetch(`http://localhost:3000/product/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }

  return res.json();
}

async function getRelatedProducts(category: string): Promise<Product[]> {
  const res = await fetch(`http://localhost:3000/products/category/${category}`);
   if (!res.ok) {
    throw new Error('Failed to fetch related products');
  }
  return res.json();
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  // Fetch the main product and related products in parallel
  const product = await getProduct(params.id);
  const relatedProducts = await getRelatedProducts(product.category);

  return (
    <main className="container mx-auto p-4 bg-[#FFFFFF] mt-5">
    <MainCard product={product} />

      <div className="mt-12">
        <h2 className="text-2xl text-[#253D61] font-bold mb-4">You may also like</h2>
        {/* The RelatedProducts component is interactive, so it's a Client Component */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </main>
  );
}