'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaChevronDown, 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube, 
  FaPinterestP,
  FaSearch,
} from 'react-icons/fa';
import { CiHeart, CiUser } from 'react-icons/ci';
import { LiaBarsSolid, LiaShoppingBagSolid } from 'react-icons/lia';

const Navbar = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const categoriesRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setIsCategoriesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full">
      {/* Top Bar */}
      <div className="bg-red-600 text-white py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          {/* Left Side */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              
            </div>
            <div className="w-px h-4 bg-white/25"></div>
            <div className="flex items-center space-x-2">
              <span>ENGLISH</span>
              <FaChevronDown className="text-xs" />
            </div>
            
            
            <div className="w-px h-4 bg-white/25"></div>
            <div className="flex items-center space-x-2">
              <span>COUNTRY</span>
              <FaChevronDown className="text-xs" />
            </div>
            <div className="w-px h-4 bg-white/25"></div>
            <div className="text-center">
            <span>FREE SHIPPING FOR ALL ORDERS OF 3000TK</span>
          </div>
          </div>

          

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <FaFacebookF className="text-sm" />
              <FaTwitter className="text-sm" />
              <FaInstagram className="text-sm" />
              <FaYoutube className="text-sm" />
              <FaPinterestP className="text-sm" />
            </div>
            <div className="w-px h-4 bg-white"></div>
            <Link href="/newsletter" className="hover:underline">NEWSLETTER</Link>
            <div className="w-px h-4 bg-white"></div>
            <Link href="/contact" className="hover:underline">CONTACT US</Link>
            <div className="w-px h-4 bg-white"></div>
            <Link href="/faqs" className="hover:underline">FAQS</Link>
          </div>
        </div>
      </div>
      <div>
            <hr className="border-white" />
        </div>

      {/* Main Navigation Bar */}
      <div className="bg-red-600 text-white py-1 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center justify-center ml-20 mr-20">
            <Link href="/" className="flex items-center">
              <Image 
                src="/pro_shebaBD_logo.png" 
                alt="Property Sheba BD" 
                width={120} 
                height={120}
                className="h-12 md:h-14 w-auto"
              />
            </Link>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="w-full md:flex flex-1 max-w-2xl mx-8 ">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products"
                className="w-full py-1 px-4 border border-red-600 bg-white rounded-full text-gray-700 focus:outline-none focus:ring-1 focus:ring-red-300"
              />
              <button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700">
                <FaSearch className="text-xs" />
              </button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <Link href="/profile" className="flex items-center">
              <CiUser className="text-lg md:text-xl" />
            </Link>
            <Link href="/wishlist" className="flex items-center relative">
              <CiHeart className="text-lg md:text-xl" />
              <span className="absolute -top-3 -right-3 bg-white text-red-600 text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center font-bold">0</span>
            </Link>
            <Link href="/cart" className="flex items-center relative">
              <LiaShoppingBagSolid className="text-lg md:text-xl" />
              <span className="absolute -top-3 -right-3 bg-white text-red-600 text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center font-bold">0</span>
            </Link>
            <div className="text-sm md:text-lg font-medium hidden sm:block">0.00৳</div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-1 px-4">
          {/* Left Side - Categories */}
          <div className="relative" ref={categoriesRef}>
            <div className="flex items-center space-x-3 cursor-pointer border-l border-r border-black hover:bg-gray-50 px-2 w-60 justify-between"
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            >
            <div className="flex items-center space-x-3">
              <LiaBarsSolid className="text-gray-600 text-lg" />
              <span className="text-gray-700 font-semibold uppercase text-sm">CATEGORIES</span>
              </div>
              <FaChevronDown className={`text-gray-600 text-sm transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
            </div>
            
            {/* Dropdown Menu */}
            {isCategoriesOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <div className="py-2">
                  <Link 
                    href="/land" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    onClick={() => setIsCategoriesOpen(false)}
                  >
                    Land
                  </Link>
                  <Link 
                    href="/real-estate" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    onClick={() => setIsCategoriesOpen(false)}
                  >
                    Real Estate
                  </Link>
                  <Link 
                    href="/interior" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    onClick={() => setIsCategoriesOpen(false)}
                  >
                    Interior
                  </Link>
                  <Link 
                    href="/marvel" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    onClick={() => setIsCategoriesOpen(false)}
                  >
                    Marvel & Sanitary
                  </Link>

                </div>
              </div>
            )}
          </div>

          {/* Right Side - Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/shop" className="text-black font-semibold uppercase text-sm hover:underline">SHOP</Link>
            <Link href="/order-tracking" className="text-black font-semibold uppercase text-sm hover:underline">ORDER TRACKING</Link>
            <Link href="/contact" className="text-black font-semibold uppercase text-sm hover:underline">CONTACT US</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
