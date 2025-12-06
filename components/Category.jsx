'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "LAND",
      image: "/land.png",
      targetId: "land",          // <-- section id
    },
    {
      id: 2,
      name: "REAL ESTATE",
      image: "/realestate.png",
      targetId: "real-estate",
    },
    {
      id: 3,
      name: "INTERIOR",
      image: "/interior.png",
      targetId: "interior",
    },
    {
      id: 4,
      name: "MARVEL",
      image: "/marble.jpg",
      targetId: "marble",
    },
    {
      id: 5,
      name: "SANITARY",
      image: "/sanitary.png",
      targetId: "sanitary",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,          // desktop
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,     // large laptops
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 1024,     // tablets landscape
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,      // tablets / big phones
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,      // small phones
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="bg-white py-10 sm:py-14 md:py-16 px-3 sm:px-4 lg:px-0">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
            WHAT WE DO
          </h2>
          <div className="flex items-center justify-center">
            <div className="w-12 sm:w-16 h-1 bg-red-600 rounded-full"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full mx-2"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
          </div>
        </div>

        {/* Slider */}
        <Slider {...settings}>
          {categories.map((category) => (
            <div key={category.id} className="px-2 sm:px-3 md:px-4">
              <Link href={`#${category.targetId}`} className="block group">
                <div className="flex flex-col items-center">
                  {/* Circular Image */}
                  <div className="relative mb-4 group-hover:scale-105 transition-transform duration-300
                                  w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-200 group-hover:border-red-500 transition-colors duration-300">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Category Name */}
                  <h3 className="text-xs sm:text-sm md:text-base font-bold text-black uppercase text-center group-hover:text-red-600 transition-colors duration-300">
                    {category.name}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Categories;