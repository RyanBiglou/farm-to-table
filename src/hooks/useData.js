import { useState, useEffect } from 'react';
import { getFarms, getProducts, getFarmById as fetchFarmById, getProductsByFarmId as fetchProductsByFarmId } from '../lib/supabase';

export function useFarms() {
  const [farms, setFarms] = useState([]);
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

export function useFarm(id) {
  const [farm, setFarm] = useState(null);
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

export function useProducts() {
  const [products, setProducts] = useState([]);
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

export function useFarmProducts(farmId) {
  const [products, setProducts] = useState([]);
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
