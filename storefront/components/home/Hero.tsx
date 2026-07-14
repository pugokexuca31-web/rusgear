import { ButtonLink } from '@/components/ui/Button';
import { asset } from '@/lib/asset';

export function Hero() {
  return (
    <section className="mx-auto w-full max-w-content pb-8 md:px-6 lg:px-10">
      <div className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute -right-40 top-0 h-full w-2/3 bg-gradient-to-l from-ink-950/40 to-transparent" />

        {/* Изображение справа — крупнее блока: голова сверху и ноги снизу выходят
            за его границы и обрезаются краями блока (overflow-hidden) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset('/manvBJ2.png')}
          alt="Боец в бронежилете RUSGEAR"
          style={{ height: '175%', transform: 'translateY(calc(-50% + 70px))' }}
          className="pointer-events-none absolute right-0 top-1/2 hidden w-auto md:block"
        />
        <div className="relative px-6 py-14 md:px-12 md:py-20">
          <div className="flex flex-col justify-center">
            <h1 className="font-heading text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-[#F0F0F0] md:text-6xl">
              Надёжность,<br />проверенная<br /><span className="text-accent-red">в деле</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#F0F0F0]">
              Бронежилеты, бронеплиты и военное снаряжение. Доставка по всей России
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/catalog" size="lg" className="!text-[#F0F0F0]">
                Перейти в каталог
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* Мобильная версия: изображение снизу под кнопкой, во всю ширину блока,
            ~половина его высоты, обрезано сверху и снизу (object-cover). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset('/manvBJ2.png')}
          alt="Боец в бронежилете RUSGEAR"
          className="pointer-events-none relative block h-52 w-full object-cover object-[50%_22%] md:hidden"
        />
      </div>
    </section>
  );
}
