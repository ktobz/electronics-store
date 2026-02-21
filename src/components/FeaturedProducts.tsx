import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { fetchProducts, type Product } from '../services/mockApi';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import '../styles/FeaturedProducts.scss';

const FeaturedProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 4;

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                // Fetch top-rated products (sortBy handled client-side after fetch)
                const data = await fetchProducts(1, 100);
                const featured = data.products
                    .filter(p => p.rating >= 4.7)
                    .sort((a, b) => b.rating - a.rating);
                setTotal(featured.length);
                const start = (page - 1) * limit;
                setProducts(featured.slice(start, start + limit));
            } catch (err) {
                console.error('Failed to load featured products:', err);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, [page]);

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
