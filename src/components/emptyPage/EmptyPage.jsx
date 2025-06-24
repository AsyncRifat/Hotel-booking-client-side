import React from 'react';
import { Link } from 'react-router';

const EmptyPage = () => {
  return (
    <div className="py-24 text-center">
      <h1 className="text-3xl font-bold mb-5">
        You haven't booked any rooms yet
      </h1>
      <p className="text-gray-400 mb-5">
        We always think about our customers and <br /> provide all kinds of
        services
      </p>

      <Link to="/rooms">
        <button className="btn py-2 text-center bg-[#0EA106] my-2 rounded-3xl  text-white ">
          Please Book our room
        </button>
      </Link>
    </div>
  );
};

export default EmptyPage;
