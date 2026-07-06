import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ordersAPI } from '../services/api';
import '../styles/OrdersPage.scss';

const OrdersPage: React.FC = () => {
    const { isDarkMode, user } = useStore();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }
        ordersAPI.getOrders()
            .then(data => setOrders(data.orders || []))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [user]);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'delivered': return <CheckCircle size={20} color="#10b981" />;
            case 'shipped': return <Truck size={20} color="#3b82f6" />;
            case 'processing': return <Clock size={20} color="#f59e0b" />;
            default: return <Package size={20} color="#6b7280" />;
        }
    };

    if (loading) {
        return <div className="orders-page"><div className="container"><div className="loading-state"><div className="spinner" /><p>Loading orders...</p></div></div></div>;
    }

    if (!user) {
        return (
            <div className="orders-page"><div className="container">
                <div className="empty-state"><Package size={64} opacity={0.3} /><h2>Sign In Required</h2><p>Log in to view your orders</p></div>
            </div></div>
        );
    }

    return (
        <div className={`orders-page ${isDarkMode ? 'theme--dark' : ''}`}>
            <div className="container">
                <header className="orders-header">
                    <h1>My Orders</h1>
                    <p>Track and manage your purchases</p>
                </header>

                {orders.length === 0 ? (
                    <div className="empty-state">
                        <Package size={64} opacity={0.2} />
                        <h2>No Orders Yet</h2>
                        <p>Start shopping to see your orders here</p>
                    </div>
                ) : (
                    <div className="orders-list">
                        {orders.map((order, idx) => (
                            <motion.div key={order._id || idx} className="order-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                                <div className="order-card__header">
                                    <div className="order-id">Order #{String(order._id).slice(-8)}</div>
                                    <div className={`order-status status--${order.status}`}>
                                        {getStatusIcon(order.status)}
                                        <span>{order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}</span>
                                    </div>
                                </div>
                                <div className="order-card__body">
                                    <div className="order-details">
                                        <div className="detail"><label>Date</label><span>{new Date(order.createdAt).toLocaleDateString()}</span></div>
                                        <div className="detail"><label>Items</label><span>{order.products?.length || 0} items</span></div>
                                        <div className="detail"><label>Total</label><span>${order.totalAmount?.toLocaleString() || 'N/A'}</span></div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;
