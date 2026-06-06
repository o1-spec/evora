import { create } from 'zustand';
import api from '@/lib/api';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  subscriptionTier: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  /** Called by api.ts interceptor to update tokens after a silent refresh */
  setSession: (accessToken: string, user: User) => void;
  /** Called by api.ts interceptor to wipe session on unrecoverable 401 */
  clearSession: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; firstName?: string; lastName?: string }) => Promise<void>;
  logout: () => Promise<void>;
  /** Silently restore session on page load using the httpOnly refresh cookie */
  restoreSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isLoading: true,
  isAuthenticated: false,

  setSession: (accessToken, user) => {
    set({ user, accessToken, isAuthenticated: true });
  },

  clearSession: () => {
    set({ user: null, accessToken: null, isAuthenticated: false });
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const { data } = await api.post('/auth/login', { email, password });
      // accessToken lives in memory; refreshToken arrived as an httpOnly cookie
      set({ user: data.user, accessToken: data.accessToken, isAuthenticated: true, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  register: async (payload) => {
    set({ isLoading: true });
    try {
      const { data } = await api.post('/auth/register', payload);
      set({ user: data.user, accessToken: data.accessToken, isAuthenticated: true, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  logout: async () => {
    try {
      // Backend will clear the httpOnly cookie and delete the DB session
      await api.post('/auth/logout');
    } catch { /* silent */ } finally {
      set({ user: null, accessToken: null, isAuthenticated: false });
    }
  },

  restoreSession: async () => {
    set({ isLoading: true });
    try {
      const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
      // Call refresh directly (no Authorization header needed — cookie is sent automatically)
      const { data } = await axios.post(
        `${baseURL}/auth/refresh`,
        {},
        { withCredentials: true }
      );
      set({ user: data.user, accessToken: data.accessToken, isAuthenticated: true, isLoading: false });
    } catch {
      // No valid refresh cookie → user is logged out
      set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false });
    }
  },
}));

// On client boot, silently restore session from the refresh cookie
if (typeof window !== 'undefined') {
  useAuthStore.getState().restoreSession();
}
