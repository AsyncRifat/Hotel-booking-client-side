import { createBrowserRouter } from 'react-router';
import MainLayouts from '../layout/MainLayouts';
import AuthLayout from '../layout/AuthLayout';
import SignIn from '../pages/authentication/SignIn';
import SignUp from '../pages/authentication/SignUp';
import MainAuthLayout from '../layout/MainAuthLayout';
import Rooms from '../pages/rooms/Rooms';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayouts,
  },
  {
    path: '/rooms',
    element: <MainAuthLayout />,
    children: [
      {
        index: true,
        Component: Rooms,
      },
    ],
  },
  {
    path: 'authentication',
    Component: AuthLayout,
    children: [
      {
        path: '/authentication/sign-in',
        Component: SignIn,
      },
      {
        path: '/authentication/sign-up',
        Component: SignUp,
      },
    ],
  },
]);
