import React from 'react';
import Marquee from 'react-fast-marquee';
import logo1 from '../../assets/Partners/agoda.png';
import logo2 from '../../assets/Partners/amadeus.png';
import logo3 from '../../assets/Partners/booking.png';
import logo4 from '../../assets/Partners/expedia.png';
import logo7 from '../../assets/Partners/Hotels.png';
import logo5 from '../../assets/Partners/Travelport.png';
import logo6 from '../../assets/Partners/trip.png';

const Partners = () => {
  const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];
  return (
    <div className="mx-4 md:mx-15 pb-10">
      <div className="text-center mb-20">
        <h1 className="text-5xl jost mt-14 mb-5 text-black text-center font-semibold px-3 md:px-0">
          Trusted Hotel Partners Around the World
        </h1>
        <p className="text-gray-500 text-center jost px-3 md:px-0">
          We proudly collaborate with leading global travel and hospitality
          brands, <br /> ensuring our guests receive the best booking
          experience, exclusive deals, and world-class services.
        </p>
      </div>
      <Marquee
        speed={30}
        gradient={true}
        gradientColor={[255, 255, 255]}
        gradientWidth={150}
        pauseOnHover={true}
      >
        {logos.map((src, index) => (
          <div key={index} className="mx-16">
            <img
              src={src}
              alt={`Client Logo ${index + 1}`}
              className="h-16 w-auto object-contain rounded-xl"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Partners;
