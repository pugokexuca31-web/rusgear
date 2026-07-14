/**
 * Типы витрины — по контракту Storefront API платформы Admik
 * (Uni_BD/docs/21). Деньги — строки в копейках.
 */

export interface Brand {
  slug: string;
  name: string;
  logoUrl?: string | null;
  description?: string;
}

export interface ProductListItem {
  slug: string;
  name: string;
  price: string; // копейки
  compareAtPrice?: string | null; // копейки
  discountPct?: number;
  onSale?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  brand?: Brand | null;
  imageUrl?: string | null;
  inStock: boolean;
  availableQty?: number;
  // Варианты (цвет/размер) — чтобы из карточки каталога можно было выбрать параметр
  variants?: ProductVariant[];
  // Локальная витринная мета для плейсхолдера-картинки
  categorySlug?: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  name: string;
  price: string;
  compareAtPrice?: string | null;
  discountPct?: number;
  onSale?: boolean;
  attributes?: Record<string, string>;
  inStock: boolean;
  availableQty?: number;
}

export interface ProductMedia {
  url: string;
  type: 'image' | 'video';
  alt?: string;
  isPrimary?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  description: string;
  price: string;
  compareAtPrice?: string | null;
  discountPct?: number;
  onSale?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  brand?: Brand | null;
  categories?: string[]; // slugs
  attributes?: Record<string, string>;
  variants?: ProductVariant[];
  media?: ProductMedia[];
  inStock: boolean;
  availableQty?: number;
  categorySlug?: string;
}

export interface Category {
  slug: string;
  name: string;
  description?: string;
  children?: Category[];
}

export interface Pagination {
  total: number;
  limit: number;
  offset: number;
  count: number;
}

export interface ProductsQuery {
  q?: string;
  category?: string;
  brandId?: string;
  /** Мульти-выбор брендов на витрине (по slug). При сращивании → повтор brandId. */
  brands?: string[];
  /** Мульти-выбор цветов (нормализованный ключ, lowercase). */
  colors?: string[];
  /** Мульти-выбор размеров (нормализованный ключ, lowercase). */
  sizes?: string[];
  featured?: boolean;
  new?: boolean;
  sale?: boolean;
  inStock?: boolean;
  limit?: number;
  offset?: number;
}
