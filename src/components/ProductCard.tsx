import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Heart, Repeat, Eye } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import QuickView from './QuickView';
import '../styles/ProductCard.scss';
import type { Product } from '../types';

interface ProductCardProps { product: Product; }

const getHue = (str: string) => { let hash = 0; for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash); return hash % 360; };

const categoryIcons: Record<string, string> = {
  smartphones: 'M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z',
  laptops: 'M20 18c1.1 0 1.99-.9 1.99-2L22 5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2H0c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2h-4zM4 5h16v11H4V5z',
  audio: 'M12 3v9.28a4.39 4.39 0 00-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z',
  gaming: 'M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
  wearables: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z',
  tablets: 'M18 0H6C4.34 0 3 1.34 3 3v18c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V3c0-1.66-1.34-3-3-3zm-4 22h-4v-1h4v1zm5.25-3H4.75V3h14.5v16z',
  cameras: 'M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z',
};

const defaultIcon = 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z';

const genSvgDataUri = (product: Product) => {
  const hue = getHue(product.name);
  const icon = categoryIcons[product.category] || defaultIcon;
  const initials = product.name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

  return 'data:image/svg+xml,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:hsl(${hue},65%,75%)"/>
          <stop offset="100%" style="stop-color:hsl(${(hue+30)%360},60%,60%)"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#bg)"/>
      <circle cx="300" cy="220" r="180" fill="rgba(255,255,255,0.15)"/>
      <circle cx="320" cy="200" r="140" fill="rgba(255,255,255,0.1)"/>
      <text x="40" y="50" font-family="system-ui,sans-serif" font-size="16" font-weight="600" fill="rgba(255,255,255,0.85)">${product.brand || ''}</text>
      <text x="40" y="260" font-family="system-ui,sans-serif" font-size="32" font-weight="700" fill="rgba(255,255,255,0.95)">${initials}</text>
      <svg x="25" y="260" width="28" height="28" viewBox="0 0 24 24">
        <path d="${icon}" fill="rgba(255,255,255,0.7)"/>
      </svg>
    </svg>`
  );
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
