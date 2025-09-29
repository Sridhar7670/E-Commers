import ProductList from "../components/ProductsList";

export default async function MensWear(){
   
    return (
        <>
        <h1 className="p-4 pl-10 text-[#000000] text-2xl font-bold">Mens Products </h1>
        <ProductList category="mens wear"/>
        </>
        
    )
}