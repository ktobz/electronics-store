import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    Search, Filter, Grid, List, Star, TrendingUp, 
    ShoppingBag, Heart, Share2, ChevronRight, 
    Laptop, Smartphone, Headphones, Camera, Watch, 
    Gamepad, Tv, Tablet, Home, Package, Monitor, 
    Cpu, Printer, Wifi, HardDrive, Code, Plane, 
    Shield, Headphones as Vr, Projector, Zap, 
    Award, Clock, ArrowRight, Sparkles
} from 'lucide-react';
import { fetchProducts, type Product } from '../services/mockApi';
import '../styles/ShopByCategoryPage.scss';

interface Category {
    id: string;
    name: string;
    icon: React.ReactNode;
    color: string;
    gradient: string;
    description: string;
    productCount: number;
    featured: boolean;
    trending: boolean;
    badge?: string;
}

const categories: Category[] = [
    {
        id: 'laptops',
        name: 'Laptops',
        icon: <Laptop />,
        color: '#3b82f6',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        description: 'High-performance laptops for work and gaming',
        productCount: 156,
        featured: true,
        trending: true,
        badge: 'Best Seller'
    },
    {
        id: 'smartphones',
        name: 'Smartphones',
        icon: <Smartphone />,
        color: '#10b981',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        description: 'Latest smartphones with cutting-edge technology',
        productCount: 89,
        featured: true,
        trending: true,
        badge: 'New'
    },
    {
        id: 'audio',
        name: 'Audio',
        icon: <Headphones />,
        color: '#f59e0b',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        description: 'Premium headphones and audio equipment',
        productCount: 234,
        featured: true,
        trending: false
    },
    {
        id: 'cameras',
        name: 'Cameras',
        icon: <Camera />,
        color: '#ef4444',
        gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        description: 'Professional cameras and photography gear',
        productCount: 67,
        featured: false,
        trending: true
    },
    {
        id: 'wearables',
        name: 'Wearables',
        icon: <Watch />,
        color: '#8b5cf6',
        gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
        description: 'Smart watches and fitness trackers',
        productCount: 123,
        featured: false,
        trending: false
    },
    {
        id: 'gaming',
        name: 'Gaming',
        icon: <Gamepad />,
        color: '#ec4899',
        gradient: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
        description: 'Gaming consoles and accessories',
        productCount: 198,
        featured: true,
        trending: true,
        badge: 'Hot'
    },
    {
        id: 'tvs',
        name: 'TVs & Home Theater',
        icon: <Tv />,
        color: '#06b6d4',
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        description: 'Smart TVs and home entertainment systems',
        productCount: 45,
        featured: false,
        trending: false
    },
    {
        id: 'tablets',
        name: 'Tablets',
        icon: <Tablet />,
        color: '#84cc16',
        gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
        description: 'Tablets for work and entertainment',
        productCount: 78,
        featured: false,
        trending: false
    },
    {
        id: 'smart-home',
        name: 'Smart Home',
        icon: <Home />,
        color: '#f97316',
        gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        description: 'IoT devices and smart home solutions',
        productCount: 156,
        featured: false,
        trending: true
    },
    {
        id: 'accessories',
        name: 'Accessories',
        icon: <Package />,
        color: '#6366f1',
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        description: 'Tech accessories and essentials',
        productCount: 412,
        featured: false,
        trending: false
    },
    {
        id: 'monitors',
        name: 'Monitors',
        icon: <Monitor />,
        color: '#14b8a6',
        gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
        description: 'Professional and gaming monitors',
        productCount: 89,
        featured: false,
        trending: false
    },
    {
        id: 'components',
        name: 'Components',
        icon: <Cpu />,
        color: '#dc2626',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        description: 'PC components and hardware',
        productCount: 267,
        featured: false,
        trending: false
    },
    {
        id: 'printers',
        name: 'Printers',
        icon: <Printer />,
        color: '#7c3aed',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        description: 'Printers and office equipment',
        productCount: 34,
        featured: false,
        trending: false
    },
    {
        id: 'networking',
        name: 'Networking',
        icon: <Wifi />,
        color: '#0891b2',
        gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        description: 'Networking equipment and routers',
        productCount: 56,
        featured: false,
        trending: false
    },
    {
        id: 'storage',
        name: 'Storage',
        icon: <HardDrive />,
        color: '#059669',
        gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
        description: 'Storage solutions and drives',
        productCount: 189,
        featured: false,
        trending: false
    },
    {
        id: 'software',
        name: 'Software',
        icon: <Code />,
        color: '#0d9488',
        gradient: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
        description: 'Software and digital products',
        productCount: 234,
        featured: false,
        trending: false
    },
    {
        id: 'drones',
        name: 'Drones',
        icon: <Plane />,
        color: '#b91c1c',
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        description: 'Drones and aerial photography',
        productCount: 45,
        featured: false,
        trending: true
    },
    {
        id: 'security',
        name: 'Security',
        icon: <Shield />,
        color: '#1e40af',
        gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        description: 'Security cameras and systems',
        productCount: 78,
        featured: false,
        trending: false
    },
    {
        id: 'vr-ar',
        name: 'VR/AR',
        icon: <Vr />,
        color: '#7c2d12',
        gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
        description: 'Virtual and augmented reality devices',
        productCount: 23,
        featured: false,
        trending: true,
        badge: 'Emerging'
    },
    {
        id: 'projectors',
        name: 'Projectors',
        icon: <Projector />,
        color: '#422006',
        gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
        description: 'Projectors and presentation equipment',
        productCount: 56,
        featured: false,
        trending: false
    }
];

const ShopByCategoryPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState<'name' | 'products' | 'trending'>('name');
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts(1, 100);
                setProducts(data.products);
            } catch (error) {
                console.error('Failed to load products:', error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    const filteredAndSortedCategories = useMemo(() => {
        let filtered = categories.filter(category =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (selectedCategory) {
            filtered = filtered.filter(cat => cat.id === selectedCategory);
        }

        return filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'products':
                    return b.productCount - a.productCount;
                case 'trending':
                    return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
                default:
                    return 0;
            }
        });
    }, [searchTerm, selectedCategory, sortBy]);

    const featuredCategories = categories.filter(cat => cat.featured);
    const trendingCategories = categories.filter(cat => cat.trending);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const categoryVariants = {
        hidden: { 
            opacity: 0, 
            scale: 0.8, 
            y: 30,
            rotateX: -15
        },
        visible: { 
            opacity: 1, 
            scale: 1, 
            y: 0,
            rotateX: 0,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 15,
                duration: 0.6
            }
        },
        hover: { 
            scale: 1.05,
            y: -10,
            rotateX: 5,
            transition: {
                type: "spring" as const,
                stiffness: 400,
                damping: 25
            }
        }
    };

    const getProductCount = (categoryId: string) => {
        return products.filter(product => 
            product.category.toLowerCase().includes(categoryId.replace('-', ' '))
        ).length;
    };

    if (loading) {
        return (
            <div className="shop-by-category-page">
                <div className="container">
                    <div className="loading-state">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="loading-spinner"
                        >
                            <ShoppingBag size={48} />
                        </motion.div>
                        <p>Loading premium categories...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="shop-by-category-page">
            {/* Hero Section */}
            <motion.section 
                className="category-hero"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="container">
                    <div className="hero-content">
                        <motion.div 
                            className="hero-text"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h1 className="hero-title">
                                <Sparkles className="title-icon" />
                                Shop by Category
                            </h1>
                            <p className="hero-subtitle">
                                Discover our premium collection of cutting-edge technology and electronics
                            </p>
                            <div className="hero-stats">
                                <div className="stat">
                                    <Award size={20} />
                                    <span>Premium Quality</span>
                                </div>
                                <div className="stat">
                                    <Zap size={20} />
                                    <span>Fast Delivery</span>
                                </div>
                                <div className="stat">
                                    <Shield size={20} />
                                    <span>Warranty Protected</span>
                                </div>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            className="hero-visual"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="floating-icons">
                                {[Laptop, Smartphone, Headphones, Camera].map((Icon, index) => (
                                    <motion.div
                                        key={index}
                                        className="floating-icon"
                                        animate={{
                                            y: [0, -20, 0],
                                            rotate: [0, 10, -10, 0]
                                        }}
                                        transition={{
                                            duration: 3 + index * 0.5,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <Icon size={32} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Featured Categories */}
            <section className="featured-categories">
                <div className="container">
                    <motion.div 
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h2 className="section-title">Featured Categories</h2>
                        <p className="section-subtitle">Handpicked collections for the best experience</p>
                    </motion.div>

                    <motion.div 
                        className="featured-grid"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {featuredCategories.map((category) => (
                            <motion.div
                                key={category.id}
                                className="featured-category-card"
                                variants={categoryVariants}
                                whileHover="hover"
                                onMouseEnter={() => setHoveredCategory(category.id)}
                                onMouseLeave={() => setHoveredCategory(null)}
                            >
                                <Link to={`/category/${category.id}`} className="featured-link">
                                    <div className="featured-background" style={{ background: category.gradient }} />
                                    <div className="featured-content">
                                        <div className="featured-icon">{category.icon}</div>
                                        <h3 className="featured-name">{category.name}</h3>
                                        <p className="featured-description">{category.description}</p>
                                        <div className="featured-stats">
                                            <span className="product-count">{getProductCount(category.id)} Products</span>
                                            {category.trending && (
                                                <span className="trending-badge">
                                                    <TrendingUp size={14} />
                                                    Trending
                                                </span>
                                            )}
                                        </div>
                                        {category.badge && (
                                            <div className="featured-badge">{category.badge}</div>
                                        )}
                                    </div>
                                    <motion.div 
                                        className="featured-overlay"
                                        animate={{ opacity: hoveredCategory === category.id ? 1 : 0 }}
                                    >
                                        <ArrowRight size={24} />
                                    </motion.div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Filters and Search */}
            <section className="filters-section">
                <div className="container">
                    <div className="filters-container">
                        <div className="search-bar">
                            <Search size={20} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search categories..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>

                        <div className="filter-controls">
                            <div className="view-toggle">
                                <button
                                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                    onClick={() => setViewMode('grid')}
                                >
                                    <Grid size={18} />
                                </button>
                                <button
                                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                    onClick={() => setViewMode('list')}
                                >
                                    <List size={18} />
                                </button>
                            </div>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="sort-select"
                            >
                                <option value="name">Sort by Name</option>
                                <option value="products">Sort by Products</option>
                                <option value="trending">Sort by Trending</option>
                            </select>

                            {selectedCategory && (
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className="clear-filter"
                                >
                                    Clear Filter
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* All Categories Grid */}
            <section className="all-categories">
                <div className="container">
                    <motion.div 
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <h2 className="section-title">All Categories</h2>
                        <p className="section-subtitle">
                            {filteredAndSortedCategories.length} categories available
                        </p>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        <motion.div 
                            className={`categories-container ${viewMode}`}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            key={`${searchTerm}-${sortBy}-${viewMode}`}
                        >
                            {filteredAndSortedCategories.map((category) => (
                                <motion.div
                                    key={category.id}
                                    className={`category-card ${viewMode}`}
                                    variants={categoryVariants}
                                    whileHover="hover"
                                    onMouseEnter={() => setHoveredCategory(category.id)}
                                    onMouseLeave={() => setHoveredCategory(null)}
                                >
                                    <Link to={`/category/${category.id}`} className="category-link">
                                        <div className="category-visual" style={{ background: category.gradient }}>
                                            <div className="category-icon">{category.icon}</div>
                                            {category.trending && (
                                                <div className="trending-indicator">
                                                    <TrendingUp size={16} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="category-info">
                                            <h3 className="category-name">{category.name}</h3>
                                            <p className="category-description">{category.description}</p>
                                            <div className="category-meta">
                                                <span className="product-count">{getProductCount(category.id)} Products</span>
                                                <div className="category-actions">
                                                    <button className="action-btn">
                                                        <Heart size={16} />
                                                    </button>
                                                    <button className="action-btn">
                                                        <Share2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {category.badge && (
                                            <div className="category-badge">{category.badge}</div>
                                        )}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {filteredAndSortedCategories.length === 0 && (
                        <motion.div 
                            className="no-results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <Search size={48} />
                            <h3>No categories found</h3>
                            <p>Try adjusting your search or filters</p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Trending Categories */}
            <section className="trending-section">
                <div className="container">
                    <motion.div 
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                    >
                        <h2 className="section-title">
                            <TrendingUp size={24} />
                            Trending Now
                        </h2>
                        <p className="section-subtitle">Hot categories that customers love</p>
                    </motion.div>

                    <div className="trending-grid">
                        {trendingCategories.map((category) => (
                            <motion.div
                                key={category.id}
                                className="trending-card"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.1 + trendingCategories.indexOf(category) * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <Link to={`/category/${category.id}`} className="trending-link">
                                    <div className="trending-visual" style={{ background: category.gradient }}>
                                        {category.icon}
                                    </div>
                                    <div className="trending-info">
                                        <h4>{category.name}</h4>
                                        <span>{getProductCount(category.id)} items</span>
                                    </div>
                                    <ChevronRight size={20} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ShopByCategoryPage;
