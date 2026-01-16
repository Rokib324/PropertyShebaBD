"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { assets } from '@/assests/assets'

const LoginPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    // Check if already logged in
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('/api/admin/login', {
                    timeout: 5000 // 5 second timeout
                });
                if (response.data?.success && response.data?.authenticated) {
                    router.push('/admin');
                } else {
                    setIsCheckingAuth(false);
                }
            } catch (error) {
                // Not authenticated or API error, stay on login page
                // This is expected if user is not logged in
                setIsCheckingAuth(false);
            }
        };
        // Only check auth on client side
        if (typeof window !== 'undefined') {
            checkAuth();
        } else {
            setIsCheckingAuth(false);
        }
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('/api/admin/login', formData);
            
            if (response.data.success) {
                toast.success('Login successful! Redirecting...');
                setTimeout(() => {
                    router.push('/admin');
                }, 1000);
            } else {
                toast.error(response.data.message || 'Login failed');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (isCheckingAuth) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-red-600 mx-auto mb-6"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 bg-red-600 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Checking Authentication...</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Logo and Title */}
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        <Image 
                            src={assets.logo} 
                            alt="Property Sheba BD" 
                            width={180} 
                            height={60}
                            priority
                            unoptimized
                        />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Admin Login</h2>
                    <p className="text-gray-600">Enter your credentials to access the admin panel</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Field */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all duration-300 outline-none"
                                placeholder="Enter your username"
                                disabled={isLoading}
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all duration-300 outline-none"
                                placeholder="Enter your password"
                                disabled={isLoading}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                                    Logging in...
                                </div>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </form>

                    {/* Security Notice */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-xs text-gray-500 text-center">
                            🔒 This is a secure admin area. Unauthorized access is prohibited.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Property Sheba BD © {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

