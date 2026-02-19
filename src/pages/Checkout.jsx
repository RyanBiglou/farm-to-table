import { useCallback, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Checkout.css';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

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

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

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
      const msg =
        err?.name === 'AbortError'
          ? 'Checkout request timed out. Please try again.'
          : (err?.message || 'Checkout failed. Please try again.');
      setError(msg);
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

  if (!stripePublishableKey) {
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
          <div className="checkout-error">
            <p>Stripe is not configured. Missing <code>VITE_STRIPE_PUBLISHABLE_KEY</code>.</p>
            <Link to="/cart" className="btn btn-primary">Return to cart</Link>
          </div>
        </div>
      </div>
    );
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
