import React from 'react';
import { FaStar } from 'react-icons/fa6';
import { IoLocationOutline } from 'react-icons/io5';

const MyPostedRoomCard = ({ postedRoom }) => {
  const { title, price, photo, location, rating } = postedRoom;
  return (
    <>
      <div className="card bg-base-100 dark:bg-gray-800 w-96 shadow-sm">
        <figure>
          <img src={photo?.photo1} alt={title} className="w-full h-[250px]" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {title}
            <p className="flex justify-center items-center gap-2 openSans">
              <FaStar size={22} className="text-yellow-400" />
              {rating}
            </p>
          </h2>
          <div className="flex justify-between">
            <p>
              <span className="font-medium text-base openSans">Price:</span>{' '}
              <span className="text-gray-500">$</span>
              <span className="font-medium text-amber-600">{price}</span>{' '}
              <span className="font-thin text-xs">Per Night</span>
            </p>
            <p className="flex items-center gap-1.5 text-sm">
              <IoLocationOutline size={20} />
              {location}
            </p>
          </div>
          <div className=" flex justify-around gap-x-2">
            <div className="border flex-1 text-center py-2 text-gray-400 hover:bg-red-400  dark:hover:text-black">
              <span className="text-black dark:text-white">Delete</span>
            </div>
            <div className="border flex-1 text-center py-2 text-gray-400 hover:bg-cyan-700 hover:text-white dark:hover:text-black">
              <span className="text-black dark:text-white">Update</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPostedRoomCard;
