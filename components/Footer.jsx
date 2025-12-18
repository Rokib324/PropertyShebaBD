'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube, 
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCommentDots
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-red-600 text-white relative">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Brand Information */}
          <div className="space-y-4">
            {/* Logo */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-3xl font-bold">
                <span className="text-white">Property</span>
                <span className="text-white ml-1">Sheba</span>
              </div>
            </div>
            
            {/* Address */}
            <div className="flex items-start space-x-3">
              <FaMapMarkerAlt className="text-white mt-1 flex-shrink-0" />
              <p className="text-sm leading-relaxed">
                H-219/A/2, Tejkunipara,Tejgaon,Dhaka -1215
              </p>
            </div>
            
            {/* Contact Number */}
            <div className="flex items-center space-x-3">
              <FaPhone className="text-white" />
              <a href="tel:+880 1704861100" className="text-sm hover:underline">
              +880 1704861100
              </a>
            </div>
            
            {/* Email */}
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-white" />
              <a href="mailto:infodeshwear@gmail.com" className="text-sm hover:underline">
                propertyshebabd@gmail.com
              </a>
            </div>
          </div>

          {/* Middle Column - Company Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <div className="space-y-2">
              <Link href="#" className="block text-sm hover:underline">
                About us
              </Link>
              <Link href="#" className="block text-sm hover:underline">
                Privacy & Policy
              </Link>
              <Link href="#" className="block text-sm hover:underline">
                Find our outlet
              </Link>
            </div>
          </div>

          {/* Right Column - Opening Time */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Opening time</h3>
            <div className="space-y-2">
              <p className="text-sm">Saturday - Friday</p>
              <p className="text-sm">10AM - 11PM</p>
              <p className="text-sm text-gray-200">(All Days open)</p>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4 mt-8 pt-6 border-t border-red-500">
          <a 
            href="https://www.facebook.com/profile.php?id=61579345130718&rdid=j9IpUgYelZa2lOG7&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1C2KEDX38s%2F%3Fref%3D1#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-300"
          >
            <FaFacebookF className="text-white text-sm" />
          </a>
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-300"
          >
            <FaTwitter className="text-white text-sm" />
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors duration-300"
          >
            <FaInstagram className="text-white text-sm" />
          </a>
          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
          >
            <FaYoutube className="text-white text-sm" />
          </a>
          <a 
            href="https://wa.me/+8801704861100" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
          >
            <FaWhatsapp className="text-white text-sm" />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-red-500">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
          {/* Copyright */}
          <p className="text-sm text-gray-200">
            ©2025 Property Sheba BD. All Rights Reserved.
          </p>
          
          {/* Additional Links */}
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <Link href="/terms" className="text-sm text-gray-200 hover:underline">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-sm text-gray-200 hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <div className="fixed top-2/3 -translate-y-2/3 right-6 z-50">
        <a 
          href="https://wa.me/+8801704861100?text=Hello%20Property%20Sheba%20BD,%20I%20am%20interested%20in%20your%20services"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group"
        >
          {/* Pulsing ring animation */}
          <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></div>
          
          {/* Main button */}
          <div className="relative w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/50 transition-all duration-300 group-hover:scale-110">
            {/* WhatsApp icon - more visible */}
            <FaWhatsapp className="text-white text-3xl drop-shadow-lg" />
          </div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Chat with us on WhatsApp!
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </a>
      </div>
    </footer>
  );
};

export default Footer;