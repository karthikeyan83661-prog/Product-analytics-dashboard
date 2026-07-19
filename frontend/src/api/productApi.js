const API_BASE = '/api';

async function fetchJSON(url, options = {}) {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  if (res.status === 204) return null;
  return res.json();
}

export function getDashboardStats() {
  return fetchJSON('/products/stats');
}

export function getCategories() {
  return fetchJSON('/categories');
}

export function getProducts({ search, categoryId, sort, lowStock } = {}) {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (categoryId) params.set('categoryId', categoryId);
  if (sort) params.set('sort', sort);
  if (lowStock) params.set('lowStock', 'true');
  const qs = params.toString();
  return fetchJSON(`/products${qs ? '?' + qs : ''}`);
}

export function getProduct(id) {
  return fetchJSON(`/products/${id}`);
}

export function createProduct(product) {
  return fetchJSON('/products', { method: 'POST', body: JSON.stringify(product) });
}

export function updateProduct(id, product) {
  return fetchJSON(`/products/${id}`, { method: 'PUT', body: JSON.stringify(product) });
}

export function deleteProduct(id) {
  return fetchJSON(`/products/${id}`, { method: 'DELETE' });
}
