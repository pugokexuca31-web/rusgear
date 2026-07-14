'use client';

import Link from 'next/link';
import { useFavorites } from '@/components/favorites/FavoritesProvider';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ButtonLink } from '@/components/ui/Button';

export default function FavoritesPage() {
  const { items, count, clear } = useFavorites();

  if (count === 0) {
    return (
      <div className="container-rg py-24 text-center">
        <h1 className="text-3xl font-extrabold uppercase tracking-tight">В избранном пусто</h1>
        <p className="mx-auto mt-4 max-w-md text-ink-500">
          Отмечайте товары значком сердца — они появятся здесь.
        </p>
        <div className="mt-8">
          <ButtonLink href="/catalog" size="lg">В каталог</ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="container-rg py-10">
      <nav className="mb-6 text-xs uppercase tracking-wide text-ink-400">
        <Link href="/" className="hover:text-accent-red">Главная</Link>
        <span className="mx-2">/</span>
        <span className="text-ink-700">Избранное</span>
      </nav>

      <div className="mb-8 flex items-end justify-between border-b hairline pb-5">
        <h1 className="text-3xl font-extrabold uppercase tracking-tight md:text-4xl">Избранное</h1>
        <button onClick={clear} className="text-xs uppercase tracking-wide text-ink-400 hover:text-accent-red">
          Очистить
        </button>
      </div>

      <ProductGrid products={items} />
    </div>
  );
}
