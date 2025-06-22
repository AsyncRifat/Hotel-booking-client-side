import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import Theme from '../theme/Theme';
import { RiMenuFold2Line } from 'react-icons/ri';
import { AuthContext } from '../providers/AuthContext';


const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUserSignOut = () => {
    signOutUser()
      .then(() => {
        navigate('/authentication/sign-in');
      })
      .catch(error => {
        console.log(error);
      });
  };
  const link = (
    <>
      <NavLink to="/" className="p-2">
        Home
      </NavLink>

      {user ? (
        <>
          <NavLink to="/" className="p-2">
            Room's
          </NavLink>
          <NavLink to="/" className="p-2">
            Add Room
          </NavLink>
          <NavLink to="/" className="p-2">
            My Booking
          </NavLink>
          <div className="px-2 hidden lg:block">
            <Theme />
          </div>

          <div className="rounded-full border-3 border-gray-400 mx-3 ">
            {user?.photoURL && (
              <img
                className="w-6 h-6 rounded-full object-cover "
                src={user?.photoURL}
                alt="avatar"
              />
            )}
          </div>

          <Link
            className="px-3 py-1.5 rounded-md bg-yellow-400 dark:bg-yellow-600"
            onClick={handleUserSignOut}
          >
            Log Out
          </Link>
        </>
      ) : (
        <>
          <NavLink to="/authentication/sign-in" className="p-2 md:ml-1">
            Sign In
          </NavLink>
          <NavLink to="/authentication/sign-up" className="p-2">
            Sign Up
          </NavLink>
          <div className="ml-4 mr-6 hidden lg:block">
            <Theme />
          </div>
        </>
      )}
    </>
  );
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm montserrat">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <RiMenuFold2Line size={25} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {link}
            </ul>
          </div>
          <Link className=" flex items-end mx-1 md:mx-9" to="/">
            <img
              src="https://i.ibb.co/8gc0gWn6/5-star-hotel.png"
              alt=""
              className="w-10 h-10"
            />
            <h2 className="font-extrabold text-xl text-green-600 ">Booking.</h2>
          </Link>
          {/* <div className="hidden lg:block">
            <Theme />
          </div> */}
        </div>

        <div className="navbar-end lg:hidden mr-5">
          <Theme />
        </div>
        <div className="navbar-end  hidden lg:flex menu menu-horizontal px-1 mr-5">
          {link}
        </div>
      </div>
    </>
  );
};

export default Navbar;
