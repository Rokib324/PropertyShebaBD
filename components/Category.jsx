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
    slidesToShow: 4,  // Default for extra large screens (1280px+)
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1280,  // When screen < 1280px
        settings: { 
          slidesToShow: 3,
          arrows: true,
        },
      },
      {
        breakpoint: 1024,  // When screen < 1024px
        settings: { 
          slidesToShow: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 768,  // When screen < 768px (Mobile)
        settings: { 
          slidesToShow: 1,  // Show 1 category on mobile
          arrows: false,  // Hide arrows on mobile for cleaner look
          dots: true,
        },
      },
      {
        breakpoint: 480,  // When screen < 480px (Small mobile)
        settings: { 
          slidesToShow: 1,  // Ensure 1 category on small mobile
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="bg-white py-10 sm:py-14 md:py-16 px-3 sm:px-4 lg:px-0">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
            Our Services
          </h2>
          <div className="flex items-center justify-center">
            <div className="w-12 sm:w-16 h-1 bg-red-600 rounded-full"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full mx-2"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
          </div>
        </div>

        {/* Slider */}
        <div className="w-full overflow-hidden">
          <Slider {...settings}>
            {categories.map((category) => (
              <div key={category.id} className="px-3 sm:px-4 md:px-5">
                <Link href={`#${category.targetId}`} className="block group">
                  <div className="flex flex-col items-center">
                    {/* Circular Image */}
                    <div className="relative mb-3 sm:mb-4 w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto">
                      <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-200 shadow-md">
                        <Image
                          src={category.image}
                          alt={category.name}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Category Name */}
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-black uppercase text-center group-hover:text-red-600 transition-colors duration-300 px-2">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Categories;