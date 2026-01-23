import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 errors (unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const fetchData = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    // Handle filter arrays properly
    Object.keys(filters).forEach(key => {
      const value = filters[key];
      // If it's an array, take the first selected value
      if (Array.isArray(value) && value.length > 0) {
        params.append(key, value[0]);
      } else if (typeof value === 'string' && value) {
        params.append(key, value);
      }
    });

    const queryString = params.toString();
    const url = queryString ? `/data?${queryString}` : '/data';
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchFilters = async () => {
  try {
    const response = await api.get('/filters');
    return response.data;
  } catch (error) {
    console.error('Error fetching filters:', error);
    throw error;
  }
};

export default api;
