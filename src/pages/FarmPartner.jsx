import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Leaf, TrendingUp, Users, Truck, 
  CheckCircle, Send, MapPin, Mail, Phone,
  DollarSign, Calendar, Shield
} from 'lucide-react';
import './FarmPartner.css';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const benefits = [
  {
    icon: DollarSign,
    title: 'Better Margins',
    description: 'Sell directly to consumers and keep more of what you earn. No middlemen taking a cut.'
  },
  {
    icon: Users,
    title: 'New Customers',
    description: 'Reach thousands of local families actively looking for fresh, local produce.'
  },
  {
    icon: Calendar,
    title: 'Flexible Schedule',
    description: 'You control your inventory and availability. Sell what you have, when you have it.'
  },
  {
    icon: Truck,
    title: 'We Handle Delivery',
    description: 'Focus on farming—we take care of logistics, delivery, and customer service.'
  },
  {
    icon: TrendingUp,
    title: 'Grow Your Brand',
    description: 'Build direct relationships with customers who value knowing their farmer.'
  },
  {
    icon: Shield,
    title: 'Guaranteed Payment',
    description: 'Get paid weekly with transparent reporting. No chasing invoices.'
  }
];

const requirements = [
  'Located within 50 miles of Orange County, CA',
  'Commitment to sustainable farming practices',
  'Ability to provide consistent product quality',
  'Valid business license and food safety certifications',
  'Capacity to fulfill orders on a weekly basis'
];

export default function FarmPartner() {
  const [formData, setFormData] = useState({
    farmName: '',
    contactName: '',
    email: '',
    phone: '',
    location: '',
    products: '',
    farmSize: '',
    certifications: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="farm-partner-page">
      {/* Hero Section */}
      <section className="fp-hero">
        <div className="container">
          <motion.div
            className="fp-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="fp-badge">
              <Leaf size={16} />
              Partner With Us
            </span>
            <h1>Become a Farm Partner</h1>
            <p>
              Join our network of local farmers and connect directly with customers 
              who value fresh, sustainably grown food. We handle the logistics—you 
              focus on what you do best.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="fp-benefits">
        <div className="container">
          <motion.div
            className="benefits-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Why Partner With FarmToTable?</h2>
            <p>We're building a better food system—together.</p>
          </motion.div>

          <motion.div
            className="benefits-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={benefit.title} 
                className="benefit-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="benefit-icon">
                  <benefit.icon size={28} />
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="fp-process">
        <div className="container">
          <motion.div
            className="process-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>How It Works</h2>
            
            <div className="process-steps">
              <div className="process-step">
                <div className="step-num">1</div>
                <h4>Apply</h4>
                <p>Fill out the form below with details about your farm and products.</p>
              </div>
              <div className="process-connector"></div>
              <div className="process-step">
                <div className="step-num">2</div>
                <h4>Review</h4>
                <p>Our team will review your application and schedule a call.</p>
              </div>
              <div className="process-connector"></div>
              <div className="process-step">
                <div className="step-num">3</div>
                <h4>Onboard</h4>
                <p>We'll visit your farm, set up your profile, and get you started.</p>
              </div>
              <div className="process-connector"></div>
              <div className="process-step">
                <div className="step-num">4</div>
                <h4>Sell</h4>
                <p>List your products and start reaching new customers!</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Form */}
      <section className="fp-form-section">
        <div className="container">
          <div className="form-layout">
            <motion.div
              className="form-info"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>Apply Now</h2>
              <p>
                Ready to grow your business? Fill out the form and our partnerships 
                team will be in touch within 2-3 business days.
              </p>

              <div className="requirements">
                <h4>Requirements</h4>
                <ul>
                  {requirements.map((req, index) => (
                    <li key={index}>
                      <CheckCircle size={18} />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="contact-info">
                <h4>Questions?</h4>
                <a href="mailto:partners@farmtotable.com">
                  <Mail size={18} />
                  partners@farmtotable.com
                </a>
                <a href="tel:+19495454326">
                  <Phone size={18} />
                  (949) 545-4326
                </a>
              </div>
            </motion.div>

            <motion.div
              className="form-container"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {submitted ? (
                <div className="form-success">
                  <div className="success-icon">
                    <CheckCircle size={48} />
                  </div>
                  <h3>Application Received!</h3>
                  <p>
                    Thank you for your interest in partnering with FarmToTable. 
                    Our team will review your application and contact you within 
                    2-3 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="partner-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="farmName">Farm Name *</label>
                      <input
                        type="text"
                        id="farmName"
                        name="farmName"
                        value={formData.farmName}
                        onChange={handleChange}
                        required
                        placeholder="Sunny Acres Farm"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="contactName">Contact Name *</label>
                      <input
                        type="text"
                        id="contactName"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        required
                        placeholder="John Smith"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@sunnyacres.com"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="location">Farm Location *</label>
                    <div className="input-with-icon">
                      <MapPin size={18} />
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        placeholder="City, State"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="products">What do you grow/produce? *</label>
                    <textarea
                      id="products"
                      name="products"
                      value={formData.products}
                      onChange={handleChange}
                      required
                      rows={3}
                      placeholder="E.g., Heirloom tomatoes, mixed greens, free-range eggs, raw honey..."
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="farmSize">Farm Size</label>
                      <select
                        id="farmSize"
                        name="farmSize"
                        value={formData.farmSize}
                        onChange={handleChange}
                      >
                        <option value="">Select size</option>
                        <option value="under-5">Under 5 acres</option>
                        <option value="5-20">5-20 acres</option>
                        <option value="20-50">20-50 acres</option>
                        <option value="50-100">50-100 acres</option>
                        <option value="over-100">Over 100 acres</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="certifications">Certifications</label>
                      <input
                        type="text"
                        id="certifications"
                        name="certifications"
                        value={formData.certifications}
                        onChange={handleChange}
                        placeholder="Organic, Non-GMO, etc."
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Anything else you'd like us to know?</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about your farm's story, practices, or goals..."
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary submit-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      'Submitting...'
                    ) : (
                      <>
                        Submit Application
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
