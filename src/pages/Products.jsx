import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Leaf, Loader } from 'lucide-react';
import { useProducts } from '../hooks/useData';
import { categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Products.css';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.06
    }
  }
};

export default function Products() {
  const { products, loading } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [organicOnly, setOrganicOnly] = useState(false);
  const [sortBy, setSortBy] = useState('name');

  if (loading) {
    return (
      <div className="loading-page">
        <Loader size={32} className="spinner" />
        <p>Loading products...</p>
      </div>
    );
  }

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesOrganic = !organicOnly || product.organic;
      return matchesSearch && matchesCategory && matchesOrganic;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const activeFiltersCount = (selectedCategory !== 'All' ? 1 : 0) + (organicOnly ? 1 : 0);

  const clearFilters = () => {
    setSelectedCategory('All');
    setOrganicOnly(false);
    setSearchQuery('');
  };

  return (
    <div className="products-page">
      <section className="products-hero">
        <div className="container">
          <motion.div 
            className="products-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Farm Fresh Market</h1>
            <p>
              Browse our selection of locally grown produce, artisan goods, and farm specialties. 
              Everything is harvested fresh and delivered straight to your door.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="products-content">
        <div className="container">
          <div className="products-layout">
            {/* Filters Sidebar */}
            <aside className="filters-sidebar">
              <div className="filters-header">
                <h3>
                  <Filter size={18} />
                  Filters
                </h3>
                {activeFiltersCount > 0 && (
                  <button className="clear-filters" onClick={clearFilters}>
                    Clear All
                  </button>
                )}
              </div>

              <div className="filter-group">
                <h4>Category</h4>
                <div className="category-filters">
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4>Preferences</h4>
                <label className="checkbox-filter">
                  <input
                    type="checkbox"
                    checked={organicOnly}
                    onChange={(e) => setOrganicOnly(e.target.checked)}
                  />
                  <span className="checkbox-custom">
                    <Leaf size={14} />
                  </span>
                  Organic Only
                </label>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="products-main">
              <div className="products-toolbar">
                <div className="search-bar">
                  <Search size={20} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button 
                      className="search-clear"
                      onClick={() => setSearchQuery('')}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <div className="sort-select">
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="name">Sort by Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Active Filters Pills */}
              {activeFiltersCount > 0 && (
                <div className="active-filters">
                  {selectedCategory !== 'All' && (
                    <span className="filter-pill">
                      {selectedCategory}
                      <button onClick={() => setSelectedCategory('All')}>
                        <X size={14} />
                      </button>
                    </span>
                  )}
                  {organicOnly && (
                    <span className="filter-pill organic-pill">
                      <Leaf size={14} />
                      Organic
                      <button onClick={() => setOrganicOnly(false)}>
                        <X size={14} />
                      </button>
                    </span>
                  )}
                </div>
              )}

              <p className="results-count">
                Showing <strong>{filteredProducts.length}</strong> products
              </p>

              <motion.div 
                className="products-grid"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                key={`${selectedCategory}-${organicOnly}-${sortBy}-${searchQuery}`}
              >
                {filteredProducts.map((product) => (
                  <motion.div key={product.id} variants={fadeInUp}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>

              {filteredProducts.length === 0 && (
                <div className="no-results">
                  <p>No products found matching your criteria</p>
                  <button className="btn btn-outline" onClick={clearFilters}>
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

