import React from 'react';
import { motion } from 'framer-motion';
import { X, Star, ShoppingBag, ShieldCheck, Truck, Award, Minus, Plus } from 'lucide-react';
import type { Product } from '../types';
import { useStore } from '../context/StoreContext';
import '../styles/QuickView.scss';

interface QuickViewProps { product: Product; onClose: () => void; }

const QuickView: React.FC<QuickViewProps> = ({ product, onClose }) => {
    const { addToCart, toggleWishlist, isInWishlist } = useStore();
    const [qty, setQty] = React.useState(1);
    const getProductId = () => product._id || product.id?.toString() || '';
    const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    return (
        <motion.div className="qvo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
            <motion.div
                className="qvo__modal"
                initial={{ opacity: 0, scale: 0.85, y: 60 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={e => e.stopPropagation()}
            >
                <button className="qvo__close" onClick={onClose}><X size={20} /></button>

                <div className="qvo__body">
                    <div className="qvo__media">
                        <div className="qvo__img-wrap">
                            <img src={product.image} alt={product.name} />
                            {discount > 0 && <span className="qvo__discount">-{discount}%</span>}
                        </div>
                        <div className="qvo__trust">
                            <div className="qvo__trust-item"><Truck size={16} /> Free Express Shipping</div>
                            <div className="qvo__trust-item"><ShieldCheck size={16} /> 2-Year Warranty</div>
                            <div className="qvo__trust-item"><Award size={16} /> Certified Authentic</div>
                        </div>
                    </div>

                    <div className="qvo__details">
                        <span className="qvo__brand">{product.brand}</span>
                        <h2 className="qvo__name">{product.name}</h2>
                        <div className="qvo__rating">
                            <div className="qvo__stars">
                                {[1,2,3,4,5].map(i => (
                                    <Star key={i} size={16} fill={i <= Math.round(product.rating) ? '#c5a059' : 'none'} stroke={i <= Math.round(product.rating) ? '#c5a059' : '#d1d5db'} />
                                ))}
                            </div>
                            <span className="qvo__rating-num">{product.rating}</span>
                            <span className="qvo__reviews">({product.reviews || 0} reviews)</span>
                        </div>

                        <div className="qvo__price-row">
                            <span className="qvo__price">${product.price.toLocaleString()}</span>
                            {product.originalPrice && <span className="qvo__orig-price">${product.originalPrice.toLocaleString()}</span>}
                        </div>

                        <p className="qvo__desc">{product.description}</p>

                        {product.tags && product.tags.length > 0 && (
                            <div className="qvo__tags">
                                {product.tags.slice(0, 4).map(tag => (
                                    <span key={tag} className="qvo__tag">{tag}</span>
                                ))}
                            </div>
                        )}

                        <div className="qvo__qty-row">
                            <span className="qvo__qty-label">Quantity</span>
                            <div className="qvo__qty-ctrl">
                                <button onClick={() => setQty(q => Math.max(1, q - 1))} disabled={qty <= 1}><Minus size={14} /></button>
                                <span>{qty}</span>
                                <button onClick={() => setQty(q => q + 1)}><Plus size={14} /></button>
                            </div>
                        </div>

                        <div className="qvo__actions">
                            <button className="qvo__btn-cart" onClick={() => { addToCart(getProductId(), qty); onClose(); }}>
                                <ShoppingBag size={20} /> Add to Cart — ${(product.price * qty).toLocaleString()}
                            </button>
                            <button className={`qvo__btn-wish ${isInWishlist(getProductId()) ? 'active' : ''}`} onClick={() => toggleWishlist(getProductId())}>
                                {isInWishlist(getProductId()) ? '♥ Saved' : '♡ Wishlist'}
                            </button>
                        </div>

                        <div className="qvo__in-stock">
                            <span className="qvo__dot" /> {product.inStock !== false ? 'In Stock — Ships within 24h' : 'Out of Stock'}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default QuickView;
