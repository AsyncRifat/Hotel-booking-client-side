import { FaBed, FaRulerCombined } from 'react-icons/fa6';

const SortingData = ({ sortAndLimit }) => {
  const { title, price, roomSize, capacity, description, photo } = sortAndLimit;

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-[440px] h-full max-h-[440px] transition hover:shadow-lg my-5 mx-auto ">
        <img
          src={photo.photo1}
          alt={title}
          className="w-full h-56 object-cover"
        />

        <div className="p-4">
          <div className="flex justify-between items-center gap-4 bg-blue-50 px-4 py-2 rounded-xl mb-4">
            <div className="flex items-center gap-1 text-sm text-gray-700">
              <FaBed className="text-lg text-blue-500" />
              <span>Adults: {capacity}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-700">
              <FaRulerCombined className="text-lg text-blue-500" />
              <span>Size: {roomSize}ft²</span>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-1">{title}</h3>

          <p className="text-sm text-gray-500 mb-4 h-[40px] jost">
            {description.length > 100
              ? description.slice(0, 100) + '...'
              : description}
          </p>

          <div className="flex justify-between items-center">
            <p className="text-green-600 font-bold text-lg">
              ${price}{' '}
              <span className="text-gray-500 font-normal text-sm">
                per night
              </span>
            </p>
            <button className="px-6 py-2 bg-blue-600 dark:bg-blue-600 border-5 border-gray-200 text-white rounded-full hover:bg-blue-700 transition text-sm font-medium">
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingData;
