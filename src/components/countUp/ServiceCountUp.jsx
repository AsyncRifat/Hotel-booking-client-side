import CountUp from 'react-countup';

const ServiceCountUp = () => {
  return (
    <div className="py-10 px-4 md:px-16 bg-teal-50 dark:bg-gray-100">
      <h1 className="text-5xl jost mt-14 mb-5 text-black text-center font-semibold">
        Trusted by Thousands of Happy Guests
      </h1>
      <p className="text-gray-500 text-center jost mb-20">
        Where every number tells a story of trust and excellence
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-14 mt-5 ">
        <div className="p-10 bg-white shadow-sm mb-2">
          <h2 className="text-4xl text-black text-center monoton">
            <CountUp start={0} end={4} className="text-4xl "></CountUp>+
          </h2>
          <h4 className="text-gray-800 text-center text-lg">Hotel</h4>
        </div>
        <div className="p-10 bg-white shadow-sm mb-2">
          <h2 className="text-4xl text-black text-center monoton">
            <CountUp start={0} end={167} className="text-4xl "></CountUp>+
          </h2>
          <h4 className="text-gray-800 text-center text-lg">Rooms</h4>
        </div>

        <div className="p-10 bg-white shadow-sm mb-2">
          <h2 className="text-4xl text-black text-center monoton">
            <CountUp start={0} end={6} className="text-4xl "></CountUp>+
          </h2>
          <h4 className="text-gray-800 text-center text-lg">Beaches</h4>
        </div>
        <div className="p-10 bg-white shadow-sm mb-2">
          <h2 className="text-4xl text-black text-center monoton">
            <CountUp start={0} end={4586} className="text-4xl "></CountUp>+
          </h2>
          <h4 className="text-gray-800 text-center text-lg">Guests</h4>
        </div>
      </div>
    </div>
  );
};

export default ServiceCountUp;
