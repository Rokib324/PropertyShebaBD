'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

const MarvelSanitary = () => {
  const [marbles, setMarbles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMarbles = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/marble');
      // Adjust this if your API uses a different key
      setMarbles(response.data.marbles || []);
      console.log('Marble data:', response.data.marbles);
    } catch (error) {
      console.error('Error fetching marbles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMarbles();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const handleShowLess = () => {
    setVisibleCount(5);
  };

  const visibleMarbles = marbles.slice(0, visibleCount);
  const hasMore = visibleCount < marbles.length;

  return (
    <div className="bg-white py-2 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">Tiles and Marble Listings</h2>
          <div className="flex items-center justify-center">
            <div className="w-16 h-1 bg-red-600 rounded-full"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full mx-2"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
          </div>
        </div>

        {/* Marble Grid / Loading / Empty */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : marbles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No marble / sanitary items found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {visibleMarbles.map((marble) => {
              // Try to support both your old shape and a property-like API
              const originalPrice = marble.originalPrice ?? marble.price;
              const discountedPrice =
                marble.discountedPrice ?? marble.pricePerSqft ?? marble.price;
              const computedDiscount =
                originalPrice && discountedPrice
                  ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
                  : null;
              const discount = marble.discount ?? computedDiscount ?? 10;

              return (
                <div
                  key={marble._id || marble.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative">
                    {/* Image */}
                    <div className="relative h-64 w-full">
                      <Image
                        src={marble.image}
                        alt={marble.title || marble.name || 'Marble item'}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                        className="object-cover"
                      />

                      {/* Discount Badge */}
                      {discount && (
                        <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-md text-sm font-bold">
                          -{discount}%
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                        {marble.title || marble.name}
                      </h3>

                      <p className="text-sm text-gray-600 mb-3">
                        {marble.location || marble.origin || 'Location not specified'}
                      </p>

                      {/* Pricing */}
                      <div className="mb-4">
                        <div className="flex items-center space-x-2">
                          {originalPrice && (
                            <span className="text-lg text-gray-400 line-through">
                              {originalPrice.toLocaleString()}৳
                            </span>
                          )}
                          {discountedPrice && (
                            <span className="text-xl font-bold text-gray-900">
                              {discountedPrice.toLocaleString()}৳
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Details Button */}
                      <Link
                        href={`/marble/${marble._id || marble.id}`}
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
              {isLoading ? (
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
              ) : (
                `Load More Properties (${marbles.length - visibleCount} remaining)`
              )}
            </button>
          )}

          {visibleCount > 5 && marbles.length > 5 && (
            <div className="space-y-4 mt-6">
              <p className="text-gray-600 text-lg mb-4">
                Showing {visibleCount} of {marbles.length} properties
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

export default MarvelSanitary;