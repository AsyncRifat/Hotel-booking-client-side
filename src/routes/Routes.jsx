import { createBrowserRouter } from 'react-router';
import MainLayouts from '../layout/MainLayouts';
import Home from '../pages/Home/Home';
import AuthLayout from '../layout/AuthLayout';
import SignIn from '../pages/authentication/SignIn';
import SignUp from '../pages/authentication/SignUp';

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
