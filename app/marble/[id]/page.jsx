"use client"

import React, { useEffect, useState, use } from 'react'
import Image from 'next/image'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import axios from 'axios'

const page = ({params}) => {
    const resolvedParams = use(params);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+8801704861100';

    const fetchMarbleData = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await axios.get('/api/marble',{
                params: {
                    id: resolvedParams.id
                }
            })
            if(response.data.success){
                setData(response.data.marble)
            } else {
                setError('Marble not found')
            }
        } catch (error) {
            console.error('Error fetching marble:', error)
            setError('Failed to load marble details')
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (resolvedParams.id) {
            fetchMarbleData()
        }
    }, [resolvedParams.id])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-red-600 mx-auto mb-6"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 bg-red-600 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Marble Details</h3>
                    <p className="text-gray-600">Please wait while we fetch the information...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-6">
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
                    <p className="text-gray-600 mb-8 text-lg">{error}</p>
                    <div className="space-y-3">
                        <Link href="/" className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Back to Home
                        </Link>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="block mx-auto text-gray-600 hover:text-gray-800 font-medium transition-colors duration-300"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-6">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Marble Not Found</h2>
                    <p className="text-gray-600 mb-8 text-lg">The marble you're looking for doesn't exist or has been removed.</p>
                    <Link href="/" className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                        Browse Marbles
                    </Link>
                </div>
            </div>
        )
    }

    // Format category and finish for display
    const formatText = (text) => {
        if (!text) return 'N/A';
        return text.charAt(0).toUpperCase() + text.slice(1).replace(/_/g, ' ');
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section with Single Image */}
        <section className="relative">
            <div className="relative flex items-center justify-center bg-gray-100 py-4 sm:py-6 md:py-8 px-4 sm:px-6">
                <div className="relative w-full max-w-[1200px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl">
                    <Image 
                        src={data.image || '/placeholder-marble.jpg'} 
                        alt={data.name} 
                        fill
                        className="object-cover transition-all duration-500" 
                        priority
                    />
                
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Stock Badge */}
                    {!data.isAvailable && (
                        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 bg-gray-700 text-white px-2 py-1 sm:系的-3 sm:py-1.5 md:px-4 md:py-2 rounded-lg sm:rounded-xl md:rounded-2xl text-sm sm:text-base md:text-lg font-bold shadow-2xl">
                            Out of Stock
                        </div>
                    )}

                    {/* Marble Title Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 md:bottom-6 md:left-6 md:right-6 text-white">
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 sm:mb-2 drop-shadow-2xl line-clamp-2">{data.name}</h1>
                        <div className="flex items-center text-sm sm:text-base md:text-lg lg:text-xl">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span className="drop-shadow-lg line-clamp-1">{formatText(data.category)} • {data.origin}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                    {/* Marble Overview */}
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">Product Overview</h2>
                        
                        {/* Marble Features Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
                            <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7a1.994 1.994 0 013-1.414V7a4 4 0 014-4z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-800 text-xs sm:text-sm">Category</h3>
                                <p className="text-xs sm:text-sm text-gray-600">{formatText(data.category)}</p>
                            </div>
                            
                            <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-800 text-xs sm:text-sm">Finish</h3>
                                <p className="text-xs sm:text-sm text-gray-600">{formatText(data.finish)}</p>
                            </div>
                            
                            <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4v4m0-4h4m12 0V4m0 0h-4m4 0v4m0-4h4M4 16v4m0 0h4m-4 0v-4m0 4h4m12 0v4m0 0h-4m4 0v-4m0 4h4" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-800 text-xs sm:text-sm">Size</h3>
                                <p className="text-xs sm:text-sm text-gray-600">{data.size}</p>
                            </div>
                            
                            <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-800 text-xs sm:text-sm">Origin</h3>
                                <p className="text-xs sm:text-sm text-gray-600">{data.origin}</p>
                            </div>
                        </div>

                        {/* Additional Details */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="text-sm font-semibold text-gray-600 mb-1">Color</h4>
                                <p className="text-base font-medium text-gray-800">{data.color}</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="text-sm font-semibold text-gray-600 mb-1">Thickness</h4>
                                <p className="text-base font-medium text-gray-800">{data.thickness}</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="text-sm font-semibold text-gray-600 mb-1">Stock</h4>
                                <p className={`text-base font-medium ${data.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {data.stock || 0} Units
                                </p>
                            </div>
                        </div>

                        {/* Features */}
                        {data.features && data.features.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">Features</h3>
                                <div className="flex flex-wrap gap-2">
                                    {data.features.map((feature, index) => (
                                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Description */}
                        <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Description</h3>
                            <div 
                                className="prose prose-lg max-w-none text-gray-600 leading-relaxed" 
                                dangerouslySetInnerHTML={{ __html: data.description || 'No description available.' }} 
                            />
                        </div>
                    </div>

                    {/* Contact Agent Section */}
                    <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 text-white">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="mb-4 sm:mb-6 md:mb-0 text-center md:text-left">
                                <h3 className="text-xl sm:text-2xl font-bold mb-2">Interested in this marble?</h3>
                                <p className="text-sm sm:text-base text-red-100">Contact us for more information, custom sizing, and ordering details.</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                                <a 
                                    href={`tel:${contactPhone}`}
                                    className="bg-white text-red-600 hover:bg-gray-100 font-semibold py-3 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
                                >
                                    Call Now
                                </a>
                                <a 
                                    href={`https://wa.me/${contactPhone.replace(/\D/g,'')}?text=${encodeURIComponent(`Hello, I'm interested in ${data.name} (${formatText(data.category)}, ${data.color}). Is it available?`)}`}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="border-2 border-white text-white hover:bg-white hover:text-red-600 font-semibold py-3 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 text-center"
                                >
                                    WhatsApp Us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Sidebar */}
                <div className="lg:col-span-1">
                    <div className="lg:sticky lg:top-8 space-y-6">
                        {/* Pricing Card */}
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border-t-4 border-red-600">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Pricing Details</h3>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                    <span className="text-gray-600 font-medium text-sm sm:text-base">Price</span>
                                    <span className="text-2xl sm:text-3xl font-bold text-red-600">
                                        {data.price?.toLocaleString() || 'N/A'}৳
                                    </span>
                                </div>
                                
                                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                    <span className="text-gray-600 font-medium text-sm sm:text-base">Price per Sq Ft</span>
                                    <span className="text-lg sm:text-xl text-gray-800 font-semibold">
                                        {data.pricePerSqft?.toLocaleString() || 'N/A'}৳
                                    </span>
                                </div>
                                
                                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                    <span className="text-gray-600 font-medium text-sm sm:text-base">Category</span>
                                    <span className="text-lg sm:text-xl text-gray-800 font-semibold">
                                        {formatText(data.category)}
                                    </span>
                                </div>
                                
                                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                    <span className="text-gray-600 font-medium text-sm sm:text-base">Finish</span>
                                    <span className="text-lg sm:text-xl text-gray-800 font-semibold">
                                        {formatText(data.finish)}
                                    </span>
                                </div>
                                
                                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                    <span className="text-gray-600 font-medium text-sm sm:text-base">Size</span>
                                    <span className="text-lg sm:text-xl text-gray-800 font-semibold">
                                        {data.size}
                                    </span>
                                </div>
                                
                                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                    <span className="text-gray-600 font-medium text-sm sm:text-base">Thickness</span>
                                    <span className="text-lg sm:text-xl text-gray-800 font-semibold">
                                        {data.thickness}
                                    </span>
                                </div>
                                
                                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                    <span className="text-gray-600 font-medium text-sm sm:text-base">Origin</span>
                                    <span className="text-lg sm:text-xl text-gray-800 font-semibold">
                                        {data.origin}
                                    </span>
                                </div>
                                
                                <div className="flex justify-between items-center py-3 bg-green-50 rounded-xl px-4">
                                    <span className="text-green-700 font-semibold text-sm sm:text-base">Availability</span>
                                    <span className={`text-xl sm:text-2xl font-bold ${
                                        data.isAvailable ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        {data.isAvailable ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Product Information Card */}
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Product Information</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm sm:text-base">Category</span>
                                    <span className="font-semibold text-gray-800 text-sm sm:text-base">{formatText(data.category)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm sm:text-base">Color</span>
                                    <span className="font-semibold text-gray-800 text-sm sm:text-base">{data.color}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm sm:text-base">Finish</span>
                                    <span className="font-semibold text-gray-800 text-sm sm:text-base">{formatText(data.finish)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm sm:text-base">Size</span>
                                    <span className="font-semibold text-gray-800 text-sm sm:text-base">{data.size}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm sm:text-base">Thickness</span>
                                    <span className="font-semibold text-gray-800 text-sm sm:text-base">{data.thickness}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm sm:text-base">Origin</span>
                                    <span className="font-semibold text-gray-800 text-sm sm:text-base">{data.origin}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm sm:text-base">Stock</span>
                                    <span className="font-semibold text-gray-800 text-sm sm:text-base">{data.stock || 0} Units</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm sm:text-base">Status</span>
                                    <span className={`inline-block px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold ${
                                        data.isAvailable 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {data.isAvailable ? 'Available' : 'Out of Stock'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Take Action</h3>
                            <div className="space-y-4">
                                <a
                                    href={`tel:${contactPhone}`}
                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 -wise 3 14.284 3 6V5z" />
                                    </svg>
                                    Contact Us
                                </a>
                                
                                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
                                    <div className="flex items-center justify-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        Save Marble
                                    </div>
                                </button>
                                
                                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
                                    <div className="flex items-center justify-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                        </svg>
                                        Share Marble
                                    </div>
                                </button>
                                
                                <Link 
                                    href="/" 
                                    className="w-full bg-white border-2 border-gray-300 hover:border-red-600 text-gray-700 hover:text-red-600 font-semibold py-4 px-6 rounded-xl transition-all duration-300 text-center block transform hover:scale-105"
                                >
                                    <div className="flex items-center justify-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                        Back to Listings
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <Footer />
    </div>
  )
}

export default page
