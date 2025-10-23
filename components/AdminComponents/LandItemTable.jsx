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
        <th scope='row' className='px-6 py-4 font-medium text-gray-900 items-center whitespace-nowrap hidden sm:flex gap-4'>
            <p>{title || 'no title'}</p>
        </th>
        <td className='px-6 py-4'>{description || 'no description'}</td>
        <td className='px-6 py-4'>{land_type || 'no land type'}</td>
        <td className='px-6 py-4'>{address || 'no address'}</td>
        <td className='px-6 py-4'>{city || 'no city'}</td>
        <td className='px-6 py-4'>{district || 'no district'}</td>
        <td className='px-6 py-4'>{country || 'no country'}</td>
        <td className='px-6 py-4'>{area_size || 'no area size'}</td>
        <td className='px-6 py-4'>{price ? `৳${price.toLocaleString()}` : 'no price'}</td>
        <td className='px-6 py-4'>{price_per_unit ? `৳${price_per_unit.toLocaleString()}` : 'no price per unit'}</td>
        <td className='px-6 py-4'>{ownership_type || 'no ownership type'}</td>
        <td className='px-6 py-4'>{utilities_available ? 'Yes' : 'No'}</td>
        <td className='px-6 py-4'>{is_featured ? 'Yes' : 'No'}</td>
        <td className='px-6 py-4'>{is_available ? 'Yes' : 'No'}</td>
        <td className='px-6 py-4'>{LandDate.toDateString()}</td>
        <td onClick={() => deleteLand(mongoId)} className='px-6 py-4 cursor-pointer text-red-600 hover:text-red-800'>
            Delete
        </td>
    </tr>
  )
}
export default LandItemTable