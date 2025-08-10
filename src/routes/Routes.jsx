import { createBrowserRouter } from 'react-router';
import MainLayouts from '../layout/MainLayouts';
import AuthLayout from '../layout/AuthLayout';
import SignIn from '../pages/authentication/SignIn';
import SignUp from '../pages/authentication/SignUp';
import MainAuthLayout from '../layout/MainAuthLayout';
import AddRoom from '../pages/addRoom/AddRoom';
import PrivateRoute from '../providers/PrivateRoute';
import MyBooking from '../pages/myBooking/MyBooking';
import MyBookingLayouts from '../layout/MyBookingLayouts';
import Loading from '../components/loader/Loading';
import HotelDetails from '../pages/rooms/HotelDetails/HotelDetails';
import ErrorPage from '../components/errorPage/ErrorPage';
import MyRoom from '../pages/myRooms/MyRoom';
import UpdateRoom from '../pages/updateRoom/UpdateRoom';
import AddHotelsForm from '../pages/AddHotelsForm/AddHotelsForm';
import Hotels from '../pages/rooms/Hotels';

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    HydrateFallback: Loading,
    loader: () =>
      fetch(`${import.meta.env.VITE_API_URL}/hotels?sort=rating&limit=6`),
    element: <MainLayouts />,
  },
  {
    path: '/rooms',
    element: <MainAuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        HydrateFallback: Loading,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/hotels`),
        element: <Hotels />,
      },
      {
        path: '/rooms/add-room/:id',
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
        element: <HotelDetails />,
      },
      {
        path: '/rooms/my-room',
        element: (
          <PrivateRoute>
            <MyRoom />
          </PrivateRoute>
        ),
      },
      {
        path: '/rooms/update-room/:id',
        HydrateFallback: Loading,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/rooms/${params.id}`),
        element: (
          <PrivateRoute>
            <UpdateRoom />
          </PrivateRoute>
        ),
      },
      {
        path: '/rooms/hotels-add-form',
        element: (
          <PrivateRoute>
            <AddHotelsForm />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: 'my-booking',
    Component: MyBookingLayouts,
    errorElement: <ErrorPage />,
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
    errorElement: <ErrorPage />,
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
