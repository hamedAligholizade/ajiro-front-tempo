/**
 * Shop context utility for managing shop ID
 */

// The key used for storing active shop ID in localStorage
const ACTIVE_SHOP_ID_KEY = 'activeShopId';

/**
 * Get the current shop ID from localStorage
 * @returns The current shop ID or undefined if not set
 */
export const getCurrentShopId = (): string | undefined => {
  try {
    // Handle server-side rendering case
    if (typeof window === 'undefined') return undefined;
    
    // Get shop ID from localStorage
    const shopId = localStorage.getItem(ACTIVE_SHOP_ID_KEY);
    
    if (!shopId) {
      console.warn('No active shop ID found in localStorage');
      return undefined;
    }
    
    return shopId;
  } catch (error) {
    console.error('Error getting current shop ID:', error);
    return undefined;
  }
};

/**
 * Set the current shop ID in localStorage
 * @param shopId The shop ID to set as active
 */
export const setCurrentShopId = (shopId: string): void => {
  try {
    if (typeof window === 'undefined') return;
    if (!shopId) {
      console.error('Cannot set empty shop ID');
      return;
    }
    
    localStorage.setItem(ACTIVE_SHOP_ID_KEY, shopId);
  } catch (error) {
    console.error('Error setting current shop ID:', error);
  }
};

/**
 * Clear the current shop ID from localStorage
 */
export const clearCurrentShopId = (): void => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(ACTIVE_SHOP_ID_KEY);
  } catch (error) {
    console.error('Error clearing current shop ID:', error);
  }
};

// Provide a default shop ID for development environments
export const getDefaultShopId = (): string => {
  // This would normally come from an environment variable or user settings
  return '1';
};

/**
 * Get the current shop ID or fall back to a default if none is set
 */
export const getShopIdWithDefault = (): string => {
  const shopId = getCurrentShopId();
  return shopId || getDefaultShopId();
};

/**
 * Add shop ID parameter to URL if not already present
 * @param url - The URL to add the shop ID to
 * @returns The URL with shop ID parameter
 */
export const addShopIdToUrl = (url: string): string => {
  const shopId = getCurrentShopId();
  if (!shopId) return url;
  
  const hasParams = url.includes('?');
  const hasShopId = url.includes('shop_id=');
  
  if (hasShopId) return url;
  
  return hasParams ? `${url}&shop_id=${shopId}` : `${url}?shop_id=${shopId}`;
};

/**
 * Add shop ID to request data if not already present
 * @param data - The request data
 * @returns The data with shop ID added
 */
export const addShopIdToData = (data: any): any => {
  const shopId = getCurrentShopId();
  if (!shopId || data?.shop_id) return data;
  
  return {
    ...data,
    shop_id: shopId
  };
}; 