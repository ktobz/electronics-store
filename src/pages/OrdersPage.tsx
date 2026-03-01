import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, ExternalLink, ChevronRight, Search, Filter } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import '../styles/OrdersPage.scss';

const OrdersPage: React.FC = () => {
    const { isDarkMode } = useStore();
    const [loading, setLoading] = useState(true);

    // Mock orders data for the expensive feel
    const orders = [
        {
            id: 'ORD-7729-LX',
            date: 'March 01, 2026',
            status: 'In Transit',
            total: '$2,499.00',
            items: 2,
            previewImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop',
            tracking: 'LX998822110',
            phase: 2
        },
        {
            id: 'ORD-5541-LX',
            date: 'Feb 15, 2026',
            status: 'Delivered',
            total: '$899.00',
            items: 1,
            previewImage: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop',
            tracking: 'LX445566778',
            phase: 3
        },
        {
            id: 'ORD-1234-LX',
            date: 'Jan 10, 2026',
            status: 'Delivered',
            total: '$1,299.00',
            items: 3,
            previewImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
            tracking: 'LX112233445',
            phase: 3
        }
    ];

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="orders-loading">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <motion.div
            className={`orders-page ${isDarkMode ? 'theme--dark' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="orders-container">
                <header className="orders-header">
                    <div>
                        <h1>Order History</h1>
                        <p>Track your latest acquisitions and past orders</p>
                    </div>
                    <div className="orders-header__actions">
                        <div className="search-bar">
                            <Search size={16} />
                            <input type="text" placeholder="Search orders..." />
                        </div>
                        <button className="filter-btn">
                            <Filter size={16} /> Filter
                        </button>
                    </div>
                </header>

                <div className="orders-list">
                    {orders.map((order, idx) => (
                        <motion.div
                            key={order.id}
                            className="order-card"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <div className="order-card__top">
                                <div className="order-main-info">
                                    <div className="order-img">
                                        <img src={order.previewImage} alt="Order Preview" />
                                    </div>
                                    <div className="order-meta">
                                        <div className="order-id">{order.id}</div>
                                        <div className="order-date">{order.date}</div>
                                    </div>
                                </div>
                                <div className="order-stats">
                                    <div className="stat">
                                        <label>Total</label>
                                        <p>{order.total}</p>
                                    </div>
                                    <div className="stat">
                                        <label>Items</label>
                                        <p>{order.items} Product{order.items > 1 ? 's' : ''}</p>
                                    </div>
                                </div>
                                <div className={`order-status-badge status--${order.status.toLowerCase().replace(' ', '-')}`}>
                                    {order.status === 'Delivered' ? <CheckCircle size={14} /> : <Truck size={14} />}
                                    {order.status}
                                </div>
                            </div>

                            <div className="order-card__timeline">
                                <div className="timeline-track">
                                    <div className={`timeline-step ${order.phase >= 1 ? 'is-complete' : ''}`}>
                                        <div className="step-dot"><CheckCircle size={12} /></div>
                                        <span>Confirmed</span>
                                    </div>
                                    <div className={`timeline-step ${order.phase >= 2 ? 'is-active' : ''}`}>
                                        <div className="step-dot"><Truck size={12} /></div>
                                        <span>In Transit</span>
                                    </div>
                                    <div className={`timeline-step ${order.phase >= 3 ? 'is-complete' : ''}`}>
                                        <div className="step-dot"><Package size={12} /></div>
                                        <span>Delivered</span>
                                    </div>
                                </div>
                            </div>

                            <div className="order-card__footer">
                                <div className="tracking-info">
                                    <Clock size={14} />
                                    <span>Tracking: <strong>{order.tracking}</strong></span>
                                </div>
                                <div className="order-actions">
                                    <button className="btn-secondary">Order Details</button>
                                    <button className="btn-primary">
                                        Track Order <ExternalLink size={14} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="orders-empty-state">
                    <p>Showing {orders.length} orders from the last 6 months</p>
                    <button className="view-older-btn">View Older Orders <ChevronRight size={16} /></button>
                </div>
            </div>
        </motion.div>
    );
};

export default OrdersPage;
