import { createContext, ReactNode, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useSessionStore } from '../store/useSessionStore';
import { useTypingStore } from '../store/useTypingStore';
import { useAchievementStore } from '../store/useAchievementStore';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    login, 
    register, 
    logout,
    initializeAuth
  } = useAuthStore();
  
  const { loadUserSessions } = useSessionStore();
  const { loadUserTests } = useTypingStore();
  const { loadUserAchievements } = useAchievementStore();
  
  // Initialize authentication and load user data on mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);
  
  // Load user data when authentication state changes
  useEffect(() => {
    if (isAuthenticated && user) {
      loadUserSessions();
      loadUserTests();
      loadUserAchievements();
    }
  }, [isAuthenticated, user, loadUserSessions, loadUserTests, loadUserAchievements]);
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};