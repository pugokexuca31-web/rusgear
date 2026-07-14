import type { Metadata } from 'next';
import { Montserrat, Archivo } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/components/cart/CartProvider';
import { FavoritesProvider } from '@/components/favorites/FavoritesProvider';

// Основной шрифт сайта.
const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-body',
  display: 'swap',
});

// Заголовочный шрифт. Archivo — временная замена HALVAR BREITSCHRIFT
// (коммерческий): при получении лицензии заменить на next/font/local с файлами
// шрифта и переопределить переменную --font-heading.
const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'RUSGEAR — бронежилеты и средства бронезащиты',
    template: '%s · RUSGEAR',
  },
  description:
    'Бронежилеты, бронепластины и тактическое снаряжение. Средний и премиум сегмент. Оптовые поставки.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${montserrat.variable} ${archivo.variable}`}>
      <body className="flex min-h-screen flex-col">
        <FavoritesProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
