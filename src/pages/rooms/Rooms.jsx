import { useLoaderData } from 'react-router';
import useDocumentTitle from '../../hooks/useDocumentTitle';
// import { useState } from 'react';

const Rooms = () => {
  useDocumentTitle('Booking | Rooms');

  const initialCoffees = useLoaderData();

  // const [coffees, setCoffees] = useState(
  //   Array.isArray(initialCoffees) ? initialCoffees : []
  // );
  return (
    <div>
      <h2 className="text-2xl">all rooms {initialCoffees.length}</h2>
    </div>
  );
};

export default Rooms;
