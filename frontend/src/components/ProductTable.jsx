export default function ProductTable({ products, loading, error }) {
  if (loading) {
    return (
      <div className="bg-surface border border-theme rounded-2xl overflow-hidden transition-colors duration-300">
        <div className="p-6 space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex items-center gap-4 animate-pulse">
              <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-700" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/4" />
              </div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-20" />
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-surface border border-theme rounded-2xl p-12 text-center transition-colors duration-300">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <p className="text-theme font-semibold">Failed to load products</p>
        <p className="text-muted text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="bg-surface border border-theme rounded-2xl p-12 text-center transition-colors duration-300">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
          <svg className="w-8 h-8 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <p className="text-theme font-semibold">No products found</p>
        <p className="text-muted text-sm mt-1">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-theme rounded-2xl overflow-hidden transition-colors duration-300">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-theme bg-slate-50/50 dark:bg-slate-800/50">
              <th className="text-left py-4 px-5 text-xs font-semibold text-muted uppercase tracking-wider">Product</th>
              <th className="text-left py-4 px-5 text-xs font-semibold text-muted uppercase tracking-wider hidden sm:table-cell">Category</th>
              <th className="text-right py-4 px-5 text-xs font-semibold text-muted uppercase tracking-wider">Price</th>
              <th className="text-right py-4 px-5 text-xs font-semibold text-muted uppercase tracking-wider">Stock</th>
              <th className="text-right py-4 px-5 text-xs font-semibold text-muted uppercase tracking-wider hidden md:table-cell">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-theme">
            {products.map((product, index) => (
              <tr
                key={product.id}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <td className="py-4 px-5">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <svg className="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-theme group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted truncate max-w-[200px]">{product.description}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-5 hidden sm:table-cell">
                  <span className="inline-flex px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {product.categoryName}
                  </span>
                </td>
                <td className="py-4 px-5 text-right">
                  <span className="text-sm font-bold text-theme">${product.price.toFixed(2)}</span>
                </td>
                <td className="py-4 px-5 text-right">
                  <span className={`text-sm font-bold ${
                    product.stock < 10
                      ? 'text-red-500 dark:text-red-400'
                      : product.stock < 20
                      ? 'text-amber-500 dark:text-amber-400'
                      : 'text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {product.stock}
                  </span>
                </td>
                <td className="py-4 px-5 text-right hidden md:table-cell">
                  {product.stock < 10 ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      Low Stock
                    </span>
                  ) : product.stock < 20 ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      Medium
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      In Stock
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-5 py-3 border-t border-theme bg-slate-50/50 dark:bg-slate-800/50">
        <p className="text-xs text-muted">
          Showing <span className="font-semibold text-theme">{products.length}</span> product{products.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}
