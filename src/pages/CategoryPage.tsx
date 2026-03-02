import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Filter, Grid, List, Heart, ShoppingBag, Star,
    ChevronLeft, ChevronRight, X, Check, ShoppingCart, Eye
} from 'lucide-react';
import { fetchProducts, type Product } from '../services/mockApi';
import { useStore } from '../context/StoreContext';
import '../styles/CategoryPage.scss';

interface Brand {
    id: string;
    name: string;
    logo: string;
    productCount: number;
    featured: boolean;
}

const brands: Brand[] = [
    { id: 'apple', name: 'Apple', logo: '🍎', productCount: 45, featured: true },
    { id: 'samsung', name: 'Samsung', logo: '📱', productCount: 38, featured: true },
    { id: 'sony', name: 'Sony', logo: '🎧', productCount: 52, featured: true },
    { id: 'lg', name: 'LG', logo: '📺', productCount: 28, featured: false },
    { id: 'microsoft', name: 'Microsoft', logo: '🪟', productCount: 31, featured: true },
    { id: 'dell', name: 'Dell', logo: '💻', productCount: 42, featured: false },
    { id: 'hp', name: 'HP', logo: '🖨️', productCount: 35, featured: false },
    { id: 'lenovo', name: 'Lenovo', logo: '💻', productCount: 29, featured: false },
    { id: 'asus', name: 'ASUS', logo: '🎮', productCount: 33, featured: false },
    { id: 'acer', name: 'Acer', logo: '🖥️', productCount: 24, featured: false },
    { id: 'razer', name: 'Razer', logo: '🐍', productCount: 27, featured: false },
    { id: 'corsair', name: 'Corsair', logo: '⚡', productCount: 31, featured: false },
    { id: 'logitech', name: 'Logitech', logo: '🖱️', productCount: 36, featured: false },
    { id: 'bose', name: 'Bose', logo: '🔊', productCount: 22, featured: false },
    { id: 'jbl', name: 'JBL', logo: '🔈', productCount: 26, featured: false },
    { id: 'canon', name: 'Canon', logo: '📷', productCount: 34, featured: false },
    { id: 'nikon', name: 'Nikon', logo: '📸', productCount: 29, featured: false },
    { id: 'panasonic', name: 'Panasonic', logo: '📹', productCount: 25, featured: false },
    { id: 'toshiba', name: 'Toshiba', logo: '💾', productCount: 21, featured: false },
    { id: 'xiaomi', name: 'Xiaomi', logo: '📱', productCount: 33, featured: false }
];

const categoryInfo: Record<string, { name: string; description: string; icon: string; color: string }> = {
    laptops: {
        name: 'Laptops',
        description: 'High-performance laptops for work, gaming, and creativity',
        icon: '💻',
        color: '#3b82f6'
    },
    smartphones: {
        name: 'Smartphones',
        description: 'Latest smartphones with cutting-edge technology',
        icon: '📱',
        color: '#10b981'
    },
    audio: {
        name: 'Audio',
        description: 'Premium headphones, speakers, and audio equipment',
        icon: '🎧',
        color: '#f59e0b'
    },
    cameras: {
        name: 'Cameras',
        description: 'Professional cameras and photography gear',
        icon: '📷',
        color: '#ef4444'
    },
    wearables: {
        name: 'Wearables',
        description: 'Smart watches and fitness trackers',
        icon: '⌚',
        color: '#8b5cf6'
    },
    gaming: {
        name: 'Gaming',
        description: 'Gaming consoles and accessories',
        icon: '🎮',
        color: '#ec4899'
    },
    tvs: {
        name: 'TVs & Home Theater',
        description: 'Smart TVs and home entertainment systems',
        icon: '📺',
        color: '#06b6d4'
    },
    tablets: {
        name: 'Tablets',
        description: 'Tablets for work and entertainment',
        icon: '📱',
        color: '#84cc16'
    },
    'smart-home': {
        name: 'Smart Home',
        description: 'IoT devices and smart home solutions',
        icon: '🏠',
        color: '#f97316'
    },
    accessories: {
        name: 'Accessories',
        description: 'Tech accessories and essentials',
        icon: '📦',
        color: '#6366f1'
    },
    monitors: {
        name: 'Monitors',
        description: 'Professional and gaming monitors',
        icon: '🖥️',
        color: '#14b8a6'
    },
    components: {
        name: 'Components',
        description: 'PC components and hardware',
        icon: '🔧',
        color: '#dc2626'
    },
    printers: {
        name: 'Printers',
        description: 'Printers and office equipment',
        icon: '🖨️',
        color: '#7c3aed'
    },
    networking: {
        name: 'Networking',
        description: 'Networking equipment and routers',
        icon: '📡',
        color: '#0891b2'
    },
    storage: {
        name: 'Storage',
        description: 'Storage solutions and drives',
        icon: '💾',
        color: '#059669'
    },
    software: {
        name: 'Software',
        description: 'Software and digital products',
        icon: '💿',
        color: '#0d9488'
    },
    drones: {
        name: 'Drones',
        description: 'Drones and aerial photography',
        icon: '🚁',
        color: '#b91c1c'
    },
    security: {
        name: 'Security',
        description: 'Security cameras and systems',
        icon: '🔒',
        color: '#1e40af'
    },
    'vr-ar': {
        name: 'VR/AR',
        description: 'Virtual and augmented reality devices',
        icon: '🥽',
        color: '#7c2d12'
    },
    projectors: {
        name: 'Projectors',
        description: 'Projectors and presentation equipment',
        icon: '📽️',
        color: '#422006'
    }
};

const CategoryPage: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const navigate = useNavigate();
    const { addToCart, toggleWishlist, wishlist, cart } = useStore();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating' | 'newest'>('name');
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
    const [currentPage, setCurrentPage] = useState(1);
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
    const [showFilters, setShowFilters] = useState(false);

    const itemsPerPage = 30;
    const category = categoryInfo[categoryId || ''] || categoryInfo.laptops;

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
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

    const filteredProducts = useMemo(() => {
        let filtered = products.filter(product =>
            product.category.toLowerCase().includes(categoryId?.replace('-', ' ') || 'laptops')
        );

        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedBrands.length > 0) {
            filtered = filtered.filter(product =>
                selectedBrands.includes(product.brand.toLowerCase())
            );
        }

        filtered = filtered.filter(product =>
            product.price >= priceRange[0] && product.price <= priceRange[1]
        );

        return filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'price':
                    return a.price - b.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'newest':
                    return b.id - a.id;
                default:
                    return 0;
            }
        });
    }, [products, categoryId, searchTerm, selectedBrands, priceRange, sortBy]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const productVariants = {
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

    const handleAddToCart = (product: Product) => {
        addToCart(product.id);
        // Show success animation
    };

    const handleAddToWishlist = (product: Product) => {
        toggleWishlist(product.id);
        // Show success animation
    };

    const isInWishlist = (productId: number) => {
        return wishlist.includes(productId);
    };

    const isInCart = (productId: number) => {
        return cart.includes(productId);
    };

    if (loading) {
        return (
            <div className="category-page">
                <div className="container">
                    <div className="loading-state">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="loading-spinner"
                        >
                            <ShoppingBag size={48} />
                        </motion.div>
                        <p>Loading {category.name}...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="category-page">
            {/* Header */}
            <motion.section
                className="category-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="container">
                    <button
                        onClick={() => navigate('/shop-by-category')}
                        className="back-button"
                    >
                        <ChevronLeft size={20} />
                        Back to Categories
                    </button>

                    <div className="category-hero">
                        <div className="category-icon">{category.icon}</div>
                        <div className="category-info">
                            <h1 className="category-title">{category.name}</h1>
                            <p className="category-description">{category.description}</p>
                            <div className="category-stats">
                                <span className="product-count">{filteredProducts.length} Products</span>
                                <span className="brand-count">{brands.length} Brands</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Filters and Search */}
            <section className="filters-section">
                <div className="container">
                    <div className="filters-container">
                        <div className="search-bar">
                            <Search size={20} className="search-icon" />
                            <input
                                type="text"
                                placeholder={`Search ${category.name.toLowerCase()}...`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>

                        <div className="filter-controls">
                            <button
                                className={`filter-btn ${showFilters ? 'active' : ''}`}
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <Filter size={18} />
                                Filters
                                {selectedBrands.length > 0 && (
                                    <span className="filter-count">{selectedBrands.length}</span>
                                )}
                            </button>

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
                                <option value="price">Sort by Price</option>
                                <option value="rating">Sort by Rating</option>
                                <option value="newest">Sort by Newest</option>
                            </select>
                        </div>
                    </div>

                    {/* Expanded Filters */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                className="expanded-filters"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="filter-group">
                                    <h3>Brands</h3>
                                    <div className="brand-grid">
                                        {brands.map(brand => (
                                            <button
                                                key={brand.id}
                                                className={`brand-chip ${selectedBrands.includes(brand.id) ? 'selected' : ''}`}
                                                onClick={() => {
                                                    setSelectedBrands(prev =>
                                                        prev.includes(brand.id)
                                                            ? prev.filter(b => b !== brand.id)
                                                            : [...prev, brand.id]
                                                    );
                                                }}
                                            >
                                                <span className="brand-logo">{brand.logo}</span>
                                                <span className="brand-name">{brand.name}</span>
                                                {selectedBrands.includes(brand.id) && (
                                                    <Check size={14} />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="filter-group">
                                    <h3>Price Range</h3>
                                    <div className="price-range">
                                        <input
                                            type="range"
                                            min="0"
                                            max="5000"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                            className="price-slider"
                                        />
                                        <div className="price-labels">
                                            <span>${priceRange[0]}</span>
                                            <span>${priceRange[1]}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Products Grid */}
            <section className="products-section">
                <div className="container">
                    <motion.div
                        className={`products-container ${viewMode}`}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <AnimatePresence mode="wait">
                            {paginatedProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    className={`product-card ${viewMode}`}
                                    variants={productVariants}
                                    whileHover="hover"
                                    onMouseEnter={() => { }}
                                    onMouseLeave={() => { }}
                                    layout
                                >
                                    <div className="product-visual">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="product-image"
                                        />
                                        <div className="product-overlay">
                                            <button
                                                className="quick-view-btn"
                                                onClick={() => setQuickViewProduct(product)}
                                            >
                                                <Eye size={14} />
                                            </button>
                                        </div>
                                        {product.rating >= 4.5 && (
                                            <div className="product-badge">
                                                <Star size={12} />
                                                Top Rated
                                            </div>
                                        )}
                                    </div>

                                    <div className="product-info">
                                        <h3 className="product-name">{product.name}</h3>
                                        <p className="product-description">High-quality {product.category} from {product.brand}</p>
                                        <div className="product-meta">
                                            <div className="product-rating">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={14}
                                                        fill={i < Math.floor(product.rating) ? "#f59e0b" : "none"}
                                                        color={i < Math.floor(product.rating) ? "#f59e0b" : "#d1d5db"}
                                                    />
                                                ))}
                                                <span>({product.rating})</span>
                                            </div>
                                            <div className="product-price">${product.price}</div>
                                        </div>

                                        <div className="product-actions">
                                            <button
                                                className={`action-btn wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                                                onClick={() => handleAddToWishlist(product)}
                                            >
                                                <Heart size={16} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                                            </button>
                                            <button
                                                className={`action-btn cart-btn ${isInCart(product.id) ? 'active' : ''}`}
                                                onClick={() => handleAddToCart(product)}
                                            >
                                                <ShoppingCart size={16} />
                                                {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                className="pagination-btn"
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft size={20} />
                                Previous
                            </button>

                            <div className="pagination-info">
                                Page {currentPage} of {totalPages}
                            </div>

                            <button
                                className="pagination-btn"
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Quick View Modal */}
            <AnimatePresence>
                {quickViewProduct && (
                    <motion.div
                        className="quick-view-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setQuickViewProduct(null)}
                    >
                        <motion.div
                            className="quick-view-content"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="close-modal"
                                onClick={() => setQuickViewProduct(null)}
                            >
                                <X size={24} />
                            </button>

                            <div className="quick-view-grid">
                                <div className="quick-view-image">
                                    <img src={quickViewProduct.image} alt={quickViewProduct.name} />
                                </div>
                                <div className="quick-view-details">
                                    <h2>{quickViewProduct.name}</h2>
                                    <p>High-quality {quickViewProduct.category} from {quickViewProduct.brand}</p>
                                    <div className="quick-view-price">${quickViewProduct.price}</div>
                                    <div className="quick-view-rating">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                fill={i < Math.floor(quickViewProduct.rating) ? "#f59e0b" : "none"}
                                                color={i < Math.floor(quickViewProduct.rating) ? "#f59e0b" : "#d1d5db"}
                                            />
                                        ))}
                                        <span>({quickViewProduct.rating})</span>
                                    </div>
                                    <div className="quick-view-actions">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => {
                                                handleAddToCart(quickViewProduct);
                                                setQuickViewProduct(null);
                                            }}
                                        >
                                            <ShoppingCart size={18} />
                                            Add to Cart
                                        </button>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => {
                                                handleAddToWishlist(quickViewProduct);
                                            }}
                                        >
                                            <Heart size={18} />
                                            Add to Wishlist
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CategoryPage;
