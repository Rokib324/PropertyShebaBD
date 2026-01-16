"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import PropertyTableItem from '@/components/AdminComponents/PropertyTableItem'

const page = () => {

  const [properties, setProperties] = useState([])

  const fetchProperties = async () => {
    const response = await axios.get('/api/property')
    if (response.data.success) {
      setProperties(response.data.properties)
    }
  }

  const deleteProperty = async (mongoId) => {
    const response = await axios.delete('/api/property', {
      params: { id: mongoId }
    })
    if (response.data.success) {
      toast.success(response.data.message)
      fetchProperties()
    } else {
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  return (
    <div className="flex-1 p-4">
      <h1 className="text-xl font-bold mb-4">
        Real Estate List
      </h1>

      {/* OUTER HORIZONTAL SCROLLBAR */}
      <div className="w-full overflow-x-auto border border-gray-300 rounded-md">

        {/* INNER VERTICAL SCROLL */}
        <div className="relative h-[80vh] overflow-y-auto overflow-x-scroll">

          <table
            className="
              w-full
              table-auto
              border-collapse
              text-xs
              text-gray-900
            "
          >
            <thead className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-2 py-1 text-start">P.Title</th>
                <th className="px-2 py-1 text-start">P.Description</th>
                <th className="px-2 py-1 text-start">Location</th>
                <th className="px-2 py-1 text-start">O.Price</th>
                <th className="px-2 py-1 text-start">D.Price</th>
                <th className="px-2 py-1 text-start">Discount</th>
                <th className="px-2 py-1 text-start">Type</th>
                <th className="px-2 py-1 text-start">Date</th>
                <th className="px-2 py-1 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {properties.map((item, index) => (
                <PropertyTableItem
                  key={index}
                  mongoId={item._id}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  date={item.createdAt}
                  deleteProperty={deleteProperty}
                  location={item.location}
                  originalPrice={item.originalPrice}
                  discountedPrice={item.discountedPrice}
                  discount={item.discount}
                  type={item.type}
                />
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  )
}

export default page