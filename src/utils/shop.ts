/**
 * Utilities for managing shop-related data
 */

/**
 * Get the current shop ID from localStorage
 * @returns The active shop ID or undefined if not set
 */
export const getCurrentShopId = (): string | undefined => {
  if (typeof window === 'undefined') return undefined;
  
  // Try to get the shop ID from localStorage
  const shopId = localStorage.getItem('activeShopId');
  
  // If no shop ID found, return undefined
  if (!shopId) {
    console.warn('No active shop ID found in localStorage');
    return undefined;
  }
  
  return shopId;
};

/**
 * Set the current shop ID in localStorage
 * @param shopId The shop ID to set as active
 */
export const setCurrentShopId = (shopId: string): void => {
  if (typeof window === 'undefined') return;
  
  if (!shopId) {
    console.error('Cannot set empty shop ID');
    return;
  }
  
  localStorage.setItem('activeShopId', shopId);
};

/**
 * Clear the current shop ID from localStorage
 */
export const clearCurrentShopId = (): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('activeShopId');
}; 