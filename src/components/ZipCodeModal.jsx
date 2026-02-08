import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Check, AlertCircle, Leaf } from 'lucide-react';
import './ZipCodeModal.css';

// Valid delivery zip codes - customize this list for your delivery area
const VALID_ZIP_CODES = [
  // Example: Local area zip codes
  '10001', '10002', '10003', '10004', '10005', '10006', '10007', '10008', '10009', '10010',
  '10011', '10012', '10013', '10014', '10016', '10017', '10018', '10019', '10020', '10021',
  '10022', '10023', '10024', '10025', '10026', '10027', '10028', '10029', '10030', '10031',
  '10032', '10033', '10034', '10035', '10036', '10037', '10038', '10039', '10040', '10044',
  '10065', '10069', '10075', '10103', '10110', '10111', '10112', '10115', '10119', '10128',
  '10152', '10153', '10154', '10162', '10165', '10166', '10167', '10168', '10169', '10170',
  '10171', '10172', '10173', '10174', '10177', '10199', '10271', '10278', '10279', '10280',
  '10282', '10301', '10302', '10303', '10304', '10305', '10306', '10307', '10308', '10309',
  '10310', '10311', '10312', '10314', '10451', '10452', '10453', '10454', '10455', '10456',
  '10457', '10458', '10459', '10460', '10461', '10462', '10463', '10464', '10465', '10466',
  '10467', '10468', '10469', '10470', '10471', '10472', '10473', '10474', '10475', '11201',
  '11202', '11203', '11204', '11205', '11206', '11207', '11208', '11209', '11210', '11211',
  '11212', '11213', '11214', '11215', '11216', '11217', '11218', '11219', '11220', '11221',
  '11222', '11223', '11224', '11225', '11226', '11228', '11229', '11230', '11231', '11232',
  '11233', '11234', '11235', '11236', '11237', '11238', '11239', '11241', '11242', '11243',
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
              We're currently delivering to the greater metro area. 
              <br />
              Expanding soon!
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
