import axios from 'axios';
import { getStoredAccessToken, clearTokens } from '../utils/tokenStorage';

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