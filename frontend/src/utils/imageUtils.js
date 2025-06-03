/**
 * Image utility functions for handling product images
 * This provides a centralized way to manage image URLs across the application
 */

// Get the base backend URL without the /api/v1 part for static files
const getBackendBaseUrl = () => {
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';
  // Remove /api/v1 from the end to get the base server URL
  return apiUrl.replace(/\/api\/v1$/, '');
};

const BACKEND_URL = getBackendBaseUrl();
const PLACEHOLDER_IMAGE = '/images/products/placeholder.jpg';

/**
 * Get the full URL for a product image
 * @param {string|object} image - Image URL string or image object with url property
 * @returns {string} - Complete image URL
 */
export const getImageUrl = (image) => {
  if (!image) return PLACEHOLDER_IMAGE;
  
  let imageUrl;
  
  // Handle both string format and object format
  if (typeof image === 'string') {
    imageUrl = image;
  } else if (image && image.url) {
    imageUrl = image.url;
  } else {
    return PLACEHOLDER_IMAGE;
  }
  
  // If it's a relative URL starting with /uploads/, prepend the backend server URL
  if (imageUrl.startsWith('/uploads/')) {
    return `${BACKEND_URL}${imageUrl}`;
  }
  
  // If it's already a complete URL, return as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // If it's a relative URL starting with /images/, it's from frontend public folder
  if (imageUrl.startsWith('/images/')) {
    return imageUrl;
  }
  
  // Default: assume it's from backend if it doesn't start with /
  if (!imageUrl.startsWith('/')) {
    return `${BACKEND_URL}/uploads/products/${imageUrl}`;
  }
  
  // Fallback: prepend backend URL
  return `${BACKEND_URL}${imageUrl}`;
};

/**
 * Get the first image URL from a product's images array
 * @param {object} product - Product object with images array
 * @returns {string} - Complete image URL or placeholder
 */
export const getProductImageUrl = (product) => {
  if (product?.images?.length > 0) {
    return getImageUrl(product.images[0]);
  }
  return PLACEHOLDER_IMAGE;
};

/**
 * Get all image URLs from a product's images array
 * @param {object} product - Product object with images array
 * @returns {string[]} - Array of complete image URLs
 */
export const getProductImageUrls = (product) => {
  if (product?.images?.length > 0) {
    return product.images.map(image => getImageUrl(image));
  }
  return [PLACEHOLDER_IMAGE];
};

/**
 * Check if an image URL is valid (not empty and not placeholder)
 * @param {string} imageUrl - Image URL to check
 * @returns {boolean} - True if valid image URL
 */
export const isValidImageUrl = (imageUrl) => {
  return imageUrl && 
         imageUrl !== PLACEHOLDER_IMAGE && 
         imageUrl.trim() !== '' &&
         !imageUrl.includes('placeholder');
};

export default {
  getImageUrl,
  getProductImageUrl,
  getProductImageUrls,
  isValidImageUrl,
  PLACEHOLDER_IMAGE,
  BACKEND_URL
}; 