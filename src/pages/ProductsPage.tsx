import React, { useState, useEffect, useCallback } from 'react';
import ProductCard from '../components/ProductCard';
import { productsAPI } from '../services/api';
import { mockProducts } from '../data/mockProducts';
import type { Product } from '../types';
import { motion } from 'framer-motion';
import { AlertCircle, X, Star, DollarSign, SlidersHorizontal } from 'lucide-react';
import '../styles/ProductsPage.scss';

const brands = ['Apple','Samsung','Sony','Google','Microsoft','DJI','NVIDIA','Bose','LG','Canon','Nikon','ASUS','Dell','Lenovo'];

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [priceRange, setPriceRange] = useState(5000);
    const [minRating, setMinRating] = useState(0);
    const [page, setPage] = useState(1);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const limit = 12;

    const loadProducts = useCallback(async () => {
        setLoading(true);
        try {
            const data = await productsAPI.getProducts({ limit: 200 });
            setAllProducts(data.products || []);
        } catch {
            setAllProducts(mockProducts);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { loadProducts(); }, [loadProducts]);

    useEffect(() => {
        let filtered = [...allProducts];
        if (searchInput.trim()) {
            const q = searchInput.toLowerCase();
            filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || (p.brand||'').toLowerCase().includes(q) || (p.category||'').toLowerCase().includes(q));
        }
        if (selectedBrand) filtered = filtered.filter(p => p.brand === selectedBrand);
        filtered = filtered.filter(p => p.price <= priceRange);
        if (minRating > 0) filtered = filtered.filter(p => p.rating >= minRating);
        setProducts(filtered);
        setPage(1);
    }, [allProducts, searchInput, selectedBrand, priceRange, minRating]);

    const paginated = products.slice((page - 1) * limit, page * limit);
    const totalPages = Math.ceil(products.length / limit);

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
                <div className="products-page__toolbar">
                    <div className="toolbar-search">
                        <input
                            type="text"
                            placeholder="Search by name, brand, or category..."
                            value={searchInput}
                            onChange={e => setSearchInput(e.target.value)}
                        />
                        {searchInput && (
                            <button className="toolbar-clear" onClick={() => setSearchInput('')}><X size={16}/></button>
                        )}
                    </div>
                </div>

                <div className="products-page__layout">
                    <aside className="products-page__sidebar">
                        <div className="sidebar-header"><SlidersHorizontal size={18} /><h3>Filters</h3></div>

                        <div className="filter-group">
                            <div className="filter-label"><DollarSign size={14} /> Price Range</div>
                            <input type="range" min="0" max="5000" step="100" value={priceRange} onChange={e => setPriceRange(parseInt(e.target.value))} className="price-slider" />
                            <div className="range-values">$0 — <strong>${priceRange.toLocaleString()}</strong></div>
                        </div>

                        <div className="filter-group">
                            <div className="filter-label"><Star size={14} /> Minimum Rating</div>
                            <div className="rating-chips">
                                {[4,3,2,1].map(s => (
                                    <button key={s} className={`chip ${minRating === s ? 'active' : ''}`} onClick={() => setMinRating(minRating === s ? 0 : s)}>
                                        {s}+ <Star size={12} fill={minRating === s ? '#fff' : '#c5a059'} stroke={minRating === s ? '#fff' : '#c5a059'} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="filter-group">
                            <div className="filter-label">Brand</div>
                            <div className="brand-chips">
                                <button className={`chip ${!selectedBrand ? 'active' : ''}`} onClick={() => setSelectedBrand(null)}>All Brands</button>
                                {brands.map(b => (
                                    <button key={b} className={`chip ${selectedBrand === b ? 'active' : ''}`} onClick={() => setSelectedBrand(selectedBrand === b ? null : b)}>{b}</button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    <div className="products-page__main">
                        {loading ? (
                            <div className="products-loader"><div className="spinner" /></div>
                        ) : paginated.length === 0 ? (
                            <div className="products-empty">
                                <AlertCircle size={48} opacity={.2} />
                                <p>No products match your filters</p>
                                <button className="btn" onClick={() => { setSearchInput(''); setSelectedBrand(null); setPriceRange(5000); setMinRating(0); }}>Clear All Filters</button>
                            </div>
                        ) : (
                            <>
                                <div className="products-meta">{products.length} products found</div>
                                <div className="products-grid">
                                    {paginated.map((p, i) => (
                                        <motion.div key={p._id || i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .03 }}>
                                            <ProductCard product={p} />
                                        </motion.div>
                                    ))}
                                </div>
                                {totalPages > 1 && (
                                    <div className="products-pagination">
                                        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}>← Prev</button>
                                        <span>Page {page} of {totalPages}</span>
                                        <button onClick={() => setPage(p => p + 1)} disabled={page >= totalPages}>Next →</button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
