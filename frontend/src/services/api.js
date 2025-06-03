import axios from 'axios';
import store from '../store';
import { logoutUser } from '../store/slices/authSlice';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable sending cookies
});

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url, 'Full URL:', config.baseURL + config.url);
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response) {
      // Handle 401 Unauthorized response
      if (error.response.status === 401 && !originalRequest._retry) {
        // Don't try to refresh if this was already a refresh token request or auth check
        if (originalRequest.url.includes('/auth/refresh-token') || 
            originalRequest.url.includes('/auth/profile') ||
            originalRequest.url.includes('/auth/login')) {
          // For auth check failures, don't logout - this is normal when not authenticated
          if (originalRequest.url.includes('/auth/profile')) {
            return Promise.reject(error);
          }
          // For login failures, don't logout
          if (originalRequest.url.includes('/auth/login')) {
            return Promise.reject(error);
          }
          // For refresh token failures, logout
          store.dispatch(logoutUser());
          return Promise.reject(error);
        }
        
        if (isRefreshing) {
          // If we're already refreshing, queue this request
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(() => {
            console.log('Retrying queued request:', originalRequest.url);
            return api(originalRequest);
          }).catch(err => {
            return Promise.reject(err);
          });
        }
        
        originalRequest._retry = true;
        isRefreshing = true;
        
        try {
          // Attempt to refresh the token
          await api.post('/auth/refresh-token');
          
          // Token refresh successful, process the queue
          processQueue(null);
          isRefreshing = false;
          
          // Retry the original request
          console.log('Retrying original request after token refresh:', originalRequest.url);
          return api(originalRequest);
        } catch (refreshError) {
          // Token refresh failed, logout user
          processQueue(refreshError);
          isRefreshing = false;
          store.dispatch(logoutUser());
          return Promise.reject(refreshError);
        }
      }
      
      // Handle 403 Forbidden response
      if (error.response.status === 403) {
        console.error('Access forbidden. Insufficient permissions or other restriction.');
      }
      
      // Return error message from the server if available
      const message = error.response.data?.message || error.message;
      return Promise.reject(new Error(message));
    }
    return Promise.reject(error);
  },
);

export default api;

