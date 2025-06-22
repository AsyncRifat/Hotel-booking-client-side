import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import Loading from '../components/loader/Loading';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }
  if (!user || !user?.email) {
    return <Navigate to="/authentication/sign-in" />;
  }
  if (user && user.email) {
    return children;
  }
};

export default PrivateRoute;
