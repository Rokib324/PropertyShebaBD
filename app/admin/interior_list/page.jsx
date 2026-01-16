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
      setInteriors([]);
    }
  }

  const deleteInterior = async (mongoId) => {
    const response = await axios.delete('/api/interior',{
      params: { id: mongoId }
    })
    if(response.data.success){
      toast.success(response.data.message);
      fetchInteriors();
    } else {
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    fetchInteriors();
  }, []);

  return (
    <div className="
      flex-1 
      pt-6 px-4
      sm:px-6 
      md:px-10 md:pt-10
      lg:px-16 lg:pt-12
    ">
      <h1 className="
        text-lg 
        md:text-xl 
        font-medium 
        mb-4 md:mb-6
      ">
        Interior List
      </h1>

      <div className="
        relative 
        h-[75vh] md:h-[80vh]
        w-full 
        max-w-full lg:max-w-[1200px]
        overflow-x-auto md:overflow-x-visible
        border border-gray-300
        rounded-md
      ">
        <table className="w-full text-xs md:text-sm text-gray-500">
          <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="hidden sm:table-cell px-4 md:px-6 py-3">Title</th>
              <th className="px-4 md:px-6 py-3">Description</th>
              <th className="px-4 md:px-6 py-3">Category</th>
              <th className="px-4 md:px-6 py-3">Price</th>
              <th className="px-4 md:px-6 py-3">Stock</th>
              <th className="px-4 md:px-6 py-3">Available</th>
              <th className="px-4 md:px-6 py-3">Date</th>
              <th className="px-4 md:px-6 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {interiors && interiors.length > 0 ? (
              interiors.map((item, index) => (
                <InteriorItemTable
                  key={index}
                  mongoId={item._id}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  date={item.createdAt}
                  deleteInterior={deleteInterior}
                  category={item.category}
                  price={item.price}
                  stock={item.stock}
                  isAvailable={item.isAvailable}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="px-6 py-6 text-center text-gray-500"
                >
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