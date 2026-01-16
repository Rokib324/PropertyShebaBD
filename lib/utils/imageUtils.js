/**
 * Normalizes image URLs to handle both old and new formats
 * Old format: /filename.jpg (from public folder)
 * New format: /api/uploads/filename.jpg (from uploads folder)
 * 
 * @param {string} imageUrl - The image URL from the database
 * @returns {string} - Normalized image URL
 */
export function normalizeImageUrl(imageUrl) {
  if (!imageUrl) return '/placeholder.jpg';
  
  // If already in new format, return as is
  if (imageUrl.startsWith('/api/uploads/')) {
    return imageUrl;
  }
  
  // If it's an old format (starts with / but not /api/), convert to new format
  if (imageUrl.startsWith('/') && !imageUrl.startsWith('/api/')) {
    // Remove leading slash and add /api/uploads/ prefix
    const filename = imageUrl.substring(1);
    return `/api/uploads/${filename}`;
  }
  
  // If it's a full URL or other format, return as is
  return imageUrl;
}

/**
 * Normalizes an array of image URLs (for land images)
 * @param {string[]} imageUrls - Array of image URLs
 * @returns {string[]} - Array of normalized image URLs
 */
export function normalizeImageUrls(imageUrls) {
  if (!Array.isArray(imageUrls)) return [];
  return imageUrls.map(normalizeImageUrl);
}

