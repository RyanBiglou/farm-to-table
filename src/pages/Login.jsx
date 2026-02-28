import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Leaf, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signInWithGoogle, resetPassword, resendVerificationEmail, isAuthenticated } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [emailNotConfirmed, setEmailNotConfirmed] = useState(false);
  const [resendSent, setResendSent] = useState(false);

  const from = location.state?.from?.pathname || '/';

  // If already authenticated, redirect away from login
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, from, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setEmailNotConfirmed(false);
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      const isEmailNotConfirmed = error.message?.toLowerCase().includes('email not confirmed') ||
        error.message?.toLowerCase().includes('email_not_confirmed');
      if (isEmailNotConfirmed) {
        setEmailNotConfirmed(true);
        setError('Please verify your email before signing in. Check your inbox for the confirmation link.');
      } else {
        setError(error.message);
      }
      setLoading(false);
    } else {
      // Navigate immediately; the useEffect above is a safety net
      // in case this fires before auth state updates
      navigate(from, { replace: true });
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    const { error } = await signInWithGoogle();
    if (error) setError(error.message);
  };

  const handleResendVerification = async () => {
    if (!email) return;
    setError('');
    setResendSent(false);
    const { error } = await resendVerificationEmail(email);
    if (error) {
      setError(error.message);
    } else {
      setResendSent(true);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await resetPassword(email);

    if (error) {
      setError(error.message);
    } else {
      setResetSent(true);
    }
    setLoading(false);
  };

  if (showResetForm) {
    return (
      <div className="auth-page">
        <motion.div
          className="auth-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-header">
            <div className="auth-logo">
              <Leaf size={32} />
            </div>
            <h1>Reset Password</h1>
            <p>Enter your email and we'll send you a reset link</p>
          </div>

          {resetSent ? (
            <motion.div 
              className="auth-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="success-icon">
                <Mail size={32} />
              </div>
              <h3>Check Your Email</h3>
              <p>We've sent a password reset link to <strong>{email}</strong></p>
              <button 
                className="btn btn-outline"
                onClick={() => {
                  setShowResetForm(false);
                  setResetSent(false);
                }}
              >
                Back to Login
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleResetPassword} className="auth-form">
              {error && (
                <motion.div 
                  className="auth-error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={18} />
                  {error}
                </motion.div>
              )}

              <div className="form-group">
                <label htmlFor="reset-email">Email Address</label>
                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary auth-submit"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>

              <button 
                type="button"
                className="auth-link-btn"
                onClick={() => setShowResetForm(false)}
              >
                Back to Login
              </button>
            </form>
          )}
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
        transition={{ duration: 0.5 }}
      >
        <div className="auth-header">
          <div className="auth-logo">
            <Leaf size={32} />
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to your FarmToTable account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <motion.div 
              className="auth-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle size={18} />
              {error}
              {emailNotConfirmed && (
                <div className="auth-resend-verification">
                  <button
                    type="button"
                    className="auth-link-btn"
                    onClick={handleResendVerification}
                    disabled={resendSent}
                  >
                    {resendSent ? 'Verification email sent! Check your inbox.' : 'Resend verification email'}
                  </button>
                </div>
              )}
            </motion.div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="label-row">
              <label htmlFor="password">Password</label>
              <button 
                type="button"
                className="forgot-link"
                onClick={() => setShowResetForm(true)}
              >
                Forgot password?
              </button>
            </div>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary auth-submit"
            disabled={loading}
          >
            {loading ? 'Signing in...' : (
              <>
                Sign In
                <ArrowRight size={18} />
              </>
            )}
          </button>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <button
            type="button"
            className="btn btn-google auth-submit"
            onClick={handleGoogleSignIn}
          >
            <svg className="google-icon" width="20" height="20" viewBox="0 0 24 24" aria-hidden>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/signup">Create one</Link></p>
        </div>
      </motion.div>

      <div className="auth-decoration">
        <img 
          src="https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&q=80" 
          alt="Fresh produce"
        />
        <div className="auth-decoration-overlay"></div>
        <div className="auth-decoration-content">
          <h2>Farm Fresh Goodness</h2>
          <p>Join thousands of families enjoying locally sourced produce delivered to their door.</p>
        </div>
      </div>
    </div>
  );
}
