import axios from 'axios';
import type { Product } from './mockApi';

// API Base URL - in production, this would be your backend URL
const API_BASE_URL = 'http://localhost:3001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Product APIs
export const productAPI = {
  // Get all products with pagination and filtering
  getProducts: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sortBy?: 'price' | 'rating' | 'name';
    sortOrder?: 'asc' | 'desc';
  }) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  // Get single product by ID
  getProduct: async (id: number) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Create new product (admin)
  createProduct: async (product: Omit<Product, 'id'>) => {
    const response = await api.post('/products', product);
    return response.data;
  },

  // Update product (admin)
  updateProduct: async (id: number, product: Partial<Product>) => {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
  },

  // Delete product (admin)
  deleteProduct: async (id: number) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  // Get related products
  getRelatedProducts: async (id: number, limit: number = 4) => {
    const response = await api.get(`/products/${id}/related`, { params: { limit } });
    return response.data;
  },

  // Get featured products for carousel
  getFeaturedProducts: async (limit: number = 8) => {
    const response = await api.get('/products/featured', { params: { limit } });
    return response.data;
  },

  // Get products on sale
  getSaleProducts: async (limit: number = 10) => {
    const response = await api.get('/products/sale', { params: { limit } });
    return response.data;
  },

  // Get new arrivals
  getNewProducts: async (limit: number = 10) => {
    const response = await api.get('/products/new', { params: { limit } });
    return response.data;
  },
};

// Category APIs
export const categoryAPI = {
  // Get all categories
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  // Get category with products
  getCategory: async (slug: string, params?: { page?: number; limit?: number }) => {
    const response = await api.get(`/categories/${slug}`, { params });
    return response.data;
  },
};

// Brand-specific APIs
export const brandAPI = {
  // Get all brands
  getBrands: async () => {
    const response = await api.get('/brands');
    return response.data;
  },

  // Get brand with products
  getBrand: async (slug: string, params?: { page?: number; limit?: number }) => {
    const response = await api.get(`/brands/${slug}`, { params });
    return response.data;
  },

  // Get Samsung products
  getSamsungProducts: async (params?: { 
    page?: number; 
    limit?: number; 
    category?: string; 
    minPrice?: number; 
    maxPrice?: number 
  }) => {
    const response = await api.get('/brands/samsung', { params });
    return response.data;
  },

  // Get Panasonic products
  getPanasonicProducts: async (params?: { 
    page?: number; 
    limit?: number; 
    category?: string; 
    minPrice?: number; 
    maxPrice?: number 
  }) => {
    const response = await api.get('/brands/panasonic', { params });
    return response.data;
  },
};

// User Authentication APIs
export const authAPI = {
  // Login
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  // Register
  register: async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await api.post('/auth/logout');
    localStorage.removeItem('auth_token');
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Refresh token
  refreshToken: async () => {
    const response = await api.post('/auth/refresh');
    return response.data;
  },
};

// Shopping Cart APIs
export const cartAPI = {
  // Get cart items
  getCart: async () => {
    const response = await api.get('/cart');
    return response.data;
  },

  // Add item to cart
  addToCart: async (productId: number, quantity: number = 1) => {
    const response = await api.post('/cart/items', { productId, quantity });
    return response.data;
  },

  // Update cart item quantity
  updateCartItem: async (itemId: number, quantity: number) => {
    const response = await api.put(`/cart/items/${itemId}`, { quantity });
    return response.data;
  },

  // Remove item from cart
  removeFromCart: async (itemId: number) => {
    const response = await api.delete(`/cart/items/${itemId}`);
    return response.data;
  },

  // Clear cart
  clearCart: async () => {
    const response = await api.delete('/cart');
    return response.data;
  },
};

// Wishlist APIs
export const wishlistAPI = {
  // Get wishlist items
  getWishlist: async () => {
    const response = await api.get('/wishlist');
    return response.data;
  },

  // Add item to wishlist
  addToWishlist: async (productId: number) => {
    const response = await api.post('/wishlist/items', { productId });
    return response.data;
  },

  // Remove item from wishlist
  removeFromWishlist: async (productId: number) => {
    const response = await api.delete(`/wishlist/items/${productId}`);
    return response.data;
  },

  // Check if product is in wishlist
  isInWishlist: async (productId: number) => {
    const response = await api.get(`/wishlist/check/${productId}`);
    return response.data;
  },
};

// Review APIs
export const reviewAPI = {
  // Get product reviews
  getProductReviews: async (productId: number, params?: { page?: number; limit?: number }) => {
    const response = await api.get(`/reviews/product/${productId}`, { params });
    return response.data;
  },

  // Add review
  addReview: async (productId: number, review: {
    rating: number;
    title: string;
    content: string;
  }) => {
    const response = await api.post(`/reviews/product/${productId}`, review);
    return response.data;
  },

  // Update review
  updateReview: async (reviewId: number, review: {
    rating?: number;
    title?: string;
    content?: string;
  }) => {
    const response = await api.put(`/reviews/${reviewId}`, review);
    return response.data;
  },

  // Delete review
  deleteReview: async (reviewId: number) => {
    const response = await api.delete(`/reviews/${reviewId}`);
    return response.data;
  },
};

// Search APIs
export const searchAPI = {
  // General search
  search: async (query: string, params?: {
    page?: number;
    limit?: number;
    category?: string;
    brand?: string;
  }) => {
    const response = await api.get('/search', { params: { q: query, ...params } });
    return response.data;
  },

  // Get search suggestions
  getSuggestions: async (query: string) => {
    const response = await api.get('/search/suggestions', { params: { q: query } });
    return response.data;
  },

  // Get popular searches
  getPopularSearches: async () => {
    const response = await api.get('/search/popular');
    return response.data;
  },
};

// Order APIs
export const orderAPI = {
  // Create order
  createOrder: async (orderData: {
    items: Array<{ productId: number; quantity: number }>;
    shippingAddress: any;
    paymentMethod: string;
  }) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  // Get user orders
  getOrders: async (params?: { page?: number; limit?: number; status?: string }) => {
    const response = await api.get('/orders', { params });
    return response.data;
  },

  // Get order details
  getOrder: async (orderId: string) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  // Track order
  trackOrder: async (trackingNumber: string) => {
    const response = await api.get(`/orders/track/${trackingNumber}`);
    return response.data;
  },
};

export default api;
