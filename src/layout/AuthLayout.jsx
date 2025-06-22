import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="w-11/12 mx-auto mt-3">
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
