import Card from "./card";
import { HorizontalScroller } from "./HoizontalScroller";

const tourData = [
  {
    id: 1,
    Productname: 'Norway Fjord Adventures',
    Productdescription: 'Explore the magical fjord landscapes with tours and activities on and around the fjords of Norway.',
    badgeText: 'On Sale',
    badgeColor: 'pink',
    imageUrl: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png',
    button_text: 'Add to cart'
  },
  {
    id: 2,
    Productname: 'Swiss Alps Hiking',
    Productdescription: 'Discover breathtaking mountain views and serene alpine lakes on a guided hiking tour.',
    badgeText: 'New',
    badgeColor: 'green',
    imageUrl: 'https://images.unsplash.com/photo-1592229233128-948a31518b39?w=800',
    button_text: '50% off'

  },
  {
    id: 3,
    Productname: 'Kyoto Temple Tour',
    Productdescription: 'Immerse yourself in the tranquility and history of Kyotos most beautiful temples and gardens.',
    badgeText: 'Bestseller',
    badgeColor: 'yellow',
    imageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800',
    button_text: '10% off'
  },
  {
    id: 4, 
    Productname: 'Roman Colosseum Visit',
    Productdescription: 'Step back in time and explore the iconic amphitheater of ancient Rome.',
    badgeText: 'Popular',
    badgeColor: 'blue',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
    button_text: '10% off'
  },
  {
    id: 5, 
    Productname: 'Santorini Sunset Cruise',
    Productdescription: 'Witness the world-famous sunset of Santorini from the deck of a beautiful catamaran.',
    badgeText: 'Romantic',
    badgeColor: 'purple',
    imageUrl: 'https://images.unsplash.com/photo-1570158223432-53b53a583161?w=800',
    button_text: '10% off'
  },
  {
    id: 6, 
    Productname: 'Serengeti Safari',
    Productdescription: 'Experience the thrill of a lifetime on a wildlife safari through the plains of the Serengeti.',
    badgeText: 'Adventure',
    badgeColor: 'orange',
    imageUrl: 'https://images.unsplash.com/photo-1534542224130-9743c01f80d1?w=800',
    button_text: '10% off'
  },
  {
    id: 7, 
    Productname: 'Great Wall of China Hike',
    Productdescription: 'Hike along one of the most magnificent wonders of the world for unforgettable views.',
    badgeText: 'Challenging',
    badgeColor: 'red',
    imageUrl: 'https://images.unsplash.com/photo-1508804185883-c59b2a1a2b16?w=800',
    button_text: '10% off'
  },
  {
    id: 8, 
    Productname: 'Machu Picchu Expedition',
    Productdescription: 'Discover the ancient Inca citadel high in the Andes Mountains of Peru.',
    badgeText: 'Historic',
    badgeColor: 'teal',
    imageUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800',
    button_text: '10% off'

  }
];

type FullBarProps={
    heading:string
}
export default function FullBar({heading}:FullBarProps) {
  return (
    <>
    <HorizontalScroller>
        <div className="shadow-md">
            <h2 className="bg-[#F9FAFB] text-start px-10 pt-4 text-[1.5rem]">{heading}</h2>
            <div className="flex whitespace-nowrap gap-6 p-8 pt-4 bg-[#F9FAFB] ">
        {tourData.map((tour) => (
          <Card
            key={tour.id}
            Productname={tour.Productname}
            Productdescription={tour.Productdescription}
            badgeText={tour.badgeText}
            imageUrl={tour.imageUrl}
            button_text={tour.button_text}
          />
        ))}
      </div>
        </div>
    </HorizontalScroller>
    </>
  );
}