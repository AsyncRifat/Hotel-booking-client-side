import React, { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthContext';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const AddHotelsForm = () => {
  useDocumentTitle('NOUVS | Add Hotel');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hotelName: '',
    location: '',
    description: '',
    amenities: [],
    hr_name: user?.displayName,
    hr_email: user?.email,
    available: true,
    rating: '0',
    photo: {
      banner: '',
      indoor: '',
      outdoor: '',
      spa: '',
      relax: '',
      restaurant: '',
      gym: '',
      others: '',
    },
    features: {
      spa: '',
      relax: '',
      restaurant: '',
      GYM: '',
    },
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;

    // amenities checkbox handling
    if (type === 'checkbox' && name === 'amenities') {
      setFormData(prev => ({
        ...prev,
        amenities: checked
          ? [...prev.amenities, value]
          : prev.amenities.filter(item => item !== value),
      }));
    }
    // boolean field
    else if (type === 'checkbox' && name === 'available') {
      setFormData(prev => ({ ...prev, available: checked }));
    }
    // General fields
    else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formData);

    // save the data in database
    axios
      .post(`${import.meta.env.VITE_API_URL}/add-hotel`, formData)
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
        navigate('/rooms');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-teal-50 dark:bg-[#0e1417] rounded-xl shadow-md my-7">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white font-serif">
        Add New Hotel
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="hotelName"
            placeholder="Hotel Name"
            value={formData.hotelName}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="textarea textarea-bordered w-full"
        />

        {/* Amenities */}
        <div>
          <label className="font-semibold block mb-2">Amenities</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              'Ski',
              'AC',
              'TV',
              'Wi-Fi',
              'Mini Bar',
              'Spa',
              'Pool',
              'Restaurant',
              'Shuttle',
              'Gym',
              'Conference',
              'Parking',
              'Laundry',
              'Elevator',
              'Garden',
              'CCTV security',
              'Coffee Shop',
              'Kids club',
            ].map(item => (
              <label key={item} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="amenities"
                  value={item}
                  checked={formData.amenities.includes(item)}
                  onChange={handleChange}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* HR Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="hr_name"
            placeholder="HR Name"
            value={user.displayName}
            readOnly
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="email"
            name="hr_email"
            placeholder="HR Email"
            value={user.email}
            readOnly
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        {/* Availability */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
          />
          Available
        </label>

        {/* Photos */}
        <div>
          <label className="font-semibold block mb-2">
            Photos (URLs){' '}
            <span className="text-xs text-gray-400 dark:text-gray-500">
              *6 photo basic needed
            </span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {Object.keys(formData.photo).map(key => (
              <input
                key={key}
                type="text"
                name={key}
                placeholder={`Photo URL (${key})`}
                value={formData.photo[key]}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    photo: { ...prev.photo, [key]: e.target.value },
                  }))
                }
                className="input input-bordered w-full"
              />
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <label className="font-semibold block mb-2">Features</label>
          <textarea
            type="text"
            placeholder="Spa"
            value={formData.features.spa}
            onChange={e =>
              setFormData(prev => ({
                ...prev,
                features: { ...prev.features, spa: e.target.value },
              }))
            }
            rows="3"
            className="textarea textarea-bordered w-full mb-2"
          />
          <textarea
            type="text"
            placeholder="Relax"
            value={formData.features.relax}
            onChange={e =>
              setFormData(prev => ({
                ...prev,
                features: { ...prev.features, relax: e.target.value },
              }))
            }
            rows="3"
            className="textarea textarea-bordered w-full mb-2"
          />
          <textarea
            type="text"
            placeholder="Restaurant"
            value={formData.features.restaurant}
            onChange={e =>
              setFormData(prev => ({
                ...prev,
                features: { ...prev.features, restaurant: e.target.value },
              }))
            }
            rows="3"
            className="textarea textarea-bordered w-full mb-2"
          />
          <textarea
            type="text"
            placeholder="GYM"
            value={formData.features.GYM}
            onChange={e =>
              setFormData(prev => ({
                ...prev,
                features: { ...prev.features, GYM: e.target.value },
              }))
            }
            rows="3"
            className="textarea textarea-bordered w-full"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn bg-blue-500 hover:bg-blue-600 w-full md:w-auto px-6"
        >
          Add Hotel
        </button>
      </form>
    </div>
  );
};

export default AddHotelsForm;
