import Link from 'next/link';
import type { Metadata } from 'next';
import { getCategories, getProducts } from '@/lib/api';
import { ProductGrid } from '@/components/product/ProductGrid';

export const metadata: Metadata = { title: 'Каталог' };

type SearchParams = Promise<{
  category?: string;
  q?: string;
  featured?: string;
  new?: string;
  sale?: string;
}>;

export default async function CatalogPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({
      category: sp.category,
      q: sp.q,
      featured: sp.featured === '1',
      new: sp.new === '1',
      sale: sp.sale === '1',
    }),
  ]);

  const activeCat = categories.find((c) => c.slug === sp.category);
  const title = sp.q
    ? `Поиск: «${sp.q}»`
    : activeCat?.name || (sp.sale === '1' ? 'Акции' : sp.new === '1' ? 'Новинки' : sp.featured === '1' ? 'Хиты продаж' : 'Каталог');

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
                className={`block py-1.5 ${!sp.category ? 'font-semibold text-accent-red' : 'text-ink-700 hover:text-ink-900'}`}
              >
                Все товары
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/catalog?category=${c.slug}`}
                  className={`block py-1.5 ${sp.category === c.slug ? 'font-semibold text-accent-red' : 'text-ink-700 hover:text-ink-900'}`}
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
