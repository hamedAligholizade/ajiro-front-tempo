import apiClient from '../client/axios';
import { formatImageUrl } from '../../utils/imageUtils';

// Types
export interface Product {
  id: string;
  name: string;
  sku: string;
  barcode?: string;
  description?: string;
  category_id: string;
  purchase_price: number;
  selling_price: number;
  discount_price?: number;
  is_taxable: boolean;
  tax_rate?: number;
  image_url?: string;
  is_active: boolean;
  weight?: number;
  weight_unit?: string;
  stock_quantity?: number;
  reorder_level?: number;
  reorder_quantity?: number;
  location?: string;
  category?: {
    id: string;
    name: string;
  };
  inventory?: {
    stock_quantity: number;
    available_quantity: number;
    reserved_quantity: number;
    reorder_level: number;
    reorder_quantity: number;
    location: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface ProductFilter {
  page?: number;
  limit?: number;
  search?: string;
  category_id?: string;
  is_active?: boolean;
  min_price?: number;
  max_price?: number;
  in_stock?: boolean;
}

export interface ProductsResponse {
  products: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface CreateProductData {
  name: string;
  sku: string;
  barcode?: string;
  description?: string;
  category_id: string;
  purchase_price: number;
  selling_price: number;
  discount_price?: number;
  is_taxable?: boolean;
  tax_rate?: number;
  is_active?: boolean;
  weight?: number;
  weight_unit?: string;
  stock_quantity?: number;
  reorder_level?: number;
  reorder_quantity?: number;
  location?: string;
  image_url?: string;
}

export interface UpdateProductData extends Partial<CreateProductData> {}

export interface InventoryUpdate {
  stock_quantity?: number;
  available_quantity?: number;
  reserved_quantity?: number;
  reorder_level?: number;
  reorder_quantity?: number;
  location?: string;
  adjustment_reason?: string;
}

export interface InventoryTransaction {
  id: string;
  product_id: string;
  quantity: number;
  transaction_type: string;
  note: string;
  created_at: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
  };
}

// Product API calls
const productService = {
  // Get all products with filtering
  getProducts: async (filters: ProductFilter = {}): Promise<ProductsResponse> => {
    const response = await apiClient.get<{ success: boolean; data: ProductsResponse }>('/products', {
      params: filters
    });
    
    // Format image URLs with backend base URL
    const formattedProducts = response.data.data.products.map(product => ({
      ...product,
      image_url: formatImageUrl(product.image_url)
    }));
    
    return {
      ...response.data.data,
      products: formattedProducts
    };
  },

  // Get a product by ID
  getProductById: async (id: string): Promise<Product> => {
    const response = await apiClient.get<{ success: boolean; data: { product: Product } }>(`/products/${id}`);
    
    // Format image URL with backend base URL
    const product = response.data.data.product;
    return {
      ...product,
      image_url: formatImageUrl(product.image_url)
    };
  },

  // Create a new product
  createProduct: async (productData: CreateProductData): Promise<Product> => {
    const response = await apiClient.post<{ success: boolean; data: { product: Product } }>('/products', productData);
    return response.data.data.product;
  },

  // Update a product
  updateProduct: async (id: string, productData: UpdateProductData): Promise<Product> => {
    const response = await apiClient.put<{ success: boolean; data: { product: Product } }>(`/products/${id}`, productData);
    return response.data.data.product;
  },

  // Delete a product
  deleteProduct: async (id: string): Promise<{ success: boolean }> => {
    const response = await apiClient.delete<{ success: boolean }>(`/products/${id}`);
    return response.data;
  },

  // Update product inventory
  updateInventory: async (productId: string, data: InventoryUpdate): Promise<any> => {
    const response = await apiClient.patch<{ status: string; data: any }>(`/products/${productId}/inventory`, data);
    return response.data.data;
  },

  // Get inventory history for a product
  getInventoryHistory: async (productId: string, page = 1, limit = 20): Promise<{
    data: InventoryTransaction[];
    count: number;
    totalPages: number;
    currentPage: number;
  }> => {
    const response = await apiClient.get<{
      status: string;
      count: number;
      totalPages: number;
      currentPage: number;
      data: InventoryTransaction[];
    }>(`/products/${productId}/inventory-history`, {
      params: { page, limit }
    });
    return response.data;
  },

  // Get low stock products
  getLowStockProducts: async (): Promise<ProductsResponse> => {
    const response = await apiClient.get<{ success: boolean; data: ProductsResponse }>('/products/low-stock');
    return response.data.data;
  },

  // Upload product image
  uploadProductImage: async (productId: string, imageFile: File): Promise<string> => {
    // Create form data
    const formData = new FormData();
    formData.append('image', imageFile);
    
    try {
      // Upload image to server
      const response = await apiClient.post<{ success: boolean; imageUrl: string }>(`/upload/product-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success && response.data.imageUrl) {
        // Format the image URL with backend base URL
        const formattedImageUrl = formatImageUrl(response.data.imageUrl);
        
        // Update product with new image URL
        await productService.updateProduct(productId, { image_url: formattedImageUrl });
        return formattedImageUrl;
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading product image:', error);
      throw error;
    }
  },
  
  // Adjust stock quantity
  adjustStock: async (productId: string, quantity: number, note: string): Promise<any> => {
    const response = await apiClient.post<{ status: string; data: any }>(`/products/${productId}/adjust-stock`, {
      quantity,
      note
    });
    return response.data.data;
  }
};

export default productService; 