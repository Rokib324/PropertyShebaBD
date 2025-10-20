'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const RealEstate = () => {
  const [visibleCount, setVisibleCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const allProperties = [
    {
      id: 1,
      title: "Luxury Apartment",
      location: "Dhanmondi, Dhaka",
      originalPrice: 4500000,
      discountedPrice: 3990000,
      discount: 11,
      image: "/re1.jpg",
      type: "Apartment"
    },
    {
      id: 2,
      title: "Modern Villa",
      location: "Gulshan, Dhaka",
      originalPrice: 4500000,
      discountedPrice: 3990000,
      discount: 11,
      image: "/re2.jpg",
      type: "Villa"
    },
    {
      id: 3,
      title: "Commercial Space",
      location: "Banani, Dhaka",
      originalPrice: 4000000,
      discountedPrice: 3500000,
      discount: 13,
      image: "/land1.jpg",
      type: "Commercial"
    },
    {
      id: 4,
      title: "Residential Plot",
      location: "Uttara, Dhaka",
      originalPrice: 4500000,
      discountedPrice: 3990000,
      discount: 11,
      image: "/land2.jpg",
      type: "Land"
    },
    {
      id: 5,
      title: "Penthouse Suite",
      location: "Baridhara, Dhaka",
      originalPrice: 4500000,
      discountedPrice: 3990000,
      discount: 11,
      image: "/int1.jpg",
      type: "Penthouse"
    },
    {
      id: 6,
      title: "Office Space",
      location: "Motijheel, Dhaka",
      originalPrice: 4500000,
      discountedPrice: 3990000,
      discount: 11,
      image: "/int2.jpg",
      type: "Office"
    },
    {
      id: 7,
      title: "Studio Apartment",
      location: "Wari, Dhaka",
      originalPrice: 4500000,
      discountedPrice: 3990000,
      discount: 11,
      image: "/marbel1.jpg",
      type: "Studio"
    },
    {
      id: 8,
      title: "Duplex House",
      location: "Dhanmondi, Dhaka",
      originalPrice: 4500000,
      discountedPrice: 3990000,
      discount: 11,
      image: "/marbel2.jpg",
      type: "Duplex"
    },
    {
      id: 9,
      title: "Townhouse",
      location: "Gulshan, Dhaka",
      originalPrice: 4500000,
      discountedPrice: 3990000,
      discount: 11,
      image: "/sanitary1.jpg",
      type: "Townhouse"
    },
    {
      id: 10,
      title: "Investment Property",
      location: "Banani, Dhaka",
      originalPrice: 4500000,
      discountedPrice: 3990000,
      discount: 11,
      image: "/sanitary2.jpg",
      type: "Investment"
    },
    {
      id: 11,
      title: "Premium Condo",
      location: "Dhanmondi, Dhaka",
      originalPrice: 5000000,
      discountedPrice: 4500000,
      discount: 10,
      image: "/re1.jpg",
      type: "Condo"
    },
    {
      id: 12,
      title: "Executive Suite",
      location: "Gulshan, Dhaka",
      originalPrice: 4800000,
      discountedPrice: 4200000,
      discount: 12,
      image: "/re2.jpg",
      type: "Suite"
    },
    {
      id: 13,
      title: "Retail Space",
      location: "Banani, Dhaka",
      originalPrice: 3500000,
      discountedPrice: 3000000,
      discount: 14,
      image: "/land1.jpg",
      type: "Retail"
    },
    {
      id: 14,
      title: "Industrial Plot",
      location: "Savar, Dhaka",
      originalPrice: 3000000,
      discountedPrice: 2700000,
      discount: 10,
      image: "/land2.jpg",
      type: "Industrial"
    },
    {
      id: 15,
      title: "Luxury Penthouse",
      location: "Baridhara, Dhaka",
      originalPrice: 6000000,
      discountedPrice: 5400000,
      discount: 10,
      image: "/int1.jpg",
      type: "Penthouse"
    },
    {
      id: 16,
      title: "Co-working Space",
      location: "Motijheel, Dhaka",
      originalPrice: 2500000,
      discountedPrice: 2200000,
      discount: 12,
      image: "/int2.jpg",
      type: "Co-working"
    },
    {
      id: 17,
      title: "Micro Apartment",
      location: "Wari, Dhaka",
      originalPrice: 2000000,
      discountedPrice: 1800000,
      discount: 10,
      image: "/marbel1.jpg",
      type: "Micro"
    },
    {
      id: 18,
      title: "Family House",
      location: "Dhanmondi, Dhaka",
      originalPrice: 5500000,
      discountedPrice: 4950000,
      discount: 10,
      image: "/marbel2.jpg",
      type: "Family"
    },
    {
      id: 19,
      title: "Garden Villa",
      location: "Gulshan, Dhaka",
      originalPrice: 7000000,
      discountedPrice: 6300000,
      discount: 10,
      image: "/sanitary1.jpg",
      type: "Villa"
    },
    {
      id: 20,
      title: "Rental Property",
      location: "Banani, Dhaka",
      originalPrice: 4000000,
      discountedPrice: 3600000,
      discount: 10,
      image: "/sanitary2.jpg",
      type: "Rental"
    }
  ];

  const handleLoadMore = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setVisibleCount(prev => Math.min(prev + 5, allProperties.length));
    setIsLoading(false);
  };

  const handleShowLess = () => {
    setVisibleCount(5);
    setShowAll(false);
  };

  const visibleProperties = allProperties.slice(0, visibleCount);
  const hasMore = visibleCount < allProperties.length;
  const isAllLoaded = visibleCount >= allProperties.length;

  return (
    <div className="bg-white py-2 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">Real Estate Listings</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto"></div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {visibleProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                {/* Property Image */}
                <div className="relative h-64 w-full">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Discount Badge */}
                  <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-md text-sm font-bold">
                    -{property.discount}%
                  </div>
                </div>

                {/* Property Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {property.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3">{property.location}</p>
                  
                  {/* Pricing */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg text-gray-400 line-through">
                        {property.originalPrice.toLocaleString()}৳
                      </span>
                      <span className="text-xl font-bold text-gray-900">
                        {property.discountedPrice.toLocaleString()}৳
                      </span>
                    </div>
                  </div>

                  {/* Order Button */}
                  <Link
                    href={`/property/${property.id}`}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg text-center block transition-colors duration-300"
                  >
                    VIEW DETAILS
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More / Show Less Buttons */}
        <div className="text-center mt-12">
          {hasMore && (
            <button 
              onClick={handleLoadMore}
              disabled={isLoading}
              className={`font-semibold py-3 px-8 rounded-lg transition-colors duration-300 ${
                isLoading 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                `Load More Properties (${allProperties.length - visibleCount} remaining)`
              )}
            </button>
          )}

          {/* Show Less Button - appears when more than 5 properties are visible */}
          {visibleCount > 5 && (
            <div className="space-y-4">
              <p className="text-gray-600 text-lg mb-4">
                Showing {visibleCount} of {allProperties.length} properties
              </p>
              <button 
                onClick={handleShowLess}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
              >
                Show Less Properties
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RealEstate;