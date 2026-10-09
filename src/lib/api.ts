export interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface ProductPriceChange {
  dir: 'up' | 'down' | 'flat' | string;
  pct: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: ProductPriceChange;
  markets: MarketPrice[];
}

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const BASE_URL_1 = 'https://api.api-store.workers.dev/api/bazardor';
const BASE_URL_2 = 'https://api.abcz.workers.dev/api/bazardor';

async function fetchFromApi<T>(endpoint: string): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL_1}${endpoint}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Primary API failed with status ${res.status}`);
    return await res.json();
  } catch (error) {
    console.warn(`Primary API error for ${endpoint}, switching to fallback API:`, error);
    const res2 = await fetch(`${BASE_URL_2}${endpoint}`, { next: { revalidate: 60 } });
    if (!res2.ok) throw new Error(`Fallback API failed with status ${res2.status}`);
    return await res2.json();
  }
}

export async function getAllProducts(): Promise<Product[]> {
  return fetchFromApi<Product[]>('/products');
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  return fetchFromApi<Product[]>(`/products?category=${categorySlug}`);
}

export async function getSingleProduct(slugOrId: string): Promise<Product | null> {
  try {
    const all = await getAllProducts();
    const found = all.find((p) => p.slug === slugOrId || p.id.toString() === slugOrId);
    if (found) return found;

    // If not found in list, attempt direct ID endpoint fetch
    if (/^\d+$/.test(slugOrId)) {
      const product = await fetchFromApi<Product>(`/products/${slugOrId}`);
      if (product && (product.slug || product.id)) return product;
    }
  } catch (err) {
    console.error('Failed to fetch single product:', err);
  }
  return null;
}

export async function getAllCategories(): Promise<Category[]> {
  return fetchFromApi<Category[]>('/categories');
}
