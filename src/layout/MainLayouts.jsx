import React from 'react';
import { Outlet } from 'react-router';

const MainLayouts = () => {
  return (
    <div>
      <h1>hello bangladesh's Rifat</h1>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayouts;
