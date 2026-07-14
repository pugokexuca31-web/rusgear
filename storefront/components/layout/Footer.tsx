import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES } from '@/lib/mock';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-black/20 bg-brand-dark text-white">
      <div className="container-rg grid gap-10 py-14 md:grid-cols-3">
        <div>
          <Image
            src="/logo.png"
            alt="RUSGEAR"
            width={200}
            height={58}
            className="h-14 w-auto"
          />
        </div>

        <div>
          <h4 className="mb-4 text-xs tracking-widest text-white/60">Каталог</h4>
          <ul className="space-y-2 text-sm text-white/60">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/catalog?category=${c.slug}`} className="hover:text-accent-red">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs tracking-widest text-white/60">Информация</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link href="/shop" className="hover:text-accent-red">Магазин</Link></li>
            <li><Link href="/pages/dostavka-i-oplata" className="hover:text-accent-red">Доставка и оплата</Link></li>
            <li><Link href="/pages/o-kompanii" className="hover:text-accent-red">О компании</Link></li>
            <li><Link href="/pages/kontakty" className="hover:text-accent-red">Контакты</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-rg flex flex-col items-start justify-between gap-2 py-5 text-xs text-white/60 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} RUSGEAR. Все права защищены.</span>
          <span>Реквизиты и политика — уточняются</span>
        </div>
      </div>
    </footer>
  );
}
