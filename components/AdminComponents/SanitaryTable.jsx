"use client";

import Image from 'next/image';
import React from 'react';

const SanitaryItemTable = ({
  name,
  brand,
  category,
  material,
  color,
  price,
  originalPrice,
  stock,
  isAvailable,
  features,
  image,
  description,
  createdAt,
  mongoId,
  deleteSanitary,
}) => {
  const sanitaryDate = createdAt ? new Date(createdAt) : null;

  const discountPercentage =
    originalPrice && price && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;

  const formatText = (text) => {
    if (!text) return 'No Category';
    return text.charAt(0).toUpperCase() + text.slice(1).replace(/_/g, ' ');
  };

  const getCategoryClass = (cat) => {
    if (!cat) return 'bg-gray-100 text-gray-800';
    switch ((cat || '').toLowerCase()) {
      case 'basin':
        return 'bg-blue-100 text-blue-800';
      case 'commode':
        return 'bg-purple-100 text-purple-800';
      case 'shower':
        return 'bg-teal-100 text-teal-800';
      case 'faucet':
        return 'bg-amber-100 text-amber-800';
      case 'accessories':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      {/* Image + Basic info */}
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 items-center whitespace-nowrap hidden sm:flex gap-4"
      >
        <Image
          src={image || '/sanitary1.jpg'}
          alt={name || 'sanitary item'}
          width={60}
          height={60}
          className="rounded-lg object-cover"
        />
        <div>
          <p className="font-semibold">{name || 'No Name'}</p>
          <p className="text-sm text-gray-500 line-clamp-2">
            {description || 'No Description'}
          </p>
        </div>
      </th>

      {/* Category */}
      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryClass(
            category
          )}`}
        >
          {formatText(category)}
        </span>
      </td>

      {/* Brand */}
      <td className="px-6 py-4">
        {brand || <span className="text-gray-400">No Brand</span>}
      </td>

      {/* Material */}
      <td className="px-6 py-4">
        {material || <span className="text-gray-400">No Material</span>}
      </td>

      {/* Color */}
      <td className="px-6 py-4">
        {color || <span className="text-gray-400">No Color</span>}
      </td>

      {/* Price */}
      <td className="px-6 py-4 font-semibold text-green-600">
        {price ? `৳${price.toLocaleString()}` : 'No Price'}
      </td>

      {/* Original Price */}
      <td className="px-6 py-4 text-gray-500">
        {originalPrice ? `৳${originalPrice.toLocaleString()}` : 'N/A'}
      </td>

      {/* Discount */}
      <td className="px-6 py-4">
        {discountPercentage ? (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            -{discountPercentage}%
          </span>
        ) : (
          <span className="text-gray-400 text-xs">No Discount</span>
        )}
      </td>

      {/* Stock */}
      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            stock > 10
              ? 'bg-green-100 text-green-800'
              : stock > 0
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {stock || 0} units
        </span>
      </td>

      {/* Availability */}
      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {isAvailable ? 'Available' : 'Unavailable'}
        </span>
      </td>

      {/* Features */}
      <td className="px-6 py-4 max-w-xs">
        {features && features.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {features.slice(0, 2).map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
              >
                {feature}
              </span>
            ))}
            {features.length > 2 && (
              <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded text-xs">
                +{features.length - 2} more
              </span>
            )}
          </div>
        ) : (
          <span className="text-gray-400 text-sm">No Features</span>
        )}
      </td>

      {/* Created At */}
      <td className="px-6 py-4 text-sm text-gray-500">
        {sanitaryDate ? sanitaryDate.toDateString() : 'No Date'}
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <button
          onClick={() => deleteSanitary(mongoId)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm font-medium"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default SanitaryItemTable;