import React, { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthContext';
import { Fade, Slide } from 'react-awesome-reveal';
import { useNavigate } from 'react-router';
import { CiLocationArrow1 } from 'react-icons/ci';

const Banner = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      <div
        className="  relative w-full h-[550px] bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(https://i.ibb.co/kgf2XPVZ/banner-11.jpg)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          width: '100%',
          height: '550px',
          boxShadow: '-20px 0 30px rgba(0,0,0,0.2)',
        }}
      >
        <div className="absolute  inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-90 z-0"></div>

        <div className="relative z-10 space-y-3 py-32 px-2 md:py-20 pl-7 md:pl-20">
          <Slide>
            <h1 className="text-3xl md:text-5xl lg:text-5xl text-gray-300 ">
              Discover & Share <br /> Your Favorite Room's
            </h1>
          </Slide>

          <div>
            {user ? (
              <>
                <div className="md:text-2xl lg:text-2xl md:font-semibold lg:font-semibold text-amber-500 mt-7 mb-2 openSans">
                  <p className="font-bold text-amber-200 montserrat">
                    {user.displayName}
                  </p>
                  Welcome to Our Hotel
                </div>
                <button
                  onClick={() => navigate('/rooms')}
                  className="flex items-center gap-x-2 px-7 py-2 text-2xl border bg-green-500 border-green-500 text-gray-800 cursor-pointer hover:rounded-4xl hover:bg-green-500 font-semibold hover:text-black  shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl font-serif"
                >
                  Room's Page<CiLocationArrow1 size={24} />
                </button>
              </>
            ) : (
              <>
                <p className="md:text-2xl lg:text-2xl md:font-bold lg:font-bold text-green-600 mt-7 mb-2 openSans">
                  Register to Unlock Booking
                </p>
                <button
                  onClick={() => navigate('/authentication/sign-up')}
                  className="flex items-center openSans gap-x-2 px-5 py-3 border mt-2 cursor-pointer hover:bg-green-500 font-semibold  text-white hover:text-black  shadow-md transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl "
                >
                  Please Register <CiLocationArrow1 size={24} />
                </button>
              </>
            )}
          </div>
          <div className=" text-white font-medium text-xl mt-10 montserrat hidden md:block ">
            <Fade delay={1e3} cascade damping={1e-1}>
              Find your comfort, luxury, and relaxation here.
            </Fade>
          </div>
          <div className=" text-white font-medium text-xl mt-10 montserrat md:hidden">
            <Fade delay={1e3} cascade damping={1e-1}>
              Comfort | Luxury | Relax
            </Fade>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
