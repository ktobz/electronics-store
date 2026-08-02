import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Heart, Repeat, Eye } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import QuickView from './QuickView';
import '../styles/ProductCard.scss';
import type { Product } from '../types';

interface ProductCardProps { product: Product; }

const getHue = (str: string) => { let hash = 0; for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash); return hash % 360; };

const genSvgDataUri = (product: Product) => {
  const hue = getHue(product.name);
  const hue2 = (hue + 30) % 360;
  const initials = product.name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
  <rect width="400" height="300" fill="hsl(${hue},60%,70%)"/>
  <rect width="400" height="300" fill="hsl(${hue2},55%,55%)" opacity="0.6"/>
  <circle cx="280" cy="340" r="200" fill="hsl(${(hue+60)%360},60%,80%)" opacity="0.3"/>
  <circle cx="330" cy="180" r="120" fill="hsl(${(hue+90)%360},55%,75%)" opacity="0.3"/>
  <text x="30" y="55" font-family="Arial,sans-serif" font-size="18" font-weight="bold" fill="#fff" opacity="0.8">${product.brand || ''}</text>
  <text x="30" y="270" font-family="Arial,sans-serif" font-size="48" font-weight="bold" fill="#fff" opacity="0.85">${initials}</text>
</svg>`;

  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart, toggleWishlist, toggleCompare, isInWishlist, isInCompare } = useStore();
    const [showQuickView, setShowQuickView] = useState(false);
    const [adding, setAdding] = useState(false);

    const getProductId = () => product._id || product.id?.toString() || '';
    const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    const svgUri = genSvgDataUri(product);

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
                <img
                    src={svgUri}
                    alt={product.name}
                    className="pcard__img"
                    loading="lazy"
                />

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
