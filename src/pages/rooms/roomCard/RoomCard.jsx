import { MdOutlineStar } from 'react-icons/md';
import { Link } from 'react-router';

const RoomCard = ({ room }) => {
  const { title, rating, location, available, _id } = room;
  // console.log(available);

  return (
    <>
      <div className="group relative rounded-lg overflow-hidden shadow-xs transition-all duration-500 hover:scale-100 h-[360px] bg-[#f5fdfd] dark:bg-[#0f1919]">
        <img
          src={room?.photo?.photo1}
          alt={title}
          className="w-full h-56 object-cover"
        />

        <div className="text-xl font-semibold text-center text-gray-800 dark:text-white absolute inset-x-6 bottom-33 bg-[#f5fdfd] dark:bg-[#0f1919] rounded-t-3xl px-2 translate-y-full group-hover:translate-y-15 transition-all duration-500">
          <p className="montserrat mt-2 mb-1.5">{title}</p>
          <div className="flex justify-between items-center text-base mb-3 md:px-2">
            <div className={`font-medium text-sm uppercase`}>
              {available ? (
                <div className="space-x-3 flex items-center justify-center">
                  <div className="inline-grid *:[grid-area:1/1]">
                    <div className="status status-success animate-ping"></div>
                    <div className="status status-success"></div>
                  </div>
                  <span>Vacant</span>
                </div>
              ) : (
                <div className="space-x-3 flex items-center justify-center">
                  <div className="inline-grid *:[grid-area:1/1]">
                    <div className="status status-error animate-ping"></div>
                    <div className="status status-error"></div>
                  </div>
                  <span>No Vacant</span>
                </div>
              )}
            </div>

            <p className="flex justify-center items-center gap-2 openSans">
              <MdOutlineStar size={22} className="text-yellow-400" />
              {rating.length}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-normal text-base openSans">{location}</p>
          </div>
        </div>

        <div className="hidden lg:block absolute inset-x-10 bottom-0 bg-[#f5fdfd] dark:bg-[#0f1919] rounded-t-3xl translate-y-full group-hover:-translate-y-2 transition-all duration-400">
          <div className="flex justify-center mb-2">
            <Link
              to={`/rooms/${_id}`}
              className="px-6 py-2 bg-blue-600 dark:bg-blue-600 border-5 border-gray-200 dark:border-gray-800 text-white rounded-full hover:bg-blue-700 transition text-sm font-medium hover:cursor-pointer"
            >
              Book Now
            </Link>
          </div>
        </div>

        {/* Mobile & Tablet Only Button (Outside Content) */}
        <div className="block lg:hidden opacity-95 absolute bottom-3 right-1/2 translate-x-1/2">
          <Link
            to={`/rooms/${_id}`}
            className="px-3 py-1 bg-blue-600 dark:bg-blue-600 border-3  border-gray-200 dark:border-gray-800 text-white rounded-full hover:bg-blue-700 transition text-sm font-medium hover:cursor-pointer"
          >
            Book Now
          </Link>
        </div>
      </div>
    </>
  );
};

export default RoomCard;
