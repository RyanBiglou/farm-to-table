import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { ArrowRight, Loader } from 'lucide-react';
import { farms } from '../data/farms';

// TEST KEY - Replace with your test publishable key from Stripe Dashboard
// Go to: https://dashboard.stripe.com/test/apikeys
const stripePromise = loadStripe('pk_test_51SYuPCCmSjkcRVmD6IHoUvZzp8HOeYYzqbohqjPwqRMbxpBMxmzhfl4E9B3zQcZ0Lj2vMAxKKcXAYbxFRGEW8cBQ00aZfiOeSU');

export default function CheckoutButton({ cart, cartTotal }) {
  const [loading, setLoading] = useState(false);

  const getFarmName = (farmId) => {
    const farm = farms.find(f => f.id === farmId);
    return farm?.name || 'Local Farm';
  };

  const handleCheckout = async () => {
    setLoading(true);
    
    try {
      const stripe = await stripePromise;
      
      // Prepare items for the API
      const items = cart.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        farmName: getFarmName(item.farmId)
      }));

      // Call your Vercel serverless function
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

