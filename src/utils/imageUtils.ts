/**
 * Utility functions for handling image URLs
 */

// Get the API base URL without the /api suffix
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const BASE_URL = API_URL.endsWith('/api') ? API_URL.slice(0, -4) : API_URL;

/**
 * Format image URL with the backend base URL
 * @param imageUrl - The image URL from the API
 * @returns The complete image URL with the backend base URL
 */
export const formatImageUrl = (imageUrl?: string | null): string => {
  if (!imageUrl) {
    return '';
  }

  // If the URL already includes http:// or https://, return it as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  // If the URL starts with /uploads, append it to the base URL
  if (imageUrl.startsWith('/uploads/')) {
    return `${BASE_URL}${imageUrl}`;
  }
  
  // If the URL starts with a slash, append it to the base URL
  if (imageUrl.startsWith('/')) {
    return `${BASE_URL}${imageUrl}`;
  }

  // Otherwise, append it to the base URL with a slash
  return `${BASE_URL}/${imageUrl}`;
}; 