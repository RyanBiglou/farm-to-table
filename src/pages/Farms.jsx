import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { farms } from '../data/farms';
import FarmCard from '../components/FarmCard';
import './Farms.css';

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

export default function Farms() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('distance');

  const filteredFarms = farms
    .filter(farm => 
      farm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farm.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return a.distance - b.distance;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <div className="farms-page">
      <section className="farms-hero">
        <div className="container">
          <motion.div 
            className="farms-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Our Partner Farms</h1>
            <p>
              Meet the dedicated farmers who grow your food with passion and care. 
              Every farm is family-owned and committed to sustainable practices.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="farms-content">
        <div className="container">
          <div className="farms-toolbar">
            <div className="search-bar">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search farms or specialties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="sort-controls">
              <SlidersHorizontal size={18} />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="distance">Nearest First</option>
                <option value="rating">Top Rated</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>

          <p className="results-count">
            Showing <strong>{filteredFarms.length}</strong> farms near you
          </p>

          <motion.div 
            className="farms-grid-large"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {filteredFarms.map((farm) => (
              <motion.div key={farm.id} variants={fadeInUp}>
                <FarmCard farm={farm} />
              </motion.div>
            ))}
          </motion.div>

          {filteredFarms.length === 0 && (
            <div className="no-results">
              <p>No farms found matching "{searchQuery}"</p>
              <button className="btn btn-outline" onClick={() => setSearchQuery('')}>
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

