import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, ArrowRight, Plus, Minus } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import '../styles/CartDrawer.scss';

const CartDrawer: React.FC = () => {
    const { cart, removeFromCart, updateCartItem, isCartOpen, setCartOpen } = useStore();

    // Cart items now come pre-populated with product data from the API
    const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

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
                            {cart.length === 0 ? (
                                <div className="cart-empty">
                                    <ShoppingBag size={48} opacity={0.2} />
                                    <p>Your cart is empty</p>
                                    <button className="btn btn-primary" onClick={() => setCartOpen(false)}>Start Shopping</button>
                                </div>
                            ) : (
                                <div className="cart-items">
                                    {cart.map((item, index) => (
                                        <div key={item._id || item.id || index} className="cart-item">
                                            <div className="cart-item__img">
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                            <div className="cart-item__info">
                                                <h4>{item.name}</h4>
                                                <p className="price">${item.price.toLocaleString()}</p>
                                                <div className="cart-item__qty">
                                                    <button onClick={() => updateCartItem((item._id || String(item.id))!, Math.max(1, (item.quantity || 1) - 1))}>
                                                        <Minus size={12} />
                                                    </button>
                                                    <span>{item.quantity || 1}</span>
                                                    <button onClick={() => updateCartItem((item._id || String(item.id))!, (item.quantity || 1) + 1)}>
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                            <button className="remove-btn" onClick={() => removeFromCart((item._id || String(item.id))!)}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="cart-drawer__footer">
                                <div className="total">
                                    <span>Subtotal</span>
                                    <span>${total.toFixed(2)}</span>
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

