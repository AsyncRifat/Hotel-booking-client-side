import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../providers/AuthContext';
import { FcGoogle } from 'react-icons/fc';

const SocialLogin = ({ from }) => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(result => {
        console.log(result);
        navigate(from || '/');
      })
      .catch(error => {
        console.log(error.message);
      });
  };
  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className="btn bg-white text-black border-[#e5e5e5] w-full"
      >
        <FcGoogle size={24} />
        Login with Google
      </button>
      <div className="divider">OR</div>
    </div>
  );
};

export default SocialLogin;
