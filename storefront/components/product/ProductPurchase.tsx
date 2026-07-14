'use client';

import { useMemo, useState } from 'react';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/format';
import { useCart } from '@/components/cart/CartProvider';

export function ProductPurchase({
  product,
  variantId: controlledVariantId,
  onVariantChange,
}: {
  product: Product;
  /** Управляемый выбор варианта (если родитель делит состояние с галереей). */
  variantId?: string;
  onVariantChange?: (id: string) => void;
}) {
  const { add } = useCart();
  const variants = product.variants ?? [];
  const [internalVariantId, setInternalVariantId] = useState<string | undefined>(
    variants.find((v) => v.inStock)?.id ?? variants[0]?.id,
  );
  const variantId = controlledVariantId ?? internalVariantId;
  const setVariantId = (id: string) => {
    setInternalVariantId(id);
    onVariantChange?.(id);
  };
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const selected = useMemo(
    () => variants.find((v) => v.id === variantId),
    [variants, variantId],
  );
  const price = selected?.price ?? product.price;
  const inStock = selected ? selected.inStock : product.inStock;

  function handleAdd() {
    add(
      {
        slug: product.slug,
        variantId: selected?.id,
        name: product.name,
        variantName: selected?.name,
        price,
        categorySlug: product.categorySlug,
      },
      qty,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div>
      <div className="flex items-baseline gap-3">
        <span className="font-heading text-3xl font-extrabold text-ink-900">{formatPrice(price)}</span>
        {product.compareAtPrice && (
          <span className="text-lg text-ink-400 line-through">{formatPrice(product.compareAtPrice)}</span>
        )}
      </div>

      <p className={`mt-2 text-sm ${inStock ? 'text-brand-dark' : 'text-ink-400'}`}>
        {inStock ? '● В наличии' : '○ Нет в наличии'}
      </p>

      {variants.length > 0 && (
        <div className="mt-6">
          <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-ink-500">
            {Object.keys(variants[0].attributes ?? { Вариант: '' })[0] || 'Вариант'}
          </span>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => {
              const label = Object.values(v.attributes ?? {})[0] ?? v.name;
              const active = v.id === variantId;
              return (
                <button
                  key={v.id}
                  onClick={() => setVariantId(v.id)}
                  disabled={!v.inStock}
                  className={`min-w-14 border px-4 py-2 text-sm font-semibold uppercase transition-colors
                    ${active ? 'border-ink-900 bg-ink-900 text-white' : 'border-ink-300 text-ink-800 hover:border-ink-900'}
                    ${!v.inStock ? 'cursor-not-allowed opacity-40 line-through' : ''}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-stretch gap-3">
        <div className="flex items-center border hairline">
          <button className="h-14 w-12 text-lg text-ink-600 hover:text-accent-red" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Меньше">−</button>
          <span className="w-10 text-center font-heading font-bold">{qty}</span>
          <button className="h-14 w-12 text-lg text-ink-600 hover:text-accent-red" onClick={() => setQty((q) => q + 1)} aria-label="Больше">+</button>
        </div>
        <Button size="lg" onClick={handleAdd} disabled={!inStock} className="flex-1">
          {added ? 'Добавлено ✓' : 'В корзину'}
        </Button>
      </div>

      <p className="mt-4 text-xs text-ink-400">
        Итоговую стоимость и доставку рассчитает система при оформлении заказа.
      </p>
    </div>
  );
}
