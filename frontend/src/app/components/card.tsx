import React from 'react';
type TourCardProps = {
  Productname: string;
  Productdescription: string;
  badgeText: string;
  imageUrl: string;
  button_text:string;

};

export default function Card({ Productname, Productdescription, badgeText, imageUrl ,button_text}: TourCardProps) {
  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow-sm cursor-pointer">
      <div>
        <img
          className="h-40 w-full rounded-t-lg object-cover"
          src={imageUrl} 
          alt={Productname}   
        />
      </div>

      <div className="p-4 ">
        <div className="mb-2 flex items-center flex-wrap justify-between">
          <p className="font-medium text-gray-900">{Productname}</p> 
          <span className="rounded-full bg-pink-100 px-2.5 py-0.5 text-xs font-semibold text-pink-800">
            {badgeText} 
          </span>
        </div>

          <p className="mb-4 text-sm text-gray-500 truncate">{Productdescription}</p>
        
        <button className="w-full rounded-lg bg-blue-100 py-2 px-4 font-semibold text-blue-700 hover:bg-blue-200">
          {button_text}
        </button>
      </div>
    </div>
  );
}