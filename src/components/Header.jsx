import { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBasket, Menu, X, Leaf, User, LogOut, Settings, Package, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Header.css';

export default function Header() {
  const { cartCount } = useCart();
  const { user, profile, signOut, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <Leaf size={24} />
          </div>
          <span className="logo-text">
            Farm<span className="logo-accent">To</span>Table
          </span>
        </Link>

        <nav className="nav-desktop">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Home
          </NavLink>
          <NavLink to="/farms" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Our Farms
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Shop
          </NavLink>
        </nav>

        <div className="header-actions">
          <Link to="/cart" className="cart-button">
            <ShoppingBasket size={22} />
            {cartCount > 0 && (
              <motion.span 
                className="cart-count"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={cartCount}
              >
                {cartCount}
              </motion.span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="user-menu-wrapper" ref={userMenuRef}>
              <button 
                className="user-menu-trigger"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                aria-expanded={userMenuOpen}
              >
                <div className="user-avatar-small">
                  <User size={20} />
                </div>
                <ChevronDown size={16} className={`chevron ${userMenuOpen ? 'open' : ''}`} />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div 
                    className="user-dropdown"
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="dropdown-header">
                      <span className="dropdown-name">{profile?.full_name || 'Welcome!'}</span>
                      <span className="dropdown-email">{user?.email}</span>
                    </div>
                    <div className="dropdown-divider" />
                    <Link 
                      to="/account" 
                      className="dropdown-item"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User size={18} />
                      My Account
                    </Link>
                    <Link 
                      to="/account?tab=orders" 
                      className="dropdown-item"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Package size={18} />
                      Orders
                    </Link>
                    <Link 
                      to="/account?tab=settings" 
                      className="dropdown-item"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Settings size={18} />
                      Settings
                    </Link>
                    <div className="dropdown-divider" />
                    <button 
                      className="dropdown-item signout"
                      onClick={handleSignOut}
                    >
                      <LogOut size={18} />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/login" className="login-button">
              <User size={20} />
              <span>Sign In</span>
            </Link>
          )}

          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav 
            className="nav-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <NavLink 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Home
            </NavLink>
            <NavLink 
              to="/farms" 
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Our Farms
            </NavLink>
            <NavLink 
              to="/products" 
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Shop
            </NavLink>
            <div className="mobile-divider" />
            {isAuthenticated ? (
              <>
                <NavLink 
                  to="/account" 
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                  My Account
                </NavLink>
                <button 
                  className="nav-link signout-mobile"
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <NavLink 
                to="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                Sign In
              </NavLink>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

