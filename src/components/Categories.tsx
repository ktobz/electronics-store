import React from 'react';
import { motion } from 'framer-motion';
import { Laptop, Smartphone, Headphones, Camera, Watch, Gamepad } from 'lucide-react';
import '../styles/Categories.scss';

const categories = [
    { name: 'Laptops', icon: <Laptop />, color: '#e3f2fd' },
    { name: 'Smartphones', icon: <Smartphone />, color: '#f3e5f5' },
    { name: 'Audio', icon: <Headphones />, color: '#e8f5e9' },
    { name: 'Cameras', icon: <Camera />, color: '#fff3e0' },
    { name: 'Wearables', icon: <Watch />, color: '#fce4ec' },
    { name: 'Gaming', icon: <Gamepad />, color: '#e0f7fa' },
];

const Categories: React.FC = () => {
    return (
        <section className="section categories" id="categories">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Shop by Category</h2>
                    <p className="section-subtitle">Find exactly what you're looking for</p>
                </div>

                <div className="categories-grid">
                    {categories.map((category, index) => (
                        <motion.div
                            key={index}
                            className="category-card"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            style={{ backgroundColor: category.color }}
                        >
                            <div className="category-card__icon">{category.icon}</div>
                            <span className="category-card__name">{category.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
