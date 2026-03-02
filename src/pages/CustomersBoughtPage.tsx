import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ShoppingCart, TrendingUp, Heart, Share2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { fetchProducts, type Product } from '../services/mockApi';
import '../styles/CustomersBoughtPage.scss';

const userStories = [
    {
        id: 1,
        user: "Sarah Jenkins",
        role: "Software Engineer",
        story: "I bought the MacBook Pro M3 last month, and the performance is mind-blowing. The transition was seamless, and the battery life is a game-changer for my workflow.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=sarah",
        purchasedProduct: "MacBook Pro M3",
        additionalItems: ["Magic Mouse", "USB-C Hub", "Laptop Stand"]
    },
    {
        id: 2,
        user: "Marcus Chen",
        role: "Tech Enthusiast",
        story: "The Sony WH-1000XM5 are the best headphones I've ever owned. The noise cancellation is surreal. I use them for daily commutes and focus sessions at work.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=marcus",
        purchasedProduct: "Sony WH-1000XM5",
        additionalItems: ["Headphone Case", "Audio Cable", "Cleaning Kit"]
    },
    {
        id: 3,
        user: "Elena Rodriguez",
        role: "Digital Nomad",
        story: "The ROG Ally is perfect for my lifestyle. I can play AAA titles anywhere in the world. It's powerful, portable, and the screen is stunning.",
        rating: 4,
        avatar: "https://i.pravatar.cc/150?u=elena",
        purchasedProduct: "ROG Ally",
        additionalItems: ["Gaming Case", "Screen Protector", "External SSD"]
    }
];

const CustomersBoughtPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [hoveredStory, setHoveredStory] = useState<number | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts(1, 50);
                // Get products that are frequently bought together
                const frequentlyBought = data.products.filter((p: any) =>
                    p.rating >= 4.5 && p.reviews > 100
                ).slice(0, 12);
                setProducts(frequentlyBought);
            } catch (error) {
                console.error('Failed to load products:', error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const storyVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: 30,
            rotateX: -10
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 15
            }
        },
        hover: {
            scale: 1.02,
            y: -5,
            transition: {
                type: "spring" as const,
                stiffness: 400,
                damping: 25
            }
        }
    };

    if (loading) {
        return (
            <div className="customers-bought-page">
                <div className="container">
                    <div className="loading-state">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="loading-spinner"
                        >
                            <ShoppingCart size={32} />
                        </motion.div>
                        <p>Loading customer insights...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="customers-bought-page">
            <div className="container">
                <motion.header
                    className="page-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="header-content">
                        <div className="header-text">
                            <h1 className="page-title">Customers Also Bought</h1>
                            <p className="page-subtitle">Real people, real tech, real stories.</p>
                        </div>
                        <motion.div
                            className="header-stats"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="stat">
                                <TrendingUp size={20} />
                                <span>2.5k+ Purchases</span>
                            </div>
                            <div className="stat">
                                <Star size={20} />
                                <span>4.8 Avg Rating</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.header>

                <motion.section
                    className="user-stories"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="stories-grid">
                        {userStories.map((story) => (
                            <motion.div
                                key={story.id}
                                className="story-card"
                                variants={storyVariants}
                                whileHover="hover"
                                onMouseEnter={() => setHoveredStory(story.id)}
                                onMouseLeave={() => setHoveredStory(null)}
                            >
                                <div className="story-card__header">
                                    <motion.div
                                        className="quote-icon"
                                        animate={{
                                            rotate: hoveredStory === story.id ? 360 : 0,
                                            scale: hoveredStory === story.id ? 1.1 : 1
                                        }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <Quote size={24} />
                                    </motion.div>
                                    <div className="user-info">
                                        <motion.img
                                            src={story.avatar}
                                            alt={story.user}
                                            className="avatar"
                                            whileHover={{ scale: 1.05, rotate: 5 }}
                                        />
                                        <div>
                                            <h3 className="user-name">{story.user}</h3>
                                            <span className="user-role">{story.role}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="story-content">
                                    <p className="story-text">"{story.story}"</p>
                                    <div className="purchase-info">
                                        <div className="main-product">
                                            <span className="product-label">Main Purchase:</span>
                                            <span className="product-name">{story.purchasedProduct}</span>
                                        </div>
                                        <div className="additional-items">
                                            <span className="items-label">Also bought:</span>
                                            <div className="items-list">
                                                {story.additionalItems.map((item, i) => (
                                                    <motion.span
                                                        key={i}
                                                        className="item-tag"
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.5 + i * 0.1 }}
                                                    >
                                                        {item}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="story-footer">
                                    <div className="story-rating">
                                        {[...Array(5)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.3 + i * 0.1 }}
                                            >
                                                <Star
                                                    size={16}
                                                    fill={i < story.rating ? "#c5a059" : "none"}
                                                    color={i < story.rating ? "#c5a059" : "#ddd"}
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="story-actions">
                                        <motion.button
                                            className="action-btn"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <Heart size={16} />
                                        </motion.button>
                                        <motion.button
                                            className="action-btn"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <Share2 size={16} />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                <motion.section
                    className="trending-products"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="section-header">
                        <h2 className="section-title">Trending Post-Purchase</h2>
                        <p className="section-subtitle">Popular items customers love to buy together</p>
                    </div>

                    <div className="product-grid">
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + index * 0.05 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            </div>
        </div>
    );
};

export default CustomersBoughtPage;
