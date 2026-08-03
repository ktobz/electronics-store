import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { productsAPI } from '../services/api';
import { mockProducts } from '../data/mockProducts';
import type { Product } from '../types';
import { Trophy, Medal, Award, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/TopTenProducts.scss';

const TopTenProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const data = await productsAPI.getProducts({ limit: 100 });
                const allProducts: Product[] = data.products || [];
                // Top 10 by rating and reviews
                const topTen = allProducts
                    .sort((a, b) => (b.rating * 10 + b.reviews) - (a.rating * 10 + a.reviews))
                    .slice(0, 10);
                setProducts(topTen);
            } catch (err) {
                console.warn('API unavailable, using fallback products');
                const topTen = mockProducts
                    .sort((a, b) => (b.rating * 10 + b.reviews) - (a.rating * 10 + a.reviews))
                    .slice(0, 10);
                setProducts(topTen);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    const getRankIcon = (index: number) => {
        switch (index) {
            case 0: return <Trophy size={24} className="rank-gold" />;
            case 1: return <Medal size={24} className="rank-silver" />;
            case 2: return <Award size={24} className="rank-bronze" />;
            default: return <span className="rank-number">{index + 1}</span>;
        }
    };

    if (loading) {
        return (
            <section className="section top-ten-products">
                <div className="container">
                    <div className="product-loading">
                        <Loader2 className="animate-spin" size={48} />
                        <p>Loading top 10 products...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="section top-ten-products">
            <div className="container">
                <div className="section-header">
                    <div className="section-header__icon">
                        <Trophy size={32} />
                    </div>
                    <h2 className="section-title">Top 10 Products</h2>
                    <p className="section-subtitle">Best rated and most loved products</p>
                </div>

                <div className="top-ten-grid">
                    {products.map((product, index) => (
                        <motion.div
                            key={product._id || product.id}
                            className="top-ten-item"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="rank-badge">
                                {getRankIcon(index)}
                            </div>
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopTenProducts;
