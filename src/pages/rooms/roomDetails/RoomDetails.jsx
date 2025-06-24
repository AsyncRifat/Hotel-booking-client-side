import React, { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router';
import { MdDescription } from 'react-icons/md';
import { IoLocationOutline } from 'react-icons/io5';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { AiOutlineRollback } from 'react-icons/ai';
import { FaStar } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../providers/AuthContext';

const RoomDetails = () => {
  useDocumentTitle('Room Details');
  const singleRoomDetails = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

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

  // console.log(_id);

  const [confirmOrder, setConfirmOrder] = useState(false);

  // for already booking check
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/orders?id=${_id}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setSameId(data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [_id]);

  const [sameId, setSameId] = useState([]);
  const [rooId, setRooId] = useState('');

  useEffect(() => {
    sameId.map(roomId => setRooId(roomId));
  }, [sameId]);

  // console.log(rooId?.roomId);

  const [startedDate, setStatedDate] = useState('');
  const [endedDate, setEndedDate] = useState('');
  const handleConfirm = e => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;

    if (hr_email === email) {
      toast.warn('What!! is Yours');
      return;
    }

    if (rooId?.roomId === _id) {
      toast.warn('You already booking & check your booking page');
      return;
    }

    if (!startedDate || !name || !email || !endedDate) {
      toast.warn('Please fill-up all information!');
      return;
    }
    if (!available) {
      toast.warn('Sorry sir! Room not available now');
      return;
    }

    const orderData = {
      roomId: _id,
      title,
      description,
      price,
      name: name,
      email: email,
      statedDate: startedDate,
      EndedDate: endedDate,
      photo: photo.photo1,
    };

    console.log(orderData);

    axios
      .post(`${import.meta.env.VITE_API_URL}/order`, orderData)
      .then(res => {
        if (res.data?.insertedId) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your Booking has been submitted',
            showConfirmButton: false,
            timer: 1500,
            width: '300px',
          });
        }
        e.target.reset();
        navigate('/my-booking');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 my-5">
        {confirmOrder && (
          <div className="fixed inset-0 bg-black/5 backdrop-blur-xs z-10"></div>
        )}
        <div className="relative md:col-span-8 border border-gray-300 dark:border-gray-600 rounded-2xl p-5">
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

            <Link onClick={() => setConfirmOrder(true)}>
              <button className=" btn bg-blue-500 hover:bg-blue-600 duration-700 ease-in-out hover:scale-105 transition-all text-white">
                Booking Now
              </button>
            </Link>
          </div>

          {confirmOrder && (
            <div className="absolute top-10 right-0 md:w-[450px] bg-base-100 dark:bg-gray-800 border border-blue-300 dark:border-gray-600 shadow-xl rounded-xl p-5 z-20">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                  {title}
                </h2>
                <button
                  onClick={() => setConfirmOrder(false)}
                  className="text-red-500 text-xl font-bold"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-800 dark:text-white text-sm">
                {description}
              </p>
              <img
                src={photo.photo1}
                alt=""
                className="w-full h-[200px] object-cover rounded-xl my-4"
              />
              <p className=" gap-x-2 mb-3">
                <span className=" text-gray-500 gap-1.5">Price:</span>${price}{' '}
                <span className="font-light text-xs">Every Night</span>
              </p>

              <form onSubmit={handleConfirm}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={user?.displayName}
                    placeholder="Enter Your Name"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={user?.email}
                    placeholder="Email"
                    className="input input-bordered w-full"
                    readOnly
                  />
                </div>

                <div className="flex w-full gap-x-3">
                  <div className="flex-1 mb-4 ">
                    <label
                      htmlFor="date"
                      className="text-gray-600 dark:text-gray-400 block mb-1"
                    >
                      Start Date:
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={startedDate}
                      onChange={e => setStatedDate(e.target.value)}
                      className="w-full border border-gray-400 rounded px-3 py-2"
                    />
                  </div>
                  <div className="flex-1 mb-4">
                    <label
                      htmlFor="date"
                      className="text-gray-600 dark:text-gray-400 block mb-1"
                    >
                      End Date:
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={endedDate}
                      onChange={e => setEndedDate(e.target.value)}
                      className="w-full border border-gray-400 rounded px-3 py-2"
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-success mt-5">
                  Confirm Booking
                </button>
              </form>
            </div>
          )}

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
                <p className=" gap-x-2 mb-6">
                  <span className="  text-gray-500 gap-1.5">Bed Type: </span>
                  {bedType}
                </p>

                <p className=" gap-x-2 mb-4">
                  <span className=" text-gray-500 gap-1.5">Capacity: </span>
                  {capacity}
                </p>

                <div className="">
                  <p className=" text-gray-500 gap-x-1.5">Amenities: </p>
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
                <p className=" gap-x-2 mb-6">
                  <span className=" text-gray-500 gap-1.5">Price: </span>$
                  {price}{' '}
                  <span className="font-light text-xs">Every Night</span>
                </p>

                <p className=" gap-x-2 mb-6">
                  <span className=" text-gray-500 gap-1.5">Available: </span>
                  <span className="uppercase font-semibold text-green-600">
                    {available}
                  </span>
                </p>

                <p className="gap-x-2 mb-6">
                  <span className=" text-gray-500 gap-1.5">Room Size: </span>
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
