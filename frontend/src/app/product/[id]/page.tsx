
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
async function getProduct(id: number): Promise<Product> {
  // In a real app, use environment variables for the URL
//   await delay(5000);
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`

  const res = await fetch(`${apiUrl}/product/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }

  return res.json();
}

async function getRelatedProducts(category: string): Promise<Product[]> {
      const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`

  const res = await fetch(`${apiUrl}/products/category/${category}`);
   if (!res.ok) {
    throw new Error('Failed to fetch related products');
  }
  return res.json();
}

// export default async function ProductPage({ params }: { params: { id: number } }) {
//   // Fetch the main product and related products in parallel
//   console.log(params)
//   const { id: pid } = await  params;

//   console.log(pid, typeof(pid),"for just cheking the typeof id ")
//   const pidNum = Number(pid); 

//   const product = await getProduct(pidNum);
//   const relatedProducts = await getRelatedProducts(product.category);

//   return (
//     <main className="container mx-auto p-4 bg-[#FFFFFF] mt-5">
//     <MainCard product={product} />

//       <div className="mt-12">
//         <h2 className="text-2xl text-[#253D61] font-bold mb-4">You may also like</h2>
//         {/* The RelatedProducts component is interactive, so it's a Client Component */}
//         <RelatedProducts products={relatedProducts} />
//       </div>
//     </main>
//   );
// }
// export default async function ProductPage({ params }: { params: { id: string } }) {
//   console.log(params);
//   const { id: pid } = params; // no await here

//   console.log(pid, typeof pid, "for just checking the typeof id");

//   const pidNum = Number(pid); // Convert string -> number

//   const product = await getProduct(pidNum);
//   const relatedProducts = await getRelatedProducts(product.category);

//   return (
//     <main className="container mx-auto p-4 bg-[#FFFFFF] mt-5">
//       <MainCard product={product} />

//       <div className="mt-12">
//         <h2 className="text-2xl text-[#253D61] font-bold mb-4">You may also like</h2>
//         <RelatedProducts products={relatedProducts} />
//       </div>
//     </main>
//   );
// }

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params; 
  const { id: pid } = resolvedParams;

  // console.log(pid, typeof pid, "for just checking the typeof id");

  const pidNum = Number(pid);

  const product = await getProduct(pidNum);
  const relatedProducts = await getRelatedProducts(product.category);

  return (
    <main className="container mx-auto p-4 bg-[#FFFFFF] mt-5">
      <MainCard product={product} />

      <div className="mt-12">
        <h2 className="text-2xl text-[#253D61] font-bold mb-4">You may also like</h2>
        <RelatedProducts products={relatedProducts} />
      </div>
    </main>
  );
}
