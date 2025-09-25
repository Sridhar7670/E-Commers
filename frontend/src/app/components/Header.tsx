"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';


const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

export default function Header() {

  const isLoggedIn = false; 
  const placeholders = [
    "Search for Laptops...",
    "Find new Headphones...",
    "Look for Summer Dresses...",
    "Search for Kitchen Appliances...",
    "Find the latest Smartphones..."
  ];
  const [currentPlaceholder, setCurrentPlaceholder] = useState('');
  const [index, setIndex] = useState(0);

    useEffect(() => {
    const typingSpeed = 100;
    const pauseAfterTyping = 1500; 
    
    let isMounted = true;
    let charIndex = 0;
    
    const typeText = () => {
      if (!isMounted) return;
      
      const currentText = placeholders[index];
      

      if (charIndex === 0 && currentPlaceholder.length > 0) {
         setCurrentPlaceholder('');
      }
      
      if (charIndex <= currentText.length) {
        setCurrentPlaceholder(currentText.slice(0, charIndex));
        charIndex++;
        
        if (charIndex <= currentText.length) {
          setTimeout(typeText, typingSpeed);
        } else {

          setTimeout(() => {
            if (isMounted) {
              setIndex((prev) => (prev + 1) % placeholders.length);
            }
          }, pauseAfterTyping);
        }
      }
    };
    
    typeText();
    

    return () => {
      isMounted = false;
    };
  }, [index]); 
  return (
    <header className="bg-[#253D61] border-[#B5D3EF]/50 p-5 shadow-md  flex justify-between items-center border-b border-[#B5D3EF]/50 ">
      <div className="relative flex-1 max-w-xl">
        <input
          type="text"
          placeholder={currentPlaceholder}
          className="w-full py-2 pl-10 pr-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon />
        </div>
      </div>

      {/* Login/Logout Buttons */}
      <div className="flex items-center space-x-4 ml-4">
                 <Link href="/cart">
                  <button className="flex items-center gap-2 text-white px-4 py-2 rounded-md bg-[#ADCEEB]/50 hover:bg-[#FA5F1A]/80">
                    <Image src='/images/shopping-cart.svg' alt={`cart icon`} width={24} height={24} />
                    <span>Cart</span>
                  </button>
                </Link>
        {isLoggedIn ? (
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            Logout
          </button>
        ) : (
            <div className='flex gap-3'> 
                <Link href="/login">
                    <button className="bg-[#ADCEEB]/50 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        Login
                    </button>
                </Link>
                <Link href="/login">
                    <button className="bg-[#ADCEEB]/50 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        Signup
                    </button>
                </Link>
                
          </div>
         
        )}
      </div>
    </header>
  );
}