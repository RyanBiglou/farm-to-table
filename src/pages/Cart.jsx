import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBasket, ArrowLeft, ArrowRight, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { farms } from '../data/farms';
import './Cart.css';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="container">
          <motion.div 
            className="empty-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="empty-icon">
              <ShoppingBasket size={64} />
            </div>
            <h1>Your cart is empty</h1>
            <p>Looks like you haven't added any farm-fresh goodness yet!</p>
            <Link to="/products" className="btn btn-primary">
              Start Shopping
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const getFarmName = (farmId) => {
    const farm = farms.find(f => f.id === farmId);
    return farm?.name || 'Local Farm';
  };

  return (
    <div className="cart-page">
      <div className="container">
        <motion.div 
          className="cart-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/products" className="back-link">
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>
          <h1>Your Cart</h1>
          <p>{cart.length} {cart.length === 1 ? 'item' : 'items'} from local farms</p>
        </motion.div>

        <div className="cart-layout">
          <motion.div 
            className="cart-items"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  className="cart-item"
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className="item-details">
                    <span className="item-farm">{getFarmName(item.farmId)}</span>
                    <h3 className="item-name">{item.name}</h3>
                    <span className="item-unit">${item.price.toFixed(2)} / {item.unit}</span>
                  </div>
                  
                  <div className="item-quantity">
                    <button 
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  
                  <button 
                    className="item-remove"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            className="cart-summary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="summary-card">
              <h2>Order Summary</h2>
              
              <div className="summary-rows">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery</span>
                  <span className="free">FREE</span>
                </div>
                <div className="summary-row">
                  <span>Estimated Tax</span>
                  <span>${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="summary-total">
                <span>Total</span>
                <span>${(cartTotal * 1.08).toFixed(2)}</span>
              </div>
              
              <button className="btn btn-primary checkout-btn">
                Proceed to Checkout
                <ArrowRight size={18} />
              </button>
              
              <button className="clear-cart" onClick={clearCart}>
                Clear Cart
              </button>
            </div>

            <div className="summary-features">
              <div className="feature">
                <Truck size={20} />
                <div>
                  <strong>Free Delivery</strong>
                  <span>On orders over $35</span>
                </div>
              </div>
              <div className="feature">
                <ShieldCheck size={20} />
                <div>
                  <strong>Freshness Guarantee</strong>
                  <span>100% satisfaction or refund</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

