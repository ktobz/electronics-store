import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingCart, Star, Menu, X, Heart, Repeat, User, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import '../styles/Navbar.scss';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart, wishlist, compare } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar__container">
        <NavLink to="/" className="navbar__logo">
          <Star className="navbar__logo-icon" fill="currentColor" />
          <span>Electro Store</span>
        </NavLink>

        <div className="navbar__desktop-menu">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
          <NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>Products</NavLink>
          <NavLink to="/tracking" className={({ isActive }) => (isActive ? 'active' : '')}>Track Order</NavLink>
          <NavLink to="/categories" className={({ isActive }) => (isActive ? 'active' : '')}>Categories</NavLink>
          <NavLink to="/deals" className={({ isActive }) => (isActive ? 'active' : '')}>Deals</NavLink>
        </div>

        <div className="navbar__actions">
          <button className="navbar__action-btn" title="Compare">
            <Repeat />
            {compare.length > 0 && <span className="navbar__badge">{compare.length}</span>}
          </button>

          <button className="navbar__action-btn" title="Wishlist">
            <Heart />
            {wishlist.length > 0 && <span className="navbar__badge">{wishlist.length}</span>}
          </button>

          <button className="navbar__action-btn" title="Cart">
            <ShoppingCart />
            {cart.length > 0 && <span className="navbar__badge">{cart.length}</span>}
          </button>

          <button className="navbar__login-btn">
            <User size={18} />
            Login
          </button>

          <button className="navbar__mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="navbar__mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-nav-items">
              <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
              <NavLink to="/products" onClick={() => setIsOpen(false)}>Products</NavLink>
              <NavLink to="/tracking" onClick={() => setIsOpen(false)}>Track Order</NavLink>

              <div className="mobile-accordion">
                <button className="accordion-trigger">
                  Categories <ChevronDown size={16} />
                </button>
                <div className="accordion-content">
                  <NavLink to="/products?category=Phones" onClick={() => setIsOpen(false)}>Phones</NavLink>
                  <NavLink to="/products?category=Laptops" onClick={() => setIsOpen(false)}>Laptops</NavLink>
                  <NavLink to="/products?category=Audio" onClick={() => setIsOpen(false)}>Audio</NavLink>
                  <NavLink to="/products?category=Gaming" onClick={() => setIsOpen(false)}>Gaming</NavLink>
                </div>
              </div>

              <NavLink to="/deals" onClick={() => setIsOpen(false)}>Deals</NavLink>
            </div>

            <div className="mobile-auth">
              <button className="navbar__login-btn">
                <User size={18} /> Login
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
