"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import LandItemTable from '@/components/AdminComponents/LandItemTable'
const page = () => {

  const [lands, setLands] = useState([]);

  const fetchLands = async () => {
    const response = await axios.get('/api/land');
    if(response.data.success){
      setLands(response.data.lands);
    }
  }

  const deleteLand = async (mongoId) => {
    const response = await axios.delete('/api/land',{
      params: {
        id: mongoId
      }
    })
    if(response.data.success){
      toast.success(response.data.message);
      fetchLands();
    }
    else{
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    fetchLands();
  }, []);



  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1 className='text-xl font-medium mb-5'>Land List</h1>
      <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
                <th scope='col' className='hidden sm:block px-6 py-3'>Land Title</th>
                <th scope='col' className='px-6 py-3'>Land Description</th>
                <th scope='col' className='px-6 py-3'>Land Type</th>
                <th scope='col' className='px-6 py-3'>Land Address</th>
                <th scope='col' className='px-6 py-3'>Land City</th>
                <th scope='col' className='px-6 py-3'>Land District</th>
                <th scope='col' className='px-6 py-3'>Land Country</th>
                <th scope='col' className='px-6 py-3'>Land Area Size</th>
                <th scope='col' className='px-6 py-3'>Land Price</th>
                <th scope='col' className='px-6 py-3'>Land Price Per Unit</th>
                <th scope='col' className='px-6 py-3'>Land Ownership Type</th>
                <th scope='col' className='px-6 py-3'>Land Utilities Available</th>
                <th scope='col' className='px-6 py-3'>Land Is Featured</th>
                <th scope='col' className='px-6 py-3'>Land Is Available</th>
              <th scope='col' className='px-6 py-3'>Date</th>
              <th scope='col' className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {lands.map((item,index) =>{
                return <LandItemTable 
                  key={index} 
                  mongoId={item._id} 
                  title={item.title} 
                  description={item.description} 
                  land_type={item.land_type}
                  address={item.address}
                  city={item.city}
                  district={item.district}
                  country={item.country}
                  area_size={item.area_size}
                  price={item.price}
                  price_per_unit={item.price_per_unit}
                  ownership_type={item.ownership_type}
                  utilities_available={item.utilities_available}
                  is_featured={item.is_featured}
                  is_available={item.is_available}
                  date={item.created_at} 
                  deleteLand={deleteLand} 
                />
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page