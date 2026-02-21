import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { type Product } from '../services/mockApi';
import { useStore } from '../context/StoreContext';
import '../styles/QuickView.scss';

interface QuickViewProps {
    product: Product;
    onClose: () => void;
}

const QuickView: React.FC<QuickViewProps> = ({ product, onClose }) => {
    const { addToCart } = useStore();

    // Mock reviews
    const reviews = [
        { id: 1, user: "Alex T.", rating: 5, comment: "Absolutely stunning quality. Best purchase this year!", date: "2 days ago", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100" },
        { id: 2, user: "Sarah K.", rating: 4, comment: "Fast shipping and great performance. Highly recommend.", date: "1 week ago" }
    ];

    return (
        <AnimatePresence>
            <div className="quick-view-overlay" onClick={onClose}>
                <motion.div
                    className="quick-view-modal"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="close-btn" onClick={onClose}><X size={24} /></button>

                    <div className="quick-view__grid">
                        <div className="quick-view__image">
                            <img src={product.image} alt={product.name} />
                        </div>

                        <div className="quick-view__info">
                            <span className="category">{product.category}</span>
                            <h2>{product.name}</h2>
                            <div className="rating">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < 4 ? "#ffc107" : "none"} stroke="#ffc107" />)}
                                <span>(4.8 • {reviews.length} reviews)</span>
                            </div>
                            <div className="price-box">
                                <span className="current-price">${product.price.toLocaleString()}</span>
                                {product.originalPrice && <span className="original-price">${product.originalPrice.toLocaleString()}</span>}
                            </div>

                            <p className="description">
                                Experience the pinnacle of performance and design. Built with premium materials and cutting-edge technology to ensure you stay ahead of the curve.
                            </p>

                            <div className="meta-info">
                                <div className="meta-item"><Truck size={18} /> <span>Free Shipping</span></div>
                                <div className="meta-item"><ShieldCheck size={18} /> <span>2-Year Warranty</span></div>
                            </div>

                            <button className="btn btn-primary add-to-cart" onClick={() => { addToCart(product.id); onClose(); }}>
                                <ShoppingBag size={20} />
                                Add to Cart
                            </button>

                            <div className="reviews-section">
                                <h3>Customer Reviews</h3>
                                <div className="reviews-list">
                                    {reviews.map(review => (
                                        <div key={review.id} className="review-item">
                                            <div className="review-user">
                                                {review.image && <img src={review.image} alt={review.user} className="user-avatar" />}
                                                <div>
                                                    <strong>{review.user}</strong>
                                                    <div className="stars">
                                                        {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < review.rating ? "#ffc107" : "none"} stroke="#ffc107" />)}
                                                        <span>• {review.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="comment">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default QuickView;
