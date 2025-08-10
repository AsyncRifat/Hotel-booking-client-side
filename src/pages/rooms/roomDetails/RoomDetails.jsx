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
    // bedType,
    // roomSize,
    price,
    rating,
    amenities,
    available,
    // capacity,
  } = singleRoomDetails;
  // console.log(amenities);

  if (
    amenities.some(item =>
      item
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes('TVc'.toLowerCase().replace(/\s+/g, ''))
    )
  ) {
    console.log('Yes');
  } else {
    console.log('No');
  }

  const [confirmOrder, setConfirmOrder] = useState(false);

  // review section :
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [review, setReview] = useState([]);

  const handleReview = id => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/customer-review/${id}`)
      .then(res => {
        // console.log(res?.data);
        setReview(res?.data);
        setIsModalOpen(true);
      })
      .catch(err => {
        console.error(err);
      });
  };

  // for already booking check
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/details-room?id=${_id}`)
      .then(res => res.json())
      .then(data => {
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
      toast.warn('Already booking');
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

    // console.log(orderData);

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
        <div className="relative md:col-span-8 border border-gray-300 dark:border-gray-600 rounded-2xl p-3 md:p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl md:text-4xl font-bold mb-2 openSans">
                {title}
              </p>

              <button
                onClick={() => handleReview(_id)}
                className="flex items-center gap-2 rounded-full bg-white border border-gray-300 px-3 py-1.5 text-gray-700 shadow-sm transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <span className="hidden sm:inline text-sm font-medium">
                  See Review
                </span>
                <span className="flex items-center gap-1 text-yellow-500">
                  <FaStar className="text-base sm:text-lg" />
                  <span className="text-sm font-semibold">{rating.length}</span>
                </span>
              </button>

              {/* review modal */}
              {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-xs bg-opacity-90 flex justify-center items-center z-50 p-5">
                  <div className=" rounded-lg shadow-lg p-6 w-[90%] max-w-xl relative bg-[#f5fdfd] dark:bg-[#0f1919]">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="absolute top-1 right-3 text-gray-500 hover:text-red-500 text-xl"
                    >
                      ✕
                    </button>
                    <h2 className="text-2xl font-semibold mb-4">
                      Customer Reviews
                    </h2>

                    {review.length > 0 ? (
                      review.map((item, index) => (
                        <div
                          key={index}
                          className="border-b border-gray-200 py-2 mb-2"
                        >
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-yellow-500 flex items-center gap-1">
                            {item.star} <FaStar />
                          </p>
                          <p>{item.review}</p>
                        </div>
                      ))
                    ) : (
                      <p>No reviews</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <button
              className={` btn mt-8 md:mt-0 bg-blue-500 hover:bg-blue-600 duration-700 ease-in-out hover:scale-105 transition-all text-white ${
                !available && 'cursor-not-allowed'
              }`}
              disabled={!user || !available}
              onClick={() => setConfirmOrder(true)}
            >
              Booking Now
            </button>
          </div>

          {/* booking modal */}
          {confirmOrder && (
            <div className="absolute top-10 right-0 w-auto md:w-[450px] bg-[#f5fdfd] dark:bg-[#0f1919] border border-blue-300 dark:border-gray-600 shadow-xl rounded-xl p-5 z-20">
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

                <div className="flex flex-col md:flex-row w-full gap-x-3">
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
            {/* carousel */}
            <div className="carousel w-full">
              <div id="item1" className="carousel-item w-full">
                <img
                  src={photo.photo1}
                  alt={title}
                  className="h-[270px] md:h-[470px] w-full object-cover rounded-2xl"
                />
              </div>
              <div id="item2" className="carousel-item w-full">
                <img
                  src={photo.photo2}
                  alt={title}
                  className="h-[270px] md:h-[470px] w-full object-cover rounded-2xl"
                />
              </div>
              <div id="item3" className="carousel-item w-full">
                <img
                  src={photo.photo4}
                  alt={title}
                  className="h-[270px] md:h-[470px] w-full object-cover rounded-2xl"
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
              <a href="#item3" className="btn btn-xs">
                3
              </a>
            </div>
          </div>
          {/*  {amenities.some(item =>
            item
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes('relax'.toLowerCase().replace(/\s+/g, ''))
          ) && (
            
          )} */}

          {/* spa */}
          {amenities.some(item =>
            item
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes('spa'.toLowerCase().replace(/\s+/g, ''))
          ) && (
            <div className="mt-10 px-3">
              <div className="text-center">
                <h2 className="text-5xl mb-3 jost font-extrabold">
                  A World of Spa
                </h2>
                <p className="text-gray-700 dark:text-gray-200 jost mx-24 mb-12">
                  Nestled within the heart of our hotel, our spa is a sanctuary
                  of relaxation and rejuvenation, dedicated to enhancing your
                  well-being and restoring your inner balance.
                </p>
              </div>
              <img
                src={photo.photo5}
                alt={title}
                className=" h-[270px] md:h-[370px] w-full object-cover"
              />
            </div>
          )}

          {/* relax */}
          {amenities.some(item =>
            item
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes('Shuttle'.toLowerCase().replace(/\s+/g, ''))
          ) && (
            <div className="mt-32 px-3 grid grid-cols-9 gap-10">
              <div className=" col-span-4 place-content-center text-center">
                <h2 className="text-4xl mb-5 jost font-extrabold tracking-widest">
                  Relax
                </h2>
                <p className="text-left text-gray-700 dark:text-gray-200 jost">
                  Unwind in serene comfort with our spa, heated pools, and cozy
                  lounges. Experience pure tranquility surrounded by
                  breathtaking winter landscapes.
                </p>
              </div>
              <img
                src={photo.photo3}
                alt={title}
                className="col-span-5 h-[270px] md:h-[470px] w-full object-cover"
              />
            </div>
          )}

          {/* restaurant */}
          {amenities.some(item =>
            item
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes('Restaurant'.toLowerCase().replace(/\s+/g, ''))
          ) && (
            <div className="mt-32 mb-24 px-3 grid grid-cols-9 gap-10">
              <img
                src={photo.photo6}
                alt={title}
                className="col-span-5 h-[270px] md:h-[470px] w-full object-cover"
              />
              <div className=" col-span-4 place-content-center text-center">
                <h2 className="text-4xl mb-5 jost font-extrabold tracking-widest">
                  Restaurant
                </h2>
                <p className="text-left text-gray-700 dark:text-gray-200 jost">
                  Executive Chef, showcases their expertise and passion for fine
                  dining by using the finest, locally sourced ingredients
                </p>
              </div>
            </div>
          )}

          {/* Overview */}
          <div className=" border my-5 mx-2.5 py-3 px-4 rounded-2xl dark:border-gray-600 border-gray-300">
            <h2 className="text-2xl font-semibold">Overview</h2>
            <hr className="m-3 dark:text-gray-700 text-gray-200" />
            <div className="grid grid-cols-1 md:grid-cols-8 px-3.5">
              <div className="mt-3 col-span-4">
                <div>
                  <p className=" text-gray-500 gap-x-1.5">Amenities: </p>
                  <div className="pt-3">
                    {amenities.map((Facilities, index) => (
                      <span
                        key={index}
                        className="text-center mr-2 mb-2 font-light text-sm badge badge-soft"
                      >
                        {Facilities}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="justify-start col-span-4 mt-3">
                <p className=" gap-x-2 mb-6">
                  <span className=" text-gray-500 gap-1.5">Available: </span>
                  <span
                    className={`uppercase font-semibold text-green-600 ${
                      available ? 'text-green-600' : 'text-red-400'
                    }`}
                  >
                    {available ? 'Vacant' : 'Not Vacant'}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className=" px-3">
            <p className="flex items-center gap-2 font-semibold text-gray-400">
              <MdDescription /> Description:
            </p>
            <p>{description}</p>
          </div>
        </div>

        {/* short side */}
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

            {isModalOpen && (
              <div className="fixed inset-0 bg-black/40 backdrop-blur-xs bg-opacity-90 flex justify-center items-center z-50 p-5">
                <div className=" rounded-lg shadow-lg p-6 w-[90%] max-w-xl relative bg-[#f5fdfd] dark:bg-[#0f1919]">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-1 right-3 text-gray-500 hover:text-red-500 text-xl"
                  >
                    ✕
                  </button>
                  <h2 className="text-2xl font-semibold mb-4">
                    Customer Reviews
                  </h2>

                  {review.length > 0 ? (
                    review.map((item, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-200 py-2 mb-2"
                      >
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-yellow-500 flex items-center gap-1">
                          {item.star} <FaStar />
                        </p>
                        <p>{item.review}</p>
                      </div>
                    ))
                  ) : (
                    <p>No reviews</p>
                  )}
                </div>
              </div>
            )}
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
