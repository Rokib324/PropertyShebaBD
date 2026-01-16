"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SanitaryItemTable from '@/components/AdminComponents/SanitaryTable';

const SanitaryListPage = () => {
  const [sanitaryItems, setSanitaryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSanitary = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/sanitary');
      if (response.data.success) {
        setSanitaryItems(response.data.sanitary || []);
      } else {
        setSanitaryItems([]);
        toast.error(response.data.message || 'Failed to fetch sanitary data');
      }
    } catch (error) {
      setSanitaryItems([]);
      toast.error('Failed to fetch sanitary data');
    } finally {
      setLoading(false);
    }
  };

  const deleteSanitary = async (mongoId) => {
    try {
      const response = await axios.delete('/api/sanitary', {
        params: { id: mongoId },
      });

      if (response.data.success) {
        toast.success(response.data.message || 'Sanitary item deleted');
        fetchSanitary();
      } else {
        toast.error(response.data.message || 'Failed to delete sanitary item');
      }
    } catch (error) {
      toast.error('Failed to delete sanitary item');
    }
  };

  useEffect(() => {
    fetchSanitary();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4">
      <div className="flex mb-6">
        <h1 className="text-xl md:text-2xl font-bold">
          Sanitary Collection
        </h1>
      </div>

      {/* OUTER HORIZONTAL SCROLL */}
      <div className="max-w-5xl overflow-x-auto border border-gray-300 rounded-md">

        {/* INNER VERTICAL SCROLL */}
        <div className="relative h-[80vh] overflow-y-auto overflow-x-scroll">

          <table className="w-full table-auto border-collapse text-sm text-gray-700">
            <thead className="sticky top-0 z-10 bg-gray-100 text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Sanitary Details</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Brand</th>
                <th className="px-4 py-3 text-left">Material</th>
                <th className="px-4 py-3 text-left">Color</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Original Price</th>
                <th className="px-4 py-3 text-left">Discount</th>
                <th className="px-4 py-3 text-left">Stock</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Features</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y">
              {sanitaryItems.length === 0 ? (
                <tr>
                  <td colSpan={13} className="py-12 text-center text-gray-500">
                    No Sanitary Items Found
                  </td>
                </tr>
              ) : (
                sanitaryItems.map((item, index) => (
                  <SanitaryItemTable
                    key={item._id || index}
                    mongoId={item._id}
                    name={item.name}
                    brand={item.brand}
                    category={item.category}
                    material={item.material}
                    color={item.color}
                    price={item.price}
                    originalPrice={item.originalPrice}
                    stock={item.stock}
                    isAvailable={item.isAvailable}
                    features={item.features}
                    image={item.image}
                    description={item.description}
                    createdAt={item.createdAt || item.created_at}
                    deleteSanitary={deleteSanitary}
                  />
                ))
              )}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default SanitaryListPage;