import Link from "next/link";
type Product = {
    id: number;
    Productname: string;
    imageUrl: string;
    price: string;
};

export default function SmallCard({ product }: { product: Product }) {
    return (
       <Link  href={`/product/${product.id}`}>
         <div className="bg-white shadow-md rounded-lg overflow-hidden ">
            <img src={product.imageUrl} alt={product.Productname} className="w-full h-32 object-cover"/>
            <div className="p-4">
                <h3 className="font-semibold text-md truncate text-[#253D61]">{product.Productname}</h3>
                <p className="  text-[#253D61] mt-2">${product.price}</p>
            </div>
        </div>
       </Link>
    );
}