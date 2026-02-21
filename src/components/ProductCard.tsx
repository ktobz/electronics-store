import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, Heart, Repeat, Eye } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import QuickView from './QuickView';
import '../styles/ProductCard.scss';

import { type Product } from '../services/mockApi';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart, toggleWishlist, toggleCompare, isInWishlist, isInCompare } = useStore();
    const [isHovered, setIsHovered] = React.useState(false);
    const [showQuickView, setShowQuickView] = React.useState(false);
    const [imageError, setImageError] = React.useState(false);

    const discountPercentage = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <motion.div
            className="product-card compact"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
        >
            <div className="product-card__image-container">
                <AnimatePresence mode="wait">
                    {!isHovered ? (
                        <motion.img
                            key="static"
                            src={imageError ? "/src/assets/images/placeholder-default.svg" : product.image}
                            alt={product.name}
                            className="product-card__image"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <motion.div
                            key="video"
                            className="product-card__video-mock"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <img 
                                src={imageError ? "/src/assets/images/placeholder-default.svg" : product.image} 
                                alt={product.name} 
                                className="blur-bg"
                                onError={() => setImageError(true)}
                            />
                            <div className="video-overlay">
                                <Eye size={32} />
                                <span>Previewing Tech...</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Badges */}
                <div className="product-card__badges">
                    {product.isNew && <span className="badge badge--new">New</span>}
                    {product.isSale && <span className="badge badge--sale">-{discountPercentage}%</span>}
                </div>

                {/* Action Buttons Overlay - Inside Image */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            className="product-card__image-actions"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <button
                                className={`action-btn action-btn--cart ${isInCompare(product.id) ? 'active' : ''}`}
                                onClick={() => addToCart(product.id)}
                                title="Add to Cart"
                            >
                                <ShoppingBag size={18} />
                            </button>
                            <button
                                className={`action-btn action-btn--wishlist ${isInWishlist(product.id) ? 'active' : ''}`}
                                onClick={() => toggleWishlist(product.id)}
                                title="Add to Wishlist"
                            >
                                <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                            </button>
                            <button
                                className={`action-btn action-btn--compare ${isInCompare(product.id) ? 'active' : ''}`}
                                onClick={() => toggleCompare(product.id)}
                                title="Compare"
                            >
                                <Repeat size={18} />
                            </button>
                            <button
                                className="action-btn action-btn--quickview"
                                onClick={() => setShowQuickView(true)}
                                title="Quick View"
                            >
                                <Eye size={18} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="product-card__content">
                <div className="product-card__category">{product.category}</div>
                <h3 className="product-card__title" title={product.name}>{product.name}</h3>

                <div className="product-card__rating">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={14}
                            fill={i < Math.floor(product.rating) ? "#ffc107" : "none"}
                            stroke={i < Math.floor(product.rating) ? "#ffc107" : "#e4e5e9"}
                        />
                    ))}
                    <span className="rating-text">({product.rating})</span>
                </div>

                <div className="product-card__price-box">
                    <span className="price price--current">${product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                        <span className="price price--original">${product.originalPrice.toLocaleString()}</span>
                    )}
                </div>
            </div>
            {showQuickView && (
                <QuickView product={product} onClose={() => setShowQuickView(false)} />
            )}
        </motion.div>
    );
};

export default ProductCard;
