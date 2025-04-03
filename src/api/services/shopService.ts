import apiClient from '../client/axios';

// Types
export interface Shop {
  id: string;
  name: string;
  status: string;
  address?: string;
  phone?: string;
  business_type?: string;
  tax_enabled?: boolean;
  tax_rate?: number;
  currency?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserShop {
  id: string;
  name: string;
  role: string;
  status: string;
}

export interface ShopUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;  // This is the role in the shop (owner, manager, cashier, etc)
  isActive: boolean;
  joinedAt: string;
}

// Shop API calls
const shopService = {
  // Get all shops the user has access to
  getUserShops: async (): Promise<UserShop[]> => {
    const response = await apiClient.get<{ success: boolean; data: UserShop[] }>('/users/shops');
    return response.data.data;
  },
  
  // Get a specific shop by ID
  getShop: async (shopId: string): Promise<Shop> => {
    const response = await apiClient.get<{ success: boolean; data: Shop }>(`/shops/${shopId}`);
    return response.data.data;
  },
  
  // Set current active shop
  setActiveShop: async (shopId: string): Promise<{ success: boolean }> => {
    const response = await apiClient.post<{ success: boolean }>('/users/active-shop', { shopId });
    return response.data;
  },
  
  // Create a new shop
  createShop: async (shopData: { name: string; address?: string; phone?: string }): Promise<Shop> => {
    const response = await apiClient.post<{ success: boolean; data: Shop }>('/shops', shopData);
    return response.data.data;
  },
  
  // Get shop details
  getShopDetails: async (): Promise<Shop> => {
    const response = await apiClient.get<{ status: string; data: { shop: Shop } }>('/shop');
    return response.data.data.shop;
  },
  
  // Update shop information
  updateShop: async (shopId: string, shopData: {
    name?: string;
    address?: string;
    phone?: string;
    status?: string;
  }): Promise<Shop> => {
    const response = await apiClient.put<{ success: boolean; data: Shop }>(`/shops/${shopId}`, shopData);
    return response.data.data;
  },
  
  // Update shop information
  updateShopDetails: async (shopData: {
    name?: string;
    address?: string;
    phone?: string;
    business_type?: string;
    tax_enabled?: boolean;
    tax_rate?: number;
    currency?: string;
  }): Promise<Shop> => {
    const response = await apiClient.put<{ status: string; data: { shop: Shop } }>(`/shop`, shopData);
    return response.data.data.shop;
  },
  
  // Get all users of a shop
  getShopUsers: async (shopId: string): Promise<ShopUser[]> => {
    const response = await apiClient.get<{ status: string; results: number; data: ShopUser[] }>(`/shop/users`);
    return response.data.data;
  },
  
  // Add user to shop
  addUserToShop: async (shopId: string, userData: { 
    email: string; 
    role: string;
  }): Promise<{ success: boolean; message: string; data: any }> => {
    const response = await apiClient.post<{ status: string; message: string; data: any }>(`/shop/users`, userData);
    return {
      success: response.data.status === 'success',
      message: response.data.message,
      data: response.data.data
    };
  },
  
  // Remove user from shop
  removeUserFromShop: async (shopId: string, userId: string): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.delete<{ status: string; message: string }>(`/shop/users/${userId}`);
    return {
      success: response.data.status === 'success',
      message: response.data.message
    };
  },
  
  // Update user role in shop
  updateUserRole: async (shopId: string, userId: string, role: string): Promise<{ success: boolean }> => {
    const response = await apiClient.put<{ success: boolean }>(`/shops/${shopId}/users/${userId}`, { role });
    return response.data;
  },
  
  // Update tax settings
  updateTaxSettings: async (taxData: {
    tax_enabled?: boolean;
    tax_rate?: number;
  }): Promise<{ tax_enabled: boolean; tax_rate: number }> => {
    const response = await apiClient.put<{ 
      status: string; 
      data: { tax_enabled: boolean; tax_rate: number } 
    }>('/shop/tax', taxData);
    return response.data.data;
  }
};

export default shopService; 