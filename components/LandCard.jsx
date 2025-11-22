'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

const LandCard = () => {
  const [lands, setLands] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLands = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/land');
      setLands(response.data.lands);
      console.log(response.data.lands);
    } catch (error) {
      console.error('Error fetching lands:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLands();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 5);
  };

  const handleShowLess = () => {
    setVisibleCount(5);
  };

  const visibleLands = lands.slice(0, visibleCount);
  const hasMore = visibleCount < lands.length;

  return (
    <div className="bg-white py-2 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">Land Listings</h2>
          <div className="flex items-center justify-center">
            <div className="w-16 h-1 bg-red-600 rounded-full"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full mx-2"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
          </div>
        </div>

        {/* Land Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : lands.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No land properties found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {visibleLands.map((land) => (
              <div key={land._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  {/* Land Image */}
                  <div className="relative h-64 w-full">
                    <Image
                      src={land.images?.[0] || "/land1.jpg"}
                      alt={land.title}
                      fill
                      className="object-cover"
                    />
                    
                    {/* Land Type Badge */}
                    <div className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded-md text-sm font-bold capitalize">
                      {land.land_type}
                    </div>

                    {/* Featured Badge */}
                    {land.is_featured && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-md text-sm font-bold">
                        Featured
                      </div>
                    )}

                    {/* Availability Badge */}
                    <div className={`absolute bottom-3 right-3 px-2 py-1 rounded-md text-sm font-bold ${
                      land.is_available ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'
                    }`}>
                      {land.is_available ? 'Available' : 'Sold'}
                    </div>
                  </div>

                  {/* Land Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                      {land.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-2">{land.address}</p>
                    <p className="text-sm text-gray-500 mb-3">{land.city}, {land.district}</p>
                    
                    {/* Area Size */}
                    <div className="mb-3">
                      <span className="text-sm text-gray-600">Area: </span>
                      <span className="text-sm font-semibold text-gray-800">
                        {land.area_size} {land.area_size < 1 ? 'Decimal' : 'Acres'}
                      </span>
                    </div>

                    {/* Pricing */}
                    <div className="mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-gray-900">
                          {land.price?.toLocaleString()}৳
                        </span>
                        {land.price_per_unit && (
                          <span className="text-sm text-gray-500">
                            ({land.price_per_unit?.toLocaleString()}৳ per unit)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Ownership Type */}
                    <div className="mb-4">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {land.ownership_type === 'freehold' ? 'Freehold' : 'Leasehold'}
                      </span>
                      {land.utilities_available && (
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full ml-2">
                          Utilities Available
                        </span>
                      )}
                    </div>

                    {/* View Details Button */}
                    <Link
                      href={`/land/${land._id}`}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg text-center block transition-colors duration-300"
                    >
                      VIEW DETAILS
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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
                `Load More Lands (${lands.length - visibleCount} remaining)`
              )}
            </button>
          )}

          {/* Show Less Button - appears when more than 5 properties are visible */}
          {visibleCount > 5 && (
            <div className="space-y-4">
              <p className="text-gray-600 text-lg mb-4">
                Showing {visibleCount} of {lands.length} lands
              </p>
              <button 
                onClick={handleShowLess}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
              >
                Show Less Lands
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandCard;