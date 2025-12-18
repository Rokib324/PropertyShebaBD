'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-8 text-lg">
          {error?.message || 'An unexpected error occurred'}
        </p>
        <div className="space-y-3">
          <button
            onClick={reset}
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Try again
          </button>
          <Link 
            href="/" 
            className="block text-gray-600 hover:text-gray-800 font-medium transition-colors duration-300"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  )
}

