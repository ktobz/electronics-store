import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../services/mockApi';
import '../styles/Recommendations.scss';

const Recommendations: React.FC<{ currentId?: number }> = ({ currentId }) => {
    // Basic recommendation logic: similar category or just random tech
    const recommended = (products as any[])
        .filter((p: any) => p.id !== currentId)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

    return (
        <section className="recommendations">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Customers Also Bought</h2>
                    <p className="section-subtitle">Based on your recent tech interest</p>
                </div>
                <div className="product-grid">
                    {recommended.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Recommendations;
