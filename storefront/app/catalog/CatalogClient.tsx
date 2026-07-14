'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { CATEGORIES } from '@/lib/mock';
import { filterMock } from '@/lib/api';
import { ProductGrid } from '@/components/product/ProductGrid';

export function CatalogClient() {
  const params = useSearchParams();
  const category = params.get('category') || undefined;
  const q = params.get('q') || undefined;
  const featured = params.get('featured') === '1';
  const isNew = params.get('new') === '1';
  const sale = params.get('sale') === '1';

  const categories = CATEGORIES;
  const products = useMemo(
    () => filterMock({ category, q, featured, new: isNew, sale }),
    [category, q, featured, isNew, sale],
  );

  const activeCat = categories.find((c) => c.slug === category);
  const title = q
    ? `Поиск: «${q}»`
    : activeCat?.name || (sale ? 'Акции' : isNew ? 'Новинки' : featured ? 'Хиты продаж' : 'Каталог');

  return (
    <div className="container-rg py-12">
      {/* Хлебные крошки */}
      <nav className="mb-6 text-xs uppercase tracking-wide text-ink-400">
        <Link href="/" className="hover:text-accent-red">Главная</Link>
        <span className="mx-2">/</span>
        <span className="text-ink-700">{title}</span>
      </nav>

      <div className="mb-8 flex items-end justify-between gap-4">
        <h1 className="text-3xl font-extrabold uppercase tracking-tight md:text-4xl">{title}</h1>
        <span className="shrink-0 text-sm text-ink-400">{products.length} товаров</span>
      </div>

      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        {/* Фильтр категорий */}
        <aside className="hidden lg:block">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-ink-500">Категории</h2>
          <ul className="space-y-1 text-sm">
            <li>
              <Link
                href="/catalog"
                className={`block py-1.5 ${!category ? 'font-semibold text-accent-red' : 'text-ink-700 hover:text-ink-900'}`}
              >
                Все товары
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/catalog?category=${c.slug}`}
                  className={`block py-1.5 ${category === c.slug ? 'font-semibold text-accent-red' : 'text-ink-700 hover:text-ink-900'}`}
                >
                  {c.name}
                </Link>
                {c.children && c.children.length > 0 && (
                  <ul className="ml-3 border-l hairline pl-3 text-ink-500">
                    {c.children.map((ch) => (
                      <li key={ch.slug}>
                        <Link href={`/catalog?category=${ch.slug}`} className="block py-1 hover:text-ink-900">
                          {ch.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </aside>

        <ProductGrid products={products} />
      </div>
    </div>
  );
}
