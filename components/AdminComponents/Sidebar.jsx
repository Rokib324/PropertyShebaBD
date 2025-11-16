"use client"

import { assets } from '@/assests/assets'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'

const SideBar = () => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await axios.post('/api/admin/logout')
      toast.success('Logged out successfully')
      router.push('/admin/login')
    } catch (error) {
      toast.error('Logout failed')
      console.error('Logout error:', error)
    }
  }

  return (
    <div className='flex flex-col bg-slate-100'>
      <div className='px-2 sm:pl-14 py-3'>
        <Image src={assets.logo} alt='logo' width={50}/>
      </div>
      <div className='w-28 sm:w-80 h-[100vh] relative py-12 border border-black'>
        <div className='w-[50%] sm:w-[80%] absolute right-0'>
        <Link href='/admin/add_slider' className='font-semibold flex items-center gap-2 py-1 px-3 sm:px-6 border border-solid border-black shadow-[-5px_5px_0px_#494949] hover:shadow-[-5px_5px_0px_#FF0000] transition-all duration-300'>
          <Image src={assets.add_icon} alt='' width={28}/> <p>Add Slider</p>
        </Link>
        <Link href='/admin/slider_list' className='font-semibold mt-5 flex items-center gap-2 py-1 px-3 sm:px-6 border border-solid border-black shadow-[-5px_5px_0px_#494949] hover:shadow-[-5px_5px_0px_#FF0000] transition-all duration-300'>
          <Image src={assets.blog_icon} alt='' width={28}/> <p>Slider List</p>
        </Link>
        <Link href='/admin/add_land' className='font-semibold mt-5 flex items-center gap-2 py-1 px-3 sm:px-6 border border-solid border-black shadow-[-5px_5px_0px_#494949] hover:shadow-[-5px_5px_0px_#FF0000] transition-all duration-300'>
          <Image src={assets.add_icon} alt='' width={28}/> <p>Add Land</p>
        </Link>
        <Link href='/admin/Land_list' className='font-semibold mt-5 flex items-center gap-2 py-1 px-3 sm:px-6 border border-solid border-black shadow-[-5px_5px_0px_#494949] hover:shadow-[-5px_5px_0px_#FF0000] transition-all duration-300'>
          <Image src={assets.blog_icon} alt='' width={28}/> <p>Land List</p>
        </Link>
        <Link href='/admin/add_realestate' className='font-semibold mt-5 flex items-center gap-2 py-1 px-3 sm:px-6 border border-solid border-black shadow-[-5px_5px_0px_#494949] hover:shadow-[-5px_5px_0px_#FF0000] transition-all duration-300'>
          <Image src={assets.add_icon} alt='' width={28}/> <p>Add Real Estate</p>
        </Link>
        <Link href='/admin/realeste_list' className='font-semibold mt-5 flex items-center gap-2 py-1 px-3 sm:px-6 border border-solid border-black shadow-[-5px_5px_0px_#494949] hover:shadow-[-5px_5px_0px_#FF0000] transition-all duration-300'>
          <Image src={assets.blog_icon} alt='' width={28}/> <p>Real Estate List</p>
        </Link>
        <Link href='/admin/add_interior' className='font-semibold mt-5 flex items-center gap-2 py-1 px-3 sm:px-6 border border-solid border-black shadow-[-5px_5px_0px_#494949] hover:shadow-[-5px_5px_0px_#FF0000] transition-all duration-300'>
          <Image src={assets.add_icon} alt='' width={28}/> <p>Add Interior</p>
        </Link>
        <Link href='/admin/interior_list' className='font-semibold mt-5 flex items-center gap-2 py-1 px-3 sm:px-6 border border-solid border-black shadow-[-5px_5px_0px_#494949] hover:shadow-[-5px_5px_0px_#FF0000] transition-all duration-300'>
          <Image src={assets.blog_icon} alt='' width={28}/> <p>Interior List</p>
        </Link>
        <Link href='/admin/add_marvel' className='font-semibold mt-5 flex items-center gap-2 py-1 px-3 sm:px-6 border border-solid border-black shadow-[-5px_5px_0px_#494949] hover:shadow-[-5px_5px_0px_#FF0000] transition-all duration-300'>
          <Image src={assets.add_icon} alt='' width={28}/> <p>Add Marvel </p>
        </Link>
        <Link href='/admin/marvel_list' className='font-semibold mt-5 flex items-center gap-2 py-1 px-3 sm:px-6 border border-solid border-black shadow-[-5px_5px_0px_#494949] hover:shadow-[-5px_5px_0px_#FF0000] transition-all duration-300'>
          <Image src={assets.blog_icon} alt='' width={28}/> <p>Marvel List</p>
        </Link>
        <Link href='/admin/add_sanitary' className='font-semibold mt-5 flex items-center gap-2 py-1 px-3 sm:px-6 border border-solid border-black shadow-[-5px_5px_0px_#494949] hover:shadow-[-5px_5px_0px_#FF0000] transition-all duration-300'>
          <Image src={assets.add_icon} alt='' width={28}/> <p>Add Sanitary </p>
        </Link>
        <Link href='/admin/sanitary_list' className='font-semibold mt-5 flex items-center gap-2 py-1 px-3 sm:px-6 border border-solid border-black shadow-[-5px_5px_0px_#494949] hover:shadow-[-5px_5px_0px_#FF0000] transition-all duration-300'>
          <Image src={assets.blog_icon} alt='' width={28}/> <p>Sanitary List</p>
        </Link>
        
        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className='font-semibold mt-8 flex items-center gap-2 py-1 px-3 sm:px-6 border border-solid border-red-600 bg-red-600 text-white shadow-[-5px_5px_0px_#494949] hover:shadow-[-5px_5px_0px_#FF0000] hover:bg-red-700 transition-all duration-300 w-full'
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l-4-4m0 0l4-4m-4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <p>Logout</p>
        </button>
        </div>

      </div>
    </div>
  )
}

export default SideBar