import apiClient from '../client/axios';

// Types
export interface Customer {
  id: string;
  shop_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  loyalty_points: number;
  loyalty_tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  address?: string;
  notes?: string;
  total_spent: number;
  total_orders: number;
  last_order_date?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCustomerData {
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
}

export interface UpdateCustomerData extends Partial<CreateCustomerData> {}

export interface CustomerFilter {
  page?: number;
  limit?: number;
  search?: string;
  loyalty_tier?: string;
  min_spent?: number;
  max_spent?: number;
}

// Customer API calls
const customerService = {
  // Get all customers
  getCustomers: async (filters: CustomerFilter = {}): Promise<{
    customers: Customer[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  }> => {
    const response = await apiClient.get<{
      success: boolean;
      data: {
        customers: Customer[];
        pagination: {
          total: number;
          page: number;
          limit: number;
          pages: number;
        };
      };
    }>('/customers', { params: filters });
    return response.data.data;
  },

  // Get a customer by ID
  getCustomerById: async (id: string): Promise<Customer> => {
    const response = await apiClient.get<{ success: boolean; data: { customer: Customer } }>(`/customers/${id}`);
    return response.data.data.customer;
  },

  // Create a new customer
  createCustomer: async (customerData: CreateCustomerData): Promise<Customer> => {
    const response = await apiClient.post<{ success: boolean; data: { customer: Customer } }>('/customers', customerData);
    return response.data.data.customer;
  },

  // Update a customer
  updateCustomer: async (id: string, customerData: UpdateCustomerData): Promise<Customer> => {
    const response = await apiClient.put<{ success: boolean; data: { customer: Customer } }>(`/customers/${id}`, customerData);
    return response.data.data.customer;
  },

  // Delete a customer
  deleteCustomer: async (id: string): Promise<{ success: boolean }> => {
    const response = await apiClient.delete<{ success: boolean }>(`/customers/${id}`);
    return response.data;
  },

  // Get customer purchase history
  getCustomerPurchaseHistory: async (customerId: string, params: {
    page?: number;
    limit?: number;
    start_date?: string;
    end_date?: string;
  } = {}): Promise<{
    orders: any[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  }> => {
    const response = await apiClient.get<{
      success: boolean;
      data: {
        orders: any[];
        pagination: {
          total: number;
          page: number;
          limit: number;
          pages: number;
        };
      };
    }>(`/customers/${customerId}/orders`, { params });
    return response.data.data;
  },

  // Add loyalty points to a customer
  addLoyaltyPoints: async (customerId: string, points: number, note: string): Promise<Customer> => {
    const response = await apiClient.post<{ success: boolean; data: { customer: Customer } }>(
      `/customers/${customerId}/loyalty-points`,
      { points, note }
    );
    return response.data.data.customer;
  },
};

export default customerService; 