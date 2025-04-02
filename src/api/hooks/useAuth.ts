import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import authService, { 
  LoginCredentials, 
  RegisterData, 
  ForgotPasswordData, 
  ResetPasswordData 
} from '../services/authService';
import { clearTokens, getStoredUser } from '../utils/tokenStorage';

export const useAuthUser = () => {
  return getStoredUser();
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      // Update auth state in React Query cache
      queryClient.setQueryData(['user'], data.user);
      // Redirect to dashboard
      navigate('/dashboard');
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (userData: RegisterData) => authService.register(userData),
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear user from React Query cache
      queryClient.setQueryData(['user'], null);
      // Redirect to login page
      navigate('/auth/login');
    },
    onError: () => {
      // Clear tokens on error as well and redirect
      clearTokens();
      navigate('/auth/login');
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordData) => authService.forgotPassword(data),
  });
};

export const useResetPassword = () => {
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: (data: ResetPasswordData) => authService.resetPassword(data),
    onSuccess: () => {
      navigate('/auth/login');
    },
  });
}; 