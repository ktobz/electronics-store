import React, { useState, useEffect } from 'react';
import { X, Scale, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { productsAPI } from '../services/api';
import type { Product } from '../types';
import '../styles/ComparisonPage.scss';

const ComparisonPage: React.FC = () => {
    const { compare, toggleCompare, addToCart } = useStore();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        if (compare.length > 0 && compare[0]?._id) {
            setLoading(true);
            productsAPI.getProducts({ limit: 100 }).then(data => {
                const ids = compare.map(p => p._id);
                const matched = (data.products || []).filter((p: Product) => ids.includes(p._id));
                setProducts(matched);
            }).catch(() => {}).finally(() => setLoading(false));
        } else {
            setProducts(compare as Product[]);
        }
    }, [compare]);

    const specs: { label: string; key: string; format?: (v: any) => string }[] = [
        { label: 'Brand', key: 'brand' },
        { label: 'Price', key: 'price', format: (v: any) => `$${v?.toLocaleString()}` },
        { label: 'Rating', key: 'rating', format: (v: any) => `${v} / 5.0` },
        { label: 'Category', key: 'category' },
        { label: 'Reviews', key: 'reviews', format: (v: any) => `${v} reviews` },
        { label: 'In Stock', key: 'inStock', format: (v: any) => v ? 'Yes' : 'No' },
    ];

    return (
        <div className="compare-page">
            <div className="container">
                <header className="compare-header">
                    <Scale size={32} color="var(--accent-color, #c5a059)" />
                    <h1>Product Comparison</h1>
                    <p>Side-by-side comparison of your selected products</p>
                </header>

                {products.length === 0 ? (
                    <div className="compare-empty">
                        <Scale size={64} opacity={0.2} />
                        <h3>Your comparison list is empty</h3>
                        <p>Add up to 4 products to compare their features.</p>
                        <Link to="/products" className="btn btn-primary">Browse Products</Link>
                    </div>
                ) : (
                    <div className="compare-table-wrapper">
                        {loading && <div className="compare-loading">Loading...</div>}
                        <table className="compare-table">
                            <thead>
                                <tr>
                                    <th>Feature</th>
                                    {products.map(item => (
                                        <th key={item._id || item.id}>
                                            <div className="compare-item-header">
                                                <button className="remove-btn" onClick={() => toggleCompare(item)}>
                                                    <X size={16} />
                                                </button>
                                                <img src={item.image} alt={item.name} />
                                                <h4>{item.name}</h4>
                                                <div className="price">${item.price?.toLocaleString()}</div>
                                                <button className="btn btn-primary add-btn" onClick={() => { addToCart(item._id || String(item.id)!); }}>
                                                    <ShoppingCart size={16} /> Add to Cart
                                                </button>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {specs.map(spec => (
                                    <tr key={spec.key}>
                                        <td>{spec.label}</td>
                                        {products.map(item => (
                                            <td key={item._id || item.id}>
                                                {spec.format ? spec.format((item as any)[spec.key]) : (item as any)[spec.key]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ComparisonPage;
