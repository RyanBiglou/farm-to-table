import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';
import './CheckoutSuccess.css';

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();

  // Clear the cart and save order to database after successful checkout
  useEffect(() => {
    if (!sessionId) return;
    clearCart();

    const saveOrder = async () => {
      if (!supabase) return;
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) return;

      try {
        const base = import.meta.env.VITE_API_BASE || '';
        await fetch(`${base}/api/create-order-from-session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ session_id: sessionId }),
        });
      } catch (err) {
        console.warn('Could not save order:', err);
      }
    };
    saveOrder();
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

