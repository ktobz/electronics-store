import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts, type Product } from '../services/mockApi';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, AlertCircle, Filter } from 'lucide-react';
import '../styles/ProductsPage.scss';

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'all' | 'Samsung' | 'Panasonic'>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState(3000);
    const [minRating, setMinRating] = useState(0);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [sortBy, setSortBy] = useState<'price' | 'rating' | 'name'>('rating');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const limit = 12;

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const brand = activeTab === 'all' ? undefined : activeTab;
                // Fetch with brand filter; get enough items for client-side search
                const fetchLimit = searchTerm.trim() ? 1000 : limit;
                const fetchPage = searchTerm.trim() ? 1 : page;
                let data = await fetchProducts(fetchPage, fetchLimit, brand);

                let filtered = data.products;

                // Client-side search filter
                if (searchTerm.trim()) {
                    const term = searchTerm.toLowerCase();
                    filtered = filtered.filter(p =>
                        p.name.toLowerCase().includes(term) ||
                        p.brand.toLowerCase().includes(term) ||
                        p.category.toLowerCase().includes(term)
                    );
                }

                // Client-side price filter
                filtered = filtered.filter(p => p.price <= priceRange);

                // Client-side rating filter
                if (minRating > 0) {
                    filtered = filtered.filter(p => p.rating >= minRating);
                }

                // Client-side sort
                filtered = [...filtered].sort((a, b) => {
                    const mult = sortOrder === 'asc' ? 1 : -1;
                    if (sortBy === 'price') return (a.price - b.price) * mult;
                    if (sortBy === 'rating') return (a.rating - b.rating) * mult;
                    return a.name.localeCompare(b.name) * mult;
                });

                // Client-side pagination when search is active
                if (searchTerm.trim()) {
                    const total = filtered.length;
                    const start = (page - 1) * limit;
                    filtered = filtered.slice(start, start + limit);
                    setTotal(total);
                } else {
                    setTotal(data.total || 0);
                }

                setProducts(filtered);
            } catch (error) {
                console.error("Failed to fetch products:", error);
                setError("Failed to load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [activeTab, searchTerm, priceRange, minRating, page, sortBy, sortOrder]);

    const totalPages = Math.ceil(total / limit);

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
                <div className="products-page__layout">
                    <aside className="products-page__sidebar">
                        <div className="filter-group">
                            <h4>Price Range</h4>
                            <input
                                type="range"
                                min="0"
                                max="3000"
                                step="100"
                                value={priceRange}
                                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                            />
                            <div className="range-labels">
                                <span>$0</span>
                                <span>Max: ${priceRange.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="filter-group">
                            <h4>Minimum Rating</h4>
                            <div className="stars-filter">
                                {[4, 3, 2, 1].map(star => (
                                    <label key={star} className="star-option">
                                        <input
                                            type="radio"
                                            name="rating"
                                            checked={minRating === star}
                                            onChange={() => setMinRating(star)}
                                        />
                                        <span>{star}+ Stars</span>
                                    </label>
                                ))}
                                <button className="clear-filter" onClick={() => setMinRating(0)}>Clear</button>
                            </div>
                        </div>
                    </aside>

                    <div className="products-page__main">
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
                                    Samsung
                                </button>
                                <button
                                    className={`tab-btn ${activeTab === 'Panasonic' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('Panasonic')}
                                >
                                    Panasonic
                                </button>
                            </div>

                            <div className="products-page__search">
                                <Search className="search-icon" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {loading ? (
                                <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="products-loader">
                                    <div className="spinner"></div>
                                </motion.div>
                            ) : error ? (
                                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="products-error">
                                    <AlertCircle size={48} />
                                    <p>{error}</p>
                                    <button onClick={() => window.location.reload()} className="retry-btn">
                                        Try Again
                                    </button>
                                </motion.div>
                            ) : (
                                <>
                                    <div className="products-grid">
                                        {products.map((product: Product) => (
                                            <ProductCard key={product.id} product={product} />
                                        ))}
                                    </div>

                                    {totalPages > 1 && (
                                        <div className="pagination">
                                            <button
                                                className="pagination__btn"
                                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                                disabled={page === 1}
                                            >
                                                Previous
                                            </button>
                                            <span className="pagination__info">
                                                Page {page} of {totalPages}
                                            </span>
                                            <button
                                                className="pagination__btn"
                                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                                disabled={page === totalPages}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
