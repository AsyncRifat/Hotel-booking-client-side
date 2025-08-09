import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import Theme from '../theme/Theme';
import { RiMenuFold2Line } from 'react-icons/ri';
import { AuthContext } from '../providers/AuthContext';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

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
      <NavLink
        to="/"
        className="p-2 py-1 mr-2 active:bg-gray-200 active:rounded-lg"
      >
        Home
      </NavLink>
      <NavLink
        to="/rooms"
        className="py-1 px-2 mr-1.5 active:text-green-600 active:bg-gray-100 active:rounded-lg active:dark:bg-gray-700"
      >
        Room's
      </NavLink>

      {user ? (
        <>
          <NavLink
            to="/my-booking"
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-50 dark:bg-gray-800 rounded-lg py-1 px-2 '
                : ' py-1 px-2'
            }
          >
            My Booking
          </NavLink>

          <div className="dropdown dropdown-hover mr-2">
            <div
              tabIndex={0}
              role="button"
              className="flex items-center cursor-pointer m-1"
            >
              My Control{' '}
              <MdOutlineKeyboardArrowDown size={22} className="text-gray-400" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-32 p-2 shadow-sm openSans"
            >
              <li>
                <NavLink
                  to="/rooms/add-room"
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-gray-100 dark:bg-gray-800 rounded-lg py-1 px-2 mb-1'
                      : ' py-1 px-2 mb-1'
                  }
                >
                  Add Room
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/rooms/my-room"
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-gray-100 dark:bg-gray-800 rounded-lg py-1 px-2 '
                      : ' py-1 px-2'
                  }
                >
                  My Room
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="px-2 hidden lg:block">
            <Theme />
          </div>

          <div className="rounded-full  mx-3 mb-3 md:mb-0 ">
            {user?.photoURL && (
              <img
                className="w-8 h-8 rounded-full object-cover "
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
          <NavLink
            to="/authentication/sign-in"
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-200 dark:bg-gray-700 rounded-lg py-1 px-2 md:ml-1 '
                : ' py-1 px-2 md:ml-1'
            }
          >
            Sign In
          </NavLink>
          <NavLink
            to="/authentication/sign-up"
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-200 dark:bg-gray-700 rounded-lg py-1 px-2'
                : ' py-1 px-2'
            }
          >
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
    <div className="sticky top-0 z-40">
      <div className="navbar relative z-10 bg-[#f5fdfd] dark:bg-[#0d1515] shadow-xs montserrat px-[36px]">
        <div className="navbar-start">
          <div className="dropdown dropdown-hover">
            <div
              tabIndex={0}
              role="button"
              className="active:bg-gray-200 active:rounded-lg menu lg:hidden"
            >
              <RiMenuFold2Line size={25} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {link}
            </ul>
          </div>
          <Link className=" mx-1 md:mx-6" to="/">
            <img
              src="https://i.ibb.co.com/MyHfjgLn/novous-logo-design.png"
              alt=""
              className="w-14 h-14 object-cover"
            />
          </Link>
        </div>

        <div className="navbar-end lg:hidden mr-5">
          <Theme />
        </div>
        <div className="navbar-end  hidden lg:flex menu menu-horizontal px-1 mr-5">
          {link}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
