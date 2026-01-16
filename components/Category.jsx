'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from 'react-toastify';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/addCategory'); // Your API endpoint
      if (response.data.success) {
        setCategories(response.data.slides || []); // Assuming your API returns { success: true, slides: [...] }
      } else {
        toast.error(response.data.message || 'Failed to fetch categories');
      }
    } catch (error) {
      toast.error('Error fetching categories');
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3, arrows: true } },
      { breakpoint: 1024, settings: { slidesToShow: 2, arrows: true } },
      { breakpoint: 768, settings: { slidesToShow: 1, arrows: false, dots: true } },
      { breakpoint: 480, settings: { slidesToShow: 1, arrows: false, dots: true } },
    ],
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

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
              <div key={category._id} className="px-3 sm:px-4 md:px-5">
                <Link href={`#${category.title.toLowerCase().replace(/\s+/g, '-')}`} className="block group">
                  <div className="flex flex-col items-center">
                    {/* Circular Image */}
                    <div className="relative mb-3 sm:mb-4 w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto">
                      <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-200 shadow-md">
                        <Image
                          src={category.image}
                          alt={category.title}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Category Name */}
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-black uppercase text-center group-hover:text-red-600 transition-colors duration-300 px-2">
                      {category.title}
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