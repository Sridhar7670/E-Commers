'use client'; 

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Using lucide-react for icons
import Link from 'next/link';

interface Slide {
  url: string;
  alt: string;
  href:string
}

const ImageSlider: React.FC = () => {
  const slides: Slide[] = [
    {
      url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=fill&w=2620&q=80',
      alt: 'Abstract tech background',
      href:'/Electronics'
    },
    {
    url:'https://images.unsplash.com/photo-1628843226223-989e20810393?q=80&w=2662&auto=format&fit=fill&w=2710&q=80',
    alt: 'Promotional banner for household items',
    href: '/household',
  },
    {
      url: 'https://media.istockphoto.com/id/1355320297/photo/elderly-woman-warming-up-on-bike-at-gym.jpg?s=2048x2048&w=is&k=20&c=7bxcyzwiqOnQwz3dbz5cBlaMN4N5cVu2CElwQDyYWQ0=&auto=format&fit=fill&w=2600&q=80',
      alt: 'Sports equipment',
      href: '/Sports'
    },
    {
      url: 'https://plus.unsplash.com/premium_photo-1706807135385-d75b929477ba?q=80&w=2340&auto=format&fit=fill',
      alt: 'MensFashion',
      href:'/Fashion'
    },
    {
      url: 'https://media.istockphoto.com/id/155596905/photo/high-class-female-clothing.jpg?s=2048x2048&w=is&k=20&c=T5QLP1urIUrwnakmVkp_upxy8SuKIZIsFc_tgzXWcUs=&auto=format&fit=fill&w=2000&q=180&h=130',
      alt: 'Womens Wear',
      href:"/Fashion"
    },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevSlide = (): void => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = (): void => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number): void => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 3000);
    return () => clearInterval(slideInterval);
  }, [currentIndex]);

  return (
    <div className='max-w-[1600px] h-[300px] sm:h-[15vh] md:h-[15vh] lg:h-[25vh] xl:h-[25vh] w-full  relative '>
      <Link href={slides[currentIndex].href}>
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          className='w-full h-full  bg-center bg-cover duration-500 cursor-pointer'
          aria-label={slides[currentIndex].alt}>
        </div>
      </Link>

      {/* Left Arrow */}
      <div className=' group-hover:block absolute top-[50%] -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer hover:bg-black/60 transition-colors'>
        <ChevronLeft onClick={prevSlide} size={30} />
      </div>

      {/* Right Arrow */}
      <div className=' group-hover:block absolute top-[50%] -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer hover:bg-black/60 transition-colors'>
        <ChevronRight onClick={nextSlide} size={30} />
      </div>

      {/* Navigation Dots */}
      <div className='absolute bottom-1 left-1/2 -translate-x-1/2 flex justify-center py-2'>
        {slides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className='text-2xl cursor-pointer mx-1 transition-transform duration-300 transform hover:scale-125'
            aria-label={`Go to slide ${slideIndex + 1}`}
          >
            <span className={currentIndex === slideIndex ? 'text-white' : 'text-gray-400/70'}>
              ●
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;