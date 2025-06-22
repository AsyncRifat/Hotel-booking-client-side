import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';

const MainAuthLayout = () => {
  return (
    <>
      <Navbar />
      <div className="w-11/12 mx-auto mt-3">
        <Outlet />
      </div>
    </>
  );
};

export default MainAuthLayout;
