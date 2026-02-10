import { useCallback, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { ArrowLeft, Loader } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Checkout.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

export default function Checkout() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { isAuthenticated } = useAuth();
  const [error, setError] = useState('');

  // Stripe calls this to get the client secret; API resolves prices server-side from product IDs
  const fetchClientSecret = useCallback(async () => {
    try {
      const items = cart.map(item => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const msg = data.error || `Checkout service error (${response.status})`;
        setError(msg);
        throw new Error(msg);
      }
      if (data.error) {
        setError(data.error);
        throw new Error(data.error);
      }
      if (!data.clientSecret) {
        setError('Invalid response from server');
        throw new Error('Invalid response from server');
      }

      return data.clientSecret;
    } catch (err) {
      if (err.message) setError(err.message);
      throw err;
    }
  }, [cart]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } }, { replace: true });
      return;
    }
    if (!cart.length) {
      navigate('/cart', { replace: true });
    }
  }, [isAuthenticated, cart.length, navigate]);

  if (!isAuthenticated || !cart.length) {
    return null;
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <Link to="/cart" className="checkout-back">
          <ArrowLeft size={18} />
          Back to cart
        </Link>

        <div className="checkout-header">
          <h1>Checkout</h1>
          <p>Complete your order below. You'll stay on this page to pay.</p>
        </div>

        {error ? (
          <div className="checkout-error">
            <p>{error}</p>
            <Link to="/cart" className="btn btn-primary">Return to cart</Link>
          </div>
        ) : (
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ fetchClientSecret }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        )}
      </div>
    </div>
  );
}
