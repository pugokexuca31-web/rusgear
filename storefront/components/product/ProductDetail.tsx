'use client';

import { useState } from 'react';
import type { Product, ProductMedia } from '@/lib/types';
import { ProductGallery } from './ProductGallery';
import { ProductPurchase } from './ProductPurchase';
import { discountPercent } from '@/lib/format';

/**
 * Фото, относящиеся к выбранному варианту (цвету). Сопоставление по имени файла:
 * файлы вида `atacs-fg1.webp` относятся к варианту с id `atacs-fg`. Если совпадений
 * нет (например, у товара варианты-размеры, а не цвета) — показываем все фото.
 * При сращивании с платформой медиа будут приходить с привязкой к варианту.
 */
function mediaForVariant(product: Product, variantId?: string): ProductMedia[] {
  const all = product.media ?? [];
  const variant = product.variants?.find((v) => v.id === variantId);
  if (!variant) return all;
  const prefix = variant.id.toLowerCase();
  const matched = all.filter((m) => {
    const file = m.url.split('/').pop()?.toLowerCase() ?? '';
    return file.startsWith(prefix);
  });
  return matched.length > 0 ? matched : all;
}

export function ProductDetail({ product }: { product: Product }) {
  const variants = product.variants ?? [];
  const [variantId, setVariantId] = useState<string | undefined>(
    variants.find((v) => v.inStock)?.id ?? variants[0]?.id,
  );

  const off = discountPercent(product.price, product.compareAtPrice);
  const attributes: [string, string][] = [
    ...(product.brand ? [['Бренд', product.brand.name] as [string, string]] : []),
    ...Object.entries(product.attributes ?? {}),
  ];
  const gallery = mediaForVariant(product, variantId);

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      {/* key сбрасывает активное фото при смене цвета */}
      <ProductGallery
        key={variantId ?? 'all'}
        media={gallery}
        name={product.name}
        categorySlug={product.categorySlug}
        saleBadge={product.onSale && off ? `−${off}%` : null}
        isNew={product.isNew}
      />

      <div>
        {product.brand && (
          <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-ink-400">
            {product.brand.name}
          </div>
        )}
        <h1 className="text-2xl font-extrabold uppercase leading-tight tracking-tight md:text-3xl">
          {product.name}
        </h1>
        <div className="mt-1 text-xs text-ink-400">Артикул: {product.sku}</div>

        <div className="mt-8">
          <ProductPurchase product={product} variantId={variantId} onVariantChange={setVariantId} />
        </div>

        {attributes.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-ink-500">Характеристики</h2>
            <dl className="divide-y hairline border-y hairline">
              {attributes.map(([k, v]) => (
                <div key={k} className="flex justify-between py-3 text-sm">
                  <dt className="text-ink-500">{k}</dt>
                  <dd className="font-medium text-ink-900">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}
