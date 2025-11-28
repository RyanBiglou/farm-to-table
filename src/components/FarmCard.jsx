import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, ArrowUpRight } from 'lucide-react';
import './FarmCard.css';

export default function FarmCard({ farm }) {
  return (
    <motion.article 
      className="farm-card"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/farms/${farm.id}`} className="farm-card-link">
        <div className="farm-card-image">
          <img src={farm.image} alt={farm.name} loading="lazy" />
          <div className="farm-card-overlay">
            <span className="visit-text">
              Visit Farm
              <ArrowUpRight size={16} />
            </span>
          </div>
        </div>
        
        <div className="farm-card-content">
          <div className="farm-card-header">
            <h3>{farm.name}</h3>
            <div className="farm-rating">
              <Star size={14} fill="var(--golden)" stroke="var(--golden)" />
              <span>{farm.rating}</span>
            </div>
          </div>
          
          <p className="farm-owner">by {farm.owner}</p>
          <p className="farm-desc">{farm.shortDescription}</p>
          
          <div className="farm-meta">
            <span className="farm-location">
              <MapPin size={14} />
              {farm.location}
            </span>
          </div>
          
          <div className="farm-specialties">
            {farm.specialties.slice(0, 3).map(specialty => (
              <span key={specialty} className="specialty-tag">
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

