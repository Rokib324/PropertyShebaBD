"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import MarbleItemTable from '@/components/AdminComponents/MarbleItemTable'

const page = () => {

  const [marbles, setMarbles] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchMarbles = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/marble')
      if (response.data.success) {
        setMarbles(response.data.marbles)
      }
    } catch (error) {
      toast.error('Failed to fetch marble data')
    } finally {
      setLoading(false)
    }
  }

  const deleteMarble = async (mongoId) => {
    try {
      const response = await axios.delete('/api/marble', {
        params: { id: mongoId }
      })
      if (response.data.success) {
        toast.success(response.data.message)
        fetchMarbles()
      } else {
        toast.error(response.data.message)
      }
    } catch {
      toast.error('Failed to delete marble')
    }
  }

  useEffect(() => {
    fetchMarbles()
  }, [])

  if (loading) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-4">
      <div className="flex mb-6">
        <h1 className="text-2xl font-bold">
          Marble & Stone Collection
        </h1>
      </div>

      {/* OUTER SCROLL WRAPPER */}
      <div className="max-w-5xl border border-red-300 rounded-md">

        {/* INNER VERTICAL SCROLL */}
        <div className="relative h-[80vh] overflow-y-auto overflow-x-scroll">

          <table className=" w-full
              table-auto
              border-collapse
              text-xs
              text-gray-900">
            <thead className="sticky top-0 z-10 bg-gray-100 text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Marble Details</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Color</th>
                <th className="px-4 py-3 text-left">Finish</th>
                <th className="px-4 py-3 text-left">Thickness</th>
                <th className="px-4 py-3 text-left">Size</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Price / Sqft</th>
                <th className="px-4 py-3 text-left">Origin</th>
                <th className="px-4 py-3 text-left">Stock</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Features</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y">
              {marbles.length === 0 ? (
                <tr>
                  <td colSpan="14" className="py-12 text-center text-gray-500">
                    No Marble Items Found
                  </td>
                </tr>
              ) : (
                marbles.map((item, index) => (
                  <MarbleItemTable
                    key={item._id || index}
                    mongoId={item._id}
                    name={item.name}
                    category={item.category}
                    color={item.color}
                    finish={item.finish}
                    thickness={item.thickness}
                    size={item.size}
                    price={item.price}
                    pricePerSqft={item.pricePerSqft}
                    origin={item.origin}
                    stock={item.stock}
                    isAvailable={item.isAvailable}
                    features={item.features}
                    image={item.image}
                    description={item.description}
                    createdAt={item.createdAt || item.created_at}
                    deleteMarble={deleteMarble}
                  />
                ))
              )}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  )
}

export default page