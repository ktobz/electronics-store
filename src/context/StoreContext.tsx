import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface StoreContextType {
    cart: number[];
    wishlist: number[];
    compare: number[];
    points: number;
    isDarkMode: boolean;
    isCartOpen: boolean;
    toasts: { id: string, message: string, type: 'success' | 'info' }[];
    addToCart: (id: number) => void;
    removeFromCart: (id: number) => void;
    toggleWishlist: (id: number) => void;
    toggleCompare: (id: number) => void;
    isInWishlist: (id: number) => boolean;
    isInCompare: (id: number) => boolean;
    toggleDarkMode: () => void;
    setCartOpen: (open: boolean) => void;
    addToast: (message: string, type?: 'success' | 'info') => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

import { addPoints, fetchPoints } from '../services/mockApi';

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<number[]>([]);
    const [wishlist, setWishlist] = useState<number[]>([]);
    const [compare, setCompare] = useState<number[]>([]);
    const [points, setPoints] = useState(fetchPoints());
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [toasts, setToasts] = useState<{ id: string, message: string, type: 'success' | 'info' }[]>([]);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const addToast = (message: string, type: 'success' | 'info' = 'success') => {
        const id = Math.random().toString(36).substring(7);
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
    };

    const addToCart = (id: number) => {
        setCart((prev) => [...prev, id]);
        addPoints(10);
        setPoints(p => p + 10);
        addToast("Added to cart!");
        setIsCartOpen(true);
    };

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((item) => item !== id));
    };

    const toggleWishlist = (id: number) => {
        const adding = !wishlist.includes(id);
        setWishlist((prev) =>
            adding ? [...prev, id] : prev.filter((item) => item !== id)
        );
        if (adding) addToast("Added to wishlist!");
    };

    const toggleCompare = (id: number) => {
        const adding = !compare.includes(id);
        if (adding && compare.length >= 4) {
            addToast("Max 4 items for comparison", "info");
            return;
        }
        setCompare((prev) =>
            adding ? [...prev, id] : prev.filter((item) => item !== id)
        );
        if (adding) addToast("Added to comparison");
    };

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
    const setCartOpen = (open: boolean) => setIsCartOpen(open);

    const isInWishlist = (id: number) => wishlist.includes(id);
    const isInCompare = (id: number) => compare.includes(id);

    return (
        <StoreContext.Provider value={{
            cart,
            wishlist,
            compare,
            points,
            isDarkMode,
            isCartOpen,
            toasts,
            addToCart,
            removeFromCart,
            toggleWishlist,
            toggleCompare,
            isInWishlist,
            isInCompare,
            toggleDarkMode,
            setCartOpen,
            addToast
        }}>
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
