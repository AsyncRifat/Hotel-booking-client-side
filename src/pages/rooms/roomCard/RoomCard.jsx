import React from 'react';
import { FaStar } from 'react-icons/fa6';

const RoomCard = ({ room }) => {
  const { title, price, rating, location, available } = room;

  return (
    <>
      <div className="group relative rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:scale-100 h-[400px] dark:bg-gray-800">
        <img
          src={room?.photo?.photo1}
          alt={title}
          className="w-full h-60 object-cover"
        />

        <div className="text-xl font-semibold text-center text-gray-800 dark:text-white absolute inset-x-10 bottom-37 bg-white dark:bg-gray-800 rounded-t-3xl px-2 translate-y-full group-hover:translate-y-10 transition-all duration-500">
          <p className="montserrat mt-2 mb-1.5">{title}</p>
          <div className="flex justify-between items-center text-base mb-3">
            <p>
              <span className="font-medium text-base openSans">Price:</span>{' '}
              <span className="text-gray-500">$</span>
              <span className="font-medium text-amber-600">{price}</span>{' '}
              <span className="font-thin text-xs">Per Night</span>
            </p>
            <p className="flex justify-center items-center gap-2 openSans">
              <span className="font-medium text-sm openSans">Available:</span>
              <span className="font-medium text-green-600">{available}</span>
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-normal text-base openSans">{location}</p>
            <p className="flex justify-center items-center gap-2 openSans">
              <FaStar size={22} className="text-yellow-400" />
              {rating}
            </p>
          </div>
        </div>

        <div className="absolute inset-x-10 bottom-0 bg-white dark:bg-gray-800 rounded-t-3xl p-4 translate-y-full group-hover:-translate-y-5 transition-all duration-400">
          <div className="flex justify-center mt-3">
            <button className="px-5 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-800 transition hover:cursor-pointer">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomCard;
