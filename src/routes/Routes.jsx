import { createBrowserRouter } from 'react-router';
import MainLayouts from '../layout/MainLayouts';
import Home from '../pages/Home/Home';


export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
]);
