import type { ProductListItem } from '@/lib/types';
import { ProductCard } from './ProductCard';

export function ProductGrid({ products }: { products: ProductListItem[] }) {
  if (products.length === 0) {
    return (
      <div className="border hairline p-16 text-center text-sm text-ink-500">
        Товары не найдены.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
