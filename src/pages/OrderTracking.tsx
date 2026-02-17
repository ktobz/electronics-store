import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Truck, CheckCircle, Clock } from 'lucide-react';
import '../styles/OrderTracking.scss';

const OrderTracking: React.FC = () => {
    const [orderId, setOrderId] = useState('');
    const [status, setStatus] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderId) return;

        setLoading(true);
        setTimeout(() => {
            setStatus({
                id: orderId,
                currentStatus: 'In Transit',
                steps: [
                    { label: 'Order Placed', date: 'Oct 24, 2023', completed: true },
                    { label: 'Processing', date: 'Oct 25, 2023', completed: true },
                    { label: 'Shipped', date: 'Oct 26, 2023', completed: true },
                    { label: 'In Transit', date: 'Currently', completed: false, active: true },
                    { label: 'Delivered', date: 'Expected Oct 28', completed: false }
                ]
            });
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="order-tracking">
            <div className="container">
                <div className="order-tracking__card">
                    <header className="order-tracking__header">
                        <h1>Track Your Order</h1>
                        <p>Enter your order ID to see the real-time status of your package.</p>
                    </header>

                    <form onSubmit={handleTrack} className="order-tracking__form">
                        <div className="input-group">
                            <Search className="input-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Order ID (e.g. EZ-987654)"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="track-btn" disabled={loading}>
                            {loading ? 'Tracking...' : 'Track Order'}
                        </button>
                    </form>

                    <AnimatePresence>
                        {status && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="order-tracking__results"
                            >
                                <div className="status-banner">
                                    <Truck size={24} />
                                    <div>
                                        <h3>Status: {status.currentStatus}</h3>
                                        <p>Order ID: {status.id}</p>
                                    </div>
                                </div>

                                <div className="tracking-timeline">
                                    {status.steps.map((step: any, idx: number) => (
                                        <div key={idx} className={`timeline-step ${step.completed ? 'completed' : ''} ${step.active ? 'active' : ''}`}>
                                            <div className="step-icon">
                                                {step.completed ? <CheckCircle size={18} /> : <Clock size={18} />}
                                            </div>
                                            <div className="step-content">
                                                <h4>{step.label}</h4>
                                                <p>{step.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default OrderTracking;
