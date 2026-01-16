import Image from 'next/image'
import React from 'react'
import { normalizeImageUrl } from '@/lib/utils/imageUtils'

const SliderTableItem = ({title, description, image, date, deleteSlide, mongoId}) => {

    const SliderDate = new Date(date)


  return (
    <tr className='bg-white border-b '>
        <th scope='row' className='px-6 py-4 font-medium text-gray-900 items-center whitespace-nowrap hidden sm:flex gap-4'>
            <Image src={normalizeImageUrl(image || '/rokib.jpeg')} alt='slider' width={100} height={100} />
            <p>{title?title:'no title'}</p>
        </th>
        <td className='px-6 py-4'>{description?description:'no description'}</td>
        <td className='px-6 py-4'>{SliderDate.toDateString()}</td>
        <td onClick={() => deleteSlide(mongoId)} className='px-6 py-4 cursor-pointer'>
            x
        </td>
    </tr>
  )
}
export default SliderTableItem