import Image from 'next/image'
import React from 'react'

const MarbleItemTable = ({
  name, 
  category, 
  color, 
  finish, 
  thickness, 
  size, 
  price, 
  pricePerSqft,     
  origin, 
  stock, 
  isAvailable, 
  features, 
  image, 
  description,
  createdAt,
  deleteMarble, 
  mongoId
}) => {

  const marbleDate = new Date(createdAt)

  return (
    <tr className='bg-white border-b hover:bg-gray-50'>
        <th scope='row' className='px-6 py-4 font-medium text-gray-900 items-center whitespace-nowrap hidden sm:flex gap-4'>
            <Image 
              src={image ? image : '/marvel.png'} 
              alt={name || 'marble'} 
              width={60} 
              height={60} 
              className='rounded-lg object-cover'
            />
            <div>
              <p className='font-semibold'>{name || 'No Name'}</p>
              <p className='text-sm text-gray-500'>{description || 'No Description'}</p>
            </div>
        </th>
        <td className='px-6 py-4'>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            category === 'marble' ? 'bg-pink-100 text-pink-800' :
            category === 'granite' ? 'bg-gray-100 text-gray-800' :
            category === 'quartz' ? 'bg-blue-100 text-blue-800' :
            category === 'onyx' ? 'bg-purple-100 text-purple-800' :
            category === 'travertine' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}>
            {category || 'No Category'}
          </span>
        </td>
        <td className='px-2 py-1'>{color || 'No Color'}</td>
        <td className='px-2 py-1'>
          <span className={`px-2 py-1 rounded text-xs ${
            finish === 'polished' ? 'bg-green-100 text-green-800' :
            finish === 'honed' ? 'bg-blue-100 text-blue-800' :
            finish === 'leathered' ? 'bg-orange-100 text-orange-800' :
            finish === 'brushed' ? 'bg-purple-100 text-purple-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {finish || 'No Finish'}
          </span>
        </td>
        <td className='px-2 py-1'>{thickness || 'No Thickness'}</td>
        <td className='px-2 py-1'>{size || 'No Size'}</td>
        <td className='px-2 py-1 font-semibold text-green-600'>
          {price ? `৳${price.toLocaleString()}` : 'No Price'}
        </td>
        <td className='px-2 py-1 font-semibold text-blue-600'>
          {pricePerSqft ? `৳${pricePerSqft.toLocaleString()}` : 'No Price/Sqft'}
        </td>
        <td className='px-2 py-1'>{origin || 'No Origin'}</td>
        <td className='px-2 py-1'>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            stock > 10 ? 'bg-green-100 text-green-800' :
            stock > 0 ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {stock || 0} units
          </span>
        </td>
        <td className='px-2 py-1'>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {isAvailable ? 'Available' : 'Unavailable'}
          </span>
        </td>
        <td className='px-2 py-1 max-w-xs'>
          {features && features.length > 0 ? (
            <div className='flex flex-wrap gap-1'>
              {features.slice(0, 2).map((feature, index) => (
                <span key={index} className='px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs'>
                  {feature}
                </span>
              ))}
              {features.length > 2 && (
                <span className='px-2 py-1 bg-gray-200 text-gray-600 rounded text-xs'>
                  +{features.length - 2} more
                </span>
              )}
            </div>
          ) : (
            <span className='text-gray-400 text-sm'>No Features</span>
          )}
        </td>
        <td className='px-2 py-1 text-sm text-gray-500'>
          {marbleDate.toDateString()}
        </td>
        <td className='px-2 py-1 text-center'>
          <button 
            onClick={() => deleteMarble(mongoId)} 
            className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm font-medium'
          >
            Delete
          </button>
        </td>
    </tr>
  )
}
export default MarbleItemTable