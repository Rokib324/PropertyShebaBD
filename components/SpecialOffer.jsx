'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaHeart } from 'react-icons/fa';

const SpecialOffer = () => {
  const [activeTab, setActiveTab] = useState('SPECIAL OFFER');

  const tabs = ['SPECIAL OFFER', 'NEW', 'DISCOUNT', 'TOP SELLERS'];

  // Sale Products (Left Column)
  const saleProducts = [
    {
      id: 1,
      name: 'Luxury Real Estate Property',
      image: '/re1.jpg',
      originalPrice: 4500000,
      discountedPrice: 3990000,
      discount: 11,
      badge: 'NEW'
    }
  ];

  // Special Offer Products (Right Column)
  const specialOfferProducts = [
    {
      id: 1,
      name: 'Luxury Interior Design',
      image: '/int1.jpg',
      originalPrice: 2100000,
      discountedPrice: 2000000,
      discount: 5
    },
    {
      id: 2,
      name: 'Modern Interior Solutions',
      image: '/int2.jpg',
      originalPrice: 2100000,
      discountedPrice: 2000000,
      discount: 5
    },
    {
      id: 3,
      name: 'Premium Land Property',
      image: '/land1.jpg',
      originalPrice: 1800000,
      discountedPrice: 1700000,
      discount: 6
    },
    {
      id: 4,
      name: 'Commercial Land Space',
      image: '/land2.jpg',
      originalPrice: 4500000,
      discountedPrice: 3990000,
      discount: 11
    },
    {
      id: 5,
      name: 'Marble Interior Design',
      image: '/marbel1.jpg',
      originalPrice: 4500000,
      discountedPrice: 3990000,
      discount: 11
    },
    {
      id: 6,
      name: 'Premium Marble Solutions',
      image: '/marbel2.jpg',
      originalPrice: 4500000,
      discountedPrice: 3990000,
      discount: 11
    }
  ];

  const formatPrice = (price) => {
    return `${price.toFixed(2)}`;
  };

  return (
    <div className="bg-white py-2 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - SALE PRODUCTS */}
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-black">Special Offers Right Now</h2>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-300">
                  <FaChevronLeft className="text-sm" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-300">
                  <FaChevronRight className="text-sm" />
                </button>
              </div>
            </div>

            {/* Sale Product Card */}
            {saleProducts.map((product) => (
              <div key={product.id} className="bg-white border-2 border-red-500 rounded-lg overflow-hidden">
                <div className="relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-80 object-cover"
                  />
                  {/* Badges */}
                  <div className="absolute top-3 left-3 space-y-2">
                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      -{product.discount}%
                    </span>
                    <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full block">
                      {product.badge}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-sm font-medium text-black mb-3">{product.name}</h3>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="text-lg font-bold text-red-600">
                      {formatPrice(product.discountedPrice)}
                    </span>
                  </div>
                  
                  <button className="w-full bg-red-600 text-white py-3 px-4 rounded-md font-bold text-sm hover:bg-red-700 transition-colors duration-300">
                    ORDER NOW
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - SPECIAL OFFER */}
          <div className="space-y-6">
            {/* Header with Tabs */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-6">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-sm font-medium transition-colors duration-300 ${
                      activeTab === tab
                        ? 'text-black border-b-2 border-black'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-300">
                  <FaChevronLeft className="text-sm" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-300">
                  <FaChevronRight className="text-sm" />
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-3 gap-4">
              {specialOfferProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        -{product.discount}%
                      </span>
                    </div>
                    {product.id === 6 && (
                      <button className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 transition-colors duration-300">
                        <FaHeart className="text-sm" />
                      </button>
                    )}
                  </div>
                  
                  <div className="p-3">
                    <h3 className="text-xs font-medium text-black mb-2">{product.name}</h3>
                    
                    <div className="flex items-center space-x-1 mb-2">
                      <span className="text-xs text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="text-sm font-bold text-red-600">
                        {formatPrice(product.discountedPrice)}
                      </span>
                    </div>
                    
                    <button className="w-full bg-red-600 text-white py-2 px-2 rounded-md font-bold text-xs hover:bg-red-700 transition-colors duration-300">
                      ORDER NOW
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;
