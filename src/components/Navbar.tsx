import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Menu, X, Heart, Repeat, User, ChevronDown, Moon, Sun, Trophy, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import { getCurrentUser } from '../services/supabase';
import '../styles/Navbar.scss';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const navigate = useNavigate();
  const { cart, wishlist, compare, points, isDarkMode, toggleDarkMode, setCartOpen } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    checkUser();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { signOut } = await import('../services/supabase');
      await signOut();
      setUser(null);
      setShowUserMenu(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar__container">
          <NavLink to="/" className="navbar__logo">
            <Star className="navbar__logo-icon" fill="currentColor" />
            <span>Electro Store</span>
          </NavLink>

          <div className="navbar__desktop-menu">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            <div className="navbar__dropdown">
              <button className="dropdown-trigger">
                Brands <ChevronDown size={14} />
              </button>
              <div className="dropdown-menu">
                <NavLink to="/brands/samsung">Samsung</NavLink>
                <NavLink to="/brands/panasonic">Panasonic</NavLink>
                <NavLink to="/brands/apple">Apple</NavLink>
                <NavLink to="/brands/sony">Sony</NavLink>
              </div>
            </div>
            <NavLink to="/deals">Deals</NavLink>
            <NavLink to="/compare" className="compare-link">
              Compare {compare.length > 0 && <span>({compare.length})</span>}
            </NavLink>
          </div>

          <div className="navbar__center">
            <form onSubmit={handleSearch} className="navbar__search">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          <div className="navbar__actions">
            <div className="navbar__points" title="Your Electro Points">
              <Trophy size={16} />
              <span>{points}</span>
            </div>

            <button className="navbar__action-btn" onClick={toggleDarkMode} title="Toggle Theme">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <NavLink to="/wishlist" className="navbar__action-btn">
              <Heart size={20} />
              {wishlist.length > 0 && <span className="navbar__badge">{wishlist.length}</span>}
            </NavLink>

            <button className="navbar__action-btn" onClick={() => setCartOpen(true)}>
              <ShoppingCart size={20} />
              {cart.length > 0 && <span className="navbar__badge">{cart.length}</span>}
            </button>

            <div className="navbar__user-section">
              {user ? (
                <div className="user-menu">
                  <button
                    className="user-avatar"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  >
                    <User size={20} />
                    <span>{user.user_metadata?.name || user.email?.split('@')[0]}</span>
                    <ChevronDown size={14} />
                  </button>
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        className="user-dropdown"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <NavLink to="/profile" onClick={() => setShowUserMenu(false)}>
                          <User size={16} /> Profile
                        </NavLink>
                        <NavLink to="/orders" onClick={() => setShowUserMenu(false)}>
                          <ShoppingCart size={16} /> Orders
                        </NavLink>
                        <button onClick={handleLogout}>
                          <X size={16} /> Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="auth-buttons">
                  <NavLink to="/login" className="btn btn-outline">
                    Login
                  </NavLink>
                  <NavLink to="/signup" className="btn btn-primary">
                    Sign Up
                  </NavLink>
                </div>
              )}

              <button className="navbar__mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                <div className={`hamburger ${isOpen ? 'active' : ''}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="navbar__mobile-menu"
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-nav-header">
              <NavLink to="/" className="navbar__logo" onClick={() => setIsOpen(false)}>
                <Star className="navbar__logo-icon" fill="currentColor" />
                <span>Electro Store</span>
              </NavLink>
              <button className="mobile-close" onClick={() => setIsOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSearch} className="mobile-search">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            <div className="mobile-nav-items">
              <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
              <NavLink to="/products" onClick={() => setIsOpen(false)}>Products</NavLink>
              
              <div className="mobile-accordion">
                <button 
                  className="accordion-trigger"
                  onClick={() => toggleAccordion('brands')}
                >
                  Brands <ChevronDown size={16} className={`chevron ${activeAccordion === 'brands' ? 'open' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeAccordion === 'brands' && (
                    <motion.div
                      className="accordion-content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <NavLink to="/brands/samsung" onClick={() => setIsOpen(false)}>Samsung</NavLink>
                      <NavLink to="/brands/panasonic" onClick={() => setIsOpen(false)}>Panasonic</NavLink>
                      <NavLink to="/brands/apple" onClick={() => setIsOpen(false)}>Apple</NavLink>
                      <NavLink to="/brands/sony" onClick={() => setIsOpen(false)}>Sony</NavLink>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mobile-accordion">
                <button 
                  className="accordion-trigger"
                  onClick={() => toggleAccordion('categories')}
                >
                  Categories <ChevronDown size={16} className={`chevron ${activeAccordion === 'categories' ? 'open' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeAccordion === 'categories' && (
                    <motion.div
                      className="accordion-content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <NavLink to="/products?category=Phones" onClick={() => setIsOpen(false)}>Phones</NavLink>
                      <NavLink to="/products?category=Laptops" onClick={() => setIsOpen(false)}>Laptops</NavLink>
                      <NavLink to="/products?category=Audio" onClick={() => setIsOpen(false)}>Audio</NavLink>
                      <NavLink to="/products?category=Gaming" onClick={() => setIsOpen(false)}>Gaming</NavLink>
                      <NavLink to="/products?category=Tablets" onClick={() => setIsOpen(false)}>Tablets</NavLink>
                      <NavLink to="/products?category=Wearables" onClick={() => setIsOpen(false)}>Wearables</NavLink>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink to="/deals" onClick={() => setIsOpen(false)}>Deals</NavLink>
              <NavLink to="/compare" onClick={() => setIsOpen(false)}>
                Compare {compare.length > 0 && <span>({compare.length})</span>}
              </NavLink>
            </div>

            <div className="mobile-auth">
              {user ? (
                <div className="mobile-user-info">
                  <div className="user-welcome">
                    <User size={20} />
                    <span>{user.user_metadata?.name || user.email?.split('@')[0]}</span>
                  </div>
                  <div className="mobile-user-actions">
                    <NavLink to="/profile" onClick={() => setIsOpen(false)}>Profile</NavLink>
                    <NavLink to="/orders" onClick={() => setIsOpen(false)}>Orders</NavLink>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                </div>
              ) : (
                <div className="mobile-auth-buttons">
                  <NavLink to="/login" className="btn btn-outline" onClick={() => setIsOpen(false)}>
                    Login
                  </NavLink>
                  <NavLink to="/signup" className="btn btn-primary" onClick={() => setIsOpen(false)}>
                    Sign Up
                  </NavLink>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
