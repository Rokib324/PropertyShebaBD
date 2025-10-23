'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [slides, setSlides] = useState([]);

  const fetchSlides = async () => {
    const response = await axios.get('/api/slider');
    setSlides(response.data.slides);
    console.log(response.data.slides);
  }

  useEffect(() => {
    fetchSlides();
  }, []);

  // Auto-play functionality - 5 seconds interval
  useEffect(() => {
    if (slides.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Don't render if no slides are loaded yet
  if (slides.length === 0) {
    return (
      <div className="relative w-full h-[60vh] overflow-hidden bg-gray-200 flex items-center justify-center">
        <div className="text-gray-500 text-xl">Loading slides...</div>
      </div>
    );
  }

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={currentSlideData.image}
          alt="Property image"
          fill
          className="object-cover"
          priority={currentSlide === 0}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {currentSlideData.title}
            </h1>
            <p className="text-xl text-white mb-8 leading-relaxed">
              {currentSlideData.description}
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-xl" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-xl" />
      </button>
    </div>
  );
};

export default HeroSlider;
