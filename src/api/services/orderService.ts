import apiClient from '../client/axios';

// Types
export interface OrderItem {
  product_id: string;
  quantity: number;
  price: number;
  discount?: number;
  tax?: number;
  subtotal: number;
  total: number;
  product?: {
    id: string;
    name: string;
    sku?: string;
    image_url?: string;
  };
}

export interface Order {
  id: string;
  shop_id: string;
  customer_id?: string;
  staff_id?: string;
  reference_number: string;
  order_number?: string;
  order_date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'partial' | 'refunded';
  payment_method: 'cash' | 'card' | 'mobile';
  subtotal: number;
  discount_total: number;
  tax_total: number;
  total: number;
  notes?: string;
  items: OrderItem[];
  created_at?: string;
  updated_at?: string;
}

export interface CreateOrderData {
  customer_id?: string;
  shop_id: string;
  payment_method: 'cash' | 'card' | 'mobile';
  items: {
    product_id: string;
    quantity: number;
    price: number;
    discount?: number;
  }[];
  discount_total?: number;
  notes?: string;
  status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

// Order API calls
const orderService = {
  // Get all orders
  getOrders: async (params?: {
    page?: number;
    limit?: number;
    start_date?: string;
    end_date?: string;
    status?: string;
    customer_id?: string;
  }): Promise<{
    orders: Order[];
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
        orders: Order[];
        pagination: {
          total: number;
          page: number;
          limit: number;
          pages: number;
        };
      };
    }>('/orders', { params });
    return response.data.data;
  },

  // Get an order by ID
  getOrderById: async (id: string): Promise<Order> => {
    const response = await apiClient.get<{ success: boolean; data: { order: Order } }>(`/orders/${id}`);
    return response.data.data.order;
  },

  // Create a new order (sales transaction)
  createOrder: async (orderData: CreateOrderData): Promise<Order> => {
    const response = await apiClient.post<{ success: boolean; data: { order: Order } }>('/orders', orderData);
    return response.data.data.order;
  },

  // Cancel an order
  cancelOrder: async (id: string, reason: string): Promise<Order> => {
    const response = await apiClient.post<{ success: boolean; data: { order: Order } }>(`/orders/${id}/cancel`, {
      reason
    });
    return response.data.data.order;
  },

  // Refund an order
  refundOrder: async (id: string, amount: number, reason: string): Promise<Order> => {
    const response = await apiClient.post<{ success: boolean; data: { order: Order } }>(`/orders/${id}/refund`, {
      amount,
      reason
    });
    return response.data.data.order;
  },

  // Get daily sales summary
  getDailySalesSummary: async (date?: string): Promise<{
    date: string;
    total_sales: number;
    total_orders: number;
    average_order_value: number;
    items_sold: number;
  }> => {
    const response = await apiClient.get<{
      success: boolean;
      data: {
        date: string;
        total_sales: number;
        total_orders: number;
        average_order_value: number;
        items_sold: number;
      };
    }>('/orders/daily-summary', { params: { date } });
    return response.data.data;
  },

  // Update an order status
  updateOrderStatus: async (
    id: string, 
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled',
    note?: string
  ): Promise<Order> => {
    const response = await apiClient.post<{ success: boolean; data: { order: Order } }>(
      `/orders/${id}/status`, 
      { status, note }
    );
    return response.data.data.order;
  },

  // Update payment status
  updatePaymentStatus: async (
    id: string, 
    payment_status: 'pending' | 'paid' | 'partial' | 'refunded'
  ): Promise<Order> => {
    const response = await apiClient.post<{ success: boolean; data: { order: Order } }>(
      `/orders/${id}/payment-status`, 
      { payment_status }
    );
    return response.data.data.order;
  },
};

export default orderService; 