import { useState, useEffect } from 'react';
import { getFarms, getProducts, getFarmById as fetchFarmById, getProductsByFarmId as fetchProductsByFarmId } from '../lib/supabase';
import { farms as staticFarms } from '../data/farms';
import { products as staticProducts } from '../data/products';

// Hook to fetch all farms
export function useFarms() {
  const [farms, setFarms] = useState(staticFarms);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getFarms();
        if (data) {
          setFarms(data);
        }
      } catch (err) {
        console.error('Error loading farms:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { farms, loading, error };
}

// Hook to fetch single farm
export function useFarm(id) {
  const [farm, setFarm] = useState(() => 
    staticFarms.find(f => f.id === parseInt(id))
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchFarmById(id);
        if (data) {
          setFarm(data);
        }
      } catch (err) {
        console.error('Error loading farm:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return { farm, loading, error };
}

// Hook to fetch all products
export function useProducts() {
  const [products, setProducts] = useState(staticProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts();
        if (data) {
          setProducts(data);
        }
      } catch (err) {
        console.error('Error loading products:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { products, loading, error };
}

// Hook to fetch products by farm
export function useFarmProducts(farmId) {
  const [products, setProducts] = useState(() => 
    staticProducts.filter(p => p.farmId === parseInt(farmId))
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchProductsByFarmId(farmId);
        if (data) {
          setProducts(data);
        }
      } catch (err) {
        console.error('Error loading products:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [farmId]);

  return { products, loading, error };
}

