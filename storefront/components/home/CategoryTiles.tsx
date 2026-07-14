import Link from 'next/link';
import type { Category } from '@/lib/types';
import { ProductPlaceholder } from '@/components/ui/ProductPlaceholder';

export function CategoryTiles({ categories }: { categories: Category[] }) {
  if (categories.length === 0) return null;
  return (
    <section className="container-rg pt-8 pb-16">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/catalog?category=${c.slug}`}
            className="group flex flex-col border hairline transition-colors hover:border-ink-900"
          >
            <ProductPlaceholder categorySlug={c.slug} className="aspect-[4/3]" />
            <div className="flex items-center justify-between gap-2 p-4">
              <span className="font-heading text-sm font-bold uppercase tracking-wide text-ink-900 group-hover:text-accent-red">
                {c.name}
              </span>
              <span className="text-ink-400 transition-colors group-hover:text-accent-red">→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
