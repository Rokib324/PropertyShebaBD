'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { normalizeImageUrl } from '@/lib/utils/imageUtils';

const Sanitary = () => {
  const [sanitary, setSanitary] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch sanitary data from API
  const fetchSanitary = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/sanitary');
      if (response.data.success) {
        // assuming response.data.sanitary is an array
        setSanitary(response.data.sanitary || []);
        console.log('Sanitary data:', response.data.sanitary);
      } else {
        setSanitary([]);
      }
    } catch (error) {
      console.error('Error fetching sanitary:', error);
      setSanitary([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSanitary();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 5);
  };

  const handleShowLess = () => {
    setVisibleCount(5);
  };

  const visibleItems = sanitary.slice(0, visibleCount);
  const hasMore = visibleCount < sanitary.length;

  return (
    <div className="bg-white py-2 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">Sanitary Listings</h2>
          <div className="flex items-center justify-center">
            <div className="w-16 h-1 bg-red-600 rounded-full"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full mx-2"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
          </div>
        </div>

        {/* Grid / Loading / Empty */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : sanitary.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No sanitary items found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {visibleItems.map((item) => {
              // Match your detail page logic
              const originalPrice = item.originalPrice ?? item.price ?? 0;
              const price = item.price ?? originalPrice ?? 0;

              const discountPercentage =
                originalPrice && price && originalPrice > price
                  ? Math.round(((originalPrice - price) / originalPrice) * 100)
                  : 0;

              return (
                <div
                  key={item._id || item.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative">
                    {/* Image */}
                    <div className="relative h-64 w-full">
                      <Image
                        src={normalizeImageUrl(item.image || '/placeholder-sanitary.jpg')}
                        alt={item.name || 'Sanitary item'}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                        className="object-cover"
                      />

                      {/* Discount Badge */}
                      {discountPercentage > 0 && (
                        <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-md text-sm font-bold">
                          -{discountPercentage}%
                        </div>
                      )}

                      {/* Out of stock badge */}
                      {item.isAvailable === false && (
                        <div className="absolute top-3 right-3 bg-gray-800 text-white px-2 py-1 rounded-md text-xs font-semibold">
                          Out of Stock
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-600 mb-3">
                        {item.brand || 'Brand not specified'}
                      </p>

                      {/* Pricing */}
                      <div className="mb-4">
                        <div className="flex items-center space-x-2">
                          {originalPrice && originalPrice > price && (
                            <span className="text-lg text-gray-400 line-through">
                              {originalPrice.toLocaleString()}৳
                            </span>
                          )}
                          <span className="text-xl font-bold text-gray-900">
                            {price ? price.toLocaleString() : '0'}৳
                          </span>
                        </div>
                      </div>

                      {/* Details Button */}
                      <Link
                        href={`/sanitary/${item._id || item.id}`}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg text-center block transition-colors duration-300"
                      >
                        VIEW DETAILS
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More / Show Less */}
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
              {isLoading
                ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Loading...
                  </span>
                )
                : `Load More Items (${sanitary.length - visibleCount} remaining)`
              }
            </button>
          )}

          {visibleCount > 5 && sanitary.length > 5 && (
            <div className="space-y-4 mt-6">
              <p className="text-gray-600 text-lg mb-4">
                Showing {visibleCount} of {sanitary.length} items
              </p>
              <button
                onClick={handleShowLess}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
              >
                Show Less Items
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sanitary;