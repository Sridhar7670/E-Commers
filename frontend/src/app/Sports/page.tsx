import ProductList from "../components/ProductsList";

export default async function Sports(){
   
    return (
        <>
        <h1 className="p-4 pl-10 text-[#000000] text-2xl font-bold">Shop Some Sports</h1>
        <ProductList category="clothing"/>
        </>
        
    )
}