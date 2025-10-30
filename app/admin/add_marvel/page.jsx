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
        color: '',
        finish: '',
        thickness: '',
        size: '',
        price: '',
        pricePerSqft: '',
        description: '',
        origin: '',
        stock: '',
        isAvailable: true,
        features: [],
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
        formData.append('name', data.name);
        formData.append('category', data.category);
        formData.append('color', data.color);
        formData.append('finish', data.finish);
        formData.append('thickness', data.thickness);
        formData.append('size', data.size);
        formData.append('price', data.price);
        formData.append('pricePerSqft', data.pricePerSqft);
        formData.append('description', data.description);
        formData.append('origin', data.origin);
        formData.append('stock', data.stock);
        formData.append('isAvailable', data.isAvailable.toString());
        formData.append('features', data.features.join(','));
        formData.append('image', image);

        const response = await axios.post('/api/marble', formData);
        if(response.data.success){
            toast.success(response.data.message);
        }else{
            toast.error(response.data.message);
        }
        setData({
            name: '',
            category: '',
            color: '',
            finish: '',
            thickness: '',
            size: '',
            price: '',
            pricePerSqft: '',
            description: '',
            origin: '',
            stock: '',
            isAvailable: true,
            features: [],
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
                <p className='text-xl'>Name</p>
                <input type="text" id="name" name="name" placeholder='Enter name' onChange={onChangeHandler} value={data.name} className='w-full border border-gray-300 rounded-md p-2 mt-2' required/>
            </div>
            <div className='mt-5'>
                <p className='text-xl'>Category</p>
                <select id="category" name="category" onChange={onChangeHandler} value={data.category} className='w-full border border-gray-300 rounded-md p-2 mt-2' required>
                    <option value="">Select Category</option>
                    <option value="granite">Granite</option>
                    <option value="marble">Marble</option>
                    <option value="quartz">Quartz</option>
                    <option value="onyx">Onyx</option>
                    <option value="travertine">Travertine</option>
                    <option value="limestone">Limestone</option>
                </select>
            </div>
            <div className='mt-5'>
                <p className='text-xl'>Color</p>
                <input type="text" id="color" name="color" placeholder='Enter color' onChange={onChangeHandler} value={data.color} className='w-full border border-gray-300 rounded-md p-2 mt-2' required/>
            </div>
            <div className='mt-5'>
                <p className='text-xl'>Finish</p>
                <select id="finish" name="finish" onChange={onChangeHandler} value={data.finish} className='w-full border border-gray-300 rounded-md p-2 mt-2' required>
                    <option value="">Select Finish</option>
                    <option value="polished">Polished</option>
                    <option value="honed">Honed</option>
                    <option value="leathered">Leathered</option>
                    <option value="brushed">Brushed</option>
                    <option value="antique">Antique</option>
                </select>
            </div>
            <div className='mt-5'>
                <p className='text-xl'>Thickness</p>
                <input type="text" id="thickness" name="thickness" placeholder='Enter thickness' onChange={onChangeHandler} value={data.thickness} className='w-full border border-gray-300 rounded-md p-2 mt-2' required/>
            </div>
            <div className='mt-5'>
                <p className='text-xl'>Size</p>
                <input type="text" id="size" name="size" placeholder='Enter size' onChange={onChangeHandler} value={data.size} className='w-full border border-gray-300 rounded-md p-2 mt-2' required/>
            </div>
            
            <div className='mt-5'>
                <p className='text-xl'>Price</p>
                <input type="number" id="price" name="price" placeholder='Enter price' onChange={onChangeHandler} value={data.price} className='w-full border border-gray-300 rounded-md p-2 mt-2' required/>
            </div>
            <div className='mt-5'>
                <p className='text-xl'>Price Per Sqft</p>
                <input type="number" id="pricePerSqft" name="pricePerSqft" placeholder='Enter price per sqft' onChange={onChangeHandler} value={data.pricePerSqft} className='w-full border border-gray-300 rounded-md p-2 mt-2' required/>
            </div>
            <div className='mt-5'>
                <p className='text-xl'>Description</p>
                <textarea id="description" name="description" placeholder='Enter description' onChange={onChangeHandler} value={data.description} className='w-full border border-gray-300 rounded-md p-2 mt-2' required></textarea>
            </div>
            <div className='mt-5'>
                <p className='text-xl'>Origin</p>
                <input type="text" id="origin" name="origin" placeholder='Enter origin' onChange={onChangeHandler} value={data.origin} className='w-full border border-gray-300 rounded-md p-2 mt-2' required/>
            </div>
            <div className='mt-5'>
                <p className='text-xl'>Stock</p>
                <input type="number" id="stock" name="stock" placeholder='Enter stock' onChange={onChangeHandler} value={data.stock} className='w-full border border-gray-300 rounded-md p-2 mt-2' required/>
            </div>
            <div className='mt-5'>
                <p className='text-xl'>Is Available</p>
                <input type="checkbox" id="isAvailable" name="isAvailable" checked={data.isAvailable} onChange={(e) => setData({...data, isAvailable: e.target.checked})} className='mt-2'/>
            </div>
            <div className='mt-5'>
                <p className='text-xl'>Features</p>
                <input type="text" id="features" name="features" placeholder='Enter features (comma separated)' onChange={(e) => setData({...data, features: e.target.value.split(',')})} value={data.features.join(',')} className='w-full border border-gray-300 rounded-md p-2 mt-2' required/>
            </div>
            <button type="submit" className='bg-red-600 text-white px-4 py-2 rounded-md mt-5'>Upload</button>
        </form>
    </div>
  )
}

export default page