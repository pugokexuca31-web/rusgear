'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/cart/CartProvider';
import { Button, ButtonLink } from '@/components/ui/Button';
import { formatPrice } from '@/lib/format';

/**
 * Оформление заказа — макет Фазы 1 (гостевое).
 * При сращивании: расчёт через POST /cart/quote, город/ПВЗ через
 * /delivery/cdek/*, создание заказа POST /orders, оплата — редирект на paymentUrl.
 * Регистрация/ЛК — Фаза 2.
 */
export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const [promo, setPromo] = useState('');

  if (placed) {
    return (
      <div className="container-rg py-24 text-center">
        <h1 className="text-3xl font-extrabold uppercase tracking-tight">Заказ оформлен</h1>
        <p className="mx-auto mt-4 max-w-md text-ink-500">
          Это демонстрационный макет. На боевой версии заказ создаётся в системе,
          приходит номер и ссылка для отслеживания, далее — оплата.
        </p>
        <div className="mt-8"><ButtonLink href="/catalog" size="lg">Продолжить покупки</ButtonLink></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-rg py-24 text-center">
        <h1 className="text-3xl font-extrabold uppercase tracking-tight">Нечего оформлять</h1>
        <div className="mt-8"><ButtonLink href="/catalog" size="lg">В каталог</ButtonLink></div>
      </div>
    );
  }

  const input = 'h-12 w-full border hairline px-4 text-sm outline-none focus:border-ink-900';

  return (
    <div className="container-rg py-10">
      <nav className="mb-6 text-xs uppercase tracking-wide text-ink-400">
        <Link href="/cart" className="hover:text-accent-red">Корзина</Link>
        <span className="mx-2">/</span>
        <span className="text-ink-700">Оформление</span>
      </nav>

      <h1 className="mb-8 text-3xl font-extrabold uppercase tracking-tight md:text-4xl">Оформление заказа</h1>

      <form
        onSubmit={(e) => { e.preventDefault(); setPlaced(true); clear(); }}
        className="grid gap-10 lg:grid-cols-[1fr_360px]"
      >
        <div className="space-y-10">
          <section>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-ink-500">Покупатель</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <input required placeholder="Имя" className={input} />
              <input required placeholder="Телефон" className={input} />
              <input required type="email" placeholder="E-mail" className={`${input} sm:col-span-2`} />
              <input placeholder="Компания / ИНН (для юрлиц)" className={`${input} sm:col-span-2`} />
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-ink-500">Доставка СДЭК</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <input required placeholder="Город" className={input} />
              <select className={input} defaultValue="pvz">
                <option value="pvz">Пункт выдачи (ПВЗ)</option>
                <option value="door">Курьером до двери</option>
              </select>
              <input placeholder="Адрес / код ПВЗ" className={`${input} sm:col-span-2`} />
            </div>
            <p className="mt-3 text-xs text-ink-400">
              Стоимость и сроки доставки рассчитает система (СДЭК) по вашему городу.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-ink-500">Оплата</h2>
            <div className="border hairline p-4 text-sm text-ink-600">
              Онлайн-оплата (СДЭК PAY) — подключается на боевой версии. Для юрлиц
              возможна оплата по счёту (уточняется).
            </div>
          </section>
        </div>

        <aside className="h-fit border hairline p-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-ink-500">Ваш заказ</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {items.map((i) => (
              <li key={i.key} className="flex justify-between gap-3">
                <span className="text-ink-600">{i.name}{i.variantName ? `, ${i.variantName}` : ''} × {i.qty}</span>
                <span className="shrink-0 font-medium">{formatPrice(Number(i.price) * i.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t hairline pt-4">
            <label className="text-xs font-bold uppercase tracking-widest text-ink-500">Промокод</label>
            <div className="mt-2 flex gap-2">
              <input
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Введите промокод"
                className={`${input} h-11 flex-1 uppercase`}
              />
              <Button type="button" variant="outline" className="h-11 shrink-0 px-4">Применить</Button>
            </div>
            <p className="mt-2 text-xs text-ink-400">
              Скидку по промокоду рассчитает система при оформлении.
            </p>
          </div>
          <div className="mt-5 flex items-baseline justify-between border-t hairline pt-4">
            <span className="text-sm font-bold uppercase">Итого</span>
            <span className="font-heading text-2xl font-extrabold">{formatPrice(subtotal)}</span>
          </div>
          <div className="mt-6"><Button size="lg" type="submit" className="w-full">Подтвердить заказ</Button></div>
        </aside>
      </form>
    </div>
  );
}
