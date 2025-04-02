import apiClient from '../client/axios';

// Types
export interface Shop {
  id: string;
  name: string;
  status: string;
  address?: string;
  phone?: string;
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
  addedAt: string;
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
  
  // Get all users of a shop
  getShopUsers: async (shopId: string): Promise<ShopUser[]> => {
    const response = await apiClient.get<{ success: boolean; data: ShopUser[] }>(`/shops/${shopId}/users`);
    return response.data.data;
  },
  
  // Add user to shop
  addUserToShop: async (shopId: string, userData: { 
    email: string; 
    role: string;
    permissions?: string[];
  }): Promise<{ success: boolean }> => {
    const response = await apiClient.post<{ success: boolean }>(`/shops/${shopId}/users`, userData);
    return response.data;
  },
  
  // Remove user from shop
  removeUserFromShop: async (shopId: string, userId: string): Promise<{ success: boolean }> => {
    const response = await apiClient.delete<{ success: boolean }>(`/shops/${shopId}/users/${userId}`);
    return response.data;
  },
  
  // Update user role in shop
  updateUserRole: async (shopId: string, userId: string, role: string): Promise<{ success: boolean }> => {
    const response = await apiClient.put<{ success: boolean }>(`/shops/${shopId}/users/${userId}`, { role });
    return response.data;
  }
};

export default shopService; 