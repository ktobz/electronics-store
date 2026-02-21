import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { productAPI } from '../services/api';
import { type Product } from '../services/mockApi';
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import '../styles/FeaturedProducts.scss';

const FeaturedProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 4;

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await productAPI.getFeaturedProducts(limit);
                setProducts(data.products || data);
                setTotal(data.total || data.length || 0);
            } catch (error) {
                console.error("Failed to fetch featured products:", error);
                setError("Failed to load featured products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [page, limit]);

    const totalPages = Math.ceil(total / limit);

    return (
        <section className="section featured-products" id="products">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Featured Products</h2>
                    <p className="section-subtitle">Top picks for you this week</p>
                </div>

                {loading ? (
                    <div className="product-loading">
                        <Loader2 className="animate-spin" size={48} />
                        <p>Loading the latest tech...</p>
                    </div>
                ) : error ? (
                    <div className="product-error">
                        <AlertCircle size={48} />
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()} className="retry-btn">
                            Try Again
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="product-grid">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        <div className="pagination">
                            <button
                                className="pagination__btn"
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                            >
                                <ChevronLeft size={20} /> Previous
                            </button>

                            <div className="pagination__info">
                                Page <span>{page}</span> of {totalPages}
                            </div>

                            <button
                                className="pagination__btn"
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                            >
                                Next <ChevronRight size={20} />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default FeaturedProducts;
