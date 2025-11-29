import { motion } from 'framer-motion';
import './Legal.css';

export default function Terms() {
  return (
    <div className="legal-page">
      <div className="container">
        <motion.article 
          className="legal-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Terms of Service</h1>
          <p className="last-updated">Last updated: November 2024</p>

          <section>
            <h2>Agreement to Terms</h2>
            <p>
              By accessing or using Farm To Table's website and services, you agree to be bound 
              by these Terms of Service. If you do not agree to these terms, please do not use 
              our services.
            </p>
          </section>

          <section>
            <h2>Orders and Payments</h2>
            <p>
              All products are subject to availability. Prices are subject to change without notice.
              Payment is due at the time of purchase.
            </p>
          </section>

          <section>
            <h2>Returns and Refunds</h2>
            <p>
              Due to the perishable nature of our products, we handle returns on a case-by-case 
              basis. If you receive damaged or incorrect items, please contact us within 24 hours 
              of delivery.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              If you have questions about these Terms of Service, please contact us at:
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

