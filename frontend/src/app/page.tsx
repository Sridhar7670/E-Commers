import Footer from "./components/Footer";
import FullBar from "./components/FullBar";
import ImageSlider from "./components/ImageSlider";

export default function Home() {
  return (
      <div className="flex flex-col flex-1 bg-[#dde4e6]">
        <main className="flex-1 flex-col bg-red text-[#000000] h-auto">
          <h1 className="text-3xl font-bold m-4">Welcome to the Store!</h1>
          <section >
            <ImageSlider/>
          </section>
          <FullBar heading={'Electronics'} />
          <FullBar heading={'House Appliances'}/>
          <Footer/>
        </main>
      </div>
  );
}