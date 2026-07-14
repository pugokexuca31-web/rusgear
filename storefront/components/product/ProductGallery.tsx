'use client';

import { useState } from 'react';
import type { ProductMedia } from '@/lib/types';
import { ProductPlaceholder } from '@/components/ui/ProductPlaceholder';
import { Badge } from '@/components/ui/Badge';
import { asset } from '@/lib/asset';

export function ProductGallery({
  media,
  name,
  categorySlug,
  saleBadge,
  isNew,
}: {
  media?: ProductMedia[];
  name: string;
  categorySlug?: string;
  saleBadge?: string | null;
  isNew?: boolean;
}) {
  const images = (media ?? []).filter((m) => m.type === 'image');
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div>
      <div className="relative aspect-square border hairline">
        {current?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={asset(current.url)} alt={current.alt || name} className="h-full w-full object-cover" />
        ) : (
          <ProductPlaceholder categorySlug={categorySlug} className="h-full w-full" />
        )}
        <div className="absolute left-4 top-4 flex flex-col gap-2">
          {saleBadge ? <Badge tone="sale">{saleBadge}</Badge> : null}
          {isNew ? <Badge tone="new">Новинка</Badge> : null}
        </div>
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-3">
          {images.map((m, i) => (
            <button
              key={m.url}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Фото ${i + 1}`}
              aria-current={i === active}
              className={`relative aspect-square overflow-hidden border transition-colors ${
                i === active ? 'border-ink-900' : 'border-ink-200 hover:border-ink-500'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(m.url)} alt={m.alt || `${name} — фото ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
