/**
 * Shop context utilities for managing the current shop ID
 */

// Local storage key for the current shop ID
const CURRENT_SHOP_KEY = 'ajiro_current_shop';

/**
 * Get the current shop ID from local storage
 * @returns The current shop ID or null if not set
 */
export const getCurrentShopId = (): string | null => {
  return localStorage.getItem(CURRENT_SHOP_KEY);
};

/**
 * Set the current shop ID in local storage
 * @param shopId - The shop ID to set as current
 */
export const setCurrentShopId = (shopId: string): void => {
  localStorage.setItem(CURRENT_SHOP_KEY, shopId);
};

/**
 * Clear the current shop ID from local storage
 */
export const clearCurrentShopId = (): void => {
  localStorage.removeItem(CURRENT_SHOP_KEY);
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