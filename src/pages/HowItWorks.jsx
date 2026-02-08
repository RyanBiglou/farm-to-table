import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, ShoppingCart, Truck, Smile, 
  Leaf, Clock, Heart, Shield,
  ArrowRight, CheckCircle
} from 'lucide-react';
import './HowItWorks.css';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const steps = [
  {
    icon: Search,
    title: 'Browse & Discover',
    description: 'Explore our curated selection of fresh produce, dairy, meats, and artisan goods from local farms within 25 miles of you.',
    details: [
      'Filter by category, farm, or dietary preferences',
      'Read about each farm and their practices',
      'See what\'s fresh and in season'
    ]
  },
  {
    icon: ShoppingCart,
    title: 'Fill Your Cart',
    description: 'Add your favorite items to your cart. No subscriptions required—order what you want, when you want.',
    details: [
      'No minimum order required',
      'Mix items from multiple farms',
      'Save favorites for quick reordering'
    ]
  },
  {
    icon: Truck,
    title: 'We Deliver Fresh',
    description: 'Our farmers harvest your order and we deliver it straight to your door within 24 hours of picking.',
    details: [
      'Same-week delivery available',
      'Eco-friendly packaging',
      'Real-time delivery tracking'
    ]
  },
  {
    icon: Smile,
    title: 'Enjoy & Repeat',
    description: 'Taste the difference of truly fresh, locally grown food. Your purchase directly supports family farms.',
    details: [
      '100% satisfaction guaranteed',
      'Rate and review products',
      'Share recipes with our community'
    ]
  }
];

const benefits = [
  {
    icon: Leaf,
    title: 'Farm Fresh',
    description: 'Harvested within 24 hours of delivery'
  },
  {
    icon: Clock,
    title: 'Save Time',
    description: 'Skip the farmers market crowds'
  },
  {
    icon: Heart,
    title: 'Support Local',
    description: 'Money goes directly to farmers'
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: '100% satisfaction or money back'
  }
];

export default function HowItWorks() {
  return (
    <div className="how-it-works-page">
      {/* Hero Section */}
      <section className="hiw-hero">
        <div className="container">
          <motion.div
            className="hiw-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="hiw-badge">
              <Leaf size={16} />
              Simple & Fresh
            </span>
            <h1>How FarmToTable Works</h1>
            <p>
              Getting fresh, local produce delivered to your door has never been easier. 
              Here's how we connect you directly with local farmers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="hiw-steps">
        <div className="container">
          <motion.div
            className="steps-grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {steps.map((step, index) => (
              <motion.div 
                key={step.title} 
                className="step-card"
                variants={fadeInUp}
              >
                <div className="step-number">{index + 1}</div>
                <div className="step-icon">
                  <step.icon size={32} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <ul className="step-details">
                  {step.details.map((detail, i) => (
                    <li key={i}>
                      <CheckCircle size={16} />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="hiw-benefits">
        <div className="container">
          <motion.div
            className="benefits-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Why Choose FarmToTable?</h2>
            <p>We're not just another grocery delivery service.</p>
          </motion.div>

          <motion.div
            className="benefits-grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {benefits.map((benefit) => (
              <motion.div 
                key={benefit.title} 
                className="benefit-card"
                variants={fadeInUp}
              >
                <div className="benefit-icon">
                  <benefit.icon size={28} />
                </div>
                <h4>{benefit.title}</h4>
                <p>{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="hiw-faq">
        <div className="container">
          <motion.div
            className="faq-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Common Questions</h2>
            
            <div className="faq-grid">
              <div className="faq-item">
                <h4>What areas do you deliver to?</h4>
                <p>We currently deliver to the greater Orange County area. Enter your zip code on our site to confirm we deliver to you.</p>
              </div>
              <div className="faq-item">
                <h4>How fresh is the produce?</h4>
                <p>Most items are harvested within 24 hours of delivery. We work directly with farmers to ensure peak freshness.</p>
              </div>
              <div className="faq-item">
                <h4>Is there a minimum order?</h4>
                <p>No minimum order required! Order as much or as little as you'd like.</p>
              </div>
              <div className="faq-item">
                <h4>How do I become a farm partner?</h4>
                <p>We're always looking for local farms to partner with. Visit our Farm Partner page to apply.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hiw-cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of families enjoying farm-fresh food delivered to their door.</p>
            <div className="cta-buttons">
              <Link to="/products" className="btn btn-primary">
                Start Shopping
                <ArrowRight size={18} />
              </Link>
              <Link to="/farms" className="btn btn-outline">
                Meet Our Farmers
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
