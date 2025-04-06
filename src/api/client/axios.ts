import axios from 'axios';
import { getStoredAccessToken, clearTokens } from '../utils/tokenStorage';
import { getCurrentShopId } from '../../utils/shopContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create an axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = getStoredAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add shop_id to all requests
    const shopId = getCurrentShopId();
    if (shopId) {
      // For GET requests, add shop_id as a query parameter if not already present
      if (config.method?.toLowerCase() === 'get') {
        config.params = config.params || {};
        if (!config.params.shop_id) {
          config.params.shop_id = shopId;
        }
      }
      // For POST, PUT, PATCH requests, add shop_id to request body
      else if (['post', 'put', 'patch'].includes(config.method?.toLowerCase() || '')) {
        // Handle FormData objects
        if (config.data instanceof FormData) {
          if (!config.data.has('shop_id')) {
            config.data.append('shop_id', shopId);
          }
        } 
        // Handle JSON data
        else if (config.data && typeof config.data === 'object') {
          if (!config.data.shop_id) {
            config.data.shop_id = shopId;
          }
        }
        // Handle empty requests - create a data object with shop_id
        else if (!config.data) {
          config.data = { shop_id: shopId };
        }
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling token expiration and errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle token expiration or authentication errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      // If we have a refresh token endpoint, we could handle token refresh here
      // For now, just redirect to login
      clearTokens();
      window.location.href = '/auth/login';
      return Promise.reject(error);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient; 