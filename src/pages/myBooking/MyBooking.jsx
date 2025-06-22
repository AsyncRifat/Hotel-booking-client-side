import React, { useContext } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { AuthContext } from '../../providers/AuthContext';

const MyBooking = () => {
  useDocumentTitle('My Booking');
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h2 className="text-2xl">My Booking: {user?.displayName}</h2>
    </div>
  );
};

export default MyBooking;
