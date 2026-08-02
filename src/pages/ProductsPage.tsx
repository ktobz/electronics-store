import React, { useState, useEffect, useCallback, useRef } from 'react';
import ProductCard from '../components/ProductCard';
import { productsAPI } from '../services/api';
import { mockProducts } from '../data/mockProducts';
import type { Product } from '../types';
import { motion } from 'framer-motion';
import { Search, AlertCircle, X, Star, DollarSign, SlidersHorizontal } from 'lucide-react';
import '../styles/ProductsPage.scss';

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchInput, setSearchInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState(3000);
    const [minRating, setMinRating] = useState(0);
    const [page, setPage] = useState(1);
    const [brand, setBrand] = useState<string | null>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const limit = 12;

    const loadProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await productsAPI.getProducts({
                page, limit,
                brand: brand || undefined,
                search: searchTerm.trim() || undefined,
            });
            let filtered: Product[] = data.products || [];
            filtered = filtered.filter(p => p.price <= priceRange);
            if (minRating > 0) filtered = filtered.filter(p => p.rating >= minRating);
            setProducts(filtered);
        } catch {
            let filtered = [...mockProducts];
            filtered = filtered.filter(p => p.price <= priceRange);
            if (minRating > 0) filtered = filtered.filter(p => p.rating >= minRating);
            if (searchTerm) filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
            if (brand) filtered = filtered.filter(p => p.brand === brand);
            setProducts(filtered);
        } finally {
            setLoading(false);
        }
    }, [page, limit, brand, searchTerm, priceRange, minRating]);

    useEffect(() => { loadProducts(); }, [loadProducts]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchTerm(searchInput.trim());
        setPage(1);
    };

    const handleInput = (val: string) => {
        setSearchInput(val);
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => setSearchTerm(val.trim()), 400);
    };

    return (
        <div className="products-page">
            <header className="products-page__header">
                <div className="container">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1>Premium Collection</h1>
                        <p>Curated high-end electronics</p>
                    </motion.div>
                </div>
            </header>

            <div className="container">
                <div className="products-page__layout">
                    <aside className="products-page__sidebar">
                        <div className="sidebar-header"><SlidersHorizontal size={18} /><h3>Filters</h3></div>
                        <div className="filter-group">
                            <h4><DollarSign size={14} /> Max Price</h4>
                            <input type="range" min="0" max="3000" step="50" value={priceRange} onChange={e => setPriceRange(parseInt(e.target.value))} />
                            <div className="range-labels"><span>$0</span><span>${priceRange.toLocaleString()}</span></div>
                        </div>
                        <div className="filter-group">
                            <h4><Star size={14} /> Min Rating</h4>
                            <div className="rating-options">
                                {[4,3,2,1].map(s => (
                                    <button key={s} className={minRating === s ? 'active' : ''} onClick={() => setMinRating(minRating === s ? 0 : s)}>{s}+ ★</button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    <div className="products-page__main">
                        <div className="products-page__controls">
                            <div className="brand-tabs">
                                <button className={!brand ? 'active' : ''} onClick={() => setBrand(null)}>All</button>
                                <button className={brand === 'Samsung' ? 'active' : ''} onClick={() => setBrand('Samsung')}>Samsung</button>
                                <button className={brand === 'Apple' ? 'active' : ''} onClick={() => setBrand('Apple')}>Apple</button>
                                <button className={brand === 'Sony' ? 'active' : ''} onClick={() => setBrand('Sony')}>Sony</button>
                                <button className={brand === 'Google' ? 'active' : ''} onClick={() => setBrand('Google')}>Google</button>
                            </div>

                            <form className="products-search" onSubmit={handleSearch}>
                                <Search size={16} />
                                <input type="text" placeholder="Search products..." value={searchInput} onChange={e => handleInput(e.target.value)} />
                                {searchInput && <button type="button" className="clear-btn" onClick={() => { setSearchInput(''); setSearchTerm(''); setPage(1); }}><X size={14} /></button>}
                                <button type="submit" className="search-btn">Search</button>
                            </form>
                        </div>

                        {loading ? (
                            <div className="products-loader"><div className="spinner" /></div>
                        ) : error ? (
                            <div className="products-error"><AlertCircle size={40} /><p>{error}</p><button onClick={loadProducts}>Retry</button></div>
                        ) : products.length === 0 ? (
                            <div className="products-empty"><Search size={48} opacity={.2} /><p>No products found</p></div>
                        ) : (
                            <>
                                <div className="products-grid">
                                    {products.map((p, i) => (
                                        <motion.div key={p._id || i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .03 }}>
                                            <ProductCard product={p} />
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="products-pagination">
                                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}>Prev</button>
                                    <span>Page {page}</span>
                                    <button onClick={() => setPage(p => p + 1)} disabled={products.length < limit}>Next</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
