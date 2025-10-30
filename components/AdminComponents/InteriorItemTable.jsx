import Image from 'next/image'
import React from 'react'

const InteriorItemTable = ({
  title, 
  description,
  category,
  price,
  stock,
  isAvailable,
  image,
  createdAt,
  deleteInterior,
  mongoId
}) => {

    const InteriorDate = new Date(createdAt)

  return (
    <tr className='bg-white border-b '>
        <th scope='row' className='px-6 py-4 font-medium text-gray-900 items-center whitespace-nowrap hidden sm:flex gap-4'>
            <p>{title || 'no title'}</p>
        </th>
        <td className='px-6 py-4'>{description || 'no description'}</td>
        <td className='px-6 py-4'>{category || 'no category'}</td>
        <td className='px-6 py-4'>{price ? `৳${price.toLocaleString()}` : 'no price'}</td>
        <td className='px-6 py-4'>{stock || 'no stock'}</td>
        <td className='px-6 py-4'>{isAvailable ? 'Yes' : 'No'}</td>
        <td className='px-6 py-4'>{InteriorDate.toDateString()}</td>
        <td onClick={() => deleteInterior(mongoId)} className='px-6 py-4 cursor-pointer text-red-600 hover:text-red-800'>
            X
        </td>
    </tr>
  )
}
export default InteriorItemTable