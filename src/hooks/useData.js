import { useState, useEffect } from 'react';
import { getFarms, getProducts, getFarmById as fetchFarmById, getProductsByFarmId as fetchProductsByFarmId } from '../lib/supabase';
import { farms as staticFarms } from '../data/farms';
import { products as staticProducts } from '../data/products';

const FETCH_TIMEOUT = 6000; // ms — fall back to static data if Supabase is slow

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms)),
  ]);
}

// Hook to fetch all farms
export function useFarms() {
  const [farms, setFarms] = useState(staticFarms);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await withTimeout(getFarms(), FETCH_TIMEOUT);
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
        const data = await withTimeout(fetchFarmById(id), FETCH_TIMEOUT);
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
        const data = await withTimeout(getProducts(), FETCH_TIMEOUT);
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
        const data = await withTimeout(fetchProductsByFarmId(farmId), FETCH_TIMEOUT);
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

