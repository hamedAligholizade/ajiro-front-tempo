import apiClient from '../client/axios';
import { 
  AuthTokens, 
  User, 
  BackendUser, 
  Shop,
  mapBackendUser, 
  storeTokens, 
  storeUser, 
  storeShop,
  clearTokens 
} from '../utils/tokenStorage';

// Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
  shop_name: string;
  role?: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
}

export interface ShopInfo {
  id: string;
  name: string;
}

export interface LoginResponse {
  user: User;
  shop: ShopInfo | null;
  tokens: AuthTokens;
}

interface BackendLoginResponse {
  success: boolean;
  data: {
    user: BackendUser;
    shop: {
      id: string;
      name: string;
    } | null;
    access_token: string;
    refresh_token: string;
    expires_in: number;
  }
}

interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    user: BackendUser;
    shop: Shop | null;
    access_token?: string;
    refresh_token?: string;
  }
}

// Authentication API calls
const authService = {
  // Login user
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await apiClient.post<BackendLoginResponse>('/auth/login', credentials);
    
    // Map backend user to frontend format
    const user = mapBackendUser(response.data.data.user);
    const shop = response.data.data.shop ? {
      id: response.data.data.shop.id,
      name: response.data.data.shop.name
    } : null;
    const tokens = {
      accessToken: response.data.data.access_token,
      refreshToken: response.data.data.refresh_token
    };
    
    // Store tokens, user data, and shop data
    storeTokens(tokens);
    storeUser(user);
    storeShop(shop);
    
    return { user, shop, tokens };
  },

  // Register new user
  register: async (userData: RegisterData): Promise<{ user: User, shop: Shop | null }> => {
    const response = await apiClient.post<RegisterResponse>('/auth/register', userData);
    
    // Map backend user to frontend format
    const user = mapBackendUser(response.data.data.user);
    const shop = response.data.data.shop;
    
    // If tokens are provided, store them
    if (response.data.data.access_token && response.data.data.refresh_token) {
      storeTokens({
        accessToken: response.data.data.access_token,
        refreshToken: response.data.data.refresh_token
      });
      storeUser(user);
      storeShop(shop);
    }
    
    return { user, shop };
  },

  // Logout user
  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      // Clear tokens regardless of API response
      clearTokens();
    }
  },

  // Refresh token
  refreshToken: async (refreshToken: string): Promise<AuthTokens> => {
    const response = await apiClient.post<{ tokens: AuthTokens }>('/auth/refresh', { refreshToken });
    
    if (response.data.tokens) {
      storeTokens(response.data.tokens);
    }
    
    return response.data.tokens;
  },

  // Request password reset
  forgotPassword: async (data: ForgotPasswordData): Promise<void> => {
    await apiClient.post('/auth/forgot-password', data);
  },

  // Reset password with token
  resetPassword: async (data: ResetPasswordData): Promise<void> => {
    await apiClient.post('/auth/reset-password', data);
  }
};

export default authService; 