import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Calendar, Award, ArrowLeft, Loader } from 'lucide-react';
import { useFarm, useFarmProducts } from '../hooks/useData';
import ProductCard from '../components/ProductCard';
import './FarmDetail.css';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

export default function FarmDetail() {
  const { id } = useParams();
  const { farm, loading: farmLoading } = useFarm(id);
  const { products, loading: productsLoading } = useFarmProducts(id);

  if (farmLoading) {
    return (
      <div className="loading-page">
        <Loader size={32} className="spinner" />
        <p>Loading farm...</p>
      </div>
    );
  }

  if (!farm) {
    return (
      <div className="farm-not-found">
        <div className="container">
          <h1>Farm not found</h1>
          <Link to="/farms" className="btn btn-primary">
            <ArrowLeft size={18} />
            Back to Farms
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="farm-detail">
      {/* Hero Section */}
      <section className="farm-hero">
        <div className="farm-hero-bg">
          <img src={farm.coverImage} alt={farm.name} />
          <div className="farm-hero-overlay"></div>
        </div>
        
        <div className="container">
          <motion.div 
            className="farm-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/farms" className="back-link">
              <ArrowLeft size={18} />
              All Farms
            </Link>
            
            <h1>{farm.name}</h1>
            <p className="farm-owner-hero">by {farm.owner}</p>
            
            <div className="farm-hero-meta">
              <span className="meta-item">
                <Star size={18} fill="var(--golden)" stroke="var(--golden)" />
                <strong>{farm.rating}</strong> ({farm.reviewCount} reviews)
              </span>
              <span className="meta-item">
                <MapPin size={18} />
                {farm.location}
              </span>
              <span className="meta-item">
                <Calendar size={18} />
                Est. {farm.established}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="farm-about">
        <div className="container">
          <div className="about-grid">
            <motion.div 
              className="about-content"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2>Our Story</h2>
              <p>{farm.description}</p>
              
              <div className="specialties-section">
                <h3>What We Grow</h3>
                <div className="specialties-list">
                  {farm.specialties.map(specialty => (
                    <span key={specialty} className="specialty-tag-large">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="about-sidebar"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="sidebar-card">
                <h3>
                  <Award size={20} />
                  Certifications
                </h3>
                <ul className="cert-list">
                  {farm.certifications.map(cert => (
                    <li key={cert}>{cert}</li>
                  ))}
                </ul>
              </div>

              <div className="sidebar-card">
                <h3>Sustainable Practices</h3>
                <ul className="practices-list">
                  {farm.practices.map(practice => (
                    <li key={practice}>{practice}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="farm-products">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Fresh from {farm.name}</h2>
            <p>Browse and order directly from this farm</p>
          </motion.div>

          <motion.div 
            className="products-grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {products.map((product) => (
              <motion.div key={product.id} variants={fadeInUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

          {products.length === 0 && (
            <div className="no-products">
              <p>No products currently available from this farm.</p>
              <Link to="/products" className="btn btn-outline">
                Browse All Products
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

