/**
 * Utilities for managing authentication
 */

const AUTH_TOKEN_KEY = 'authToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

/**
 * Store the auth token in localStorage
 * @param token The auth token to store
 */
export const storeAuthToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

/**
 * Get the stored auth token from localStorage
 * @returns The auth token or null if not found
 */
export const getStoredAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

/**
 * Store the refresh token in localStorage
 * @param token The refresh token to store
 */
export const storeRefreshToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

/**
 * Get the stored refresh token from localStorage
 * @returns The refresh token or null if not found
 */
export const getStoredRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Clear all auth tokens from localStorage
 */
export const clearAuthTokens = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

/**
 * Check if the user is authenticated
 * @returns True if auth token exists, false otherwise
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!getStoredAuthToken();
}; 