import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types';
import '../styles/CategoryPage.scss';

const CategoryPage: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const [searchParams] = useSearchParams();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [sortBy, setSortBy] = useState<'price-asc'|'price-desc'|'rating'|'name'>('rating');
    const [page, setPage] = useState(1);
    const [brandFilter, setBrandFilter] = useState<string | null>(null);
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const perPage = 12;

    const catName = categoryId
        ? categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace(/-/g, ' ')
        : 'Products';

    useEffect(() => {
        setLoading(true);
        setPage(1);
        productsAPI.getProducts({ limit: 200, category: categoryId || undefined })
            .then(data => setProducts(data.products || []))
            .catch(() => setProducts([]))
            .finally(() => setLoading(false));
    }, [categoryId]);

    useEffect(() => { setPage(1); }, [search, brandFilter, priceMin, priceMax, sortBy]);

    const filtered = useMemo(() => {
        let f = products;
        if (search) { const t = search.toLowerCase(); f = f.filter(p => p.name.toLowerCase().includes(t) || p.brand.toLowerCase().includes(t)); }
        if (brandFilter) { f = f.filter(p => p.brand.toLowerCase() === brandFilter.toLowerCase()); }
        if (priceMin) { f = f.filter(p => p.price >= parseFloat(priceMin)); }
        if (priceMax) { f = f.filter(p => p.price <= parseFloat(priceMax)); }
        if (sortBy === 'price-asc') f.sort((a, b) => a.price - b.price);
        else if (sortBy === 'price-desc') f.sort((a, b) => b.price - a.price);
        else if (sortBy === 'rating') f.sort((a, b) => b.rating - a.rating);
        else f.sort((a, b) => a.name.localeCompare(b.name));
        return f;
    }, [products, search, brandFilter, priceMin, priceMax, sortBy]);

    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    const uniqueBrands = useMemo(() => [...new Set(products.map(p => p.brand))].sort(), [products]);

    if (loading) {
        return <div className="category-page"><div className="container"><div className="loading-state"><div className="spinner" /><p>Loading {catName}...</p></div></div></div>;
    }

    return (
        <div className="category-page">
            <section className="cat-hero">
                <div className="container">
                    <div className="cat-hero__content">
                        <div className="cat-hero__info">
                            <h1>{catName}</h1>
                            <p>Premium {catName.toLowerCase()} curated for quality and performance</p>
                            <div className="cat-hero__count"><Sparkles size={16} /> {filtered.length} products</div>
                        </div>
                        <div className="cat-hero__brands">
                            {uniqueBrands.slice(0, 6).map(b => (
                                <span key={b} onClick={() => setBrandFilter(brandFilter === b ? null : b)} style={{ cursor: 'pointer' }}>{b}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div className="cat-bar">
                <div className="container">
                    <div className="cat-bar__inner">
                        <div className="cat-bar__search">
                            <Search size={16} />
                            <input type="text" placeholder={`Search ${catName.toLowerCase()}...`} value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                        <button className="cat-bar__mobile-filters" onClick={() => setShowFilters(!showFilters)}>
                            <SlidersHorizontal size={16} /> Filters {brandFilter || priceMin || priceMax ? '(active)' : ''}
                        </button>
                        <div className="cat-bar__sort">
                            <label>Sort:</label>
                            <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}>
                                <option value="rating">Top Rated</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="name">Name: A-Z</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="cat-layout">
                    <aside className={`cat-filters ${showFilters ? 'cat-filters--mobile-open' : ''}`}>
                        <div className="filter-section">
                            <h4>Brands</h4>
                            <div className="filter-brands">
                                {uniqueBrands.map(b => (
                                    <button key={b} className={brandFilter === b ? 'active' : ''} onClick={() => setBrandFilter(brandFilter === b ? null : b)}>{b}</button>
                                ))}
                            </div>
                        </div>
                        <div className="filter-section">
                            <h4>Price Range</h4>
                            <div className="filter-price">
                                <div className="price-inputs">
                                    $<input type="number" placeholder="Min" value={priceMin} onChange={e => setPriceMin(e.target.value)} />
                                    — $<input type="number" placeholder="Max" value={priceMax} onChange={e => setPriceMax(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        {(brandFilter || priceMin || priceMax) && (
                            <button className="filter-clear-all" onClick={() => { setBrandFilter(null); setPriceMin(''); setPriceMax(''); }}>
                                Clear All Filters
                            </button>
                        )}
                    </aside>

                    <div>
                        {paginated.length === 0 ? (
                            <div className="no-results"><Search size={48} /><h3>No products found</h3><p>Try adjusting your filters or search</p></div>
                        ) : (
                            <motion.div className="cat-grid" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: .04 } } }}>
                                {paginated.map(p => (
                                    <motion.div key={p._id || p.id} variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
                                        <ProductCard product={p} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {totalPages > 1 && (
                            <div className="cat-pagination">
                                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}><ChevronLeft size={18} /> Prev</button>
                                <span>Page {page} of {totalPages}</span>
                                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next <ChevronRight size={18} /></button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
