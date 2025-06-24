import React from 'react';

const BookingCard = ({ singleBooking }) => {
  const { title, photo, price, statedDate, EndedDate } = singleBooking;
  // console.log(photo);
  console.log(singleBooking);
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
            <button className="btn btn-outline btn-error">Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingCard;
