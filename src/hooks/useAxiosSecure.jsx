import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthContext';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const token = user?.accessToken;
  console.log(token);

  // Add a request interceptor
  axiosInstance.interceptors.request.use(config => {
    config.headers.authorization = `Bearer ${token}`;
    return config;
  });

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.status === 401 || error.status === 403) {
        signOutUser()
          .then(() => {
            console.log(`sign out user for ${error.status} status code`);
          })
          .catch(err => {
            console.log(err);
          });
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosSecure;
