import apiClient from '../client/axios';

// Types
export interface FeedbackForm {
  id: string;
  title: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  questions: FeedbackQuestion[];
}

export interface FeedbackQuestion {
  id: string;
  form_id: string;
  question_text: string;
  question_type: 'rating' | 'text' | 'multiple_choice' | 'checkbox';
  options?: string[];
  is_required: boolean;
  sequence: number;
}

export interface FeedbackResponse {
  id: string;
  form_id: string;
  customer_id?: string;
  sale_id?: string;
  overall_rating?: number;
  created_at: string;
  responses: FeedbackQuestionResponse[];
}

export interface FeedbackQuestionResponse {
  question_id: string;
  answer_text?: string;
  answer_rating?: number;
  answer_options?: string[] | string;
}

export interface FeedbackResponseCreate {
  form_id: string;
  customer_id?: string;
  sale_id?: string;
  overall_rating?: number;
  responses: FeedbackQuestionResponse[];
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Feedback API calls
const feedbackService = {
  // Get all feedback forms
  getAllForms: async (params?: { page?: number; limit?: number; is_active?: boolean }): Promise<PaginatedResult<FeedbackForm>> => {
    const response = await apiClient.get<PaginatedResult<FeedbackForm>>('/feedback/forms', { params });
    return response.data;
  },

  // Get feedback form by ID
  getFormById: async (id: string): Promise<FeedbackForm> => {
    const response = await apiClient.get<FeedbackForm>(`/feedback/forms/${id}`);
    return response.data;
  },

  // Create feedback form
  createForm: async (formData: Partial<FeedbackForm>): Promise<FeedbackForm> => {
    const response = await apiClient.post<FeedbackForm>('/feedback/forms', formData);
    return response.data;
  },

  // Update feedback form
  updateForm: async (id: string, formData: Partial<FeedbackForm>): Promise<FeedbackForm> => {
    const response = await apiClient.put<FeedbackForm>(`/feedback/forms/${id}`, formData);
    return response.data;
  },

  // Delete feedback form
  deleteForm: async (id: string): Promise<void> => {
    await apiClient.delete(`/feedback/forms/${id}`);
  },

  // Add question to feedback form
  addQuestion: async (formId: string, questionData: Partial<FeedbackQuestion>): Promise<FeedbackQuestion> => {
    const response = await apiClient.post<FeedbackQuestion>(`/feedback/forms/${formId}/questions`, questionData);
    return response.data;
  },

  // Update question in feedback form
  updateQuestion: async (formId: string, questionId: string, questionData: Partial<FeedbackQuestion>): Promise<FeedbackQuestion> => {
    const response = await apiClient.put<FeedbackQuestion>(`/feedback/forms/${formId}/questions/${questionId}`, questionData);
    return response.data;
  },

  // Delete question from feedback form
  deleteQuestion: async (formId: string, questionId: string): Promise<void> => {
    await apiClient.delete(`/feedback/forms/${formId}/questions/${questionId}`);
  },

  // Submit feedback response (no authentication required)
  submitResponse: async (responseData: FeedbackResponseCreate): Promise<FeedbackResponse> => {
    const response = await apiClient.post<FeedbackResponse>('/feedback/responses', responseData);
    return response.data;
  },

  // Get all feedback responses (authenticated)
  getResponses: async (params?: { 
    page?: number; 
    limit?: number; 
    form_id?: string;
    customer_id?: string;
    sale_id?: string;
    start_date?: string;
    end_date?: string;
  }): Promise<PaginatedResult<FeedbackResponse>> => {
    const response = await apiClient.get<PaginatedResult<FeedbackResponse>>('/feedback/responses', { params });
    return response.data;
  },

  // Get feedback response by ID (authenticated)
  getResponseById: async (id: string): Promise<FeedbackResponse> => {
    const response = await apiClient.get<FeedbackResponse>(`/feedback/responses/${id}`);
    return response.data;
  },

  // Get feedback analytics (authenticated)
  getAnalytics: async (params: { 
    form_id: string;
    start_date?: string;
    end_date?: string;
  }): Promise<any> => {
    const response = await apiClient.get('/feedback/analytics', { params });
    return response.data;
  }
};

export default feedbackService; 