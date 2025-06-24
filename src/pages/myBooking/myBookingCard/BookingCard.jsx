import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const BookingCard = ({ singleBooking }) => {
  const [myBooking, setMyBooking] = useState(null);

  // console.log(_id);
  // console.log(photo);

  // console.log(singleBooking);

  useEffect(() => {
    if (singleBooking) {
      setMyBooking(singleBooking);
    }
  }, [singleBooking]);

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/booking-delete/${id}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount) {
              Swal.fire({
                title: 'Deleted!',
                text: 'Your Room has been deleted.',
                icon: 'success',
              });
              setMyBooking(null);
            }
          });
      }
    });
  };
  if (!myBooking) return null;
  const { title, photo, price, statedDate, EndedDate, _id } = myBooking;

  return (
    <>
      <div className="card card-side bg-base-100 dark:bg-gray-800 shadow-md">
        <figure>
          <img
            src={photo}
            alt={title}
            className="h-[220px] w-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <h2 className="">
            <span className="font-medium text-base openSans">Start:</span>{' '}
            <span className="text-gray-500">{statedDate}</span>
          </h2>
          <h2 className="">
            <span className="font-medium text-base openSans">End:</span>{' '}
            <span className="text-gray-500">{EndedDate}</span>
          </h2>
          <p>
            <span className="font-medium text-base openSans">Price:</span>{' '}
            <span className="text-gray-500">$</span>
            <span className="font-medium text-amber-600">{price}</span>{' '}
            <span className="font-thin text-xs">Per Night</span>
          </p>

          <div className="card-actions justify-end">
            <button className="btn btn-info">Review</button>
            <button
              onClick={() => handleDelete(_id)}
              className="btn btn-outline btn-error"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingCard;
