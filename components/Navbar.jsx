'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
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
  const router = useRouter();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const categoriesRef = useRef(null);
  const searchRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setIsCategoriesOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle hash scrolling on page load
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const sectionId = hash.substring(1); // Remove the # symbol
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    };

    // Scroll on initial load if hash exists
    handleHashScroll();

    // Also listen for hash changes
    window.addEventListener('hashchange', handleHashScroll);
    return () => {
      window.removeEventListener('hashchange', handleHashScroll);
    };
  }, []);

  // Debounced search function
  useEffect(() => {
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // If search query is too short, clear results
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      setIsSearching(false);
      return;
    }

    // Set loading state
    setIsSearching(true);
    setShowResults(true);

    // Debounce search API call
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const response = await axios.get(`/api/search?q=${encodeURIComponent(searchQuery.trim())}`);
        if (response.data.success) {
          setSearchResults(response.data.results || []);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300); // 300ms debounce delay

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim().length >= 2) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowResults(false);
      setSearchQuery('');
    }
  };

  const handleResultClick = (link) => {
    router.push(link);
    setShowResults(false);
    setSearchQuery('');
  };

  const handleCategoryClick = (e, sectionId) => {
    e.preventDefault();
    setIsCategoriesOpen(false);
    
    // Check if we're on the home page
    if (window.location.pathname === '/') {
      // Scroll to section smoothly
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Navigate to home page with hash, then scroll
      router.push(`/#${sectionId}`);
      // Wait for navigation and then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

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
            <span>FREE SHIPPING FOR ALL ORDERS OF 30000TK</span>
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
          <div className="w-full md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearchSubmit} className="relative w-full" ref={searchRef}>
              <input
                type="text"
                placeholder="Search for products, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (searchResults.length > 0 || searchQuery.trim().length >= 2) {
                    setShowResults(true);
                  }
                }}
                className="w-full py-1 px-4 pr-12 border border-red-600 bg-white rounded-full text-gray-700 focus:outline-none focus:ring-1 focus:ring-red-300"
              />
              <button 
                type="submit"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
              >
                <FaSearch className="text-xs" />
              </button>

              {/* Search Results Dropdown */}
              {showResults && (searchQuery.trim().length >= 2 || searchResults.length > 0) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                  {isSearching ? (
                    <div className="p-4 text-center text-gray-500">
                      <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
                      <p className="mt-2 text-sm">Searching...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <>
                      <div className="p-2 border-b border-gray-200">
                        <p className="text-xs text-gray-500">
                          Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {searchResults.map((item) => (
                          <div
                            key={`${item.source}-${item._id}`}
                            onClick={() => handleResultClick(item.link)}
                            className="flex items-center gap-3 p-3 hover:bg-red-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                          >
                            <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                              <Image
                                src={item.image || '/land1.jpg'}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-900 truncate">
                                {item.name}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
                                  {item.categoryName}
                                </span>
                                {item.price && (
                                  <span className="text-xs text-gray-600">
                                    {typeof item.price === 'number' ? `${item.price}৳` : item.price}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {searchResults.length >= 20 && (
                        <div className="p-3 border-t border-gray-200 text-center">
                          <button
                            onClick={handleSearchSubmit}
                            className="text-sm text-red-600 hover:text-red-700 font-semibold"
                          >
                            View all results →
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      <p className="text-sm">No results found for "{searchQuery}"</p>
                      <p className="text-xs mt-1">Try different keywords</p>
                    </div>
                  )}
                </div>
              )}
            </form>
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
                  <a 
                    href="#land" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                    onClick={(e) => handleCategoryClick(e, 'land')}
                  >
                    Land
                  </a>
                  <a 
                    href="#real-estate" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                    onClick={(e) => handleCategoryClick(e, 'real-estate')}
                  >
                    Real Estate
                  </a>
                  <a 
                    href="#interior" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                    onClick={(e) => handleCategoryClick(e, 'interior')}
                  >
                    Interior
                  </a>
                  <a 
                    href="#marble" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                    onClick={(e) => handleCategoryClick(e, 'marble')}
                  >
                    Marble
                  </a>
                  <a 
                    href="#sanitary" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                    onClick={(e) => handleCategoryClick(e, 'sanitary')}
                  >
                    Sanitary
                  </a>
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
