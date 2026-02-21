import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { products } from '../services/mockApi';
import '../styles/CartDrawer.scss';

const CartDrawer: React.FC = () => {
    const { cart, removeFromCart, isCartOpen, setCartOpen } = useStore();

    const cartItems = cart.map(id => products.find(p => p.id === id)).filter(Boolean);
    const total = cartItems.reduce((sum, item) => sum + (item?.price || 0), 0);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    <motion.div
                        className="cart-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setCartOpen(false)}
                    />
                    <motion.div
                        className="cart-drawer"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <div className="cart-drawer__header">
                            <div className="title">
                                <ShoppingBag size={20} />
                                <span>Your Cart ({cart.length})</span>
                            </div>
                            <button className="close-btn" onClick={() => setCartOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="cart-drawer__content">
                            {cartItems.length === 0 ? (
                                <div className="cart-empty">
                                    <ShoppingBag size={48} opacity={0.2} />
                                    <p>Your cart is empty</p>
                                    <button className="btn btn-primary" onClick={() => setCartOpen(false)}>Start Shopping</button>
                                </div>
                            ) : (
                                <div className="cart-items">
                                    {cartItems.map((item, index) => (
                                        <div key={index} className="cart-item">
                                            <div className="cart-item__img">
                                                <img src={item?.image} alt={item?.name} />
                                            </div>
                                            <div className="cart-item__info">
                                                <h4>{item?.name}</h4>
                                                <p className="price">${item?.price.toLocaleString()}</p>
                                            </div>
                                            <button className="remove-btn" onClick={() => removeFromCart(item!.id)}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="cart-drawer__footer">
                                <div className="total">
                                    <span>Subtotal</span>
                                    <span>${total.toLocaleString()}</span>
                                </div>
                                <button className="btn btn-primary checkout-btn">
                                    Checkout Now
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
