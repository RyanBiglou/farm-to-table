import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, Heart, Leaf, Star, MapPin } from 'lucide-react';
import { useFarms, useProducts } from '../hooks/useData';
import ProductCard from '../components/ProductCard';
import FarmCard from '../components/FarmCard';
import './Home.css';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const { farms } = useFarms();
  const { products } = useProducts();
  
  const featuredFarms = farms.slice(0, 3);
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-gradient"></div>
          <div className="hero-pattern"></div>
        </div>
        
        <div className="hero-content container">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="hero-badge">
              <Leaf size={16} />
              Farm Fresh, Locally Sourced
            </span>
            <h1>From Local Farms<br />to Your Table</h1>
            <p>
              Discover the finest produce from farmers who pour their hearts into every harvest. 
              Fresh, sustainable, and just miles away.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary">
                Shop Now
                <ArrowRight size={18} />
              </Link>
              <Link to="/farms" className="btn btn-outline">
                Meet Our Farmers
              </Link>
            </div>
          </motion.div>

          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="hero-image-stack">
              <div className="hero-image hero-image-1">
                <img 
                  src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80" 
                  alt="Fresh vegetables"
                />
              </div>
              <div className="hero-image hero-image-2">
                <img 
                  src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80" 
                  alt="Farm field"
                />
              </div>
              <div className="hero-image hero-image-3">
                <img 
                  src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80" 
                  alt="Farmer working"
                />
              </div>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">24+</span>
                <span className="stat-label">Local Farms</span>
              </div>
              <div className="stat">
                <span className="stat-number">200+</span>
                <span className="stat-label">Fresh Products</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="hero-wave">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="var(--cream)"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <motion.div 
            className="features-grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div className="feature-card" variants={fadeInUp}>
              <div className="feature-icon">
                <MapPin size={28} />
              </div>
              <h3>Truly Local</h3>
              <p>Every farm is within 25 miles. Know exactly where your food comes from.</p>
            </motion.div>

            <motion.div className="feature-card" variants={fadeInUp}>
              <div className="feature-icon">
                <Truck size={28} />
              </div>
              <h3>Fresh Delivery</h3>
              <p>From harvest to your door in 24 hours. Freshness you can taste.</p>
            </motion.div>

            <motion.div className="feature-card" variants={fadeInUp}>
              <div className="feature-icon">
                <Heart size={28} />
              </div>
              <h3>Support Farmers</h3>
              <p>100% of your purchase goes directly to local farming families.</p>
            </motion.div>

            <motion.div className="feature-card" variants={fadeInUp}>
              <div className="feature-icon">
                <Leaf size={28} />
              </div>
              <h3>Sustainable</h3>
              <p>Organic practices, less packaging, zero food waste commitment.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Farms Section */}
      <section className="section-farms">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Meet the Growers</span>
            <h2>Featured Farms</h2>
            <p>Family farms with generations of expertise, growing with love and care.</p>
          </motion.div>

          <motion.div 
            className="farms-grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {featuredFarms.map((farm, index) => (
              <motion.div key={farm.id} variants={fadeInUp}>
                <FarmCard farm={farm} />
              </motion.div>
            ))}
          </motion.div>

          <div className="section-action">
            <Link to="/farms" className="btn btn-outline">
              View All Farms
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section-products">
        <div className="section-products-bg"></div>
        <div className="container">
          <motion.div 
            className="section-header section-header-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Fresh Picks</span>
            <h2>Seasonal Favorites</h2>
            <p>Hand-selected produce at the peak of freshness.</p>
          </motion.div>

          <motion.div 
            className="products-grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {featuredProducts.map((product, index) => (
              <motion.div key={product.id} variants={fadeInUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

          <div className="section-action">
            <Link to="/products" className="btn btn-secondary">
              Shop All Products
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <div className="container">
          <div className="testimonial-grid">
            <motion.div 
              className="testimonial"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={24} fill="var(--golden)" stroke="var(--golden)" />
                ))}
              </div>
              <blockquote>
                "The quality is unmatched. I can taste the difference in every bite. 
                My kids now actually <em>ask</em> for vegetables! Plus, knowing I'm supporting 
                local families makes every meal feel special."
              </blockquote>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" alt="" />
                </div>
                <div className="author-info">
                  <span className="author-name">Kaya Woo</span>
                  <span className="author-title">Home Chef</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="testimonial"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={24} fill="var(--golden)" stroke="var(--golden)" />
                ))}
              </div>
              <blockquote>
                "I love knowing exactly where my food comes from. The freshness is incredible — 
                you can really <em>tell</em> the difference. It's like having a farmer's market 
                delivered right to my door every week."
              </blockquote>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="" />
                </div>
                <div className="author-info">
                  <span className="author-name">James Carter</span>
                  <span className="author-title">Food Enthusiast</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-bg">
          <img 
            src="https://images.unsplash.com/photo-1500076656116-558758c991c1?w=1600&q=80" 
            alt=""
          />
        </div>
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Ready to Taste the Difference?</h2>
            <p>
              Join thousands of families who've made the switch to local. 
              Your first delivery is on us.
            </p>
            <Link to="/products" className="btn btn-primary">
              Start Shopping
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

