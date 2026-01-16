import Image from 'next/image'
import React from 'react'

const PropertyTableItem = ({title, description, image, date, deleteProperty, mongoId, location, originalPrice, discountedPrice, discount, type}) => {

    const PropertyDate = new Date(date)


  return (
    <tr className='bg-white border-b '>
        <th scope='row' className='px-2 py-2 font-medium text-gray-900 items-center whitespace-nowrap hidden sm:flex gap-4'>
            <p>{title?title:'no title'}</p>
        </th>
        <td className='px-2 py-2'>{description?description:'no description'}</td>
        <td className='px-2 py-2'>{location?location:'no location'}</td>
        <td className='px-2 py-2'>{originalPrice?originalPrice:'no original price'}</td>
        <td className='px-2 py-2'>{discountedPrice?discountedPrice:'no discounted price'}</td>
        <td className='px-2 py-2'>{discount?discount:'no discount'}</td>
        <td className='px-2 py-2'>{type?type:'no type'}</td>
        <td className='px-2 py-2'>{PropertyDate.toDateString()}</td>
        <td onClick={() => deleteProperty(mongoId)} className='px-2 py-2 cursor-pointer text-red-700 text-center hover:underline'>
            Delete
        </td>
    </tr>
  )
}
export default PropertyTableItem