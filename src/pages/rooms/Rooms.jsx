import { useLoaderData } from 'react-router';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import RoomCard from './roomCard/RoomCard';
// import { useState } from 'react';

const Rooms = () => {
  useDocumentTitle('Booking | Rooms');

  const initialRooms = useLoaderData();

  // const [coffees, setCoffees] = useState(
  //   Array.isArray(initialCoffees) ? initialCoffees : []
  // );
  return (
    <div>
      <h2 className="text-2xl">all rooms {initialRooms.length}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {initialRooms.map(room => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Rooms;
