import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Info } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import '../styles/Toast.scss';

const Toast: React.FC = () => {
    const { toasts } = useStore();

    return (
        <div className="toast-container">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        layout
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        className={`toast toast--${toast.type}`}
                    >
                        {toast.type === 'success' ? <CheckCircle size={18} /> : <Info size={18} />}
                        <span className="toast__message">{toast.message}</span>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Toast;
