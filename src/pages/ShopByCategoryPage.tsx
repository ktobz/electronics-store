import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Grid, List, TrendingUp, ShoppingBag, ChevronRight, Laptop, Smartphone, Headphones, Camera, Watch, Gamepad, Tv, Tablet, Home, Package, Monitor, Cpu, HardDrive, Plane, Shield, Sparkles, Award, Zap, ArrowRight } from 'lucide-react';
import { categoriesAPI } from '../services/api';
import '../styles/ShopByCategoryPage.scss';

interface Category {
    id: string;
    name: string;
    productCount: number;
    featured: boolean;
    trending: boolean;
}

const gradients: Record<string, string> = {
    smartphones: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    laptops: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    audio: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    cameras: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    wearables: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
    gaming: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
    tvs: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    tablets: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    'smart-home': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    components: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
    monitors: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    drones: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
    security: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    vr: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
};

const defaultGradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

const categoryIcons: Record<string, React.ReactNode> = {
    smartphones: <Smartphone />, laptops: <Laptop />, audio: <Headphones />,
    cameras: <Camera />, wearables: <Watch />, gaming: <Gamepad />,
    tvs: <Tv />, tablets: <Tablet />, 'smart-home': <Home />,
    components: <Cpu />, monitors: <Monitor />, drones: <Plane />,
    security: <Shield />, printers: <Package />, storage: <HardDrive />
};

const ShopByCategoryPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState<'name' | 'products'>('name');
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        categoriesAPI.getCategories()
            .then(data => setCategories(data.categories || []))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const filteredAndSorted = useMemo(() => {
        let filtered = categories.filter(c =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return filtered.sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            return b.productCount - a.productCount;
        });
    }, [categories, searchTerm, sortBy]);

    const featuredCats = categories.filter(c => c.featured);
    const trendingCats = categories.filter(c => c.trending);

    if (loading) {
        return (
            <div className="shop-by-category-page"><div className="container"><div className="loading-state"><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><ShoppingBag size={48} /></motion.div><p>Loading categories...</p></div></div></div>
        );
    }

    return (
        <div className="shop-by-category-page">
            <motion.section className="category-hero" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <div className="container">
                    <div className="hero-content">
                        <motion.div className="hero-text" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                            <h1 className="hero-title"><Sparkles className="title-icon" /> Shop by Category</h1>
                            <p className="hero-subtitle">Discover our premium collection of cutting-edge technology and electronics</p>
                            <div className="hero-stats">
                                <div className="stat"><Award size={20} /><span>Premium Quality</span></div>
                                <div className="stat"><Zap size={20} /><span>Fast Delivery</span></div>
                                <div className="stat"><Shield size={20} /><span>Warranty Protected</span></div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {featuredCats.length > 0 && (
                <section className="featured-categories">
                    <div className="container">
                        <div className="section-header"><h2 className="section-title">Featured Categories</h2><p className="section-subtitle">Handpicked collections</p></div>
                        <motion.div className="featured-grid" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }} initial="hidden" animate="visible">
                            {featuredCats.map(cat => (
                                <motion.div key={cat.id} className="featured-category-card" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} whileHover={{ scale: 1.03, y: -5 }} onMouseEnter={() => setHoveredCategory(cat.id)} onMouseLeave={() => setHoveredCategory(null)}>
                                    <Link to={`/category/${cat.id}`} className="featured-link">
                                        <div className="featured-background" style={{ background: gradients[cat.id] || defaultGradient }} />
                                        <div className="featured-content">
                                            <div className="featured-icon">{categoryIcons[cat.id] || <Package />}</div>
                                            <h3 className="featured-name">{cat.name}</h3>
                                            <div className="featured-stats"><span className="product-count">{cat.productCount} Products</span></div>
                                        </div>
                                        <motion.div className="featured-overlay" animate={{ opacity: hoveredCategory === cat.id ? 1 : 0 }}><ArrowRight size={24} /></motion.div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            <section className="filters-section">
                <div className="container">
                    <div className="filters-container">
                        <div className="search-bar"><Search size={20} className="search-icon" /><input type="text" placeholder="Search categories..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="search-input" /></div>
                        <div className="filter-controls">
                            <div className="view-toggle">
                                <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}><Grid size={18} /></button>
                                <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}><List size={18} /></button>
                            </div>
                            <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="sort-select">
                                <option value="name">Sort by Name</option>
                                <option value="products">Sort by Products</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            <section className="all-categories">
                <div className="container">
                    <div className="section-header"><h2 className="section-title">All Categories</h2><p className="section-subtitle">{filteredAndSorted.length} categories available</p></div>
                    <motion.div className={`categories-container ${viewMode}`} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }} initial="hidden" animate="visible">
                        {filteredAndSorted.map(cat => (
                            <motion.div key={cat.id} className={`category-card ${viewMode}`} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} whileHover={{ scale: 1.02 }} onMouseEnter={() => setHoveredCategory(cat.id)} onMouseLeave={() => setHoveredCategory(null)}>
                                <Link to={`/category/${cat.id}`} className="category-link">
                                    <div className="category-visual" style={{ background: gradients[cat.id] || defaultGradient }}>
                                        <div className="category-icon">{categoryIcons[cat.id] || <Package />}</div>
                                        {cat.trending && <div className="trending-indicator"><TrendingUp size={16} /></div>}
                                    </div>
                                    <div className="category-info">
                                        <h3 className="category-name">{cat.name}</h3>
                                        <div className="category-meta"><span className="product-count">{cat.productCount} Products</span></div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {trendingCats.length > 0 && (
                <section className="trending-section">
                    <div className="container">
                        <div className="section-header"><h2 className="section-title"><TrendingUp size={24} /> Trending Now</h2></div>
                        <div className="trending-grid">
                            {trendingCats.map(cat => (
                                <motion.div key={cat.id} className="trending-card" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.05, y: -5 }}>
                                    <Link to={`/category/${cat.id}`} className="trending-link">
                                        <div className="trending-visual" style={{ background: gradients[cat.id] || defaultGradient }}>{categoryIcons[cat.id] || <Package />}</div>
                                        <div className="trending-info"><h4>{cat.name}</h4><span>{cat.productCount} items</span></div>
                                        <ChevronRight size={20} />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default ShopByCategoryPage;
