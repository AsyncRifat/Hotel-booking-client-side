import React, { useContext } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { AuthContext } from '../../providers/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const AddRoom = () => {
  useDocumentTitle('Booking | Add Room');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddFrom = e => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const { photo1, photo2, rating, ...allData } = data;

    allData.rating = [parseInt(rating)];

    allData.photo = { photo1, photo2 };

    allData.amenities = allData.amenities.split(',').map(res => res.trim());

    // save the data in database
    axios
      .post(`${import.meta.env.VITE_API_URL}/add-room`, allData)
      .then(res => {
        if (res.data?.insertedId) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your Room has been submitted',
            showConfirmButton: false,
            timer: 1500,
            width: '300px',
          });
        }
        form.reset();
        navigate('/rooms');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="max-w-5xl mx-auto p-5 bg-white dark:bg-gray-800 rounded-xl shadow-lg my-10 montserrat">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white font-serif">
        Add New Room
      </h2>

      <form onSubmit={handleAddFrom} className="space-y-4">
        {/* Title */}
        <div className="md:flex items-center gap-3 w-full ">
          {/* Title */}
          <div className="flex-1">
            <label className="block mb-1 text-gray-600 font-medium">
              Room Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter room title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-amber-500"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-gray-600 font-medium">
              Location
            </label>
            <input
              type="text"
              name="location"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-amber-500"
              placeholder="Location"
              required
            />
          </div>
        </div>

        {/*  */}
        <div className="md:flex items-center gap-3 w-full">
          {/* Capacity */}
          <div className="flex-1">
            <label className="block mb-1 text-gray-600 font-medium">
              Capacity
            </label>
            <input
              type="number"
              name="capacity"
              placeholder="Number of Guests"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-amber-500"
              required
            />
          </div>

          {/* Bed Type */}
          <div className="flex-1">
            <label className="block mb-1 text-gray-600 font-medium">
              Bed Type
            </label>
            <select
              name="bedType"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-amber-500"
              required
            >
              <option>Single</option>
              <option>Double</option>
              <option>Queen</option>
              <option>King</option>
            </select>
          </div>
        </div>

        {/* Room Size */}
        <div className="md:flex items-center gap-3 w-full">
          <div className="flex-1">
            <label className="block mb-1 text-gray-600 font-medium">
              Room Size
            </label>
            <input
              type="number"
              name="roomSize"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-amber-500"
              placeholder="Room size sq. ft."
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-gray-600 font-medium">
              Price (per night)
            </label>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-amber-500"
              required
            />
          </div>
        </div>

        {/* Rating */}
        <div className="hidden">
          <label className="label dark:text-gray-50">Rating</label>
          <input
            type="number"
            name="rating"
            defaultValue={0}
            // value={0}
            className=" input w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-amber-500"
          />
        </div>

        {/* Image */}
        <div className="md:flex items-center gap-3 w-full">
          <div className="flex-1">
            <label className="block mb-1 text-gray-600 font-medium">
              Room Image URL - 1
            </label>
            <input
              type="url"
              name="photo1"
              placeholder="https://example.com/image.jpg"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-amber-500"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-gray-600 font-medium">
              Room Image URL - 2
            </label>
            <input
              type="url"
              name="photo2"
              placeholder="https://example.com/image.jpg"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-amber-500"
            />
          </div>
        </div>

        {/* Description */}
        <div className="md:flex items-center gap-3 w-full">
          <div className="flex-1">
            <label className="block mb-1 text-gray-600 font-medium">
              Description
            </label>
            <textarea
              name="description"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-amber-500"
              placeholder="Enter a description..."
              rows="4"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-gray-600 font-medium">
              Amenities Facilities
            </label>
            <textarea
              name="amenities"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-amber-500"
              placeholder="Enter a amenities..."
              rows="4"
              required
            />
          </div>
        </div>

        {/* HR related info */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
          <legend className="fieldset-legend">HR Related Info</legend>

          <div className="md:flex items-center md:gap-20 w-full">
            <div className="flex-1">
              <div>
                <label className="label">HR Name</label>
                <input
                  type="text"
                  name="hr_name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-amber-500 "
                  placeholder="HR Name"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="label">HR email</label>
              <input
                type="email"
                value={user.email}
                name="hr_email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-amber-500"
                placeholder="HR email"
              />
            </div>
          </div>
        </fieldset>

        {/* Available */}
        <div className="flex items-center gap-2">
          <input
            name="available"
            type="checkbox"
            id="available"
            className="accent-amber-500"
          />
          <label htmlFor="available" className="text-gray-700">
            Available
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-cyan-600 dark:bg-cyan-700 dark:text-black text-white py-2 rounded-lg font-semibold hover:bg-cyan-800 transition"
        >
          Add Room
        </button>
      </form>
    </div>
  );
};

export default AddRoom;
