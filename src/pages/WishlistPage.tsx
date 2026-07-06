import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types';

const WishlistPage: React.FC = () => {
    const { user, wishlist } = useStore();
    const wishlistItems: Product[] = wishlist;

    if (!user) return (
        <div className="wishlist-page"><div className="container">
            <div className="wishlist-empty"><Heart size={64} opacity={.15} /><h2>Sign in to see your wishlist</h2><p>Save your favorite items</p></div>
        </div></div>
    );

    return (
        <div className="wishlist-page">
            <div className="container">
                <motion.header className="wishlist-header" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <h1><Heart size={28} fill="#dc3545" stroke="#dc3545" /> My Wishlist</h1>
                    <p>{wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved</p>
                </motion.header>
                {wishlistItems.length === 0 ? (
                    <div className="wishlist-empty"><Heart size={64} opacity={.15} /><h2>Your wishlist is empty</h2><p>Start exploring and save your favorites</p></div>
                ) : (
                    <div className="wishlist-grid">
                        {wishlistItems.map((item, i) => (
                            <motion.div key={item._id || i} className="wishlist-item" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .04 }}>
                                <ProductCard product={item} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;
