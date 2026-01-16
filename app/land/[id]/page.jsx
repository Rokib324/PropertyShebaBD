"use client"

import React, { useEffect, useState, use } from 'react'
import Image from 'next/image'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import axios from 'axios'
import { normalizeImageUrl } from '@/lib/utils/imageUtils'

const page = ({params}) => {
    const resolvedParams = use(params);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+8801704861100';

    const fetchLandData = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await axios.get('/api/land',{
                params: {
                    id: resolvedParams.id
                }
            })
            if(response.data.success){
                setData(response.data.land)
            } else {
                setError('Land not found')
            }
        } catch (error) {
            console.error('Error fetching land:', error)
            setError('Failed to load land details')
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (resolvedParams.id) {
            fetchLandData()
        }
    }, [resolvedParams.id])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-red-600 mx-auto mb-6"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 bg-red-600 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Land Details</h3>
                    <p className="text-gray-600">Please wait while we fetch the information...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
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
            <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-6">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Land Not Found</h2>
                    <p className="text-gray-600 mb-8 text-lg">The land you're looking for doesn't exist or has been removed.</p>
                    <Link href="/" className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                        Browse Lands
                    </Link>
                </div>
            </div>
        )
    }

    // Get the first image or a placeholder
    const landImage = normalizeImageUrl(data.images && data.images.length > 0 ? data.images[0] : '/placeholder-land.jpg');
    const locationDisplay = `${data.address || ''}${data.city ? ', ' + data.city : ''}${data.district ? ', ' + data.district : ''}${data.country ? ', ' + data.country : ''}`.trim();

    // Format land type for display
    const formatLandType = (type) => {
        if (!type) return 'N/A';
        return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section with Single Image */}
        <section className="relative">
            <div className="relative flex items-center justify-center bg-gray-100 py-4 sm:py-6 md:py-8 px-4 sm:px-6">
                <div className="relative w-full max-w-[1200px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl">
                    <Image 
                        src={landImage} 
                        alt={data.title} 
                        fill
                        className="object-cover transition-all duration-500" 
                        priority
                    />
                
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Featured Badge */}
                    {data.is_featured && (
                        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 bg-yellow-500 text-white px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-lg sm:rounded-xl md:rounded-2xl text-sm sm:text-base md:text-lg font-bold shadow-2xl">
                            ⭐ Featured
                        </div>
                    )}

                    {/* Land Title Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 md:bottom-6 md:left-6 md:right-6 text-white">
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 sm:mb-2 drop-shadow-2xl line-clamp-2">{data.title}</h1>
                        <div className="flex items-center text-sm sm:text-base md:text-lg lg:text-xl">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span className="drop-shadow-lg line-clamp-1">{locationDisplay || 'Location not specified'}</span>
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
                    {/* Land Overview */}
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">Land Overview</h2>
                        
                        {/* Land Features Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
                            <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-800 text-xs sm:text-sm">Land Type</h3>
                                <p className="text-xs sm:text-sm text-gray-600">{formatLandType(data.land_type)}</p>
                            </div>
                            
                            <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4v4m0-4h4m12 0V4m0 0h-4m4 0v4m0-4h4M4 16v4m0 0h4m-4 0v-4m0 4h4m12 0v4m0 0h-4m4 0v-4m0 4h4" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-800 text-xs sm:text-sm">Area Size</h3>
                                <p className="text-xs sm:text-sm text-gray-600">{data.area_size?.toLocaleString() || 'N/A'} sq ft</p>
                            </div>
                            
                            <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-800 text-xs sm:text-sm">Ownership</h3>
                                <p className="text-xs sm:text-sm text-gray-600">{formatLandType(data.ownership_type) || 'N/A'}</p>
                            </div>
                            
                            <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-800 text-xs sm:text-sm">Utilities</h3>
                                <p className="text-xs sm:text-sm text-gray-600">{data.utilities_available ? 'Available' : 'Not Available'}</p>
                            </div>
                        </div>

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
                    <div className="bg-linear-to-r from-red-600 to-red-700 rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 text-white">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="mb-4 sm:mb-6 md:mb-0 text-center md:text-left">
                                <h3 className="text-xl sm:text-2xl font-bold mb-2">Interested in this land?</h3>
                                <p className="text-sm sm:text-base text-red-100">Contact our expert agents for more information and viewing arrangements.</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                                <a 
                                    href={`tel:${contactPhone}`}
                                    className="bg-white text-red-600 hover:bg-gray-100 font-semibold py-3 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
                                >
                                    Call Now
                                </a>
                                <a 
                                    href={`https://wa.me/${contactPhone.replace(/\D/g,'')}?text=${encodeURIComponent(`Hello, I'm interested in ${data.title} located at ${locationDisplay}. Is it available?`)}`}
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
                                    <span className="text-gray-600 font-medium text-sm sm:text-base">Total Price</span>
                                    <span className="text-2xl sm:text-3xl font-bold text-red-600">
                                        {data.price?.toLocaleString() || 'N/A'}৳
                                    </span>
                                </div>
                                
                                {data.price_per_unit && (
                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <span className="text-gray-600 font-medium text-sm sm:text-base">Price Per Unit</span>
                                        <span className="text-lg sm:text-xl text-gray-800 font-semibold">
                                            {data.price_per_unit?.toLocaleString()}৳/sq ft
                                        </span>
                                    </div>
                                )}
                                
                                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                    <span className="text-gray-600 font-medium text-sm sm:text-base">Area Size</span>
                                    <span className="text-lg sm:text-xl text-gray-800 font-semibold">
                                        {data.area_size?.toLocaleString() || 'N/A'} sq ft
                                    </span>
                                </div>
                                
                                {data.price && data.area_size && (
                                    <div className="flex justify-between items-center py-3 bg-green-50 rounded-xl px-4">
                                        <span className="text-green-700 font-semibold text-sm sm:text-base">Per Sq Ft</span>
                                        <span className="text-xl sm:text-2xl font-bold text-green-600">
                                            {Math.round(data.price / data.area_size)?.toLocaleString()}৳
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Land Information Card */}
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Land Information</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm sm:text-base">Land Type</span>
                                    <span className="font-semibold text-gray-800 text-sm sm:text-base">{formatLandType(data.land_type)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm sm:text-base">Ownership</span>
                                    <span className="font-semibold text-gray-800 text-sm sm:text-base">{formatLandType(data.ownership_type)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm sm:text-base">City</span>
                                    <span className="font-semibold text-gray-800 text-sm sm:text-base">{data.city || 'N/A'}</span>
                                </div>
                                {data.district && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 text-sm sm:text-base">District</span>
                                        <span className="font-semibold text-gray-800 text-sm sm:text-base">{data.district}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm sm:text-base">Status</span>
                                    <span className={`inline-block px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold ${
                                        data.is_available 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {data.is_available ? 'Available' : 'Sold'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm sm:text-base">Utilities</span>
                                    <span className={`inline-block px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold ${
                                        data.utilities_available 
                                            ? 'bg-blue-100 text-blue-800' 
                                            : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {data.utilities_available ? 'Available' : 'Not Available'}
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
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    Contact Agent
                                </a>
                                
                                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
                                    <div className="flex items-center justify-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        Save Land
                                    </div>
                                </button>
                                
                                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
                                    <div className="flex items-center justify-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                        </svg>
                                        Share Land
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

