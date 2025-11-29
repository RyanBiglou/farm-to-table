import { motion } from 'framer-motion';
import './Legal.css';

export default function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <div className="container">
        <motion.article 
          className="legal-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: November 2024</p>

          <section>
            <h2>Introduction</h2>
            <p>
              Farm To Table ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your 
              information when you use our website and services.
            </p>
          </section>

          <section>
            <h2>Information We Collect</h2>
            <p>We may collect personal information that you provide directly to us, including:</p>
            <ul>
              <li>Name and contact information (email address, phone number, shipping address)</li>
              <li>Account credentials (username and password)</li>
              <li>Payment information (processed securely through our payment providers)</li>
              <li>Order history and preferences</li>
            </ul>
          </section>

          <section>
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about orders, products, and promotions</li>
              <li>Improve our website and services</li>
              <li>Prevent fraud and ensure security</li>
            </ul>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              <strong>Email:</strong> hello@farmtotable.com<br />
              <strong>Phone:</strong> (555) 123-4567
            </p>
          </section>
        </motion.article>
      </div>
    </div>
  );
}

