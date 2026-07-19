export default function StatsCards({ stats, loading, onCardClick, activeFilter }) {
  const cards = [
    {
      key: 'total',
      label: 'Total Products',
      value: stats?.totalProducts ?? '—',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      gradient: 'stat-card-gradient-1',
      delay: 0,
    },
    {
      key: 'categories',
      label: 'Total Categories',
      value: stats?.totalCategories ?? '—',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      gradient: 'stat-card-gradient-2',
      delay: 100,
    },
    {
      key: 'lowStock',
      label: 'Low Stock Items',
      value: stats?.lowStockCount ?? '—',
      subtitle: 'Less than 10 units',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      ),
      gradient: 'stat-card-gradient-3',
      delay: 200,
    },
    {
      key: 'recent',
      label: 'Recently Added',
      value: stats?.recentProducts?.length ?? '—',
      subtitle: 'Last 5 products',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'stat-card-gradient-4',
      delay: 300,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {cards.map((card, i) => (
        <button
          key={i}
          onClick={() => onCardClick?.(card.key)}
          className={`relative overflow-hidden rounded-2xl p-5 sm:p-6 text-white ${card.gradient} shadow-lg transition-all duration-500 hover:scale-[1.02] hover:shadow-xl text-left w-full ${
            loading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          } ${activeFilter === card.key ? 'ring-4 ring-white/60 scale-[1.02]' : ''}`}
          style={{ transitionDelay: `${card.delay}ms`, transitionProperty: 'all' }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 -translate-y-8 translate-x-8">
            <div className="w-full h-full rounded-full bg-white/10" />
          </div>
          <div className="absolute bottom-0 left-0 w-24 h-24 translate-y-8 -translate-x-8">
            <div className="w-full h-full rounded-full bg-white/5" />
          </div>

          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                {card.icon}
              </div>
              {activeFilter === card.key && (
                <span className="px-2.5 py-1 rounded-full bg-white/30 text-xs font-semibold backdrop-blur-sm">
                  Viewing
                </span>
              )}
              {stats?.lowStockCount > 0 && card.key === 'lowStock' && activeFilter !== 'lowStock' && (
                <span className="px-2.5 py-1 rounded-full bg-white/25 text-xs font-semibold backdrop-blur-sm animate-pulse">
                  Action needed
                </span>
              )}
            </div>
            <p className="text-sm font-medium text-white/80">{card.label}</p>
            <p className="text-3xl sm:text-4xl font-bold mt-1 tracking-tight">{card.value}</p>
            {card.subtitle && (
              <p className="text-xs text-white/70 mt-1">{card.subtitle}</p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
