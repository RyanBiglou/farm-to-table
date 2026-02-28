import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Loader2, Leaf } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

/**
 * Handles the redirect from Supabase email confirmation links.
 * Supabase appends hash params (access_token, etc.) to the URL; the client
 * automatically exchanges them for a session. We show a brief success state
 * and redirect to account.
 */
export default function AuthCallback() {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();
  const [status, setStatus] = useState('verifying'); // verifying | success | error

  useEffect(() => {
    if (loading) return;

    if (isAuthenticated) {
      setStatus('success');
      const t = setTimeout(() => navigate('/account', { replace: true }), 2000);
      return () => clearTimeout(t);
    }

    // No session after loading - might be invalid/expired link
    const hasHash = window.location.hash?.length > 0;
    if (!hasHash) {
      setStatus('error');
    }
  }, [isAuthenticated, loading, navigate]);

  if (status === 'error') {
    return (
      <div className="auth-page">
        <motion.div
          className="auth-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="auth-header">
            <div className="auth-logo">
              <Leaf size={32} />
            </div>
            <h2>Invalid or Expired Link</h2>
            <p>This verification link may have expired. Please try signing in or request a new verification email.</p>
            <Link to="/login" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Go to Login
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <motion.div
        className="auth-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="auth-success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {status === 'success' ? (
            <>
              <div className="success-icon success">
                <Check size={32} />
              </div>
              <h2>Email Verified!</h2>
              <p>Your account is now active. Redirecting to your account...</p>
            </>
          ) : (
            <>
              <div className="auth-callback-spinner">
                <Loader2 size={40} />
              </div>
              <h2>Verifying your email...</h2>
              <p>Please wait while we confirm your account.</p>
            </>
          )}
        </motion.div>
      </motion.div>

      <div className="auth-decoration">
        <img
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
          alt="Farm field"
        />
        <div className="auth-decoration-overlay"></div>
      </div>
    </div>
  );
}
