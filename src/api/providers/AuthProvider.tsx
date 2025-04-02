import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, getStoredUser, isAuthenticated, clearTokens } from '../utils/tokenStorage';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  setUser: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      // Check if user is authenticated and get stored user
      const authenticated = isAuthenticated();
      const storedUser = getStoredUser();

      if (authenticated && storedUser) {
        // If we have a token and user data, set the user
        setUser(storedUser);
      } else if (authenticated && !storedUser) {
        // If we have a token but no user data, clear tokens and redirect to login
        clearTokens();
        navigate('/auth/login');
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, [navigate]);

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider; 