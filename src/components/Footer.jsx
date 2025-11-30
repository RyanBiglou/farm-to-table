import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon">
                <Leaf size={20} />
              </div>
              <span>Farm<span className="logo-accent">To</span>Table</span>
            </Link>
            <p className="footer-tagline">
              Connecting you with local farmers who grow food with care. 
              Fresh from the field to your table.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Explore</h4>
              <Link to="/farms">Our Farms</Link>
              <Link to="/products">Shop Products</Link>
              <a href="#">How It Works</a>
              <a href="#">Become a Farm Partner</a>
            </div>

            <div className="footer-column">
              <h4>Support</h4>
              <a href="#">FAQs</a>
              <a href="#">Delivery Info</a>
              <a href="#">Returns Policy</a>
              <a href="#">Contact Us</a>
            </div>

            <div className="footer-column">
              <h4>Contact</h4>
              <a href="mailto:hello@farmtotable.com" className="contact-link">
                <Mail size={16} />
                ryan.biglou@farmtotable.com
              </a>
              <a href="tel:+15551234567" className="contact-link">
                <Phone size={16} />
                (949) 545-4326
              </a>
              <span className="contact-link">
                <MapPin size={16} />
                Orange County, California
              </span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Farm To Table. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

