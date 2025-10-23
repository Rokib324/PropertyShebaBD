'use client'

import React, { useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { toast } from 'react-toastify'

const page = () => {
  const [images, setImages] = useState([]);
  const [data, setData] = useState({
    title: '',
    description: '',
    land_type: 'residential',
    address: '',
    city: '',
    district: '',
    country: 'Bangladesh',
    area_size: '',
    price: '',
    price_per_unit: '',
    ownership_type: 'freehold',
    utilities_available: false,
    is_featured: false,
    is_available: true,
    contact_info: {
      name: '',
      phone: '',
      email: ''
    }
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    
    if (name.startsWith('contact_info.')) {
      const field = name.split('.')[1];
      setData(prev => ({
        ...prev,
        contact_info: {
          ...prev.contact_info,
          [field]: value
        }
      }));
    } else {
      setData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    
    // Append basic info
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('land_type', data.land_type);
    
    // Append location info
    formData.append('address', data.address);
    formData.append('city', data.city);
    formData.append('district', data.district);
    formData.append('country', data.country);
    
    // Append property details
    formData.append('area_size', data.area_size);
    formData.append('price', data.price);
    formData.append('price_per_unit', data.price_per_unit);
    formData.append('ownership_type', data.ownership_type);
    formData.append('utilities_available', data.utilities_available.toString());
    formData.append('is_featured', data.is_featured.toString());
    formData.append('is_available', data.is_available.toString());
    
    // Append contact info
    formData.append('contact_name', data.contact_info.name);
    formData.append('contact_phone', data.contact_info.phone);
    formData.append('contact_email', data.contact_info.email);
    
    // Append images
    images.forEach((image, index) => {
      formData.append('images', image);
    });

    try {
      const response = await axios.post('/api/land', formData);
      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form
        setData({
          title: '',
          description: '',
          land_type: 'residential',
          address: '',
          city: '',
          district: '',
          country: 'Bangladesh',
          area_size: '',
          price: '',
          price_per_unit: '',
          ownership_type: 'freehold',
          utilities_available: false,
          is_featured: false,
          is_available: true,
          contact_info: {
            name: '',
            phone: '',
            email: ''
          }
        });
        setImages([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error uploading land details');
      console.error('Error:', error);
    }
  };

  return (
    <div className='pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1 className='text-2xl font-bold mb-8'>Add New Land Property</h1>
      
      <form onSubmit={onSubmitHandler} className='space-y-6'>
        {/* Basic Information */}
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-4 text-gray-800'>Basic Information</h2>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Land Title *</label>
              <input
                type='text'
                name='title'
                value={data.title}
                onChange={onChangeHandler}
                className='w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                placeholder='Enter land title'
                required
              />
            </div>
            
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Land Type *</label>
              <select
                name='land_type'
                value={data.land_type}
                onChange={onChangeHandler}
                className='w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                required
              >
                <option value='residential'>Residential</option>
                <option value='commercial'>Commercial</option>
                <option value='agricultural'>Agricultural</option>
                <option value='industrial'>Industrial</option>
                <option value='mixed_use'>Mixed Use</option>
                <option value='recreational'>Recreational</option>
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
              placeholder='Enter land description'
            />
          </div>
        </div>

        {/* Location Information */}
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-4 text-gray-800'>Location Information</h2>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Address *</label>
              <input
                type='text'
                name='address'
                value={data.address}
                onChange={onChangeHandler}
                className='w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                placeholder='Enter full address'
                required
              />
            </div>
            
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>City *</label>
              <input
                type='text'
                name='city'
                value={data.city}
                onChange={onChangeHandler}
                className='w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                placeholder='Enter city name'
                required
              />
            </div>
            
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>District</label>
              <input
                type='text'
                name='district'
                value={data.district}
                onChange={onChangeHandler}
                className='w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                placeholder='Enter district name'
              />
            </div>
            
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Country</label>
              <input
                type='text'
                name='country'
                value={data.country}
                onChange={onChangeHandler}
                className='w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                placeholder='Enter country name'
              />
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-4 text-gray-800'>Property Details</h2>
          
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Area Size (Acres/Decimals) *</label>
              <input
                type='number'
                name='area_size'
                value={data.area_size}
                onChange={onChangeHandler}
                step='0.01'
                min='0'
                className='w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                placeholder='Enter area size'
                required
              />
            </div>
            
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Price (৳) *</label>
              <input
                type='number'
                name='price'
                value={data.price}
                onChange={onChangeHandler}
                min='0'
                className='w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                placeholder='Enter total price'
                required
              />
            </div>
            
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Price Per Unit (৳)</label>
              <input
                type='number'
                name='price_per_unit'
                value={data.price_per_unit}
                onChange={onChangeHandler}
                min='0'
                className='w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                placeholder='Enter price per unit'
              />
            </div>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Ownership Type *</label>
              <select
                name='ownership_type'
                value={data.ownership_type}
                onChange={onChangeHandler}
                className='w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                required
              >
                <option value='freehold'>Freehold</option>
                <option value='leasehold'>Leasehold</option>
              </select>
            </div>
            
            <div className='flex items-center space-x-4'>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  name='utilities_available'
                  checked={data.utilities_available}
                  onChange={onChangeHandler}
                  className='mr-2'
                />
                <span className='text-sm text-gray-700'>Utilities Available</span>
              </label>
              
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  name='is_featured'
                  checked={data.is_featured}
                  onChange={onChangeHandler}
                  className='mr-2'
                />
                <span className='text-sm text-gray-700'>Featured Property</span>
              </label>
              
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  name='is_available'
                  checked={data.is_available}
                  onChange={onChangeHandler}
                  className='mr-2'
                />
                <span className='text-sm text-gray-700'>Available</span>
              </label>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-4 text-gray-800'>Contact Information</h2>
          
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Contact Name</label>
              <input
                type='text'
                name='contact_info.name'
                value={data.contact_info.name}
                onChange={onChangeHandler}
                className='w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                placeholder='Enter contact person name'
              />
            </div>
            
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Phone Number</label>
              <input
                type='tel'
                name='contact_info.phone'
                value={data.contact_info.phone}
                onChange={onChangeHandler}
                className='w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                placeholder='Enter phone number'
              />
            </div>
            
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
              <input
                type='email'
                name='contact_info.email'
                value={data.contact_info.email}
                onChange={onChangeHandler}
                className='w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                placeholder='Enter email address'
              />
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-4 text-gray-800'>Property Images</h2>
          
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Upload Images</label>
            <input
              type='file'
              multiple
              accept='image/*'
              onChange={handleImageChange}
              className='w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500'
            />
            <p className='text-sm text-gray-500 mt-2'>You can select multiple images</p>
          </div>
          
          {images.length > 0 && (
            <div className='mt-4'>
              <p className='text-sm font-medium text-gray-700 mb-2'>Selected Images:</p>
              <div className='flex flex-wrap gap-2'>
                {images.map((image, index) => (
                  <div key={index} className='relative'>
                    <Image
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      width={100}
                      height={100}
                      className='rounded-md object-cover'
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className='flex justify-end'>
          <button
            type='submit'
            className='bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300'
          >
            Upload Land Property
          </button>
        </div>
      </form>
    </div>
  )
}

export default page