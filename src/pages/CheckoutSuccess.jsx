import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './CheckoutSuccess.css';

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();

  // Clear the cart after successful checkout
  useEffect(() => {
    if (sessionId) {
      clearCart();
    }
  }, [sessionId, clearCart]);

  return (
    <div className="success-page">
      <div className="container">
        <motion.div 
          className="success-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="success-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle size={64} />
          </motion.div>
          
          <h1>Order Confirmed!</h1>
          <p className="success-message">
            Thank you for supporting local farmers! Your order has been received 
            and is being prepared with care.
          </p>

          <div className="order-info">
            <div className="info-item">
              <Package size={24} />
              <div>
                <strong>What's Next?</strong>
                <span>You'll receive an email confirmation with your order details and estimated delivery time.</span>
              </div>
            </div>
          </div>

          <div className="success-actions">
            <Link to="/products" className="btn btn-primary">
              Continue Shopping
              <ArrowRight size={18} />
            </Link>
            <Link to="/" className="btn btn-outline">
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

