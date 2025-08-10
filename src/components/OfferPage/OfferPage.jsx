import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { IoMdStar } from 'react-icons/io';

const hotels = [
  {
    id: 1,
    name: 'Oceanview Luxury Resort',
    location: 'Maldives',
    rating: 3,
    reviews: 248,
    discount: 30,
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&q=80',
    alt: 'Oceanview Luxury Resort beachfront villas and pool',
  },
  {
    id: 2,
    name: 'Alpine Peaks Retreat',
    location: 'Switzerland',
    rating: 4.8,
    reviews: 182,
    discount: 40,
    image:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80',
    alt: 'Alpine Peaks Retreat snow-capped mountains and cozy chalets',
  },
  {
    id: 3,
    name: 'Tropical Rainforest Lodge',
    location: 'Costa Rica',
    rating: 4.7,
    reviews: 315,
    discount: 18,
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80',
    alt: 'Tropical Rainforest Lodge lush greenery and private villas',
  },
];

export default function OfferPage() {
  return (
    <div className=" px-4  mx-11">
      <header className="text-center mb-8">
        <h1 className="text-5xl jost mt-14 mb-5 text-black text-center font-semibold">
          Featured Hotel Offers
        </h1>
        <p className="text-gray-500 text-center jost mb-20">
          Handpicked luxury stays with exclusive discounts. Browse and book your
          next escape.
        </p>
      </header>

      <div className="grid gap-15 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {hotels.map(hotel => (
          <article
            key={hotel.id}
            className="relative overflow-hidden shadow-xl"
            aria-labelledby={`hotel-${hotel.id}-name`}
          >
            {/* Image + overlay */}
            <figure className="relative w-full h-96 lg:h-[450px]">
              <Link to={'/rooms'}>
                <motion.img
                  src={hotel.image}
                  alt={hotel.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.6 }}
                />
              </Link>

              {/* top-right circular discount badge */}
              <div className="absolute top-4 right-4">
                <span
                  className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-yellow-400 text-black font-bold shadow-md"
                  aria-hidden="true"
                >
                  {hotel?.discount} % <span className="sr-only">off</span>
                </span>
              </div>

              {/* centered overlay for name & rating */}
              <figcaption className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
                <h2
                  id={`hotel-${hotel.id}-name`}
                  className="text-white text-xl md:text-2xl lg:text-3xl font-extrabold drop-shadow-lg"
                  style={{ textShadow: '0 8px 24px rgba(0,0,0,0.6)' }}
                >
                  {hotel.name}
                </h2>
                <p className="mt-2 text-sm text-gray-100/90 drop-shadow">
                  {hotel.location}
                </p>

                {/* rating pill below name */}
                <div className="mt-4 pointer-events-auto">
                  <div className="inline-flex items-center gap-2 bg-white/90 dark:bg-black/60 px-3 py-1.5 rounded-full shadow-sm">
                    {/* star icon (svg) */}
                    <IoMdStar size={23} className="text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {hotel.rating} / 5
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-300">
                      ({hotel.reviews} reviews)
                    </span>
                  </div>
                </div>
              </figcaption>
            </figure>
          </article>
        ))}
      </div>
    </div>
  );
}
