'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { ProductListItem } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProductPlaceholder } from '@/components/ui/ProductPlaceholder';
import { discountPercent, formatPrice } from '@/lib/format';
import { useCart } from '@/components/cart/CartProvider';
import { useFavorites } from '@/components/favorites/FavoritesProvider';

export function ProductCard({ product }: { product: ProductListItem }) {
  const off = discountPercent(product.price, product.compareAtPrice);
  const { add } = useCart();
  const { has, toggle } = useFavorites();
  const [added, setAdded] = useState(false);
  const isFav = has(product.slug);

  function handleAdd() {
    add({
      slug: product.slug,
      name: product.name,
      price: product.price,
      categorySlug: product.categorySlug,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div className="group relative flex flex-col border hairline transition-colors hover:border-ink-900">
      <button
        type="button"
        onClick={() => toggle(product)}
        aria-label={isFav ? 'Убрать из избранного' : 'В избранное'}
        aria-pressed={isFav}
        title={isFav ? 'В избранном' : 'В избранное'}
        className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border bg-white/90 backdrop-blur transition-colors hover:border-accent-red ${
          isFav ? 'border-accent-red text-accent-red' : 'border-ink-200 text-ink-500'
        }`}
      >
        <HeartIcon filled={isFav} />
      </button>
      <Link href={`/product/${product.slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-square">
          {product.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            <ProductPlaceholder categorySlug={product.categorySlug} className="h-full w-full" />
          )}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.onSale && off ? <Badge tone="sale">−{off}%</Badge> : null}
            {product.isNew ? <Badge tone="new">Новинка</Badge> : null}
            {!product.inStock ? <Badge tone="out">Нет в наличии</Badge> : null}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-sm font-semibold uppercase leading-snug text-ink-900 group-hover:text-accent-red">
            {product.name}
          </h3>
          <div className="mt-auto flex items-baseline gap-2 pt-4">
            <span className="font-heading text-lg font-bold text-ink-900">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice ? (
              <span className="text-sm text-ink-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            ) : null}
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <Button
          variant="outline"
          onClick={handleAdd}
          disabled={!product.inStock}
          className="w-full"
        >
          {!product.inStock ? 'Нет в наличии' : added ? 'Добавлено ✓' : 'В корзину'}
        </Button>
      </div>
    </div>
  );
}

function HeartIcon({ filled }: { filled?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8">
      <path d="M12 20s-7-4.6-9.2-9A4.6 4.6 0 0 1 12 6.5 4.6 4.6 0 0 1 21.2 11C19 15.4 12 20 12 20z" />
    </svg>
  );
}
