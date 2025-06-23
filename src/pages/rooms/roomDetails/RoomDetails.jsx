import React from 'react';
import { Link, useLoaderData } from 'react-router';
import { MdDescription } from 'react-icons/md';
import { IoLocationOutline } from 'react-icons/io5';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { AiOutlineRollback } from 'react-icons/ai';
import { FaStar } from 'react-icons/fa6';

const RoomDetails = () => {
  useDocumentTitle('Room Details ');
  const singleRoomDetails = useLoaderData();

  const {
    title,
    _id,
    description,
    hr_name,
    hr_email,
    location,
    photo,
    bedType,
    roomSize,
    price,
    rating,
    amenities,
    available,
    capacity,
  } = singleRoomDetails;
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 my-5">
        <div className="md:col-span-8 border border-gray-300 dark:border-gray-600 rounded-2xl p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl md:text-4xl font-bold mb-2 openSans">
                {title}
              </p>
              <div className="flex items-center gap-x-3 text-lg font-light ">
                <p className="text-yellow-500">
                  <FaStar />
                </p>
                {rating}
              </div>
            </div>

            <Link to={`/jobApply/${_id}`}>
              <button className="btn bg-blue-500 hover:bg-blue-600 duration-700 ease-in-out hover:scale-105 transition-all text-white">
                Booking Now
              </button>
            </Link>
          </div>

          <hr className="mt-4 dark:text-gray-700 text-gray-200" />

          <div className="mt-4 px-3">
            <div className="carousel w-full">
              <div id="item1" className="carousel-item w-full">
                <img
                  src={photo.photo1}
                  alt={title}
                  className="h-[470px] w-full object-cover rounded-2xl"
                />
              </div>
              <div id="item2" className="carousel-item w-full">
                <img
                  src={photo.photo2}
                  alt={title}
                  className="h-[470px] w-full object-cover rounded-2xl"
                />
              </div>
            </div>
            <div className="flex w-full justify-center gap-2 py-2">
              <a href="#item1" className="btn btn-xs">
                1
              </a>
              <a href="#item2" className="btn btn-xs">
                2
              </a>
            </div>
          </div>

          <div className=" border my-5 mx-2.5 py-3 px-4 rounded-2xl dark:border-gray-600 border-gray-300">
            <h2 className="text-2xl font-semibold">Overview</h2>
            <hr className="m-3 dark:text-gray-700 text-gray-200" />
            <div className="grid grid-cols-1 md:grid-cols-8 px-3.5">
              <div className="mt-3 col-span-4">
                <p className="flex items-center gap-x-2 mb-6">
                  <span className=" flex items-center text-gray-500 gap-1.5">
                    Bed Type:
                  </span>
                  {bedType}
                </p>

                <p className="flex items-center gap-x-2 mb-4">
                  <span className=" flex items-center text-gray-500 gap-1.5">
                    Capacity:
                  </span>
                  {capacity}
                </p>

                <div className="">
                  <p className=" text-gray-500 gap-x-1.5">Amenities:</p>
                  <div className="pt-3">
                    {amenities.map((Facilities, index) => (
                      <span
                        key={index}
                        className="text-center mr-2 mb-2 font-light dark:bg-gray-600 text-sm badge badge-outline bg-gray-300"
                      >
                        {Facilities}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="justify-start col-span-4 mt-3">
                <p className="flex items-center gap-x-2 mb-6">
                  <span className=" flex items-center text-gray-500 gap-1.5">
                    Price:
                  </span>
                  ${price}{' '}
                  <span className="font-light text-xs">Every Night</span>
                </p>

                <p className="flex items-center gap-x-2 mb-6">
                  <span className=" flex items-center text-gray-500 gap-1.5">
                    Available:
                  </span>
                  <span className="uppercase font-semibold text-green-600">
                    {available}
                  </span>
                </p>

                <p className="flex items-center gap-x-2 mb-6">
                  <span className=" flex items-center text-gray-500 gap-1.5">
                    Room Size:
                  </span>
                  {roomSize} Square feet
                </p>
              </div>
            </div>
          </div>
          <div className=" px-3">
            <p className="flex items-center gap-2 font-semibold text-gray-400">
              <MdDescription /> Description:
            </p>
            <p>{description}</p>
          </div>
        </div>

        <div className="md:col-span-4 sticky top-21 h-fit">
          <div className="border  border-gray-300 dark:border-gray-600 rounded-2xl p-5">
            <p className="flex items-center gap-1.5 text-sm">
              <IoLocationOutline size={20} />
              Hotel address: {location}
            </p>

            <h2 className="font-semibold text-xl mt-7 mb-2">Contact:</h2>
            <h3>
              <span className="text-gray-400">Name:</span> {hr_name}
            </h3>
            <h3>
              <span className="text-gray-400">Email:</span> {hr_email}
            </h3>
          </div>

          <Link
            to="/rooms"
            className=" btn border border-gray-500 bg-base-100 hover:bg-gray-200  dark:hover:bg-gray-200 hover:text-black ml-3 mt-3 montserrat"
          >
            Rooms <AiOutlineRollback size={25} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default RoomDetails;
