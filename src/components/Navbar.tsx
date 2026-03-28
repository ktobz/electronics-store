import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  ShoppingBag, Star, X, Heart, User,
  ChevronDown, Moon, Sun, Trophy, Search, Zap,
  Smartphone, Laptop, Headphones, Gamepad2, Watch,
  Globe, FileText, Megaphone, AppWindow, Rocket, Package
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { getCurrentUser } from '../services/supabase';
import '../styles/Navbar.scss';

// ─── Accordion Section ────────────────────────────────────────────────────────
interface AccordionSectionProps {
  id?: string;
  label: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({
  label, icon, isOpen, onToggle, children
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className={`mobile-accordion ${isOpen ? 'is-open' : ''}`}>
      <button className="accordion-trigger" onClick={onToggle} aria-expanded={isOpen}>
        <span className="accordion-trigger__left">
          {icon}
          <span>{label}</span>
        </span>
        <ChevronDown
          size={16}
          className="accordion-chevron"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
        />
      </button>
      <div
        className="accordion-content"
        style={{ height: `${height}px`, overflow: 'hidden', transition: 'height 0.35s cubic-bezier(0.4,0,0.2,1)' }}
      >
        <div ref={contentRef} className="accordion-content__inner">
          {children}
        </div>
      </div>
    </div>
  );
};

// ─── Main Navbar ──────────────────────────────────────────────────────────────
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const navigate = useNavigate();
  const { cart, wishlist, compare, points, isDarkMode, toggleDarkMode, setCartOpen } = useStore();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    getCurrentUser().then(setUser).catch(() => setUser(null));
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to products page with search query
      navigate(`/category/all?search=${encodeURIComponent(searchQuery.trim())}`);
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
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const closeMenu = () => setIsOpen(false);

  const toggleAccordion = (id: string) =>
    setActiveAccordion(prev => (prev === id ? null : id));

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${isDarkMode ? 'navbar--dark' : ''}`} role="navigation">
        <div className="navbar__inner">

          {/* ── Logo ─────────────────────────────────────────── */}
          <NavLink to="/" className="navbar__logo" aria-label="Lecman Store Home">
            <div className="navbar__logo-icon">
              <Zap size={18} />
            </div>
            <span className="navbar__logo-text">Lecman<em>Store</em></span>
          </NavLink>

          {/* ── Desktop Links ─────────────────────────────────── */}
          <div className="navbar__desktop-links">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`} end>
              Home
            </NavLink>
            <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}>
              Products
            </NavLink>
            <NavLink to="/shop-by-category" className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}>
              Categories
            </NavLink>

            {/* Brands dropdown */}
            <div className="nav-dropdown">
              <button className="nav-link nav-link--dropdown">
                Brands <ChevronDown size={13} />
              </button>
              <div className="nav-dropdown__panel">
                <NavLink to="/products?brand=Samsung" className="dropdown-item">
                  <Smartphone size={14} /> Samsung
                </NavLink>
                <NavLink to="/products?brand=Panasonic" className="dropdown-item">
                  <Zap size={14} /> Panasonic
                </NavLink>
                <NavLink to="/products?brand=Apple" className="dropdown-item">
                  <Laptop size={14} /> Apple
                </NavLink>
                <NavLink to="/products?brand=Sony" className="dropdown-item">
                  <Headphones size={14} /> Sony
                </NavLink>
              </div>
            </div>

            <NavLink to="/compare" className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}>
              Compare {compare.length > 0 && <span className="nav-count">{compare.length}</span>}
            </NavLink>
          </div>

          {/* ── Search ────────────────────────────────────────── */}
          <form onSubmit={handleSearch} className="navbar__search" role="search">
            <Search size={16} className="navbar__search-icon" />
            <input
              type="search"
              placeholder="Search electronics..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="Search products"
            />
            {searchQuery && (
              <button type="button" className="navbar__search-clear" onClick={() => setSearchQuery('')}>
                <X size={14} />
              </button>
            )}
          </form>

          {/* ── Right Icons ───────────────────────────────────── */}
          <div className="navbar__actions">
            {/* Points */}
            <div className="navbar__points" title={`${points} Electro Points`}>
              <Trophy size={15} />
              <span>{points}</span>
            </div>

            {/* Dark Mode */}
            <button className="navbar__icon-btn" onClick={toggleDarkMode} title="Toggle theme" aria-label="Toggle dark mode">
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Wishlist */}
            <NavLink to="/wishlist" className="navbar__icon-btn" aria-label="Wishlist">
              <Heart size={18} />
              {wishlist.length > 0 && <span className="navbar__badge">{wishlist.length}</span>}
            </NavLink>

            {/* Cart */}
            <button className="navbar__icon-btn navbar__cart-btn" onClick={() => setCartOpen(true)} aria-label="Open cart">
              <ShoppingBag size={18} />
              {cart.length > 0 && <span className="navbar__badge">{cart.length}</span>}
            </button>

            {/* User / Auth */}
            <div className="navbar__user" ref={userMenuRef}>
              {user ? (
                <>
                  <button
                    className="navbar__user-btn"
                    onClick={() => setShowUserMenu(v => !v)}
                    aria-expanded={showUserMenu}
                    aria-haspopup="true"
                  >
                    <div className="navbar__avatar">
                      {(user.user_metadata?.name || user.email || 'U')[0].toUpperCase()}
                    </div>
                    <ChevronDown size={13} className={showUserMenu ? 'rotate-180' : ''} />
                  </button>
                  {showUserMenu && (
                    <div className="navbar__user-menu">
                      <div className="user-menu__header">
                        <strong>{user.user_metadata?.name || user.email?.split('@')[0]}</strong>
                        <small>{user.email}</small>
                      </div>
                      <NavLink to="/profile" className="user-menu__item" onClick={() => setShowUserMenu(false)}>
                        <User size={15} /> Profile
                      </NavLink>
                      <NavLink to="/orders" className="user-menu__item" onClick={() => setShowUserMenu(false)}>
                        <Package size={15} /> Orders
                      </NavLink>
                      <button className="user-menu__item user-menu__item--danger" onClick={handleLogout}>
                        <X size={15} /> Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="navbar__auth-btns">
                  <NavLink to="/login" className="btn-ghost">Login</NavLink>
                  <NavLink to="/signup" className="btn-solid">Sign Up</NavLink>
                </div>
              )}
            </div>

            {/* Hamburger */}
            <button
              className={`navbar__hamburger ${isOpen ? 'is-open' : ''}`}
              onClick={() => setIsOpen(v => !v)}
              aria-label="Toggle mobile menu"
              aria-expanded={isOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Backdrop ──────────────────────────────────── */}
      {isOpen && (
        <div className="mobile-backdrop" onClick={closeMenu} aria-hidden="true" />
      )}

      {/* ── Mobile Drawer ────────────────────────────────────── */}
      <div className={`mobile-drawer ${isOpen ? 'mobile-drawer--open' : ''}`} role="dialog" aria-modal="true" aria-label="Navigation menu">
        {/* Header */}
        <div className="mobile-drawer__header">
          <NavLink to="/" className="navbar__logo" onClick={closeMenu}>
            <div className="navbar__logo-icon">
              <Zap size={18} />
            </div>
            <span className="navbar__logo-text">Lecman<em>Store</em></span>
          </NavLink>
          <button className="mobile-drawer__close" onClick={closeMenu} aria-label="Close menu">
            <X size={22} />
          </button>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="mobile-drawer__search" role="search">
          <Search size={16} />
          <input
            type="search"
            placeholder="Search electronics..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Nav Links */}
        <nav className="mobile-drawer__nav">
          <NavLink to="/" className="mobile-nav-link" onClick={closeMenu} end>Home</NavLink>
          <NavLink to="/products" className="mobile-nav-link" onClick={closeMenu}>Products</NavLink>
          <NavLink to="/shop-by-category" className="mobile-nav-link" onClick={closeMenu}>Categories</NavLink>
          <NavLink to="/compare" className="mobile-nav-link" onClick={closeMenu}>
            Compare {compare.length > 0 && <span className="nav-count">{compare.length}</span>}
          </NavLink>

          {/* Accordion 1 — Brands */}
          <AccordionSection
            id="brands"
            label="Brands"
            icon={<Star size={16} />}
            isOpen={activeAccordion === 'brands'}
            onToggle={() => toggleAccordion('brands')}
          >
            <NavLink to="/products?brand=Samsung" className="accordion-link" onClick={closeMenu}>
              <Smartphone size={14} /> Samsung
            </NavLink>
            <NavLink to="/products?brand=Panasonic" className="accordion-link" onClick={closeMenu}>
              <Zap size={14} /> Panasonic
            </NavLink>
            <NavLink to="/products?brand=Apple" className="accordion-link" onClick={closeMenu}>
              <Laptop size={14} /> Apple
            </NavLink>
            <NavLink to="/products?brand=Sony" className="accordion-link" onClick={closeMenu}>
              <Headphones size={14} /> Sony
            </NavLink>
          </AccordionSection>

          {/* Accordion 2 — Categories */}
          <AccordionSection
            id="categories"
            label="Categories"
            icon={<Gamepad2 size={16} />}
            isOpen={activeAccordion === 'categories'}
            onToggle={() => toggleAccordion('categories')}
          >
            <NavLink to="/products?category=Phones" className="accordion-link" onClick={closeMenu}>
              <Smartphone size={14} /> Phones
            </NavLink>
            <NavLink to="/products?category=Laptops" className="accordion-link" onClick={closeMenu}>
              <Laptop size={14} /> Laptops
            </NavLink>
            <NavLink to="/products?category=Audio" className="accordion-link" onClick={closeMenu}>
              <Headphones size={14} /> Audio
            </NavLink>
            <NavLink to="/products?category=Gaming" className="accordion-link" onClick={closeMenu}>
              <Gamepad2 size={14} /> Gaming
            </NavLink>
            <NavLink to="/products?category=Wearables" className="accordion-link" onClick={closeMenu}>
              <Watch size={14} /> Wearables
            </NavLink>
          </AccordionSection>

          {/* Accordion 3 — Pages */}
          <AccordionSection
            id="pages"
            label="Pages"
            icon={<Globe size={16} />}
            isOpen={activeAccordion === 'pages'}
            onToggle={() => toggleAccordion('pages')}
          >
            <NavLink to="/blog" className="accordion-link" onClick={closeMenu}>
              <FileText size={14} /> Blog
            </NavLink>
            <NavLink to="/marketing" className="accordion-link" onClick={closeMenu}>
              <Megaphone size={14} /> Marketing
            </NavLink>
            <NavLink to="/apps" className="accordion-link" onClick={closeMenu}>
              <AppWindow size={14} /> Apps &amp; Resources
            </NavLink>
            <NavLink to="/join" className="accordion-link" onClick={closeMenu}>
              <Rocket size={14} /> Join Our Journey
            </NavLink>
          </AccordionSection>
        </nav>

        {/* Footer: auth / user */}
        <div className="mobile-drawer__footer">
          {user ? (
            <div className="mobile-user">
              <div className="mobile-user__info">
                <div className="navbar__avatar navbar__avatar--lg">
                  {(user.user_metadata?.name || user.email || 'U')[0].toUpperCase()}
                </div>
                <div>
                  <strong>{user.user_metadata?.name || user.email?.split('@')[0]}</strong>
                  <small>{user.email}</small>
                </div>
              </div>
              <div className="mobile-user__actions">
                <NavLink to="/profile" className="mobile-action-link" onClick={closeMenu}>
                  <User size={15} /> Profile
                </NavLink>
                <NavLink to="/orders" className="mobile-action-link" onClick={closeMenu}>
                  <Package size={15} /> Orders
                </NavLink>
                <button className="mobile-action-link mobile-action-link--danger" onClick={handleLogout}>
                  <X size={15} /> Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="mobile-auth">
              <NavLink to="/login" className="mobile-btn-ghost" onClick={closeMenu}>Login</NavLink>
              <NavLink to="/signup" className="mobile-btn-solid" onClick={closeMenu}>Sign Up</NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
