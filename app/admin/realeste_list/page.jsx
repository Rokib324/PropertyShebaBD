"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import PropertyTableItem from '@/components/AdminComponents/PropertyTableItem'
const page = () => {

  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    const response = await axios.get('/api/property');
    if(response.data.success){
      setProperties(response.data.properties);
    }
  }

  const deleteProperty = async (mongoId) => {
    const response = await axios.delete('/api/property',{
      params: {
        id: mongoId
      }
    })
    if(response.data.success){
      toast.success(response.data.message);
      fetchProperties();
    }
    else{
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    fetchProperties();
  }, []);



  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1 className='text-xl font-medium mb-5'>Property List</h1>
      <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='hidden sm:block px-6 py-3'>Property Title</th>
              <th scope='col' className='px-6 py-3'>Property Description</th>
              <th scope='col' className='px-6 py-3'>Property Location</th>
              <th scope='col' className='px-6 py-3'>Property Original Price</th>
              <th scope='col' className='px-6 py-3'>Property Discounted Price</th>
              <th scope='col' className='px-6 py-3'>Property Discount</th>
              <th scope='col' className='px-6 py-3'>Property Type</th>
              <th scope='col' className='px-6 py-3'>Date</th>
              <th scope='col' className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((item,index) =>{
                return <PropertyTableItem key={index} mongoId={item._id} title={item.title} description={item.description} image={item.image} date={item.createdAt} deleteProperty={deleteProperty} location={item.location} originalPrice={item.originalPrice} discountedPrice={item.discountedPrice} discount={item.discount} type={item.type} />
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page