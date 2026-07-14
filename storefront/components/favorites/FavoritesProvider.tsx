'use client';

/**
 * Избранное (Фаза 1) на localStorage — как и корзина, чисто клиентский выбор.
 * Храним снимок карточки товара (ProductListItem), чтобы страница /favorites
 * рендерилась без обращения к API. При сращивании с аккаунтом — переносится на сервер.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ProductListItem } from '@/lib/types';

interface FavoritesContextValue {
  items: ProductListItem[];
  count: number;
  has: (slug: string) => boolean;
  toggle: (product: ProductListItem) => void;
  remove: (slug: string) => void;
  clear: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);
const STORAGE_KEY = 'rusgear.favorites.v1';

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ProductListItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const has = useCallback((slug: string) => items.some((i) => i.slug === slug), [items]);

  const toggle = useCallback<FavoritesContextValue['toggle']>((product) => {
    setItems((prev) =>
      prev.some((i) => i.slug === product.slug)
        ? prev.filter((i) => i.slug !== product.slug)
        : [...prev, product],
    );
  }, []);

  const remove = useCallback<FavoritesContextValue['remove']>((slug) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<FavoritesContextValue>(
    () => ({ items, count: items.length, has, toggle, remove, clear }),
    [items, has, toggle, remove, clear],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}
