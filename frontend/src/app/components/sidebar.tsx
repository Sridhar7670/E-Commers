"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { useAuth } from '../context/AuthContext';

const navImagePaths = [
  { name: 'Home', path: '/images/house.svg', href: '/' },
  { name: 'Electronics', path: '/images/plug.svg', href: '/Electronics' },
  { name: 'Home & Kitchen', path: '/images/chef-hat.svg', href: '/household' },
  { name: 'Fashion', path: '/images/handbag.svg', href: '/Fashion' },
  {name:'Sports',path:'/images/dumbbell.svg',href:'/Sports'},
  {name:'Mens Wear',path:'/images/shirt.svg',href:'/MensWear'},
  {name:'Womens Wear',path:'/images/dumbbell.svg',href:'/WomensWear'},
  { name: 'Cart', path: '/images/shopping-cart.svg', href: '/Cart' },
  { name: 'Favourite', path: '/images/heart-plus.svg', href: '/Favourite' },
  { name: 'Settings', path: '/images/settings.svg', href: '/settings' },
];
interface UserPayload {
  name: string;
  id: number;
  email: string;
}
const Sidebar = () => {
  const {user}=useAuth()

const pathname = usePathname();

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <aside className="w-56 h-screen bg-[#253D61] text-white flex flex-col flex-shrink-0 ">
      
      <Link href='/'>

      <div className="w-auto flex !pl-6 !pt-6 pt-[14px] pb-6 fixed z-50 bg-[#253D61] font-normal border-opacity-50" >
                <span style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontStyle: 'normal', fontSize: '34px',lineHeight: '100%',letterSpacing: '0%',opacity: 1, userSelect: 'none',color:'#D0E6FA'}}>
                 E-Com
                </span>
      </div>
      </Link>

      <nav className="flex-grow overflow-y-auto text-[#D0E6FA] mt-18 w-auto">
        <ul className='w-auto py-2'>
          {navImagePaths.map((item) => {
            const isActive = pathname === item.href;
            const isHovered = item.name === hoveredItem;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`flex items-center gap-3 w-full px-6 py-3 my-1 transition-colors font-space-grotesk text-[18px] text-left
                    ${isActive ? 'bg-[rgba(173,206,235,0.3)] font-medium' : 'font-normal'}
                    ${!isActive && isHovered ? 'bg-[rgba(173,206,235,0.1)]' : ''}`}
                >
                  <Image src={item.path} alt={`${item.name} icon`} width={24} height={24}/>
                  <span className="truncate">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sticky bottom-0 z-10 flex items-center gap-3 p-4 bg-[#253D61] border-t border-[#B5D3EF]/50">
        <Image src={'/images/Mask group.png'} alt={`${user?.name||"User"}'s profile picture`} width={40} height={40} className="rounded-full object-cover" />
        <span className="flex-grow truncate text-white font-space-grotesk">{user?.name|| "User"}</span>
        <Image src={'/images/arrow-circle-down.png'} alt="options arrow" width={24} height={24} />
      </div>
    </aside>
  );
};

export default Sidebar;