import apiClient from '../client/axios';

// Types
export interface Category {
  id: number;
  name: string;
  description?: string;
  shop_id: number;
  created_at: string;
  updated_at: string;
}

export interface CreateCategoryData {
  name: string;
  description?: string;
}

export interface UpdateCategoryData {
  name?: string;
  description?: string;
}

// Category API calls
const categoryService = {
  // Get all categories
  getCategories: async (): Promise<Category[]> => {
    const response = await apiClient.get<{ status: string; data: { categories: Category[] } }>('/categories');
    return response.data.data.categories;
  },

  // Create new category
  createCategory: async (categoryData: CreateCategoryData): Promise<Category> => {
    const response = await apiClient.post<{ status: string; data: { category: Category } }>('/categories', categoryData);
    return response.data.data.category;
  },

  // Update category
  updateCategory: async (id: number, categoryData: UpdateCategoryData): Promise<Category> => {
    const response = await apiClient.put<{ status: string; data: { category: Category } }>(`/categories/${id}`, categoryData);
    return response.data.data.category;
  },

  // Delete category
  deleteCategory: async (id: number): Promise<void> => {
    await apiClient.delete(`/categories/${id}`);
  }
};

export default categoryService; 