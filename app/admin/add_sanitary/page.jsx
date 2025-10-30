'use client'

import { assets } from '@/assests/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {

    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: '',
        category: '',
        brand: '',
        material: '',
        color: '',
        price: '',
        originalPrice: '',
        description: '',
        features: [],
        stock: '',
        isAvailable: true,
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data, [name]: value}));
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('category', data.category);
        formData.append('brand', data.brand);
        formData.append('material', data.material);
        formData.append('color', data.color);
        formData.append('price', data.price);
        formData.append('originalPrice', data.originalPrice);
        formData.append('description', data.description);
        formData.append('features', data.features.join(','));
        formData.append('stock', data.stock);
        formData.append('isAvailable', data.isAvailable.toString());
        formData.append('image', image);

        const response = await axios.post('/api/sanitary', formData);
        if(response.data.success){
            toast.success(response.data.message);
        }else{
            toast.error(response.data.message);
        }
        setData({
            name: '',
            category: '',
            brand: '',
            material: '',
            color: '',
            price: '',
            originalPrice: '',
            description: '',
            features: [],
            stock: '',
            isAvailable: true,
        });
        setImage(null);
    }

  return (
    <div>
        <form action="" onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
        <p className='text-xl'>Upload Image</p>
            <label htmlFor="image">
                <Image src={!image ? assets.upload_area : URL.createObjectURL(image)} alt='upload' width={140} height={140} className='cursor-pointer mt-4'/>
                <p className='text-sm'>Click to upload</p>
            </label>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" name="image" className='hidden' required/>
            
            <div className='mt-5'>
                <p className='text-xl'>Name</p>
                <input type="text" id="name" name="name" placeholder='Enter product name' onChange={onChangeHandler} value={data.name} className='w-full border border-gray-300 rounded-md p-2 mt-2' required/>
            </div>
            
            <div className='mt-5'>
                <p className='text-xl'>Category</p>
                <select id="category" name="category" onChange={onChangeHandler} value={data.category} className='w-full border border-gray-300 rounded-md p-2 mt-2' required>
                    <option value="">Select Category</option>
                    <option value="toilet">Toilet</option>
                    <option value="bathroom">Bathroom</option>
                    <option value="kitchen">Kitchen</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="plumbing">Plumbing</option>
                </select>
            </div>
            
            <div className='mt-5'>
                <p className='text-xl'>Brand</p>
                <input type="text" id="brand" name="brand" placeholder='Enter brand name' onChange={onChangeHandler} value={data.brand} className='w-full border border-gray-300 rounded-md p-2 mt-2' required/>
            </div>
            
            <div className='mt-5'>
                <p className='text-xl'>Material</p>
                <select id="material" name="material" onChange={onChangeHandler} value={data.material} className='w-full border border-gray-300 rounded-md p-2 mt-2' required>
                    <option value="">Select Material</option>
                    <option value="ceramic">Ceramic</option>
                    <option value="porcelain">Porcelain</option>
                    <option value="stainless_steel">Stainless Steel</option>
                    <option value="plastic">Plastic</option>
                    <option value="glass">Glass</option>
                </select>
            </div>
            
            <div className='mt-5'>
                <p className='text-xl'>Color</p>
                <input type="text" id="color" name="color" placeholder='Enter color' onChange={onChangeHandler} value={data.color} className='w-full border border-gray-300 rounded-md p-2 mt-2' required/>
            </div>
            
            <div className='mt-5'>
                <p className='text-xl'>Price</p>
                <input type="number" id="price" name="price" placeholder='Enter current price' onChange={onChangeHandler} value={data.price} className='w-full border border-gray-300 rounded-md p-2 mt-2' required/>
            </div>
            
            <div className='mt-5'>
                <p className='text-xl'>Original Price</p>
                <input type="number" id="originalPrice" name="originalPrice" placeholder='Enter original price' onChange={onChangeHandler} value={data.originalPrice} className='w-full border border-gray-300 rounded-md p-2 mt-2'/>
            </div>
            
            <div className='mt-5'>
                <p className='text-xl'>Description</p>
                <textarea id="description" name="description" placeholder='Enter description' onChange={onChangeHandler} value={data.description} className='w-full border border-gray-300 rounded-md p-2 mt-2'></textarea>
            </div>
            
            <div className='mt-5'>
                <p className='text-xl'>Features</p>
                <input type="text" id="features" name="features" placeholder='Enter features (comma separated)' onChange={(e) => setData({...data, features: e.target.value.split(',')})} value={data.features.join(',')} className='w-full border border-gray-300 rounded-md p-2 mt-2'/>
            </div>
            
            <div className='mt-5'>
                <p className='text-xl'>Stock</p>
                <input type="number" id="stock" name="stock" placeholder='Enter stock quantity' onChange={onChangeHandler} value={data.stock} className='w-full border border-gray-300 rounded-md p-2 mt-2' required/>
            </div>
            
            <div className='mt-5'>
                <p className='text-xl'>Is Available</p>
                <input type="checkbox" id="isAvailable" name="isAvailable" checked={data.isAvailable} onChange={(e) => setData({...data, isAvailable: e.target.checked})} className='mt-2'/>
            </div>
            
            <button type="submit" className='bg-red-600 text-white px-4 py-2 rounded-md mt-5'>Upload</button>
        </form>
    </div>
  )
}

export default page