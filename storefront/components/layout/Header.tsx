'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { CATEGORIES } from '@/lib/mock';
import { useCart } from '@/components/cart/CartProvider';
import { useFavorites } from '@/components/favorites/FavoritesProvider';

const NAV_LINKS = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/shop', label: 'Магазин' },
  { href: '/pages/dostavka-i-oplata', label: 'Доставка и оплата' },
  { href: '/pages/o-kompanii', label: 'О компании' },
  { href: '/pages/kontakty', label: 'Контакты' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();
  const { count: favCount } = useFavorites();
  const router = useRouter();
  const pathname = usePathname();

  function onSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const q = String(data.get('q') || '').trim();
    router.push(q ? `/catalog?q=${encodeURIComponent(q)}` : '/catalog');
  }

  return (
    <header className="sticky top-0 z-40 bg-brand-dark/95 text-white backdrop-blur">
      {/* Основная строка */}
      <div className="container-rg flex h-20 items-center gap-6">
        <Link href="/" className="shrink-0" aria-label="RUSGEAR — на главную">
          <Image
            src="/logo.png"
            alt="RUSGEAR"
            width={180}
            height={52}
            priority
            className="h-11 w-auto"
          />
        </Link>

        <form onSubmit={onSearch} className="ml-auto hidden items-center md:flex">
          <div className="flex w-full max-w-xs items-center border border-white/40 focus-within:border-white">
            <input
              name="q"
              placeholder="Поиск по каталогу…"
              className="h-9 w-full bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/60"
              aria-label="Поиск по каталогу"
            />
            <button type="submit" className="flex h-9 w-9 items-center justify-center text-white hover:text-accent-red" aria-label="Найти">
              <SearchIcon />
            </button>
          </div>
        </form>

        <nav className="flex items-center gap-5">
          <Link href="/account" className="flex items-center text-white hover:text-accent-red" aria-label="Личный кабинет" title="Личный кабинет">
            <UserIcon />
          </Link>
          <Link href="/favorites" className="relative flex items-center text-white hover:text-accent-red" aria-label="Избранное" title="Избранное">
            <HeartIcon />
            {favCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-red px-1 text-[10px] font-bold text-white">
                {favCount}
              </span>
            )}
          </Link>
          <Link href="/cart" className="relative flex items-center gap-2 text-white hover:text-accent-red" aria-label="Корзина">
            <CartIcon />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-red px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          <button className="md:hidden text-white" onClick={() => setMenuOpen((v) => !v)} aria-label="Меню">
            <MenuIcon />
          </button>
        </nav>
      </div>

      {/* Строка категорий (desktop) */}
      <div className="hidden border-t border-white/10 md:block">
        <div className="container-rg flex h-11 items-center gap-7 text-xs font-semibold uppercase tracking-wide">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`whitespace-nowrap transition-colors hover:text-accent-red ${pathname === l.href ? 'text-white' : 'text-white/60'}`}
            >
              {l.label}
            </Link>
          ))}
          <a href="tel:+70000000000" className="ml-auto whitespace-nowrap text-xs text-white hover:text-accent-red">
            +7 (000) 000-00-00
          </a>
        </div>
      </div>

      {/* Мобильное меню */}
      {menuOpen && (
        <div className="border-t border-white/10 md:hidden">
          <div className="container-rg flex flex-col py-3">
            <Link href="/catalog" className="py-2 text-sm font-semibold uppercase text-white" onClick={() => setMenuOpen(false)}>
              Весь каталог
            </Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/catalog?category=${c.slug}`}
                className="py-2 text-sm text-white/80"
                onClick={() => setMenuOpen(false)}
              >
                {c.name}
              </Link>
            ))}
            <div className="mt-2 border-t border-white/10 pt-2">
              {NAV_LINKS.filter((l) => l.href !== '/catalog').map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block py-2 text-sm font-semibold uppercase text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}
function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 4h2l2.4 12.4a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L21 8H6" />
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 20s-7-4.6-9.2-9A4.6 4.6 0 0 1 12 6.5 4.6 4.6 0 0 1 21.2 11C19 15.4 12 20 12 20z" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
