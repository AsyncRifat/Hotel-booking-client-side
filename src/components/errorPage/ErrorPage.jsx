import { Link, useLocation, useRouteError } from 'react-router';
import errorFile from '../../assets/lottie/not-found.json';
import Lottie from 'lottie-react';

const ErrorPage = () => {
  const error = useRouteError();
  const location = useLocation();
  const statusCode = error?.status || 404;
  return (
    <>
      <div className="py-24 flex flex-col justify-center items-center">
        <div>
          <Lottie
            className="w-60 sm:w-72 md:w-80 lg:w-96 xl:w-[500px] h-auto hidden lg:block"
            animationData={errorFile}
            loop={true}
          />
        </div>
        <h1 className="mb-2 mt-5 text-3xl font-light text-red-500">
          {`${statusCode} -page not found`}
        </h1>
        <p className="mb-3 text-xl font-bold  md:text-2xl">
          {`Data Not Found: ${location.pathname}`}
        </p>

        <Link to="/">
          <button className="btn py-2 text-center bg-[#0EA106] my-2 rounded-3xl  text-white ">
            Back Home
          </button>
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
