import Lottie from 'lottie-react';
import React, { useContext, useState } from 'react';
import registerLottie from '../../assets/lottie/signUp.json';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../providers/AuthContext';
import SocialLogin from './GoogleAuth';
import Swal from 'sweetalert2';

const Register = () => {
  const { createUser, updateUser, setUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = e => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const { email, password, photo, name, terms } = Object.fromEntries(
      formData.entries()
    );
    // console.log(email, password, photo, name, terms);

    // reset
    setErrorMessage('');
    setShowPassword(false);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (passwordRegex.test(password) === false) {
      setErrorMessage(
        'Password must be at least 6 characters long and include both uppercase and lowercase letters.'
      );
      return;
    }

    if (!terms) {
      setErrorMessage('please fill up our conditions');
      return;
    }

    createUser(email, password)
      .then(result => {
        const user = result.user;

        // update
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Your account has been created',
              showConfirmButton: false,
              timer: 1500,
              width: '400px',
            });
          })
          .catch(error => {
            console.log(error.message);
            setUser(user);
          });
        navigate('/');
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  };
  return (
    <div className="hero bg-base-100 min-h-screen">
      <div className="hero-content flex-col-reverse lg:flex-row-reverse max-w-6xl w-full px-4 gap-8">
        <div className="flex justify-center items-center w-full lg:w-1/2 ">
          <Lottie
            className="w-60 sm:w-72 md:w-80 lg:w-96 xl:w-[500px] h-auto hidden lg:block"
            animationData={registerLottie}
            loop={true}
          />
        </div>

        <div className="card bg-base-300 w-full lg:w-1/2 shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-4xl font-bold text-center lg:text-left mb-6 font-serif">
              Register now!
            </h1>
            <p className="text-sm text-center dark:text-gray-600">
              Already have an account?{' '}
              <Link
                to="/authentication/sign-in"
                className="focus:underline hover:underline text-blue-600"
              >
                Sign in here
              </Link>
            </p>

            <SocialLogin />

            <form onSubmit={handleRegister}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="url"
                  name="photo"
                  placeholder="URL format in your photo"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control relative mb-4">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter Password"
                  className="input input-bordered w-full"
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="absolute top-8 right-8"
                >
                  {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                </button>
              </div>

              <label className="label mb-3">
                <input type="checkbox" name="terms" className="checkbox" />
                Terms and Conditions
              </label>

              {errorMessage && <p className="text-red-500">{errorMessage}</p>}

              <div className="form-control">
                <button type="submit" className="btn btn-neutral">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
