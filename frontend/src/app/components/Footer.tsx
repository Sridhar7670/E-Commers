import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#253D61] text-[12px] text-white p-4 ">
      <div className="container mx-auto flex justify-between items-center">
        
         <p className="font-bold text-lg">Sridhar Reddy</p>
        <div className="flex items-center px-3 flex-col gap-1">
          <div className="flex space-x-4 text-sm">
            <a href="https://sridhars-portfolio.netlify.app/" className="hover:text-blue-400">Portfolio</a>
            <a href="https://www.linkedin.com/in/sridhar-reddy-37b63a203/" className="hover:text-blue-400">LinkedIn</a>
            <a href="https://github.com/Sridhar7670" className="hover:text-blue-400">GitHub</a>
            <a href="https://www.instagram.com/sridhar.rdy/" className="hover:text-blue-400">Instagram</a>
          </div>
          <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} E-Commers. All Rights Reserved.
        </p>
        </div>

      </div>
    </footer>
  );
}