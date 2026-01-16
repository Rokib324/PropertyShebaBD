import Image from 'next/image'
import React from 'react'

const LandItemTable = ({
  title, 
  description, 
  land_type, 
  address, 
  city, 
  district, 
  country, 
  area_size, 
  price, 
  price_per_unit, 
  ownership_type, 
  utilities_available, 
  is_featured, 
  is_available, 
  date, 
  deleteLand, 
  mongoId
}) => {

    const LandDate = new Date(date)

  return (
    <tr className='bg-white border-b '>
        <th scope='row' className='px-2 py-1 text-start max-w-[50px] truncate font-medium text-gray-900 items-center whitespace-nowrap hidden sm:flex gap-4'>
            <p>{title || 'no title'}</p>
        </th>
        <td className='px-2 py-1 text-start max-w-[50px] truncate'>{description || 'no description'}</td>
        <td className='px-2 py-1 text-start max-w-[50px] truncate'>{land_type || 'no land type'}</td>
        <td className='px-2 py-1 text-start max-w-[50px] truncate'>{address || 'no address'}</td>
        <td className='px-2 py-1 text-start max-w-[50px] truncate'>{city || 'no city'}</td>
        <td className='px-2 py-1 text-start max-w-[50px] truncate'>{district || 'no district'}</td>
        <td className='px-2 py-1 text-start max-w-[50px] truncate'>{country || 'no country'}</td>
        <td className='px-2 py-1 text-start max-w-[20px] truncate'>{area_size || 'no area size'}</td>
        <td className='px-2 py-1 text-start max-w-[20px] truncate'>{price_per_unit ? `৳${price_per_unit.toLocaleString()}` : 'no price per unit'}</td>
        <td className='px-2 py-1 text-start max-w-[20px] truncate'>{price ? `৳${price.toLocaleString()}` : 'no price'}</td>
        <td className='px-2 py-1 text-start max-w-[20px] truncate'>{ownership_type || 'no ownership type'}</td>
        <td className='px-2 py-1 text-start max-w-[20px] truncate'>{utilities_available ? 'Yes' : 'No'}</td>
        <td className='px-2 py-1 text-start max-w-[20px] truncate'>{is_featured ? 'Yes' : 'No'}</td>
        <td className='px-2 py-1 text-start max-w-[20px] truncate'>{is_available ? 'Yes' : 'No'}</td>
        <td className='px-2 py-1'>{LandDate.toDateString()}</td>
        <td onClick={() => deleteLand(mongoId)} className='px-2 py-1 cursor-pointer text-red-600 hover:text-red-800'>
            Delete
        </td>
    </tr>
  )
}
export default LandItemTable