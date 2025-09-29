import ProductList from "../components/ProductsList";

export default async function electronics(){
   
    return (

        <>
        <h1 className="p-4 pl-10 text-[#000000] text-2xl font-bold " >Shop Some Exciting Electronics</h1>
       <ProductList category="electronics"/>
        </>

    )
}