"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import InteriorItemTable from '@/components/AdminComponents/InteriorItemTable'
const page = () => {

  const [interiors, setInteriors] = useState([]);

  const fetchInteriors = async () => {
    try {
      const response = await axios.get('/api/interior');
      if(response.data.success){
        setInteriors(response.data.interiors);
      } else {
        toast.error(response.data.message || 'Failed to fetch interiors');
      }
    } catch (error) {
      console.error('Error fetching interiors:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch interiors');
      setInteriors([]); // Set empty array on error
    }
  }

  const deleteInterior = async (mongoId) => {
    const response = await axios.delete('/api/interior',{
      params: {
        id: mongoId
      }
    })
    if(response.data.success){
      toast.success(response.data.message);
      fetchInteriors();
    }
    else{
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    fetchInteriors();
  }, []);



  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1 className='text-xl font-medium mb-5'>Interior List</h1>
      <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='hidden sm:block px-6 py-3'>Title</th>
              <th scope='col' className='px-6 py-3'>Description</th>
              <th scope='col' className='px-6 py-3'>Category</th>
              <th scope='col' className='px-6 py-3'>Price</th>
              <th scope='col' className='px-6 py-3'>Stock</th>
              <th scope='col' className='px-6 py-3'>Is Available</th>
              <th scope='col' className='px-6 py-3'>Date</th>
              <th scope='col' className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {interiors && interiors.length > 0 ? (
              interiors.map((item,index) =>{
                return <InteriorItemTable key={index} mongoId={item._id} title={item.title} description={item.description} image={item.image} date={item.createdAt} deleteInterior={deleteInterior} category={item.category} price={item.price} stock={item.stock} isAvailable={item.isAvailable} />
              })
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                  No interior items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page