import React, { useContext, useEffect, useState } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { AuthContext } from '../../providers/AuthContext';
import BookingCard from './myBookingCard/BookingCard';
import EmptyPage from '../../components/emptyPage/EmptyPage';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyBooking = () => {
  useDocumentTitle('My Booking');
  const { user } = useContext(AuthContext);
  const [booking, setBooking] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure(`/orders?email=${user?.email}`)
        .then(data => {
          // console.log(data);
          setBooking(data?.data);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [user, axiosSecure]);

  if (booking.length < 1) return <EmptyPage />;

  return (
    <div>
      <h1 className="text-3xl mb-2 text-center font-bold font-serif">
        Your Booking {user?.displayName}
      </h1>
      <h2 className="text-xl mb-7 text-center font-medium text-gray-600 dark:text-gray-400">
        Enjoy every little moment, because those are the ones that make life
        beautiful.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {booking.map(singleBooking => (
          <BookingCard key={singleBooking._id} singleBooking={singleBooking} />
        ))}
      </div>
    </div>
  );
};

export default MyBooking;
