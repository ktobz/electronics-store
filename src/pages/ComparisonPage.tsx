import React from 'react';
import { motion } from 'framer-motion';
import { X, Scale, ShoppingCart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { products } from '../services/mockApi';
import '../styles/ComparisonPage.scss';

const ComparisonPage: React.FC = () => {
    const { compare, toggleCompare, addToCart } = useStore();

    const compareItems = compare.map(id => products.find(p => p.id === id)).filter(Boolean);

    return (
        <div className="compare-page">
            <div className="container">
                <header className="compare-header">
                    <Scale size={32} color="var(--primary-color)" />
                    <h1>Product Comparison</h1>
                    <p>Side-by-side analysis of your selected tech.</p>
                </header>

                {compareItems.length === 0 ? (
                    <div className="compare-empty">
                        <Scale size={64} opacity={0.2} />
                        <h3>Your comparison list is empty</h3>
                        <p>Add up to 4 products to compare their features.</p>
                    </div>
                ) : (
                    <div className="compare-table-wrapper">
                        <table className="compare-table">
                            <thead>
                                <tr>
                                    <th>Feature</th>
                                    {compareItems.map(item => (
                                        <th key={item?.id}>
                                            <div className="compare-item-header">
                                                <button className="remove-btn" onClick={() => toggleCompare(item!.id)}>
                                                    <X size={16} />
                                                </button>
                                                <img src={item?.image} alt={item?.name} />
                                                <h4>{item?.name}</h4>
                                                <div className="price">${item?.price.toLocaleString()}</div>
                                                <button className="btn btn-primary add-btn" onClick={() => addToCart(item!.id)}>
                                                    <ShoppingCart size={16} /> Add
                                                </button>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Brand</td>
                                    {compareItems.map(item => <td key={item?.id}>{item?.brand}</td>)}
                                </tr>
                                <tr>
                                    <td>Category</td>
                                    {compareItems.map(item => <td key={item?.id}>{item?.category}</td>)}
                                </tr>
                                <tr>
                                    <td>Rating</td>
                                    {compareItems.map(item => <td key={item?.id}>{item?.rating} / 5.0</td>)}
                                </tr>
                                <tr>
                                    <td>Condition</td>
                                    {compareItems.map(item => <td key={item?.id}>{item?.isNew ? 'New' : 'Standard'}</td>)}
                                </tr>
                                <tr>
                                    <td>Offer</td>
                                    {compareItems.map(item => <td key={item?.id}>{item?.isSale ? 'Discounted' : '-'}</td>)}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ComparisonPage;
