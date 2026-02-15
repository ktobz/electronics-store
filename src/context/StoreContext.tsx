import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface StoreContextType {
    cart: number[];
    wishlist: number[];
    compare: number[];
    addToCart: (id: number) => void;
    removeFromCart: (id: number) => void;
    toggleWishlist: (id: number) => void;
    toggleCompare: (id: number) => void;
    isInWishlist: (id: number) => boolean;
    isInCompare: (id: number) => boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<number[]>([]);
    const [wishlist, setWishlist] = useState<number[]>([]);
    const [compare, setCompare] = useState<number[]>([]);

    const addToCart = (id: number) => {
        setCart((prev) => [...prev, id]);
    };

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((item) => item !== id));
    };

    const toggleWishlist = (id: number) => {
        setWishlist((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const toggleCompare = (id: number) => {
        setCompare((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const isInWishlist = (id: number) => wishlist.includes(id);
    const isInCompare = (id: number) => compare.includes(id);

    return (
        <StoreContext.Provider value={{
            cart,
            wishlist,
            compare,
            addToCart,
            removeFromCart,
            toggleWishlist,
            toggleCompare,
            isInWishlist,
            isInCompare
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
