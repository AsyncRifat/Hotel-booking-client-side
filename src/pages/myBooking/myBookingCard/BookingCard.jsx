import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const BookingCard = ({ singleBooking }) => {
  const [myBooking, setMyBooking] = useState(null);

  const [review, setReview] = useState(false);

  useEffect(() => {
    if (singleBooking) {
      setMyBooking(singleBooking);
    }
  }, [singleBooking]);

  const [star, setStar] = useState('');
  const [starCount, setStarCount] = useState();
  // console.log(starCount);

  const handleReview = e => {
    e.preventDefault();
    const review = e.target.review.value;

    const id = roomId;

    const reviewStar = parseInt(star);

    const reviewData = {
      roomId: id,
      name: name,
      star: reviewStar,
      review: review,
    };
    // console.log(reviewData);

    axios
      .patch(`${import.meta.env.VITE_API_URL}/review/${id}`, {
        rating: starCount,
      })
      .then(res => {
        if (res.data.modifiedCount) {
          toast.success('Review Submitted');

          // save in data base another collection
          axios
            .post(`${import.meta.env.VITE_API_URL}/set-review`, reviewData)
            .then(res => {
              if (res.data?.insertedId) {
                toast.success('Review in data base Submitted');
              }
            })
            .catch(error => {
              console.log(error);
            });

          setReview(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes,  Booking cancel!',
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/booking-delete/${id}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount) {
              Swal.fire({
                title: 'Deleted!',
                text: 'Your Booking cancel',
                icon: 'success',
              });
              setMyBooking(null);
            }
          });
      }
    });
  };
  if (!myBooking) return null;
  const { title, photo, price, statedDate, EndedDate, _id, roomId, name } =
    myBooking;

  return (
    <>
      <div className="relative card card-side bg-base-100 dark:bg-gray-800 shadow-md">
        {review && <div className="fixed inset-0 bg-black/10 z-10"></div>}
        <figure>
          <img
            src={photo}
            alt={title}
            className="h-[220px] w-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <h2 className="">
            <span className="font-medium text-base openSans">Start:</span>{' '}
            <span className="text-gray-500">{statedDate}</span>
          </h2>
          <h2 className="">
            <span className="font-medium text-base openSans">End:</span>{' '}
            <span className="text-gray-500">{EndedDate}</span>
          </h2>
          <p>
            <span className="font-medium text-base openSans">Price:</span>{' '}
            <span className="text-gray-500">$</span>
            <span className="font-medium text-amber-600">{price}</span>{' '}
            <span className="font-thin text-xs">Per Night</span>
          </p>

          <div className="card-actions justify-end">
            <button onClick={() => setReview(true)} className="btn btn-info">
              Review
            </button>

            {review && (
              <div className="absolute top-0 md:top-0 right-1.5 md:w-[320px] bg-base-100 dark:bg-gray-800 border border-blue-300 dark:border-gray-600 shadow-xl rounded-xl px-5 py-2 z-20">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                    {title}
                  </h2>
                  <button
                    onClick={() => setReview(false)}
                    className="text-red-500 text-xl font-bold"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleReview}>
                  <h2 className="block mb-1 text-gray-600 font-medium">
                    Rating:
                  </h2>
                  <div>
                    <div
                      onChange={e => setStar(e.target.value)}
                      className="rating mb-3 gap-x-1"
                    >
                      <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                        aria-label="1 star"
                        value="1"
                        defaultChecked
                        onClick={() => setStarCount(1)}
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                        aria-label="2 star"
                        value="2"
                        onClick={() => setStarCount(1)}
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                        aria-label="3 star"
                        value="3"
                        onClick={() => setStarCount(1)}
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                        aria-label="4 star"
                        value="4"
                        onClick={() => setStarCount(1)}
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                        aria-label="5 star"
                        value="5"
                        onClick={() => setStarCount(1)}
                      />
                    </div>

                    <div className="">
                      <label className="block mb-1 text-gray-600 font-medium">
                        Review
                      </label>
                      <textarea
                        name="review"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-amber-500"
                        placeholder="Enter a description..."
                        rows="4"
                      />
                    </div>

                    <button type="submit" className="badge badge-success">
                      Review
                    </button>
                  </div>
                </form>
              </div>
            )}

            <button
              onClick={() => handleDelete(_id)}
              className="btn btn-outline btn-error"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingCard;
