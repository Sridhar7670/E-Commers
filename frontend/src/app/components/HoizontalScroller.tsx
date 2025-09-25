
'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';

// You can use any icons you like. Here are some simple SVG icons.
const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);


export function HorizontalScroller({ children }: { children: React.ReactNode }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // A memoized function to check and update arrow visibility
  const checkArrows = useCallback(() => {
    const el = scrollContainerRef.current;
    if (el) {
      // Check if there is content overflowing to the left
      const isScrolledToLeft = el.scrollLeft > 0;
      setShowLeftArrow(isScrolledToLeft);

      // Check if there is content overflowing to the right
      // The 1px tolerance is to account for sub-pixel rendering inconsistencies
      const isScrolledToRight = el.scrollWidth - el.scrollLeft - el.clientWidth > 1;
      setShowRightArrow(isScrolledToRight);
    }
  }, []); // Empty dependency array means this function is created only once

  // useEffect to add event listeners and perform initial check
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      // Initial check on mount
      checkArrows();
      // Add event listeners
      el.addEventListener('scroll', checkArrows);
      window.addEventListener('resize', checkArrows);
    }
    // Cleanup function to remove event listeners
    return () => {
      if (el) {
        el.removeEventListener('scroll', checkArrows);
        window.removeEventListener('resize', checkArrows);
      }
    };
  }, [checkArrows]); // Re-run effect if checkArrows function changes

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (el) {
      const scrollAmount = el.clientWidth * 0.8; // Scroll by 80% of the visible width
      el.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative group"> {/* Use group for hover effects on arrows if desired */}
      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute top-1/2 -translate-y-1/2 left-0 z-10 p-2 bg-white/70 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-300"
        >
          <ChevronLeftIcon />
        </button>
      )}

      {/* The Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scroll-smooth
                   [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" // Hides scrollbar
      >
        {children}
      </div>

      {/* Right Arrow */}
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute top-1/2 -translate-y-1/2 right-0 z-10 p-2 bg-white/70 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-300"
        >
          <ChevronRightIcon />
        </button>
      )}
    </div>
  );
}