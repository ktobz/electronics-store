import axios from 'axios';

const API_BASE_URL = '/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
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

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    const ct = response.headers['content-type'] || '';
    if (ct.includes('text/html') || (typeof response.data === 'string' && response.data.trim().startsWith('<'))) {
      return Promise.reject(new Error('API returned HTML — backend unavailable'));
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
  }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
};

// Products API
export const productsAPI = {
  getProducts: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    brand?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
  }) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  getProduct: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  searchProducts: async (query: string, filters?: any) => {
    const response = await api.get('/products', {
      params: { search: query, ...filters }
    });
    return response.data;
  },
};

// User API
export const userAPI = {
  getProfile: async () => {
    const response = await api.get('/user/profile');
    return response.data;
  },

  updateProfile: async (userData: any) => {
    const response = await api.put('/user/profile', userData);
    return response.data;
  },

  addToWishlist: async (productId: string) => {
    const response = await api.put('/user/wishlist', { productId });
    return response.data;
  },

  removeFromWishlist: async (productId: string) => {
    const response = await api.delete(`/user/wishlist/${productId}`);
    return response.data;
  },

  getWishlist: async () => {
    const response = await api.get('/user/wishlist');
    return response.data;
  },

  addToCart: async (productId: string, quantity: number = 1) => {
    const response = await api.put('/user/cart', { productId, quantity });
    return response.data;
  },

  getCart: async () => {
    const response = await api.get('/user/cart');
    return response.data;
  },

  updateCartItem: async (productId: string, quantity: number) => {
    const response = await api.put(`/user/cart/${productId}`, { quantity });
    return response.data;
  },

  removeFromCart: async (productId: string) => {
    const response = await api.delete(`/user/cart/${productId}`);
    return response.data;
  },
};

// Orders API
export const ordersAPI = {
  getOrders: async () => {
    const response = await api.get('/user/orders');
    return response.data;
  },

  getOrder: async (id: string) => {
    const response = await api.get(`/user/orders/${id}`);
    return response.data;
  },

  createOrder: async (orderData: any) => {
    const response = await api.post('/user/orders', orderData);
    return response.data;
  },
};

// Blog API
export const blogAPI = {
  getBlogs: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    featured?: boolean;
  }) => {
    const response = await api.get('/blogs', { params });
    return response.data;
  },

  getBlog: async (slug: string) => {
    const response = await api.get(`/blogs/${slug}`);
    return response.data;
  },

  getBlogByCategory: async (category: string) => {
    const response = await api.get('/blogs', { params: { category } });
    return response.data;
  },
};

// Categories API
export const categoriesAPI = {
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  getCategory: async (id: string) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },
};

export default api;
