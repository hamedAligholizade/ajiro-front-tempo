// Storage keys
const ACCESS_TOKEN_KEY = 'ajiro_access_token';
const REFRESH_TOKEN_KEY = 'ajiro_refresh_token';
const USER_KEY = 'ajiro_user';
const SHOP_KEY = 'ajiro_shop';

// Types
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;  // camelCase for frontend
  lastName: string;   // camelCase for frontend
  role: string;
  // Additional fields if needed
  phone?: string;
  is_active?: boolean;
}

// Backend uses snake_case
export interface BackendUser {
  id: string;
  email: string;
  first_name: string;  // snake_case from backend
  last_name: string;   // snake_case from backend
  role: string;
  phone?: string;
  is_active?: boolean;
}

export interface Shop {
  id: string;
  name: string;
}

// Convert backend user to frontend user format
export const mapBackendUser = (backendUser: BackendUser): User => {
  return {
    id: backendUser.id,
    email: backendUser.email,
    firstName: backendUser.first_name,
    lastName: backendUser.last_name,
    role: backendUser.role,
    phone: backendUser.phone,
    is_active: backendUser.is_active
  };
};

// Store access token in localStorage
export const storeAccessToken = (token: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

// Get access token from localStorage
export const getStoredAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

// Store refresh token in localStorage
export const storeRefreshToken = (token: string): void => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

// Get refresh token from localStorage
export const getStoredRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

// Store both tokens
export const storeTokens = (tokens: AuthTokens): void => {
  storeAccessToken(tokens.accessToken);
  storeRefreshToken(tokens.refreshToken);
};

// Store user info
export const storeUser = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

// Get stored user info
export const getStoredUser = (): User | null => {
  const userJson = localStorage.getItem(USER_KEY);
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson) as User;
  } catch (error) {
    console.error('Failed to parse user data from localStorage', error);
    return null;
  }
};

// Store shop info
export const storeShop = (shop: Shop | null): void => {
  if (shop) {
    localStorage.setItem(SHOP_KEY, JSON.stringify(shop));
  } else {
    localStorage.removeItem(SHOP_KEY);
  }
};

// Get stored shop info
export const getStoredShop = (): Shop | null => {
  const shopJson = localStorage.getItem(SHOP_KEY);
  if (!shopJson) return null;
  
  try {
    return JSON.parse(shopJson) as Shop;
  } catch (error) {
    console.error('Failed to parse shop data from localStorage', error);
    return null;
  }
};

// Clear all tokens and user data
export const clearTokens = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(SHOP_KEY);
};

// Check if user is authenticated (has a valid token)
export const isAuthenticated = (): boolean => {
  return !!getStoredAccessToken();
}; 