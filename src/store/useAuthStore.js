import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Simple auth store with persisted state
const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      
      // Login function (simple implementation with hardcoded credentials)
      login: (username, password) => {
        // For demonstration, using hardcoded credentials
        // In a real app, you would validate against a backend
        if (username === 'admin' && password === 'admin123') {
          set({ 
            isLoggedIn: true, 
            user: { username, role: 'admin' }
          });
          return true;
        }
        return false;
      },
      
      // Logout function
      logout: () => set({ isLoggedIn: false, user: null }),
      
      // Check if user is admin
      isAdmin: () => {
        const state = useAuthStore.getState();
        return state.isLoggedIn && state.user?.role === 'admin';
      }
    }),
    {
      name: 'auth-storage', // unique name for localStorage
    }
  )
);

export default useAuthStore;