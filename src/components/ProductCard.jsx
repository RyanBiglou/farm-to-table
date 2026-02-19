import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFarms } from '../hooks/useData';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const { farms } = useFarms();
  const farm = farms.find(f => f.id === product.farmId);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.article 
      className="product-card"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.organic && (
          <span className="product-badge organic">
            <Leaf size={12} />
            Organic
          </span>
        )}
      </div>
      
      <div className="product-content">
        <span className="product-farm">{farm?.name}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        
        <div className="product-footer">
          <div className="product-price">
            <span className="price">${product.price.toFixed(2)}</span>
            <span className="unit">/ {product.unit}</span>
          </div>
          
          <motion.button
            className={`add-to-cart ${added ? 'added' : ''}`}
            onClick={handleAddToCart}
            whileTap={{ scale: 0.95 }}
            disabled={added}
          >
            {added ? (
              <>
                <Check size={18} />
                Added
              </>
            ) : (
              <>
                <Plus size={18} />
                Add
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

