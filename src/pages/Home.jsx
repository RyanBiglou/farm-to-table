import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Star, MapPin, Truck, Heart } from 'lucide-react';
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
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-preview">
        <div className="container">
          <motion.div 
            className="how-it-works-preview-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Simple & Fresh</span>
            <h2>How It Works</h2>
          </motion.div>

          <motion.div 
            className="features-grid"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="feature-card">
              <div className="feature-icon">
                <MapPin size={24} />
              </div>
              <h3>Truly Local</h3>
              <p>Every farm is within 25 miles. Know exactly where your food comes from.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Truck size={24} />
              </div>
              <h3>Fresh Delivery</h3>
              <p>From harvest to your door in 24 hours. Freshness you can taste.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Heart size={24} />
              </div>
              <h3>Support Farmers</h3>
              <p>100% of your purchase goes directly to local farming families.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Leaf size={24} />
              </div>
              <h3>Sustainable</h3>
              <p>Organic practices, less packaging, zero food waste commitment.</p>
            </div>
          </motion.div>

          <motion.div 
            className="how-it-works-preview-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p>
              Browse local farms, add fresh produce to your cart, and we deliver to your door within 24 hours. 
              Every purchase supports family farms in your community.
            </p>
            <Link to="/how-it-works" className="btn btn-outline">
              Learn More
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Farms Section */}
      <section className="section-farms">
        <div className="section-farms-bg"></div>
        <div className="container">
          <motion.div 
            className="section-header section-header-light"
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
            <Link to="/farms" className="btn btn-secondary">
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
                  <img src="/kaya.png" alt="Kaya Woo" />
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
                  <img src="/shannon.png" alt="Shannon Halberstadt" />
                </div>
                <div className="author-info">
                  <span className="author-name">Shannon Halberstadt</span>
                  <span className="author-title">Food Enthusiast</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
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

