import { createBrowserRouter } from 'react-router';
import MainLayouts from '../layout/MainLayouts';
import AuthLayout from '../layout/AuthLayout';
import SignIn from '../pages/authentication/SignIn';
import SignUp from '../pages/authentication/SignUp';
import MainAuthLayout from '../layout/MainAuthLayout';
import Rooms from '../pages/rooms/Rooms';
import AddRoom from '../pages/addRoom/AddRoom';
import PrivateRoute from '../providers/PrivateRoute';
import MyBooking from '../pages/myBooking/MyBooking';
import MyBookingLayouts from '../layout/MyBookingLayouts';
import Loading from '../components/loader/Loading';
import RoomDetails from '../pages/rooms/roomDetails/RoomDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayouts />,
  },
  {
    path: '/rooms',
    element: <MainAuthLayout />,
    children: [
      {
        index: true,
        HydrateFallback: Loading,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/rooms`),
        element: <Rooms />,
      },
      {
        path: '/rooms/add-room',
        element: (
          <PrivateRoute>
            <AddRoom />
          </PrivateRoute>
        ),
      },
      {
        path: '/rooms/:id',
        HydrateFallback: Loading,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/rooms/${params.id}`),
        element: (
          <PrivateRoute>
            <RoomDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: 'my-booking',
    Component: MyBookingLayouts,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <MyBooking />
          </PrivateRoute>
        ),
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
