import { useState, useEffect } from 'react';

export default function SearchFilter({ search, onSearchChange, categories, selectedCategory, onCategoryChange, sortOrder, onSortChange }) {
  const [localSearch, setLocalSearch] = useState(search || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== search) {
        onSearchChange(localSearch);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [localSearch]);

  useEffect(() => {
    setLocalSearch(search || '');
  }, [search]);

  return (
    <div className="bg-surface border border-theme rounded-2xl p-4 sm:p-5 transition-colors duration-300">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={localSearch}
              onChange={e => setLocalSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-theme border border-theme text-theme placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 text-sm transition-all"
            />
            {localSearch && (
              <button
                onClick={() => { setLocalSearch(''); onSearchChange(''); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-theme transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <select
            value={selectedCategory || ''}
            onChange={e => onCategoryChange(e.target.value || null)}
            className="px-4 py-2.5 rounded-xl bg-theme border border-theme text-theme text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all cursor-pointer min-w-[160px]"
          >
            <option value="">All Categories</option>
            {categories?.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted font-medium">Stock:</span>
          <div className="flex rounded-xl border border-theme overflow-hidden">
            <button
              onClick={() => onSortChange(null)}
              className={`px-3.5 py-2 text-xs font-medium transition-all ${
                !sortOrder
                  ? 'bg-indigo-500 text-white shadow-sm'
                  : 'bg-theme text-muted hover:text-theme'
              }`}
            >
              Default
            </button>
            <button
              onClick={() => onSortChange('asc')}
              className={`px-3.5 py-2 text-xs font-medium transition-all border-x border-theme ${
                sortOrder === 'asc'
                  ? 'bg-indigo-500 text-white shadow-sm'
                  : 'bg-theme text-muted hover:text-theme'
              }`}
            >
              Low → High
            </button>
            <button
              onClick={() => onSortChange('desc')}
              className={`px-3.5 py-2 text-xs font-medium transition-all ${
                sortOrder === 'desc'
                  ? 'bg-indigo-500 text-white shadow-sm'
                  : 'bg-theme text-muted hover:text-theme'
              }`}
            >
              High → Low
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
