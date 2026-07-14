'use client';

/**
 * Лёгкая клиентская корзина (Фаза 1) на localStorage.
 * При сращивании итоги считает сервер через POST /cart/quote — здесь только выбор
 * покупателя (slug/variant/qty). Никакой «истины по цене» на клиенте на бою.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export interface CartItem {
  key: string; // slug|variantId
  slug: string;
  variantId?: string;
  name: string;
  variantName?: string;
  price: string; // копейки (для предпросмотра макета)
  categorySlug?: string;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  promo: string;
  add: (item: Omit<CartItem, 'key' | 'qty'>, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  setPromo: (code: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'rusgear.cart.v1';
const PROMO_KEY = 'rusgear.promo.v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promo, setPromoState] = useState('');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
      const rawPromo = localStorage.getItem(PROMO_KEY);
      if (rawPromo) setPromoState(rawPromo);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(PROMO_KEY, promo);
  }, [promo, hydrated]);

  const add = useCallback<CartContextValue['add']>((item, qty = 1) => {
    const key = `${item.slug}${item.variantId ? `|${item.variantId}` : ''}`;
    setItems((prev) => {
      const found = prev.find((i) => i.key === key);
      if (found) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { ...item, key, qty }];
    });
  }, []);

  const setQty = useCallback<CartContextValue['setQty']>((key, qty) => {
    setItems((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, qty: Math.max(0, qty) } : i))
        .filter((i) => i.qty > 0),
    );
  }, []);

  const remove = useCallback<CartContextValue['remove']>((key) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const setPromo = useCallback<CartContextValue['setPromo']>((code) => setPromoState(code), []);

  const clear = useCallback(() => {
    setItems([]);
    setPromoState('');
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + Number(i.price) * i.qty, 0);
    return { items, count, subtotal, promo, add, setQty, remove, setPromo, clear };
  }, [items, promo, add, setQty, remove, setPromo, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
