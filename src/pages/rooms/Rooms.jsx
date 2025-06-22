import useDocumentTitle from '../../hooks/useDocumentTitle';

const Rooms = () => {
  useDocumentTitle('Booking | Rooms');
  return (
    <div>
      <h2 className="text-2xl">all rooms</h2>
    </div>
  );
};

export default Rooms;
