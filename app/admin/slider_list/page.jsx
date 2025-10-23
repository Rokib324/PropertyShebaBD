"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import SliderTableItem from '@/components/AdminComponents/SliderTableItem'
const page = () => {

  const [slides, setSlides] = useState([]);

  const fetchSlides = async () => {
    const response = await axios.get('/api/slider');
    if(response.data.success){
      setSlides(response.data.slides);
    }
  }

  const deleteSlide = async (mongoId) => {
    const response = await axios.delete('/api/slider',{
      params: {
        id: mongoId
      }
    })
    if(response.data.success){
      toast.success(response.data.message);
      fetchSlides();
    }
    else{
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    fetchSlides();
  }, []);



  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1 className='text-xl font-medium mb-5'>Slider List</h1>
      <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='hidden sm:block px-6 py-3'>Slider Title</th>
              <th scope='col' className='px-6 py-3'>Slider Description</th>
              <th scope='col' className='px-6 py-3'>Date</th>
              <th scope='col' className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {slides.map((item,index) =>{
              return <SliderTableItem key={index} mongoId={item._id} title={item.title} description={item.description} image={item.image} date={item.date} deleteSlide={deleteSlide} />
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page