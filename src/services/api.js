import axios from 'axios';

// Base URL can be configured via .env (VITE_API_URL) or defaults to local backend API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 5000, // 5 seconds timeout before fallback
});

// Interceptor to attach Authorization Bearer token if logged in
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('simas_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Optional: auto redirect on unauthorized token expiration
      // localStorage.removeItem('simas_token');
    }
    return Promise.reject(error);
  }
);

export default api;
export { API_BASE_URL };
