'use client'

import { assets } from '@/assests/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {

    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        title: '',
        description: '',
        location: '',
        originalPrice: '',
        discountedPrice: '',
        discount: '',
        type: '',
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data, [name]: value}));
        console.log(data);
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('location', data.location);
        formData.append('originalPrice', data.originalPrice);
        formData.append('discountedPrice', data.discountedPrice);
        formData.append('discount', data.discount);
        formData.append('type', data.type);
        formData.append('image', image);

        const response = await axios.post('/api/property', formData);
        if(response.data.success){
            toast.success(response.data.message);
        }else{
            toast.error(response.data.message);
        }
        setData({
            title: '',
            description: '',
            location: '',
            originalPrice: '',
            discountedPrice: '',
            discount: '',
            type: '',
        });
        setImage(null);
    }


  return (
    <div>
        <form action="" onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
            <p className='text-xl'>Upload thumbnail</p>
            <label htmlFor="image">
                <Image src={!image ? assets.upload_area : URL.createObjectURL(image)} alt='upload' width={140} height={140} className='cursor-pointer mt-4'/>
                <p className='text-sm'>Click to upload</p>
            </label>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" name="image" className='hidden' required/>
            <div className='mt-5'>
                <p className='text-xl'>Title</p>
                <input type="text" id="title" name="title" placeholder='Enter title, Not more than 8 words' onChange={onChangeHandler} value={data.title}  className='w-full border border-gray-300 rounded-md p-2 mt-2' required/>
            </div>
            <div className='mt-5'>
                <p className='text-xl'>Description</p>
                <textarea id="description" name="description" placeholder='Enter a short description, Not more than 20 words' onChange={onChangeHandler} value={data.description} className='w-full border border-gray-300 rounded-md p-2 mt-2' required></textarea>
            </div>
            <div className='mt-5'>
                <p className='text-xl'>Location</p>
                <input type="text" id="location" name="location" placeholder='Enter location' onChange={onChangeHandler} value={data.location} className='w-full border border-gray-300 rounded-md p-2 mt-2' required/>
            </div>
            <div className='mt-5'>
                <p className='text-xl'>Original Price</p>
                <input type="number" id="originalPrice" name="originalPrice" placeholder='Enter original price' onChange={onChangeHandler} value={data.originalPrice} className='w-full border border-gray-300 rounded-md p-2 mt-2' required/>
            </div>
            <div className='mt-5'>
                <p className='text-xl'>Discounted Price</p>
                <input type="number" id="discountedPrice" name="discountedPrice" placeholder='Enter discounted price' onChange={onChangeHandler} value={data.discountedPrice} className='w-full border border-gray-300 rounded-md p-2 mt-2' required/>
            </div>
            <div className='mt-5'>
                <p className='text-xl'>Discount</p>
                <input type="number" id="discount" name="discount" placeholder='Enter discount' onChange={onChangeHandler} value={data.discount} className='w-full border border-gray-300 rounded-md p-2 mt-2' required/>
            </div>
            <div className='mt-5'>
                <p className='text-xl'>Type</p>
                <select type="text" id="type" name="type" placeholder='Enter type' onChange={onChangeHandler} value={data.type} className='w-full border border-gray-300 rounded-md p-2 mt-2' required>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Land">Land</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Office">Office</option>
                </select>
            </div>
            <button type="submit" className='bg-red-600 text-white px-4 py-2 rounded-md mt-5'>Upload</button>
        </form>
    </div>
  )
}

export default page