import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts, type Product } from '../services/mockApi';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Package, Star, ShieldCheck } from 'lucide-react';
import '../styles/ProductsPage.scss';

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'all' | 'Samsung' | 'Panasonic'>('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            const brand = activeTab === 'all' ? undefined : activeTab;
            const result = await fetchProducts(1, 40, brand);
            setProducts(result.products);
            setLoading(false);
        };
        loadProducts();
    }, [activeTab]);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="products-page">
            <header className="products-page__header">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="products-header__title"
                    >
                        {activeTab === 'all' ? 'All Electronics' : `Official ${activeTab} Store`}
                    </motion.h1>
                    <p className="products-header__subtitle">
                        Discover the latest in technology and innovation.
                    </p>
                </div>
            </header>

            <div className="container">
                <div className="products-page__controls">
                    <div className="products-page__tabs">
                        <button
                            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveTab('all')}
                        >
                            All Products
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'Samsung' ? 'active' : ''}`}
                            onClick={() => setActiveTab('Samsung')}
                        >
                            Official Samsung Store
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'Panasonic' ? 'active' : ''}`}
                            onClick={() => setActiveTab('Panasonic')}
                        >
                            Official Panasonic Store
                        </button>
                    </div>

                    <div className="products-page__search">
                        <div className="search-input-wrapper">
                            <Search className="search-icon" size={18} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="filter-btn">
                            <SlidersHorizontal size={18} />
                            Filters
                        </button>
                    </div>
                </div>

                {activeTab !== 'all' && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="brand-banner"
                    >
                        <div className="brand-banner__content">
                            <div className="brand-banner__icon">
                                {activeTab === 'Samsung' ? <Star size={32} /> : <ShieldCheck size={32} />}
                            </div>
                            <div>
                                <h3>Official {activeTab} Brand Store</h3>
                                <p>Authentic products with manufacturer warranty and dedicated support.</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="products-loader"
                        >
                            <div className="spinner"></div>
                            <p>Loading your tech...</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="products-grid"
                        >
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            ) : (
                                <div className="no-results">
                                    <Package size={48} />
                                    <h3>No products found</h3>
                                    <p>Try adjusting your search or filters.</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ProductsPage;
