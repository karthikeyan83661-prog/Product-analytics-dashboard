import { useState, useEffect, useCallback } from 'react';
import StatsCards from './StatsCards';
import SearchFilter from './SearchFilter';
import ProductTable from './ProductTable';
import { getDashboardStats, getCategories, getProducts } from '../api/productApi';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState({ stats: true, products: true, categories: true });
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [lowStock, setLowStock] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);

  const fetchStats = useCallback(async () => {
    setLoading(prev => ({ ...prev, stats: true }));
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch {
    } finally {
      setLoading(prev => ({ ...prev, stats: false }));
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch {
    } finally {
      setLoading(prev => ({ ...prev, categories: false }));
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(prev => ({ ...prev, products: true }));
    setError(null);
    try {
      const data = await getProducts({ search, categoryId, sort: sortOrder, lowStock });
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(prev => ({ ...prev, products: false }));
    }
  }, [search, categoryId, sortOrder, lowStock]);

  useEffect(() => { fetchStats(); }, [fetchStats]);
  useEffect(() => { fetchCategories(); }, [fetchCategories]);
  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleCardClick = (key) => {
    if (activeFilter === key) {
      setActiveFilter(null);
      setSearch('');
      setCategoryId(null);
      setSortOrder(null);
      setLowStock(false);
      return;
    }
    setActiveFilter(key);
    setSearch('');
    setCategoryId(null);
    setSortOrder(null);
    setLowStock(false);
    switch (key) {
      case 'total':
        break;
      case 'categories':
        break;
      case 'lowStock':
        setLowStock(true);
        break;
      case 'recent':
        setSortOrder(null);
        break;
    }
  };

  const handleClearFilter = () => {
    setActiveFilter(null);
    setSearch('');
    setCategoryId(null);
    setSortOrder(null);
    setLowStock(false);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="animate-fadeIn">
        <StatsCards stats={stats} loading={loading.stats} onCardClick={handleCardClick} activeFilter={activeFilter} />
      </div>

      <div className="animate-fadeIn" style={{ animationDelay: '100ms' }}>
        <SearchFilter
          search={search}
          onSearchChange={(v) => { setSearch(v); setActiveFilter(null); setLowStock(false); }}
          categories={categories}
          selectedCategory={categoryId}
          onCategoryChange={(v) => { setCategoryId(v); setActiveFilter(null); setLowStock(false); }}
          sortOrder={sortOrder}
          onSortChange={(v) => { setSortOrder(v); setActiveFilter(null); setLowStock(false); }}
        />
      </div>

      {activeFilter && (
        <div className="flex items-center gap-2 text-sm text-muted animate-fadeIn">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/30 font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {activeFilter === 'total' && 'All Products'}
            {activeFilter === 'categories' && 'All Products'}
            {activeFilter === 'lowStock' && 'Low Stock Products (< 10 units)'}
            {activeFilter === 'recent' && 'Recently Added Products'}
            <button onClick={handleClearFilter} className="ml-1.5 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        </div>
      )}

      <div className="animate-fadeIn" style={{ animationDelay: '200ms' }}>
        <ProductTable
          products={products}
          loading={loading.products}
          error={error}
        />
      </div>
    </div>
  );
}
