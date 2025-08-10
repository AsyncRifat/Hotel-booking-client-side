import React from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

const images = [
  'https://i.ibb.co.com/whYTdDh1/pexels-palumalerba-2607115.jpg',
  'https://i.ibb.co.com/d0tLdZ69/pexels-adalberto-lf-1039098923-20426193.jpg',
  'https://i.ibb.co.com/bRvCgjrh/pexels-mahmut-33344588.jpg',
];

export default function ImageHoverGallery() {
  return (
    <div className=" py-3 px-6 md:px-[72px]">
      <h1 className="jost text-5xl text-center font-bold mb-20 text-gray-800 dark:text-white">
        Interactive Image Gallery
      </h1>
      <div className="grid gap-20 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mx-auto">
        {images.map((src, index) => (
          <Tilt
            key={index}
            glareEnable={false}
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            perspective={800}
            transitionSpeed={1500}
            scale={1.05}
            gyroscope={true}
            className="overflow-hidden shadow-lg bg-white dark:bg-gray-800"
          >
            <motion.img
              src={src}
              alt={`gallery-${index}`}
              className="w-full h-[#520] object-cover cursor-pointer"
              whileHover={{
                scale: 1.1,
                filter: 'brightness(1.1)',
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </Tilt>
        ))}
      </div>
    </div>
  );
}
