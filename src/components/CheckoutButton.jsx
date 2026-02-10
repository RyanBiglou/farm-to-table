import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { ArrowRight, Loader } from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

export default function CheckoutButton({ cart }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const stripe = await stripePromise;
      const items = (cart || []).map(item => ({ productId: item.id, quantity: item.quantity }));

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        const result = await stripe.redirectToCheckout({ sessionId: data.sessionId });
        if (result.error) {
          throw new Error(result.error.message);
        }
      }
      
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      className="btn btn-primary checkout-btn"
      onClick={handleCheckout}
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader size={18} className="spinner" />
          Processing...
        </>
      ) : (
        <>
          Proceed to Checkout
          <ArrowRight size={18} />
        </>
      )}
    </button>
  );
}

