import { assets } from '@/assests/assets'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const SideBar = () => {
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
        <Link href='/admin/land_list' className='font-semibold mt-5 flex items-center gap-2 py-1 px-3 sm:px-6 border border-solid border-black shadow-[-5px_5px_0px_#494949] hover:shadow-[-5px_5px_0px_#FF0000] transition-all duration-300'>
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
        <Link href='/admin/add_marvel_sanitary' className='font-semibold mt-5 flex items-center gap-2 py-1 px-3 sm:px-6 border border-solid border-black shadow-[-5px_5px_0px_#494949] hover:shadow-[-5px_5px_0px_#FF0000] transition-all duration-300'>
          <Image src={assets.add_icon} alt='' width={28}/> <p>Add Marvel & Sanitary</p>
        </Link>
        <Link href='/admin/marvel_sanitary_list' className='font-semibold mt-5 flex items-center gap-2 py-1 px-3 sm:px-6 border border-solid border-black shadow-[-5px_5px_0px_#494949] hover:shadow-[-5px_5px_0px_#FF0000] transition-all duration-300'>
          <Image src={assets.blog_icon} alt='' width={28}/> <p>Marvel & Sanitary List</p>
        </Link>
        </div>
      </div>
    </div>
  )
}

export default SideBar