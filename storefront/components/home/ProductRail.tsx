import Link from 'next/link';
import type { ProductListItem } from '@/lib/types';
import { ProductGrid } from '@/components/product/ProductGrid';

export function ProductRail({
  title,
  products,
  href,
}: {
  title: string;
  products: ProductListItem[];
  href: string;
}) {
  if (products.length === 0) return null;
  return (
    <section className="container-rg py-10 md:py-16">
      <div className="mb-6 flex items-end justify-between border-b hairline pb-4 md:mb-8">
        <h2 className="text-2xl font-extrabold uppercase tracking-tight md:text-3xl">{title}</h2>
        <Link
          href={href}
          className="text-xs font-semibold uppercase tracking-wide text-ink-500 hover:text-accent-red"
        >
          Смотреть все →
        </Link>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
