import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Laptop, Smartphone, Headphones, Camera, Watch, Gamepad, Tv, Tablet, Home, Package, Monitor, Cpu, Printer, Wifi, HardDrive, Code, Plane, Shield, Headphones as Vr, Projector } from 'lucide-react';
import '../styles/Categories.scss';

const categories = [
    { name: 'Laptops', icon: <Laptop />, color: '#e3f2fd' },
    { name: 'Smartphones', icon: <Smartphone />, color: '#f3e5f5' },
    { name: 'Audio', icon: <Headphones />, color: '#e8f5e9' },
    { name: 'Cameras', icon: <Camera />, color: '#fff3e0' },
    { name: 'Wearables', icon: <Watch />, color: '#fce4ec' },
    { name: 'Gaming', icon: <Gamepad />, color: '#e0f7fa' },
    { name: 'TVs', icon: <Tv />, color: '#e3f2fd' },
    { name: 'Tablets', icon: <Tablet />, color: '#f3e5f5' },
    { name: 'Smart Home', icon: <Home />, color: '#e8f5e9' },
    { name: 'Accessories', icon: <Package />, color: '#fff3e0' },
    { name: 'Monitors', icon: <Monitor />, color: '#fce4ec' },
    { name: 'Components', icon: <Cpu />, color: '#e0f7fa' },
    { name: 'Printers', icon: <Printer />, color: '#e3f2fd' },
    { name: 'Networking', icon: <Wifi />, color: '#f3e5f5' },
    { name: 'Storage', icon: <HardDrive />, color: '#e8f5e9' },
    { name: 'Software', icon: <Code />, color: '#fff3e0' },
    { name: 'Drones', icon: <Plane />, color: '#fce4ec' },
    { name: 'Security', icon: <Shield />, color: '#e0f7fa' },
    { name: 'VR/AR', icon: <Vr />, color: '#e3f2fd' },
    { name: 'Projectors', icon: <Projector />, color: '#f3e5f5' },
];

const Categories: React.FC = () => {
    const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

    const cardVariants = {
        hidden: { 
            opacity: 0, 
            scale: 0.8, 
            y: 30,
            rotateY: -15
        },
        visible: { 
            opacity: 1, 
            scale: 1, 
            y: 0,
            rotateY: 0,
            transition: {
                type: "spring" as const,
                stiffness: 260,
                damping: 20,
                duration: 0.6
            }
        },
        hover: { 
            scale: 1.08, 
            rotateY: 5,
            y: -10,
            transition: {
                type: "spring" as const,
                stiffness: 400,
                damping: 25
            }
        }
    };

    const iconVariants = {
        hidden: { rotate: 0, scale: 1 },
        hover: { 
            rotate: 360, 
            scale: 1.2,
            transition: {
                duration: 0.6,
                ease: "easeInOut" as const
            }
        }
    };

    return (
        <section className="section categories" id="categories">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Shop by Category</h2>
                    <p className="section-subtitle">Find exactly what you're looking for</p>
                </div>

                <div className="categories-grid">
                    {categories.map((category, index) => (
                        <Link 
                            key={index} 
                            to="/shop-by-category"
                            className="category-link"
                        >
                            <motion.div
                                className="category-card"
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                whileHover="hover"
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    delay: index * 0.03,
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20
                                }}
                                style={{
                                    backgroundColor: category.color,
                                    visibility: 'visible'
                                }}
                                onMouseEnter={() => setHoveredCategory(index)}
                                onMouseLeave={() => setHoveredCategory(null)}
                            >
                                <motion.div 
                                    className="category-card__icon"
                                    variants={iconVariants}
                                animate={hoveredCategory === index ? "hover" : "hidden"}
                            >
                                {category.icon}
                            </motion.div>
                            <motion.span 
                                className="category-card__name"
                                animate={{
                                    scale: hoveredCategory === index ? 1.1 : 1,
                                    fontWeight: hoveredCategory === index ? 600 : 500
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                {category.name}
                            </motion.span>
                            
                            {hoveredCategory === index && (
                                <motion.div
                                    className="category-card__shine"
                                    initial={{ opacity: 0, x: -100 }}
                                    animate={{ opacity: 0.3, x: 100 }}
                                    transition={{ duration: 0.6 }}
                                />
                            )}
                        </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
