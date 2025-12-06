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
      console.error('Error fetching sanitary:', error);
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
      console.error('Error deleting sanitary:', error);
    }
  };

  useEffect(() => {
    fetchSanitary();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold text-gray-800">Sanitary Collection</h1>
        <div className="text-sm text-gray-600">
          Total Items:{' '}
          <span className="font-semibold text-blue-600">
            {sanitaryItems?.length || 0}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="relative h-[80vh] overflow-x-auto">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="hidden sm:table-cell px-6 py-4 text-left font-semibold">
                  Sanitary Details
                </th>
                <th className="px-6 py-4 text-left font-semibold">Category</th>
                <th className="px-6 py-4 text-left font-semibold">Brand</th>
                <th className="px-6 py-4 text-left font-semibold">Material</th>
                <th className="px-6 py-4 text-left font-semibold">Color</th>
                <th className="px-6 py-4 text-left font-semibold">Price</th>
                <th className="px-6 py-4 text-left font-semibold">
                  Original Price
                </th>
                <th className="px-6 py-4 text-left font-semibold">Discount</th>
                <th className="px-6 py-4 text-left font-semibold">Stock</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-left font-semibold">Features</th>
                <th className="px-6 py-4 text-left font-semibold">Date Added</th>
                <th className="px-6 py-4 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {!sanitaryItems || sanitaryItems.length === 0 ? (
                <tr>
                  <td
                    colSpan={13}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <svg
                          className="w-8 h-8 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          />
                        </svg>
                      </div>
                      <p className="text-lg font-medium text-gray-600">
                        No Sanitary Items Found
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Add your first sanitary item to get started
                      </p>
                    </div>
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