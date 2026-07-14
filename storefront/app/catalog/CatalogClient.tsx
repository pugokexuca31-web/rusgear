'use client';

import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { BRANDS, CATEGORIES, COLORS, SIZES } from '@/lib/mock';
import { filterMock } from '@/lib/api';
import { ProductGrid } from '@/components/product/ProductGrid';

const FLAGS = [
  { key: 'inStock', label: 'В наличии' },
  { key: 'sale', label: 'Со скидкой' },
  { key: 'new', label: 'Новинки' },
] as const;

const SORT_OPTIONS = [
  { key: 'popular', label: 'По популярности' },
  { key: 'price-asc', label: 'Сначала дешевле' },
  { key: 'price-desc', label: 'Сначала дороже' },
  { key: 'new', label: 'Сначала новинки' },
  { key: 'name', label: 'По названию (А–Я)' },
] as const;

const DEFAULT_SORT = 'popular';

export function CatalogClient() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const category = params.get('category') || undefined;
  const q = params.get('q') || undefined;
  const featured = params.get('featured') === '1';
  const isNew = params.get('new') === '1';
  const sale = params.get('sale') === '1';
  const inStock = params.get('inStock') === '1';
  const brands = params.getAll('brand');
  const colors = params.getAll('color');
  const sizes = params.getAll('size');
  const brandsKey = brands.join(',');
  const colorsKey = colors.join(',');
  const sizesKey = sizes.join(',');
  const sort = params.get('sort') || DEFAULT_SORT;

  const categories = CATEGORIES;
  const filtered = useMemo(
    () => filterMock({ category, q, featured, new: isNew, sale, inStock, brands, colors, sizes }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [category, q, featured, isNew, sale, inStock, brandsKey, colorsKey, sizesKey],
  );

  const products = useMemo(() => {
    const list = filtered.slice();
    switch (sort) {
      case 'price-asc':
        return list.sort((a, b) => Number(a.price) - Number(b.price));
      case 'price-desc':
        return list.sort((a, b) => Number(b.price) - Number(a.price));
      case 'new':
        return list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
      case 'name':
        return list.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
      default:
        return list; // popular — исходный порядок
    }
  }, [filtered, sort]);

  const activeCat = categories.find((c) => c.slug === category);
  const title = q
    ? `Поиск: «${q}»`
    : activeCat?.name || (sale ? 'Акции' : isNew ? 'Новинки' : featured ? 'Хиты продаж' : 'Каталог');

  // Ссылка, сохраняющая уже выбранные фильтры при смене категории.
  const buildHref = useCallback(
    (overrides: Record<string, string | undefined>) => {
      const next = new URLSearchParams(params.toString());
      for (const [k, v] of Object.entries(overrides)) {
        if (v === undefined) next.delete(k);
        else next.set(k, v);
      }
      const s = next.toString();
      return s ? `/catalog?${s}` : '/catalog';
    },
    [params],
  );

  const pushParams = useCallback(
    (mutate: (p: URLSearchParams) => void) => {
      const next = new URLSearchParams(params.toString());
      mutate(next);
      const s = next.toString();
      router.push(s ? `${pathname}?${s}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  const toggleMulti = useCallback(
    (name: string, value: string) =>
      pushParams((p) => {
        const cur = p.getAll(name);
        p.delete(name);
        (cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value]).forEach((v) =>
          p.append(name, v),
        );
      }),
    [pushParams],
  );

  const toggleFlag = useCallback(
    (key: string) =>
      pushParams((p) => {
        if (p.get(key) === '1') p.delete(key);
        else p.set(key, '1');
      }),
    [pushParams],
  );

  const setSort = useCallback(
    (value: string) =>
      pushParams((p) => {
        if (value === DEFAULT_SORT) p.delete('sort');
        else p.set('sort', value);
      }),
    [pushParams],
  );

  const activeFilters =
    brands.length + colors.length + sizes.length + (inStock ? 1 : 0) + (sale ? 1 : 0) + (isNew ? 1 : 0);

  const filters = (
    <div className="space-y-8">
      {/* Категории */}
      <div>
        <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-ink-500">Категории</h2>
        <ul className="space-y-1 text-sm">
          <li>
            <Link
              href={buildHref({ category: undefined })}
              onClick={() => setFiltersOpen(false)}
              className={`block py-1.5 ${!category ? 'font-semibold text-accent-red' : 'text-ink-700 hover:text-ink-900'}`}
            >
              Все товары
            </Link>
          </li>
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={buildHref({ category: c.slug })}
                onClick={() => setFiltersOpen(false)}
                className={`block py-1.5 ${category === c.slug ? 'font-semibold text-accent-red' : 'text-ink-700 hover:text-ink-900'}`}
              >
                {c.name}
              </Link>
              {c.children && c.children.length > 0 && (
                <ul className="ml-3 border-l hairline pl-3 text-ink-500">
                  {c.children.map((ch) => (
                    <li key={ch.slug}>
                      <Link
                        href={buildHref({ category: ch.slug })}
                        onClick={() => setFiltersOpen(false)}
                        className="block py-1 hover:text-ink-900"
                      >
                        {ch.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Бренд */}
      <div>
        <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-ink-500">Бренд</h2>
        <ul className="space-y-1 text-sm">
          {BRANDS.map((b) => (
            <li key={b.slug}>
              <label className="flex cursor-pointer items-center gap-2.5 py-1.5 text-ink-700 hover:text-ink-900">
                <input
                  type="checkbox"
                  checked={brands.includes(b.slug)}
                  onChange={() => toggleMulti('brand', b.slug)}
                  className="h-4 w-4 accent-accent-red"
                />
                <span className={brands.includes(b.slug) ? 'font-semibold text-ink-900' : ''}>{b.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Цвет */}
      {COLORS.length > 0 && (
        <div>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-ink-500">Цвет</h2>
          <ul className="space-y-1 text-sm">
            {COLORS.map((c) => (
              <li key={c.key}>
                <label className="flex cursor-pointer items-center gap-2.5 py-1.5 text-ink-700 hover:text-ink-900">
                  <input
                    type="checkbox"
                    checked={colors.includes(c.key)}
                    onChange={() => toggleMulti('color', c.key)}
                    className="h-4 w-4 accent-accent-red"
                  />
                  <span className={colors.includes(c.key) ? 'font-semibold text-ink-900' : ''}>{c.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Размер */}
      {SIZES.length > 0 && (
        <div>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-ink-500">Размер</h2>
          <div className="flex flex-wrap gap-2">
            {SIZES.map((s) => {
              const on = sizes.includes(s.key);
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => toggleMulti('size', s.key)}
                  aria-pressed={on}
                  className={`flex h-9 min-w-[2.25rem] items-center justify-center border px-3 text-sm font-medium ${on ? 'border-accent-red bg-accent-red text-white' : 'hairline text-ink-700 hover:border-ink-900'}`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Подбор */}
      <div>
        <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-ink-500">Подбор</h2>
        <ul className="space-y-1 text-sm">
          {FLAGS.map((f) => {
            const on = params.get(f.key) === '1';
            return (
              <li key={f.key}>
                <label className="flex cursor-pointer items-center gap-2.5 py-1.5 text-ink-700 hover:text-ink-900">
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => toggleFlag(f.key)}
                    className="h-4 w-4 accent-accent-red"
                  />
                  <span className={on ? 'font-semibold text-ink-900' : ''}>{f.label}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      {activeFilters > 0 && (
        <Link
          href={buildHref({ inStock: undefined, sale: undefined, new: undefined })}
          onClick={(e) => {
            e.preventDefault();
            setFiltersOpen(false);
            pushParams((p) => {
              p.delete('brand');
              p.delete('color');
              p.delete('size');
              p.delete('inStock');
              p.delete('sale');
              p.delete('new');
            });
          }}
          className="inline-block text-xs font-semibold uppercase tracking-wide text-accent-red hover:underline"
        >
          Сбросить фильтры ({activeFilters})
        </Link>
      )}
    </div>
  );

  return (
    <div className="container-rg py-12">
      {/* Хлебные крошки */}
      <nav className="mb-6 text-xs uppercase tracking-wide text-ink-400">
        <Link href="/" className="hover:text-accent-red">Главная</Link>
        <span className="mx-2">/</span>
        <span className="text-ink-700">{title}</span>
      </nav>

      <div className="mb-6 flex flex-wrap items-end justify-between gap-x-4 gap-y-3 md:mb-8">
        <h1 className="text-2xl font-extrabold uppercase tracking-tight sm:text-3xl md:text-4xl">{title}</h1>
        <div className="ml-auto flex items-center gap-3">
          <span className="shrink-0 text-sm text-ink-400">{products.length} товаров</span>
          <label className="flex items-center gap-2 text-sm">
            <span className="hidden text-ink-500 sm:inline">Сортировка:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Сортировка товаров"
              className="h-9 cursor-pointer border hairline bg-white px-3 pr-8 text-sm text-ink-900 outline-none hover:border-ink-900 focus:border-ink-900"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.key} value={o.key}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* Мобильная кнопка фильтров (десктоп — боковая колонка) */}
      <div className="mb-6 lg:hidden">
        <button
          type="button"
          onClick={() => setFiltersOpen((v) => !v)}
          aria-expanded={filtersOpen}
          className="flex w-full items-center justify-between border hairline px-4 py-3 text-sm font-semibold uppercase tracking-wide text-ink-900"
        >
          <span>Фильтры{activeFilters > 0 ? ` (${activeFilters})` : ''}</span>
          <span className={`transition-transform ${filtersOpen ? 'rotate-180' : ''}`}>▾</span>
        </button>
        {filtersOpen && <div className="mt-2 border hairline p-4">{filters}</div>}
      </div>

      <div className="grid items-start gap-10 lg:grid-cols-[240px_1fr]">
        {/* Фильтры */}
        <aside className="hidden lg:block">{filters}</aside>

        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="flex min-h-[240px] flex-col items-start justify-center gap-4 border hairline p-8">
            <p className="text-ink-500">По выбранным фильтрам ничего не найдено.</p>
          </div>
        )}
      </div>
    </div>
  );
}
