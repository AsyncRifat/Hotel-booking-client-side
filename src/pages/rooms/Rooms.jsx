import { useLoaderData } from 'react-router';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import RoomCard from './roomCard/RoomCard';

const Rooms = () => {
  useDocumentTitle('Booking | Rooms');

  const initialRooms = useLoaderData();

  return (
    <div>
      <div className="min-h-[calc(100vh-233px)]">
        <h1 className="text-5xl jost mt-8 mb-5 text-black dark:text-white text-center font-semibold">
          Our Rooms
        </h1>
        <p className="text-gray-500 text-center jost">
          Experience comfort and elegance like never before - your perfect stay
          begins here.Wake up to breathtaking <br /> views, exceptional service,
          and unforgettable memories.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-15 mt-5 mb-10">
          {initialRooms.map(room => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
