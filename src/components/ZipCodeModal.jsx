import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Check, AlertCircle, Leaf } from 'lucide-react';
import './ZipCodeModal.css';

// Valid delivery zip codes - Orange County, California
const VALID_ZIP_CODES = [
  // Anaheim
  '92801', '92802', '92803', '92804', '92805', '92806', '92807', '92808', '92809', '92812', '92814', '92815', '92816', '92817', '92825', '92850', '92899',
  // Santa Ana
  '92701', '92702', '92703', '92704', '92705', '92706', '92707', '92708', '92711', '92712', '92728', '92735', '92799',
  // Irvine
  '92602', '92603', '92604', '92606', '92612', '92614', '92616', '92617', '92618', '92619', '92620', '92623', '92697',
  // Huntington Beach
  '92605', '92615', '92646', '92647', '92648', '92649',
  // Costa Mesa
  '92626', '92627', '92628',
  // Newport Beach
  '92625', '92657', '92658', '92659', '92660', '92661', '92662', '92663',
  // Orange
  '92856', '92857', '92859', '92861', '92862', '92863', '92864', '92865', '92866', '92867', '92868', '92869',
  // Fullerton
  '92831', '92832', '92833', '92834', '92835', '92836', '92837', '92838',
  // Garden Grove
  '92840', '92841', '92842', '92843', '92844', '92845', '92846',
  // Westminster
  '92683', '92684', '92685',
  // Fountain Valley
  '92708', '92728',
  // Lake Forest
  '92609', '92610', '92630',
  // Mission Viejo
  '92675', '92690', '92691', '92692', '92694',
  // Laguna Beach
  '92651', '92652', '92653', '92654', '92677',
  // Laguna Hills
  '92637', '92653', '92654', '92656',
  // Laguna Niguel
  '92607', '92677',
  // San Clemente
  '92672', '92673', '92674',
  // San Juan Capistrano
  '92675', '92693',
  // Dana Point
  '92624', '92629',
  // Cypress
  '90630',
  // Buena Park
  '90620', '90621', '90622', '90623', '90624',
  // La Habra
  '90631', '90632', '90633',
  // Placentia
  '92870', '92871',
  // Yorba Linda
  '92885', '92886', '92887',
  // Brea
  '92821', '92822', '92823',
  // Tustin
  '92780', '92781', '92782',
  // Stanton
  '90680',
  // Los Alamitos
  '90720', '90721',
  // Seal Beach
  '90740',
  // Aliso Viejo
  '92656',
  // Rancho Santa Margarita
  '92688', '92694',
  // Ladera Ranch
  '92694',
  // Coto de Caza
  '92679',
  // Trabuco Canyon
  '92678', '92679',
  // Villa Park
  '92861',
  // Anaheim Hills
  '92807', '92808',
];

const STORAGE_KEY = 'farmtotable_zip_verified';
const ZIP_STORAGE_KEY = 'farmtotable_user_zip';

export default function ZipCodeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [zipCode, setZipCode] = useState('');
  const [email, setEmail] = useState('');
  const [wantsUpdates, setWantsUpdates] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, success, error
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Check if user has already verified their zip code
    const isVerified = localStorage.getItem(STORAGE_KEY);
    if (!isVerified) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const validateZipCode = (zip) => {
    // Basic US zip code format validation
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zip);
  };

  const isInDeliveryArea = (zip) => {
    // Extract first 5 digits if zip+4 format
    const fiveDigitZip = zip.substring(0, 5);
    return VALID_ZIP_CODES.includes(fiveDigitZip);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateZipCode(zipCode)) {
      setStatus('error');
      setErrorMessage('Please enter a valid zip code');
      return;
    }

    if (isInDeliveryArea(zipCode)) {
      setStatus('success');
      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, 'true');
      localStorage.setItem(ZIP_STORAGE_KEY, zipCode);
      
      // If user wants updates and provided email, you could send to your backend here
      if (wantsUpdates && email) {
        console.log('Newsletter signup:', email);
        // TODO: Send to your newsletter service
      }

      // Close modal after short delay to show success state
      setTimeout(() => {
        setIsOpen(false);
      }, 1500);
    } else {
      setStatus('error');
      setErrorMessage("Sorry, we don't deliver to your area yet. Enter your email and we'll notify you when we expand!");
    }
  };

  const handleClose = () => {
    // Allow closing but remind them they need to verify
    setIsOpen(false);
  };

  const handleZipChange = (e) => {
    const value = e.target.value.replace(/[^\d-]/g, '');
    if (value.length <= 10) {
      setZipCode(value);
      if (status === 'error') {
        setStatus('idle');
        setErrorMessage('');
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="zip-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="zip-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="zip-modal-close" onClick={handleClose} aria-label="Close">
              <X size={20} />
            </button>

            <div className="zip-modal-header">
              <div className="zip-modal-icon">
                <Leaf size={32} />
              </div>
              <h2>Welcome to FarmToTable</h2>
              <p>Let's confirm we deliver to your area!</p>
            </div>

            <form onSubmit={handleSubmit} className="zip-modal-form">
              <div className={`zip-input-wrapper ${status}`}>
                <MapPin size={20} className="zip-input-icon" />
                <input
                  type="text"
                  placeholder="Enter your zip code"
                  value={zipCode}
                  onChange={handleZipChange}
                  className="zip-input"
                  autoFocus
                  disabled={status === 'success'}
                />
                {status === 'success' && (
                  <motion.div
                    className="zip-status-icon success"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <Check size={20} />
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    className="zip-status-icon error"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <AlertCircle size={20} />
                  </motion.div>
                )}
              </div>

              {status === 'success' && (
                <motion.p
                  className="zip-success-message"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Great news! We deliver to your area.
                </motion.p>
              )}

              {errorMessage && (
                <motion.p
                  className="zip-error-message"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errorMessage}
                </motion.p>
              )}

              <div className="zip-email-section">
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="zip-email-input"
                  disabled={status === 'success'}
                />
                <label className="zip-checkbox-label">
                  <input
                    type="checkbox"
                    checked={wantsUpdates}
                    onChange={(e) => setWantsUpdates(e.target.checked)}
                    disabled={status === 'success'}
                  />
                  <span className="zip-checkbox-custom"></span>
                  <span>Sign me up for fresh updates & exclusive offers</span>
                </label>
              </div>

              <button
                type="submit"
                className={`btn btn-primary zip-submit-btn ${status === 'success' ? 'success' : ''}`}
                disabled={status === 'success'}
              >
                {status === 'success' ? (
                  <>
                    <Check size={18} />
                    You're all set!
                  </>
                ) : (
                  'Continue to Shop'
                )}
              </button>
            </form>

            <p className="zip-modal-footer">
              We deliver throughout Orange County, California.
              <br />
              More areas coming soon!
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
