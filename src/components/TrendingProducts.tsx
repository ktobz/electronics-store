import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { productsAPI } from '../services/api';
import { mockProducts } from '../data/mockProducts';
import type { Product } from '../types';
import { TrendingUp, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/TrendingProducts.scss';

const TrendingProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const data = await productsAPI.getProducts({ limit: 100 });
                const allProducts: Product[] = data.products || [];
                // Filter trending products (high reviews, recent)
                const trending = allProducts
                    .filter(p => p.reviews > 300)
                    .sort((a, b) => b.reviews - a.reviews)
                    .slice(0, 8);
                setProducts(trending);
            } catch (err) {
                console.warn('API unavailable, using fallback products');
                const trending = mockProducts
                    .filter(p => p.reviews > 300)
                    .sort((a, b) => b.reviews - a.reviews)
                    .slice(0, 8);
                setProducts(trending);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    if (loading) {
        return (
            <section className="section trending-products">
                <div className="container">
                    <div className="product-loading">
                        <Loader2 className="animate-spin" size={48} />
                        <p>Loading trending products...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="section trending-products">
            <div className="container">
                <div className="section-header">
                    <div className="section-header__icon">
                        <TrendingUp size={32} />
                    </div>
                    <h2 className="section-title">Trending Now</h2>
                    <p className="section-subtitle">Hot products everyone is buying</p>
                </div>

                <div className="product-grid">
                    {products.map((product, index) => (
                        <motion.div
                            key={product._id || product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingProducts;
