/**
 * Клиент Storefront API платформы Admik (Uni_BD/docs/21).
 *
 * Фаза 1 (макет): если NEXT_PUBLIC_ADMIK_API_URL не задан — работаем на мок-данных.
 * При сращивании задать переменную окружения — и те же функции пойдут в реальный API
 * без правок компонентов.
 */
import type {
  Category,
  Product,
  ProductListItem,
  ProductsQuery,
} from './types';
import {
  CATEGORIES,
  PRODUCTS,
  PRODUCT_LIST,
  PRODUCT_COLOR_KEYS,
  PRODUCT_SIZE_KEYS,
} from './mock';

const API_URL = process.env.NEXT_PUBLIC_ADMIK_API_URL || process.env.ADMIK_API_URL || '';
const USE_MOCK = !API_URL;

async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}/api/storefront/v1${path}`, {
    headers: process.env.STOREFRONT_API_KEY
      ? { 'X-Storefront-Key': process.env.STOREFRONT_API_KEY }
      : {},
    // ISR-подобное кэширование каталога на витрине
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Storefront API ${path} → ${res.status}`);
  const json = await res.json();
  return json.data as T;
}

// ---- Каталог ----

export async function getProducts(query: ProductsQuery = {}): Promise<ProductListItem[]> {
  if (USE_MOCK) return filterMock(query);
  const params = new URLSearchParams();
  if (query.q) params.set('q', query.q);
  if (query.category) params.set('category', query.category);
  if (query.brandId) params.set('brandId', query.brandId);
  if (query.brands) query.brands.forEach((b) => params.append('brandId', b));
  // Точные имена атрибутных фильтров финализируются с платформой (см. CLAUDE.md §6).
  if (query.colors) query.colors.forEach((c) => params.append('color', c));
  if (query.sizes) query.sizes.forEach((s) => params.append('size', s));
  if (query.featured) params.set('featured', '1');
  if (query.new) params.set('new', '1');
  if (query.sale) params.set('sale', '1');
  if (query.inStock) params.set('inStock', '1');
  if (query.limit) params.set('limit', String(query.limit));
  if (query.offset) params.set('offset', String(query.offset));
  return apiGet<ProductListItem[]>(`/products?${params.toString()}`);
}

export async function getProduct(slug: string): Promise<Product | null> {
  if (USE_MOCK) return PRODUCTS.find((p) => p.slug === slug) ?? null;
  try {
    return await apiGet<Product>(`/products/${encodeURIComponent(slug)}`);
  } catch {
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  if (USE_MOCK) return CATEGORIES;
  return apiGet<Category[]>('/categories');
}

// ---- Мок-фильтрация ----

export function filterMock(query: ProductsQuery): ProductListItem[] {
  let list = PRODUCT_LIST.slice();
  if (query.category) {
    const cat = query.category;
    list = PRODUCTS.filter((p) => p.categories?.includes(cat)).map(
      (p) => PRODUCT_LIST.find((l) => l.slug === p.slug)!,
    );
  }
  if (query.q) {
    const q = query.q.toLowerCase();
    list = list.filter((p) => p.name.toLowerCase().includes(q));
  }
  if (query.brands && query.brands.length) {
    const set = new Set(query.brands);
    list = list.filter((p) => p.brand && set.has(p.brand.slug));
  }
  if (query.colors && query.colors.length) {
    const set = new Set(query.colors);
    list = list.filter((p) => {
      const keys = PRODUCT_COLOR_KEYS.get(p.slug);
      return !!keys && [...set].some((c) => keys.has(c));
    });
  }
  if (query.sizes && query.sizes.length) {
    const set = new Set(query.sizes);
    list = list.filter((p) => {
      const keys = PRODUCT_SIZE_KEYS.get(p.slug);
      return !!keys && [...set].some((s) => keys.has(s));
    });
  }
  if (query.featured) list = list.filter((p) => p.isFeatured);
  if (query.new) list = list.filter((p) => p.isNew);
  if (query.sale) list = list.filter((p) => p.onSale);
  if (query.inStock) list = list.filter((p) => p.inStock);
  if (query.limit) list = list.slice(query.offset ?? 0, (query.offset ?? 0) + query.limit);
  return list;
}
