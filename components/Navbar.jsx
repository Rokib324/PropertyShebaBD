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
  FaPhoneAlt,
  FaRegEnvelope,
} from 'react-icons/fa';
import { CiHeart, CiUser } from 'react-icons/ci';
import { LiaBarsSolid, LiaShoppingBagSolid } from 'react-icons/lia';

const Navbar = () => {
  const router = useRouter();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const categoriesRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const searchRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setIsCategoriesOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle hash scrolling on page load
  useEffect(() => {
    const handleHashScroll = () => {
      if (typeof window === 'undefined') return;
      const hash = window.location.hash;
      if (hash) {
        const sectionId = hash.substring(1);
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    };

    handleHashScroll();
    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', handleHashScroll);
      return () => window.removeEventListener('hashchange', handleHashScroll);
    }
  }, []);

  // Debounced search function
  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setShowResults(true);

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
    }, 300);

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
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
    setIsMobileMenuOpen(false);

    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/') {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        router.push(`/#${sectionId}`);
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  };

  return (
    <nav className="w-full">
      {/* Modal for Coming Soon */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 flex justify-center items-center z-60 p-4 pointer-events-none"
        >
          <div 
            className="bg-white p-5 rounded-lg shadow-2xl max-w-sm w-full transform transition-all border-2 border-gray-200 pointer-events-auto"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-2">{modalContent}</h3>
            <p className="text-gray-600 mb-4 text-sm">Stay tuned! This feature is coming soon. We are working hard to make it available to you.</p>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-600 text-white px-5 py-1.5 rounded-lg hover:bg-red-700 transition-colors font-semibold text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Bar – desktop / tablet only */}
      <div className="bg-red-600 text-white py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          {/* Left Side */}
          <div className="flex items-center space-x-4">
            <div className="w-px h-4 bg-white/25" />
            <div className="flex items-center space-x-2">
            <FaPhoneAlt className="text-sm" /> 
            <a href="tel:+8801704861100" className="text-sm hover:underline">+8801704861100</a>
            </div>

            <div className="w-px h-4 bg-white/25" />
            <div className="flex items-center space-x-2">
            <FaRegEnvelope className="text-sm" />
            <a href="mailto:propertyshebabd@gmail.com" className="text-sm hover:underline">propertyshebabd@gmail.com</a>
            </div>

            <div className="w-px h-4 bg-white/25" />
            <div className="text-center">
              <span>Trust Property | Honest Prices</span>
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
            <div className="w-px h-4 bg-white" />
            <Link 
              href="/newsletter" 
              className="hover:underline cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setModalContent('NEWSLETTER');
                setIsModalOpen(true);
              }}
            >
              NEWSLETTER
            </Link>
            <div className="w-px h-4 bg-white" />
            <Link 
              href="/contact" 
              className="hover:underline cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setModalContent('CONTACT US');
                setIsModalOpen(true);
              }}
            >
              CONTACT US
            </Link>
            <div className="w-px h-4 bg-white" />
            <Link 
              href="/faqs" 
              className="hover:underline cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setModalContent('FAQS');
                setIsModalOpen(true);
              }}
            >
              FAQS
            </Link>
          </div>
        </div>
      </div>

      <hr className="border-white hidden md:block" />

      {/* Main Navigation Bar */}
      <div className="bg-red-600 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Layout: Logo & Hamburger at top, Search below */}
          <div className="md:hidden flex flex-col gap-3">
            {/* Top Row: Logo & Hamburger */}
            <div className="flex items-center justify-between">
              {/* Logo & Brand */}
              <Link href="/" className="flex items-center space-x-2 group flex-1">
                <div className="relative">
                  <Image
                    src="/logo.png"
                    alt="Property Sheba BD"
                    width={120}
                    height={120}
                    className="h-10 w-auto group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="block">
                  <h1 className="text-base font-bold text-white">
                    Property Sheba BD
                  </h1>
                  <p className="text-xs text-white/90">
                    Trust Property | Honest Prices
                  </p>
                </div>
              </Link>

              {/* Mobile Hamburger Menu */}
              <div className="relative" ref={mobileMenuRef}>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-white p-2 hover:bg-white/10 rounded transition-colors flex items-center justify-center"
                  aria-label="Toggle categories menu"
                >
                  <LiaBarsSolid className="text-2xl" />
                </button>
                
                {/* Mobile Categories Dropdown */}
                {isMobileMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
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
            </div>

            {/* Search Bar - Full width below */}
            <div className="w-full">
              <form onSubmit={handleSearchSubmit} className="relative w-full" ref={searchRef}>
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (searchResults.length > 0 || searchQuery.trim().length >= 2) {
                      setShowResults(true);
                    }
                  }}
                  className="w-full py-2.5 px-4 pr-12 border border-red-600 bg-white rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-300 text-sm shadow-sm"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors shadow-sm"
                >
                  <FaSearch className="text-sm" />
                </button>

                {/* Search Results Dropdown */}
                {showResults && (searchQuery.trim().length >= 2 || searchResults.length > 0) && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                    {isSearching ? (
                      <div className="p-4 text-center text-gray-500">
                        <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-red-600" />
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
                              <div className="relative w-12 h-12 shrink-0 rounded overflow-hidden bg-gray-100">
                                <Image
                                  src={item.image || '/land1.jpg'}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-gray-900 truncate">
                                  {item.name}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded">
                                    {item.categoryName}
                                  </span>
                                  {item.price && (
                                    <span className="text-[10px] text-gray-600">
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
          </div>

          {/* Desktop Layout: Logo, Categories, Search in a row */}
          <div className="hidden md:flex md:items-center md:justify-between md:gap-4">
            {/* Logo & Brand */}
            <div className="shrink-0">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <Image
                    src="/logo.png"
                    alt="Property Sheba BD"
                    width={120}
                    height={120}
                    className="h-14 w-auto group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="block">
                  <h1 className="text-xl lg:text-2xl font-bold text-white">
                    Property Sheba BD
                  </h1>
                  <p className="text-sm text-white/90">
                    Trust Property | Honest Prices
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Categories - Section-like appearance */}
            <div className="flex items-center justify-center flex-1 px-6">
              <div className="flex items-center justify-center space-x-2 lg:space-x-3 rounded-lg px-4 py-1 border border-white/20">
                <a
                  href="#land"
                  onClick={(e) => handleCategoryClick(e, 'land')}
                  className="text-white text-sm md:text-base font-medium hover:text-red-200 transition-colors px-2 py-1 rounded hover:bg-white/20 whitespace-nowrap"
                >
                  Land
                </a>
                <a
                  href="#real-estate"
                  onClick={(e) => handleCategoryClick(e, 'real-estate')}
                  className="text-white text-sm md:text-base font-medium hover:text-red-200 transition-colors px-2 py-1 rounded hover:bg-white/20 whitespace-nowrap"
                >
                  Real Estate
                </a>
                <a
                  href="#interior"
                  onClick={(e) => handleCategoryClick(e, 'interior')}
                  className="text-white text-sm md:text-base font-medium hover:text-red-200 transition-colors px-2 py-1 rounded hover:bg-white/20 whitespace-nowrap"
                >
                  Interior
                </a>
                <a
                  href="#marble"
                  onClick={(e) => handleCategoryClick(e, 'marble')}
                  className="text-white text-sm md:text-base font-medium hover:text-red-200 transition-colors px-2 py-1 rounded hover:bg-white/20 whitespace-nowrap"
                >
                  Marble
                </a>
                <a
                  href="#sanitary"
                  onClick={(e) => handleCategoryClick(e, 'sanitary')}
                  className="text-white text-sm md:text-base font-medium hover:text-red-200 transition-colors px-2 py-1 rounded hover:bg-white/20 whitespace-nowrap"
                >
                  Sanitary
                </a>
              </div>
            </div>

            {/* Search Bar */}
            <div className="shrink-0 w-full max-w-md">
              <form onSubmit={handleSearchSubmit} className="relative w-full" ref={searchRef}>
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (searchResults.length > 0 || searchQuery.trim().length >= 2) {
                      setShowResults(true);
                    }
                  }}
                  className="w-full py-2.5 px-4 pr-12 border border-red-600 bg-white rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-300 text-sm shadow-sm"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors shadow-sm"
                >
                  <FaSearch className="text-sm" />
                </button>

                {/* Search Results Dropdown */}
                {showResults && (searchQuery.trim().length >= 2 || searchResults.length > 0) && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                    {isSearching ? (
                      <div className="p-4 text-center text-gray-500">
                        <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-red-600" />
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
                              <div className="relative w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded overflow-hidden bg-gray-100">
                                <Image
                                  src={item.image || '/land1.jpg'}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                                  {item.name}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-[10px] sm:text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
                                    {item.categoryName}
                                  </span>
                                  {item.price && (
                                    <span className="text-[10px] sm:text-xs text-gray-600">
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
          </div>
        </div>
      </div>      
    </nav>
  );
};

export default Navbar;