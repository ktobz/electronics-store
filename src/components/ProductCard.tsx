import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Heart, Repeat, Eye, ImageOff } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import QuickView from './QuickView';
import '../styles/ProductCard.scss';
import type { Product } from '../types';

interface ProductCardProps { product: Product; }

const getBgColor = (str: string) => { let hash = 0; for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash); const h = hash % 360; return `hsl(${h}, 50%, 85%)`; };

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart, toggleWishlist, toggleCompare, isInWishlist, isInCompare } = useStore();
    const [showQuickView, setShowQuickView] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgErr, setImgErr] = useState(false);
    const [adding, setAdding] = useState(false);

    const getProductId = () => product._id || product.id?.toString() || '';
    const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.stopPropagation();
        setAdding(true);
        await addToCart(getProductId());
        setAdding(false);
    };

    return (
        <motion.article
            className="pcard"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .35 }}
        >
            <div className="pcard__img-box">
                {imgErr ? (
                    <div className="pcard__placeholder" style={{ background: getBgColor(product.name) }}>
                        <ImageOff size={48} opacity={0.25} />
                        <span>{product.name}</span>
                    </div>
                ) : (
                    <img
                        src={product.image}
                        alt={product.name}
                        className={`pcard__img ${imgLoaded ? 'loaded' : ''}`}
                        loading="lazy"
                        onLoad={() => setImgLoaded(true)}
                        onError={() => setImgErr(true)}
                    />
                )}

                <div className="pcard__badges">
                    {discount > 0 && <span className="pcard__badge pcard__badge--sale">-{discount}%</span>}
                    {product.featured && <span className="pcard__badge pcard__badge--hot">Hot</span>}
                </div>

                <div className="pcard__overlay-actions">
                    <button className={`pcard__act ${isInWishlist(getProductId()) ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); toggleWishlist(getProductId()); }} title="Wishlist">
                        <Heart size={18} fill={isInWishlist(getProductId()) ? 'currentColor' : 'none'} />
                    </button>
                    <button className={`pcard__act ${isInCompare(getProductId()) ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); toggleCompare(product); }} title="Compare">
                        <Repeat size={18} />
                    </button>
                    <button className="pcard__act" onClick={(e) => { e.stopPropagation(); setShowQuickView(true); }} title="Quick View">
                        <Eye size={18} />
                    </button>
                </div>
            </div>

            <div className="pcard__body">
                <span className="pcard__brand">{product.brand}</span>
                <h3 className="pcard__name">{product.name}</h3>
                <div className="pcard__rating">
                    <div className="pcard__stars">
                        {[1,2,3,4,5].map(i => (
                            <Star key={i} size={12} fill={i <= Math.round(product.rating) ? '#c5a059' : 'none'} stroke={i <= Math.round(product.rating) ? '#c5a059' : '#d1d5db'} />
                        ))}
                    </div>
                    <span>{product.rating}</span>
                </div>
                <div className="pcard__price">
                    <span className="pcard__curr">${(product.price ?? 0).toLocaleString()}</span>
                    {product.originalPrice && <span className="pcard__orig">${product.originalPrice.toLocaleString()}</span>}
                </div>
                <motion.button className="pcard__atc" whileTap={{ scale: .95 }} onClick={handleAddToCart} disabled={adding}>
                    <ShoppingBag size={16} />
                    <span>{adding ? 'Adding...' : 'Add to Cart'}</span>
                </motion.button>
            </div>
            {showQuickView && <QuickView product={product} onClose={() => setShowQuickView(false)} />}
        </motion.article>
    );
};

export default ProductCard;
