import Image from 'next/image'
import React from 'react'

const PropertyTableItem = ({title, description, image, date, deleteProperty, mongoId, location, originalPrice, discountedPrice, discount, type}) => {

    const PropertyDate = new Date(date)


  return (
    <tr className='bg-white border-b '>
        <th scope='row' className='px-6 py-4 font-medium text-gray-900 items-center whitespace-nowrap hidden sm:flex gap-4'>
            <p>{title?title:'no title'}</p>
        </th>
        <td className='px-6 py-4'>{description?description:'no description'}</td>
        <td className='px-6 py-4'>{location?location:'no location'}</td>
        <td className='px-6 py-4'>{originalPrice?originalPrice:'no original price'}</td>
        <td className='px-6 py-4'>{discountedPrice?discountedPrice:'no discounted price'}</td>
        <td className='px-6 py-4'>{discount?discount:'no discount'}</td>
        <td className='px-6 py-4'>{type?type:'no type'}</td>
        <td className='px-6 py-4'>{PropertyDate.toDateString()}</td>
        <td onClick={() => deleteProperty(mongoId)} className='px-6 py-4 cursor-pointer'>
            x
        </td>
    </tr>
  )
}
export default PropertyTableItem