'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/components/cart/CartProvider';
import { Button, ButtonLink } from '@/components/ui/Button';
import { ProductPlaceholder } from '@/components/ui/ProductPlaceholder';
import { formatPrice } from '@/lib/format';

export default function CartPage() {
  const { items, subtotal, promo, setPromo, setQty, remove, clear } = useCart();
  const [promoInput, setPromoInput] = useState('');

  if (items.length === 0) {
    return (
      <div className="container-rg py-24 text-center">
        <h1 className="text-3xl font-extrabold uppercase tracking-tight">Корзина пуста</h1>
        <p className="mx-auto mt-4 max-w-md text-ink-500">
          Загляните в каталог — подберём защиту под вашу задачу.
        </p>
        <div className="mt-8">
          <ButtonLink href="/catalog" size="lg">В каталог</ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="container-rg py-10">
      <div className="mb-8 flex items-end justify-between border-b hairline pb-5">
        <h1 className="text-3xl font-extrabold uppercase tracking-tight md:text-4xl">Корзина</h1>
        <button onClick={clear} className="text-xs uppercase tracking-wide text-ink-400 hover:text-accent-red">
          Очистить
        </button>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        {/* Позиции */}
        <div className="divide-y hairline border-y hairline">
          {items.map((item) => (
            <div key={item.key} className="flex gap-4 py-5">
              <div className="h-24 w-24 shrink-0 border hairline">
                <ProductPlaceholder categorySlug={item.categorySlug} className="h-full w-full" />
              </div>
              <div className="flex flex-1 flex-col">
                <Link href={`/product/${item.slug}`} className="text-sm font-semibold uppercase hover:text-accent-red">
                  {item.name}
                </Link>
                {item.variantName && <span className="mt-1 text-xs text-ink-400">{item.variantName}</span>}
                <div className="mt-auto flex items-center gap-4 pt-3">
                  <div className="flex items-center border hairline">
                    <button className="h-9 w-9 text-ink-600 hover:text-accent-red" onClick={() => setQty(item.key, item.qty - 1)} aria-label="Меньше">−</button>
                    <span className="w-8 text-center text-sm font-bold">{item.qty}</span>
                    <button className="h-9 w-9 text-ink-600 hover:text-accent-red" onClick={() => setQty(item.key, item.qty + 1)} aria-label="Больше">+</button>
                  </div>
                  <button onClick={() => remove(item.key)} className="text-xs uppercase tracking-wide text-ink-400 hover:text-accent-red">
                    Удалить
                  </button>
                </div>
              </div>
              <div className="text-right font-heading font-bold text-ink-900">
                {formatPrice(Number(item.price) * item.qty)}
              </div>
            </div>
          ))}
        </div>

        {/* Итог */}
        <aside className="h-fit border hairline p-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-ink-500">Итого</h2>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-ink-500">Товары</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-ink-500">Доставка</span>
            <span className="text-ink-400">рассчитается при оформлении</span>
          </div>

          {/* Промокод */}
          <div className="mt-5 border-t hairline pt-4">
            <label className="text-xs font-bold uppercase tracking-widest text-ink-500">Промокод</label>
            {promo ? (
              <div className="mt-2 flex items-center justify-between gap-2 border border-brand-dark/30 bg-ink-50 px-3 py-2.5 text-sm">
                <span className="font-semibold uppercase tracking-wide text-ink-900">{promo}</span>
                <button
                  type="button"
                  onClick={() => { setPromo(''); setPromoInput(''); }}
                  className="text-xs uppercase tracking-wide text-ink-400 hover:text-accent-red"
                >
                  Убрать
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const v = promoInput.trim();
                  if (v) setPromo(v.toUpperCase());
                }}
                className="mt-2 flex gap-2"
              >
                <input
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Введите промокод"
                  aria-label="Промокод"
                  className="h-11 w-full flex-1 border hairline px-4 text-sm uppercase outline-none focus:border-ink-900"
                />
                <Button type="submit" variant="outline" className="h-11 shrink-0 px-4">Применить</Button>
              </form>
            )}
            <p className="mt-2 text-xs text-ink-400">
              Скидку по промокоду рассчитает система при оформлении.
            </p>
          </div>

          <div className="mt-5 flex items-baseline justify-between border-t hairline pt-4">
            <span className="text-sm font-bold uppercase">К оплате</span>
            <span className="font-heading text-2xl font-extrabold">{formatPrice(subtotal)}</span>
          </div>
          <div className="mt-6">
            <ButtonLink href="/checkout" size="lg" className="w-full">Оформить заказ</ButtonLink>
          </div>
          <p className="mt-3 text-xs text-ink-400">
            Точные цены, скидки и доставку рассчитает система на шаге оформления.
          </p>
        </aside>
      </div>
    </div>
  );
}
