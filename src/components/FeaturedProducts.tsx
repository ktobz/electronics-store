import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';
import '../styles/FeaturedProducts.scss';

interface Product {
    id: number;
    name: string;
    price: number;
    rating: number;
    image: string;
    category: string;
}

const products: Product[] = [
    {
        id: 1,
        name: "Wireless Noise-Cancelling Headphones",
        price: 299.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Audio"
    },
    {
        id: 2,
        name: "Smart Watch Series 7",
        price: 399.99,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Wearables"
    },
    {
        id: 3,
        name: "4K Ultra HD Camera",
        price: 599.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Photography"
    },
    {
        id: 4,
        name: "Gaming Console Pro",
        price: 499.99,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Gaming"
    }
];

const FeaturedProducts: React.FC = () => {
    return (
        <section className="section featured-products" id="products">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Featured Products</h2>
                    <p className="section-subtitle">Top picks for you this week</p>
                </div>

                <div className="product-grid">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            className="product-card"
                            whileHover={{ y: -10 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="product-card__image">
                                <img src={product.image} alt={product.name} />
                                <span className="product-card__category">{product.category}</span>
                                <button className="product-card__add-btn">
                                    <ShoppingBag size={20} />
                                </button>
                            </div>
                            <div className="product-card__content">
                                <div className="product-card__rating">
                                    <Star size={16} fill="#ffc107" stroke="#ffc107" />
                                    <span>{product.rating}</span>
                                </div>
                                <h3 className="product-card__title">{product.name}</h3>
                                <div className="product-card__price">${product.price}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
