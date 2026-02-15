import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Heart, Repeat, Eye } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import '../styles/ProductCard.scss';

import { type Product } from '../services/mockApi';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart, toggleWishlist, toggleCompare, isInWishlist, isInCompare } = useStore();

    const discountPercentage = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <motion.div
            className="product-card"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
        >
            <div className="product-card__image-container">
                <img src={product.image} alt={product.name} className="product-card__image" />

                {/* Badges */}
                <div className="product-card__badges">
                    {product.isNew && <span className="badge badge--new">New</span>}
                    {product.isSale && <span className="badge badge--sale">-{discountPercentage}%</span>}
                </div>

                {/* Action Buttons Overlay */}
                <div className="product-card__actions">
                    <button
                        className={`action-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                        onClick={() => toggleWishlist(product.id)}
                        title="Add to Wishlist"
                    >
                        <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                    </button>
                    <button
                        className={`action-btn ${isInCompare(product.id) ? 'active' : ''}`}
                        onClick={() => toggleCompare(product.id)}
                        title="Compare"
                    >
                        <Repeat size={18} />
                    </button>
                    <button className="action-btn" title="Quick View">
                        <Eye size={18} />
                    </button>
                </div>

                {/* Add to Cart Button */}
                <button
                    className="product-card__add-cart"
                    onClick={() => addToCart(product.id)}
                >
                    <ShoppingBag size={18} />
                    Add to Cart
                </button>
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
        </motion.div>
    );
};

export default ProductCard;
