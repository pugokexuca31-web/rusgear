import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Магазин',
  description: 'Адрес магазина RUSGEAR, график работы и схема проезда.',
};

const ADDRESS = 'Ленинский просп., 68/10, Москва';
const MAP_SRC =
  'https://yandex.ru/map-widget/v1/?mode=search&text=' +
  encodeURIComponent('Москва, Ленинский проспект, 68/10') +
  '&z=16';

export default function ShopPage() {
  return (
    <div className="container-rg py-12">
      <nav className="mb-6 text-xs uppercase tracking-wide text-ink-400">
        <Link href="/" className="hover:text-accent-red">Главная</Link>
        <span className="mx-2">/</span>
        <span className="text-ink-700">Магазин</span>
      </nav>

      <h1 className="mb-8 text-3xl font-extrabold uppercase tracking-tight md:text-4xl">Магазин</h1>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        {/* Инфо */}
        <div className="space-y-8">
          <div>
            <h2 className="mb-2 text-xs uppercase tracking-widest text-ink-400">Адрес</h2>
            <p className="text-lg font-semibold text-ink-900">{ADDRESS}</p>
          </div>

          <div>
            <h2 className="mb-2 text-xs uppercase tracking-widest text-ink-400">График работы</h2>
            <p className="text-lg font-semibold text-ink-900">Понедельник — воскресенье</p>
            <p className="text-ink-600">09:00 — 21:00, без выходных</p>
          </div>

          <div>
            <h2 className="mb-2 text-xs uppercase tracking-widest text-ink-400">Телефон</h2>
            <a href="tel:+70000000000" className="text-lg font-semibold text-ink-900 hover:text-accent-red">
              +7 (000) 000-00-00
            </a>
          </div>
        </div>

        {/* Карта */}
        <div className="border hairline">
          <iframe
            src={MAP_SRC}
            title="Расположение магазина RUSGEAR на карте"
            className="h-[320px] w-full md:h-[440px]"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
