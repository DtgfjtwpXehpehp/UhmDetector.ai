import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  uploadProfilePicture: (file: File) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user for demo purposes
      const user: User = {
        id: '1',
        name: 'Demo User',
        email,
        createdAt: new Date(),
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo'
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  register: async (name, email, password) => {
    set({ isLoading: true });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        id: Date.now().toString(),
        name,
        email,
        createdAt: new Date(),
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
  },
  
  updateProfile: (userData) => {
    set(state => {
      if (!state.user) return state;
      
      const updatedUser = { ...state.user, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return { user: updatedUser };
    });
  },

  uploadProfilePicture: async (file: File) => {
    set({ isLoading: true });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const imageUrl = URL.createObjectURL(file);
      
      set(state => {
        if (!state.user) return state;
        
        const updatedUser = {
          ...state.user,
          avatarUrl: imageUrl
        };
        
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return { user: updatedUser, isLoading: false };
      });
    } catch (error) {
      set({ isLoading: false });
      throw new Error('Failed to upload profile picture');
    }
  },

  requestPasswordReset: async (email: string) => {
    set({ isLoading: true });
    
    try {
      // Generate a random reset token
      const resetToken = Math.random().toString(36).substring(2, 15);
      
      // Store the token with expiration (1 hour)
      const resetData = {
        token: resetToken,
        email,
        expires: new Date(Date.now() + 3600000).toISOString()
      };
      localStorage.setItem('passwordReset', JSON.stringify(resetData));
      
      // Simulate API call for sending email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  resetPassword: async (token: string, newPassword: string) => {
    set({ isLoading: true });
    
    try {
      // Verify token
      const resetData = JSON.parse(localStorage.getItem('passwordReset') || '{}');
      
      if (!resetData.token || resetData.token !== token || new Date(resetData.expires) < new Date()) {
        throw new Error('Invalid or expired reset token');
      }
      
      // In a real app, you would update the password in your backend
      // For demo, we'll just simulate the API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear the reset token
      localStorage.removeItem('passwordReset');
      
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  }
}));