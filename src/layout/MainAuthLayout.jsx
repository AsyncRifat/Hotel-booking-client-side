import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const MainAuthLayout = () => {
  return (
    <div className="bg-teal-50 dark:bg-[#0e1417]">
      <Navbar />
      <div className="w-11/12 min-h-[calc(100vh-336px)] mx-auto mt-3">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainAuthLayout;
