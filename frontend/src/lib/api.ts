import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api',
  withCredentials: true, // sends httpOnly refresh token cookie automatically
});

// Attach in-memory access token to every request
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    // Import lazily to avoid circular deps — store is already initialised at this point
    const { useAuthStore } = require('@/store/useAuthStore');
    const token: string | null = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Silently refresh the access token on 401 using the httpOnly refresh cookie
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const baseURL = api.defaults.baseURL || 'http://localhost:5001/api';
        // No body needed — refresh token travels as an httpOnly cookie
        const { data } = await axios.post(
          `${baseURL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        // Update in-memory store with the new access token and refreshed user
        const { useAuthStore } = require('@/store/useAuthStore');
        useAuthStore.getState().setSession(data.accessToken, data.user);
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      } catch {
        // Refresh failed — clear in-memory session and send to login
        const { useAuthStore } = require('@/store/useAuthStore');
        useAuthStore.getState().clearSession();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
