"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import LandItemTable from '@/components/AdminComponents/LandItemTable'

const page = () => {

  const [lands, setLands] = useState([]);

  const fetchLands = async () => {
    const response = await axios.get('/api/land');
    if (response.data.success) {
      setLands(response.data.lands);
    }
  }

  const deleteLand = async (mongoId) => {
    const response = await axios.delete('/api/land', {
      params: { id: mongoId }
    })
    if (response.data.success) {
      toast.success(response.data.message);
      fetchLands();
    } else {
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    fetchLands();
  }, []);

  return (
    <div className="flex-1 p-4">
      <h1 className="text-xl font-bold mb-4">
        Land List
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
                <th className="px-2 py-1 text-start">L.Title</th>
                <th className="px-2 py-1 text-start">L.Description</th>
                <th className="px-2 py-1 text-start">L.Type</th>
                <th className="px-2 py-1 text-start">L.Address</th>
                <th className="px-2 py-1 text-start">L.City</th>
                <th className="px-2 py-1 text-start">L.District</th>
                <th className="px-2 py-1 text-start">L.Country</th>
                <th className="px-2 py-1 text-start">L.Area Size</th>
                <th className="px-2 py-1 text-start">L.Price</th>
                <th className="px-2 py-1 text-start">L.Price Per Unit</th>
                <th className="px-2 py-1 text-start">L.Ownership Type</th>
                <th className="px-2 py-1 text-start">L.Utilities Available</th>
                <th className="px-2 py-1 text-start">L.Featured</th>
                <th className="px-2 py-1 text-start">L.Available</th>
                <th className="px-2 py-1 text-start">Date</th>
                <th className="px-2 py-1 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {lands.map((item, index) => (
                <LandItemTable
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default page