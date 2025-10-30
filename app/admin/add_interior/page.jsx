'use client'

import React, { useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { toast } from 'react-toastify'

const page = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    title: '',
    description: '',
    category: 'furniture',
    price: '',
    stock: '',
    isAvailable: true
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    
    // Append basic info
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('price', data.price);
    formData.append('stock', data.stock);
    formData.append('isAvailable', data.isAvailable.toString());
    
    // Append image
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('/api/interior', formData);
      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form
        setData({
          title: '',
          description: '',
          category: 'furniture',
          price: '',
          stock: '',
          isAvailable: true
        });
        setImage(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error uploading interior item');
      console.error('Error:', error);
    }
  };

  return (
    <div className='pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1 className='text-2xl font-bold mb-8'>Add New Interior Item</h1>
      
      <form onSubmit={onSubmitHandler} className='space-y-6'>
        {/* Basic Information */}
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-4 text-gray-800'>Basic Information</h2>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Item Title *</label>
              <input
                type='text'
                name='title'
                value={data.title}
                onChange={onChangeHandler}
                className='w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                placeholder='Enter interior item title'
                required
              />
            </div>
            
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Category *</label>
              <select
                name='category'
                value={data.category}
                onChange={onChangeHandler}
                className='w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                required
              >
                <option value='furniture'>Furniture</option>
                <option value='decor'>Decor</option>
                <option value='lighting'>Lighting</option>
                <option value='kitchen'>Kitchen</option>
                <option value='bathroom'>Bathroom</option>
                <option value='package'>Package</option>
              </select>
            </div>
          </div>
          
          <div className='mt-4'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Description</label>
            <textarea
              name='description'
              value={data.description}
              onChange={onChangeHandler}
              rows={4}
              className='w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500'
              placeholder='Enter item description'
            />
          </div>
        </div>

        {/* Pricing & Stock Information */}
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-4 text-gray-800'>Pricing & Stock</h2>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Price (৳) *</label>
              <input
                type='number'
                name='price'
                value={data.price}
                onChange={onChangeHandler}
                min='0'
                step='0.01'
                className='w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                placeholder='Enter item price'
                required
              />
            </div>
            
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Stock Quantity *</label>
              <input
                type='number'
                name='stock'
                value={data.stock}
                onChange={onChangeHandler}
                min='0'
                className='w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                placeholder='Enter stock quantity'
                required
              />
            </div>
          </div>
          
          <div className='mt-4'>
            <label className='flex items-center'>
              <input
                type='checkbox'
                name='isAvailable'
                checked={data.isAvailable}
                onChange={onChangeHandler}
                className='mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded'
              />
              <span className='text-sm text-gray-700'>Item is available for purchase</span>
            </label>
          </div>
        </div>

        {/* Image Upload */}
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-4 text-gray-800'>Item Image</h2>
          
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Upload Image *</label>
            <input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              className='w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500'
              required
            />
            <p className='text-sm text-gray-500 mt-2'>Upload a high-quality image of the interior item</p>
          </div>
          
          {image && (
            <div className='mt-4'>
              <p className='text-sm font-medium text-gray-700 mb-2'>Image Preview:</p>
              <div className='relative w-48 h-48 border border-gray-300 rounded-md overflow-hidden'>
                <Image
                  src={URL.createObjectURL(image)}
                  alt='Preview'
                  fill
                  className='object-cover'
                />
              </div>
            </div>
          )}
        </div>

        {/* Category Information */}
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-4 text-gray-800'>Category Information</h2>
          
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
            <div className='p-4 border border-gray-200 rounded-lg'>
              <h3 className='font-semibold text-gray-800 mb-2'>Furniture</h3>
              <p className='text-sm text-gray-600'>Chairs, tables, sofas, beds, etc.</p>
            </div>
            
            <div className='p-4 border border-gray-200 rounded-lg'>
              <h3 className='font-semibold text-gray-800 mb-2'>Decor</h3>
              <p className='text-sm text-gray-600'>Artwork, plants, decorative items</p>
            </div>
            
            <div className='p-4 border border-gray-200 rounded-lg'>
              <h3 className='font-semibold text-gray-800 mb-2'>Lighting</h3>
              <p className='text-sm text-gray-600'>Lamps, chandeliers, LED lights</p>
            </div>
            
            <div className='p-4 border border-gray-200 rounded-lg'>
              <h3 className='font-semibold text-gray-800 mb-2'>Kitchen</h3>
              <p className='text-sm text-gray-600'>Kitchen appliances, utensils</p>
            </div>
            
            <div className='p-4 border border-gray-200 rounded-lg'>
              <h3 className='font-semibold text-gray-800 mb-2'>Bathroom</h3>
              <p className='text-sm text-gray-600'>Bathroom fixtures, accessories</p>
            </div>
            
            <div className='p-4 border border-gray-200 rounded-lg'>
              <h3 className='font-semibold text-gray-800 mb-2'>Package</h3>
              <p className='text-sm text-gray-600'>Complete interior packages</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className='flex justify-end'>
          <button
            type='submit'
            className='bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300'
          >
            Upload Interior Item
          </button>
        </div>
      </form>
    </div>
  )
}

export default page
