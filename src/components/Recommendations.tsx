import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { productsAPI } from '../services/api';
import type { Product } from '../types';
import '../styles/Recommendations.scss';

const Recommendations: React.FC<{ currentId?: string }> = ({ currentId }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        productsAPI.getProducts({ limit: 20, sortBy: 'rating', sortOrder: 'desc' })
            .then(data => {
                const all: Product[] = data.products || [];
                const filtered = currentId
                    ? all.filter(p => p._id !== currentId).slice(0, 4)
                    : all.slice(0, 4);
                setProducts(filtered);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [currentId]);

    if (loading) return <section className="recommendations"><div className="container"><p className="rec-loading">Loading recommendations...</p></div></section>;

    if (!products.length) return null;

    return (
        <section className="recommendations">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">You May Also Like</h2>
                    <p className="section-subtitle">Recommended based on top-rated products</p>
                </div>
                <div className="product-grid">
                    {products.map(product => (
                        <ProductCard key={product._id || product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Recommendations;
