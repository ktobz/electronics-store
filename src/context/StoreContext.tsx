import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authAPI, userAPI, productsAPI } from '../services/api';
import type { User, Product, CartItem } from '../types';

interface StoreContextType {
  user: User | null;
  cart: CartItem[];
  wishlist: Product[];
  compare: Product[];
  points: number;
  isDarkMode: boolean;
  isCartOpen: boolean;
  loading: boolean;
  toasts: { id: string, message: string, type: 'success' | 'info' | 'error' }[];
  
  // Auth actions
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  
  // Cart actions
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateCartItem: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  
  // Wishlist actions
  toggleWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  
  // Compare actions
  toggleCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  
  // UI actions
  toggleDarkMode: () => void;
  setCartOpen: (open: boolean) => void;
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [compare, setCompare] = useState<Product[]>([]);
  const [points, setPoints] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState<{ id: string, message: string, type: 'success' | 'info' | 'error' }[]>([]);

  // Initialize user from localStorage (JWT-based auth)
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (token && savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          setUser(userData);

          // Load user's cart and wishlist from backend
          const cartData = await userAPI.getCart();
          setCart(cartData.products || []);

          const wishlistData = await userAPI.getWishlist();
          setWishlist(wishlistData.products || []);
        } catch (error) {
          console.error('Failed to restore session:', error);
          // Token may be expired - clear it
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    };

    initializeAuth();
  }, []);

  // Apply dark mode
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Toast management
  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(7);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  // Auth functions
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await authAPI.login({ email, password });
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
      
      addToast('Login successful!', 'success');
    } catch (error: any) {
      addToast(error.response?.data?.error || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any) => {
    try {
      setLoading(true);
      const response = await authAPI.register(userData);
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
      
      addToast('Registration successful!', 'success');
    } catch (error: any) {
      addToast(error.response?.data?.error || 'Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('mockUserSession');
    setUser(null);
    setCart([]);
    setWishlist([]);
    setPoints(0);
    addToast('Logged out successfully', 'info');
  };

  // Cart functions
  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      if (!user) {
        addToast('Please login to add items to cart', 'error');
        return;
      }

      await userAPI.addToCart(productId, quantity);
      
      // Refresh cart data (server returns populated product objects)
      const cartData = await userAPI.getCart();
      setCart(cartData.products || []);
      
      addToast('Added to cart!', 'success');
      setIsCartOpen(true);
    } catch (error: any) {
      addToast(error.response?.data?.error || 'Failed to add to cart', 'error');
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      await userAPI.removeFromCart(productId);
      
      // Refresh cart data
      const cartData = await userAPI.getCart();
      setCart(cartData.products || []);
      
      addToast('Removed from cart', 'info');
    } catch (error: any) {
      addToast(error.response?.data?.error || 'Failed to remove from cart', 'error');
    }
  };

  const updateCartItem = async (productId: string, quantity: number) => {
    try {
      await userAPI.updateCartItem(productId, quantity);
      
      // Refresh cart data
      const cartData = await userAPI.getCart();
      setCart(cartData.products || []);
    } catch (error: any) {
      addToast(error.response?.data?.error || 'Failed to update cart', 'error');
    }
  };

  const clearCart = () => {
    setCart([]);
    addToast('Cart cleared', 'info');
  };

  // Wishlist functions
  const toggleWishlist = async (productId: string) => {
    try {
      if (!user) {
        addToast('Please login to add items to wishlist', 'error');
        return;
      }

      const isInWishlist = wishlist.some(item => item._id === productId);
      
      if (isInWishlist) {
        await userAPI.removeFromWishlist(productId);
        setWishlist(prev => prev.filter(item => item._id !== productId));
        addToast('Removed from wishlist', 'info');
      } else {
        await userAPI.addToWishlist(productId);
        
        // Add to local wishlist (optimistic update)
        const product = await productsAPI.getProduct(productId);
        setWishlist(prev => [...prev, product]);
        addToast('Added to wishlist!', 'success');
      }
    } catch (error: any) {
      addToast(error.response?.data?.error || 'Failed to update wishlist', 'error');
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      await userAPI.removeFromWishlist(productId);
      setWishlist(prev => prev.filter(item => item._id !== productId));
      addToast('Removed from wishlist', 'info');
    } catch (error: any) {
      addToast(error.response?.data?.error || 'Failed to remove from wishlist', 'error');
    }
  };

  // Compare functions
  const toggleCompare = (product: Product) => {
    const isInCompare = compare.some(item => item._id === product._id);
    
    if (isInCompare) {
      setCompare(prev => prev.filter(item => item._id !== product._id));
      addToast('Removed from comparison', 'info');
    } else {
      if (compare.length >= 4) {
        addToast('You can compare up to 4 products', 'error');
        return;
      }
      setCompare(prev => [...prev, product]);
      addToast('Added to comparison', 'success');
    }
  };

  const removeFromCompare = (productId: string) => {
    setCompare(prev => prev.filter(item => item._id !== productId));
  };

  // Helper functions
  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item._id === productId);
  };

  const isInCompare = (productId: string) => {
    return compare.some(item => item._id === productId);
  };

  // UI functions
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const setCartOpen = (open: boolean) => {
    setIsCartOpen(open);
  };

  const value: StoreContextType = {
    user,
    cart,
    wishlist,
    compare,
    points,
    isDarkMode,
    isCartOpen,
    loading,
    toasts,
    
    login,
    register,
    logout,
    
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    
    toggleWishlist,
    removeFromWishlist,
    isInWishlist,
    
    toggleCompare,
    removeFromCompare,
    isInCompare,
    
    toggleDarkMode,
    setCartOpen,
    addToast,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export default StoreContext;
