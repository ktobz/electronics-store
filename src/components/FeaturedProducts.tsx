import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { productsAPI } from '../services/api';
import { mockProducts } from '../data/mockProducts';
import type { Product } from '../types';
import { ChevronLeft, ChevronRight, Loader2, Quote, Star, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/FeaturedProducts.scss';

const userStories = [
    {
        id: 1,
        user: "Alex Thompson",
        avatar: "https://i.pravatar.cc/150?u=alex",
        role: "Software Developer",
        story: "The MacBook Pro M3 completely transformed my development workflow. Compilation times are cut in half, and the battery lasts through my entire coding marathon sessions.",
        rating: 5,
        product: "MacBook Pro M3"
    },
    {
        id: 2,
        user: "Jamie Liu",
        avatar: "https://i.pravatar.cc/150?u=jamie",
        role: "Photographer",
        story: "Sony A7R IV's image quality is absolutely stunning. The dynamic range and low-light performance exceeded all my expectations for professional work.",
        rating: 5,
        product: "Sony A7R IV"
    },
    {
        id: 3,
        user: "Chris Martinez",
        avatar: "https://i.pravatar.cc/150?u=chris",
        role: "Music Producer",
        story: "These Sony headphones are a game-changer for studio work. The noise cancellation lets me focus purely on the mix without any distractions.",
        rating: 5,
        product: "Sony WH-1000XM5"
    },
    {
        id: 4,
        user: "Sarah Chen",
        avatar: "https://i.pravatar.cc/150?u=sarah",
        role: "Digital Artist",
        story: "The Wacom tablet feels like drawing on paper. The pressure sensitivity and response time are perfect for my detailed illustrations.",
        rating: 4,
        product: "Wacom Intuos Pro"
    },
    {
        id: 5,
        user: "Mike Johnson",
        avatar: "https://i.pravatar.cc/150?u=mike",
        role: "Gamer",
        story: "ROG Ally handles every AAA title I throw at it. Portable gaming has never been this powerful - it's console-quality anywhere I go.",
        rating: 5,
        product: "ROG Ally"
    },
    {
        id: 6,
        user: "Emily Davis",
        avatar: "https://i.pravatar.cc/150?u=emily",
        role: "Content Creator",
        story: "The iPhone 15 Pro's camera system is incredible for video production. The ProRes video quality rivals professional cameras.",
        rating: 5,
        product: "iPhone 15 Pro"
    }
];

const FeaturedProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [currentStory, setCurrentStory] = useState(0);
    const limit = 4;

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await productsAPI.getProducts({ limit: 100 });
                const allProducts: Product[] = data.products || [];
                const featured = allProducts
                    .filter(p => p.rating >= 4.5)
                    .sort((a, b) => b.rating - a.rating);
                setTotal(featured.length);
                const start = (page - 1) * limit;
                setProducts(featured.slice(start, start + limit));
            } catch (err) {
                console.warn('API unavailable, using fallback products');
                const featured = mockProducts.sort((a, b) => b.rating - a.rating);
                setTotal(featured.length);
                const start = (page - 1) * limit;
                setProducts(featured.slice(start, start + limit));
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, [page]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStory((prev) => (prev + 1) % userStories.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const totalPages = Math.ceil(total / limit);

    const storyVariants = {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 }
    };

    if (loading) {
        return (
            <section className="section featured-products" id="products">
                <div className="container">
                    <div className="product-loading">
                        <Loader2 className="animate-spin" size={48} />
                        <p>Loading the latest tech...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="section featured-products" id="products">
                <div className="container">
                    <div className="product-loading">
                        <p className="error-text">{error}</p>
                        <button className="btn btn-primary" onClick={() => { setError(null); setPage(1); }} style={{ marginTop: '1rem' }}>
                            Retry
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="section featured-products" id="products">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Featured Products</h2>
                    <p className="section-subtitle">Top picks for you this week</p>
                </div>

                <>
                    <div className="product-grid">
                        {products.map((product, index) => (
                            <motion.div
                                key={product._id || product.id}
                                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>

                    <div className="featured-stories">
                        <h3 className="stories-title">Verified Customer Experiences</h3>
                        <div className="stories-container">
                            <div className="story-carousel">
                                <motion.div
                                    key={currentStory}
                                    className="story-card"
                                    variants={storyVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="story-header">
                                        <div className="user-info">
                                            <img
                                                src={userStories[currentStory].avatar}
                                                alt={userStories[currentStory].user}
                                                className="user-avatar"
                                            />
                                            <div className="user-details">
                                                <h4 className="user-name">{userStories[currentStory].user}</h4>
                                                <p className="user-role">{userStories[currentStory].role}</p>
                                                <div className="user-rating">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={14}
                                                            fill={i < userStories[currentStory].rating ? "#c5a059" : "none"}
                                                            color={i < userStories[currentStory].rating ? "#c5a059" : "#ddd"}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="story-product">
                                            <ShoppingCart size={16} />
                                            <span>{userStories[currentStory].product}</span>
                                        </div>
                                    </div>
                                    <div className="story-content">
                                        <Quote size={20} className="quote-icon" />
                                        <p className="story-text">{userStories[currentStory].story}</p>
                                    </div>
                                </motion.div>
                            </div>

                            <div className="story-dots">
                                {userStories.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`story-dot ${index === currentStory ? 'active' : ''}`}
                                        onClick={() => setCurrentStory(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pagination">
                        <button
                            className="pagination__btn"
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                        >
                            <ChevronLeft size={20} /> Previous
                        </button>

                        <div className="pagination__info">
                            Page <span>{page}</span> of {totalPages}
                        </div>

                        <button
                            className="pagination__btn"
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                        >
                            Next <ChevronRight size={20} />
                        </button>
                    </div>
                </>
            </div>
        </section>
    );
};

export default FeaturedProducts;
