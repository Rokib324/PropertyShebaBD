import { assets } from '@/assests/assets'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='flex-1 min-h-[calc(100vh-60px)] flex items-center justify-center'>
      <div className='flex flex-col items-center text-center'>
      <div className='py-3'>
        <Image src={assets.logo} alt='logo' width={220}/>
      </div>
        <h1 className='text-4xl font-bold text-gray-900 mb-6'>Welcome to Property Sheba BD Dashboard</h1>
        <p className='text-lg text-gray-600'>Manage your website content Here.</p>
      </div>
    </div>
  )
}

export default page 