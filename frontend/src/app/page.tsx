import FullBar from "./components/FullBar";
import ImageSlider,{Slide} from "./components/ImageSlider";

export default function Home() {
  const slidesData: Slide[] = [
    {
      url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=fill&w=2620&q=80',
      alt: 'Abstract tech background',
      href: '/Electronics',
    },
    {
      url: 'https://images.unsplash.com/photo-1628843226223-989e20810393?q=80&w=2662&auto=format&fit=fill&w=2710&q=80',
      alt: 'Promotional banner for household items',
      href: '/household',
    },
    {
      url: 'https://media.istockphoto.com/id/1355320297/photo/elderly-woman-warming-up-on-bike-at-gym.jpg?s=2048x2048&w=is&k=20&c=7bxcyzwiqOnQwz3dbz5cBlaMN4N5cVu2CElwQDyYWQ0=&auto=format&fit=fill&w=2600&q=80',
      alt: 'Sports equipment',
      href: '/Sports',
    },
    {
      url: 'https://plus.unsplash.com/premium_photo-1706807135385-d75b929477ba?q=80&w=2340&auto=format&fit=fill',
      alt: 'MensFashion',
      href: '/Fashion',
    },
    {
      url: 'https://media.istockphoto.com/id/155596905/photo/high-class-female-clothing.jpg?s=2048x2048&w=is&k=20&c=T5QLP1urIUrwnakmVkp_upxy8SuKIZIsFc_tgzXWcUs=&auto=format&fit=fill&w=2000&q=180&h=130',
      alt: 'Womens Wear',
      href: '/Fashion',
    },
  ];
  return (
      <div className="flex flex-col flex-1 bg-[#dde4e6]">
        <main className="flex-1 flex-col bg-red text-[#000000] h-auto">
          <h1 className="text-3xl font-bold m-4">Welcome to the Store!</h1>
          <section >
            <ImageSlider slides={slidesData}/>
          </section>
          <FullBar heading={'Electronics'} Url={"electronics"}/>
          <FullBar heading={'House Appliances'} Url={"home decor"}/>
          <FullBar heading={'Fashion'} Url={"clothing"}/>
          <FullBar heading={'Mens Wear'} Url={"mens wear"}/>
          <FullBar heading={'Womens Wear'} Url={"womens wear"}/>
          <FullBar heading={'Beauty Products'} Url={"beauty products"}/>
          <FullBar heading={'Sports Equipment'} Url={"sports equipment"}/>
        </main>
      </div>
  );
}