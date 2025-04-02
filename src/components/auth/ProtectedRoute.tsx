import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

interface ProtectedRouteProps {
  requiredRoles?: string[];
  requireShop?: boolean;
}

const ProtectedRoute = ({ requiredRoles, requireShop = false }: ProtectedRouteProps) => {
  const { user, shop, isAuthenticated, isLoading } = useAppSelector(state => state.auth);

  // Show loading state
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // If specific roles are required, check if user has the required role
  if (requiredRoles && user && !requiredRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If shop is required but not selected, redirect to shop selector
  if (requireShop && !shop) {
    return <Navigate to="/shop/select" replace />;
  }

  // User is authenticated, has required role, and has selected shop if required
  return <Outlet />;
};

export default ProtectedRoute; 