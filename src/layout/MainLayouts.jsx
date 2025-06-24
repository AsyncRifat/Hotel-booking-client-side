import React from 'react';
import Banner from '../pages/Home/banner/Banner';
import HotelMap from '../pages/Home/map/HotelMap';
import ServiceCountUp from '../components/countUp/ServiceCountUp';
import SortingData from '../pages/Home/sortingData/SortingData';
import { useLoaderData, useNavigate } from 'react-router';
import Services from '../pages/Home/services/Services';
import Footer from '../components/Footer';

const MainLayouts = () => {
  const sortingData = useLoaderData();
  const navigate = useNavigate();
  return (
    <div className="bg-teal-50">
      <Banner />
      {/* <SortingData /> */}

      <h1 className="text-5xl jost mt-14 mb-5 text-black text-center font-semibold">
        Our Best Rooms
      </h1>
      <p className="text-gray-500 text-center jost">
        Experience comfort and elegance like never before - your perfect stay
        begins here.Wake up to breathtaking <br /> views, exceptional service,
        and unforgettable memories.
      </p>
      <div className="max-w-screen-xl mx-auto mt-12 mb-14">
        <button
          onClick={() => navigate('/rooms')}
          className="bg-blue-600 dark:bg-blue-600 text-white px-7 py-3 rounded-4xl border-6 border-gray-200 block mx-auto jost"
        >
          All rooms
        </button>
      </div>

      <div className="mx-auto grid grid-cols-1 md:grid-cols-3 px-4 gap-x-3">
        {sortingData.map(sortAndLimit => (
          <SortingData key={sortAndLimit._id} sortAndLimit={sortAndLimit} />
        ))}
      </div>
      <Services />
      <ServiceCountUp />
      <HotelMap />
      <Footer />
    </div>
  );
};

export default MainLayouts;
