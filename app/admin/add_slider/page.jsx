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
        formData.append('image', image);

        const response = await axios.post('/api/slider', formData);
        if(response.data.success){
            toast.success(response.data.message);
        }else{
            toast.error(response.data.message);
        }
        setData({
            title: '',
            description: '',
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
                <input type="text" id="title" name="title" onChange={onChangeHandler} value={data.title}  placeholder='Enter title' className='w-full border border-gray-300 rounded-md p-2 mt-2' required/>
            </div>
            <div className='mt-5'>
                <p className='text-xl'>Description</p>
                <textarea id="description" name="description" onChange={onChangeHandler} value={data.description} placeholder='Enter a short description' className='w-full border border-gray-300 rounded-md p-2 mt-2' required></textarea>
            </div>
            <button type="submit" className='bg-red-600 text-white px-4 py-2 rounded-md mt-5'>Upload</button>
        </form>
    </div>
  )
}

export default page