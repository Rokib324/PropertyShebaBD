'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';

const ShowAllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const fetchCategories = async () => {
    try {
      setIsFetching(true);
      const response = await axios.get('/api/all-categories-gallery');
      console.log('API Response:', response.data);
      if (response.data.success) {
        setCategories(response.data.categories || []);
        console.log('Categories set:', response.data.categories);
      } else {
        console.error('API returned success: false', response.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      console.error('Error details:', error.response?.data || error.message);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleLoadMore = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setVisibleCount(prev => Math.min(prev + 5, categories.length));
    setIsLoading(false);
  };

  const handleShowLess = () => {
    setVisibleCount(10);
  };

  const visibleCategories = categories.slice(0, visibleCount);
  const hasMore = visibleCount < categories.length;
  const isAllLoaded = visibleCount >= categories.length;

  return (
    <div className="bg-white py-2 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">All Categories</h2>
          <div className="flex items-center justify-center">
            <div className="w-16 h-1 bg-red-600 rounded-full"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full mx-2"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
          </div>
          {categories.length > 0 && (
            <p className="text-gray-600 mt-4">Showing {visibleCategories.length} of {categories.length} items</p>
          )}
        </div>

        {/* Categories Grid */}
        {isFetching ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No categories found</p>
            <p className="text-gray-400 text-sm">Add categories through the admin panel to see them here.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {visibleCategories.map((category) => (
                <div key={category._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    {/* Category Image */}
                    <div className="relative h-64 w-full">
                      <Image
                        src={category.image || "/int1.jpg"}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />
                      
                      {/* Category Badge */}
                      {category.categoryName && (
                        <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-md text-xs font-bold capitalize">
                          {category.categoryName}
                        </div>
                      )}
                    </div>

                    {/* Category Info */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center uppercase line-clamp-2">
                        {category.name}
                      </h3>
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
                    `Load More Categories (${categories.length - visibleCount} remaining)`
                  )}
                </button>
              )}

              {/* Show Less Button - appears when all categories are loaded */}
              {isAllLoaded && visibleCount > 10 && (
                <div className="space-y-4">
                  <p className="text-gray-600 text-lg mb-4">
                    🎉 All {categories.length} categories loaded!
                  </p>
                  <button 
                    onClick={handleShowLess}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
                  >
                    Show Less Categories
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShowAllCategories;