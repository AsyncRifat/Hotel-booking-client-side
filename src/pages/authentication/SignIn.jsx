import React, { useContext, useRef, useState } from 'react';
import signInLottie from '../../assets/lottie/signIn.json';
import Lottie from 'lottie-react';
import { Link, useLocation, useNavigate } from 'react-router';

import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthContext';
import SocialLogin from './GoogleAuth';
import { IoEye, IoEyeOff } from 'react-icons/io5';

const SignIn = () => {
  const { signInUser, forgotPassword } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);
  const navigate = useNavigate();

  
  const location = useLocation();
  // console.log(location);
  const from = location.state || '/';

  const handleSignIn = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email, password);

    // reset
    setErrorMessage('');
    setShowPassword(false);

    signInUser(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log(user);
        e.target.reset();
        navigate(from);
      })
      .catch(error => {
        const message = error.message;
        setErrorMessage(message);
      });
  };

  const handleForgotPassword = () => {
    const email = emailRef.current.value;

    forgotPassword(email)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Email Sent',
          text: 'Check your email for password reset instructions.',
        });
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  };
  return (
    <div className="hero bg-base-100 sm:min-h-screen">
      <div className="hero-content flex-col-reverse lg:flex-row-reverse max-w-6xl w-full px-4 gap-8">
        <div className="flex justify-center items-center w-full lg:w-1/2">
          <Lottie
            className="w-60 sm:w-72 md:w-80 lg:w-96 xl:w-[500px] h-auto hidden lg:block"
            animationData={signInLottie}
            loop={true}
          />
        </div>

        <div className="card bg-base-300 w-full lg:w-1/2 shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-4xl font-bold text-center lg:text-left mb-6 font-serif">
              Log In Member
            </h1>
            <SocialLogin from={from} />
            <p className="text-sm text-center dark:text-gray-600">
              Don't have account?{' '}
              <Link
                to="/authentication/sign-up"
                className="focus:underline hover:underline text-blue-600"
              >
                Sign up here
              </Link>
            </p>
            <form onSubmit={handleSignIn}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  ref={emailRef}
                  placeholder="Email"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control mb-1 relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  className="input input-bordered w-full"
                  required
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="absolute top-8 right-4"
                >
                  {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                </button>
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <Link
                    onClick={handleForgotPassword}
                    className=" link link-hover"
                  >
                    Forgot password?
                  </Link>
                </label>
              </div>

              {errorMessage && (
                <p className="text-sm text-red-500 pb-2">
                  NB: Check Your Email & Password
                </p>
              )}

              <div className="form-control">
                <button
                  type="submit"
                  className="btn btn-success transition-all duration-300 ease-in-out transform hover:scale-95"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
