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
      link: "/land"
    },
    {
      id: 2,
      name: "REAL ESTATE",
      image: "/realestate.png",
      link: "/real-estate"
    },
    {
      id: 3,
      name: "INTERIOR",
      image: "/interior.png",
      link: "/interior"
    },
    {
      id: 4,
      name: "MARVEL",
      image: "/marvel.png",
      link: "/marvel"   
    },
    {
      id: 5,
      name: "SANITARY",
      image: "/sanitary.png",
      link: "/sanitary"
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">WHAT WE DO</h2>
          <div className="flex items-center justify-center">
            <div className="w-16 h-1 bg-red-600 rounded-full"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full mx-2"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
          </div>
        </div>

        {/* Slider */}
        <Slider {...settings}>
          {categories.map((category) => (
            <div key={category.id} className="px-4">
              <Link href={category.link} className="block group">
                <div className="flex flex-col items-center">
                  {/* Circular Image */}
                  <div className="relative w-48 h-48 mb-4 group-hover:scale-105 transition-transform duration-300">
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
                  <h3 className="text-sm font-bold text-black uppercase text-center group-hover:text-red-600 transition-colors duration-300">
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
