import axios from 'axios';

const api = axios.create({
  // Use the correct variable name and remove the fallback
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// This interceptor is perfectly configured
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;