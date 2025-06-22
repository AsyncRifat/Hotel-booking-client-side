import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

const MainLayouts = () => {
  return (
    <div>
      <Navbar />
      <div className="w-11/12 mx-auto mt-3">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayouts;
