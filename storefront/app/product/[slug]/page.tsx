import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProduct } from '@/lib/api';
import { PRODUCTS } from '@/lib/mock';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductDescription } from '@/components/product/ProductDescription';
import { ProductPurchase } from '@/components/product/ProductPurchase';
import { discountPercent } from '@/lib/format';

// Статический экспорт: перечисляем все slug'и, чтобы Next отрендерил страницы заранее.
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  return { title: product?.name ?? 'Товар' };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const off = discountPercent(product.price, product.compareAtPrice);
  const attributes = Object.entries(product.attributes ?? {});

  return (
    <div className="container-rg py-10">
      <nav className="mb-6 text-xs uppercase tracking-wide text-ink-400">
        <Link href="/" className="hover:text-accent-red">Главная</Link>
        <span className="mx-2">/</span>
        <Link href="/catalog" className="hover:text-accent-red">Каталог</Link>
        <span className="mx-2">/</span>
        <span className="text-ink-700">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Медиа */}
        <ProductGallery
          media={product.media}
          name={product.name}
          categorySlug={product.categorySlug}
          saleBadge={product.onSale && off ? `−${off}%` : null}
          isNew={product.isNew}
        />

        {/* Информация и покупка */}
        <div>
          {product.brand && (
            <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-ink-400">
              {product.brand.name}
            </div>
          )}
          <h1 className="text-2xl font-extrabold uppercase leading-tight tracking-tight md:text-3xl">
            {product.name}
          </h1>
          <div className="mt-1 text-xs text-ink-400">Артикул: {product.sku}</div>

          <div className="mt-8">
            <ProductPurchase product={product} />
          </div>

          {attributes.length > 0 && (
            <div className="mt-10">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-ink-500">Характеристики</h2>
              <dl className="divide-y hairline border-y hairline">
                {attributes.map(([k, v]) => (
                  <div key={k} className="flex justify-between py-3 text-sm">
                    <dt className="text-ink-500">{k}</dt>
                    <dd className="font-medium text-ink-900">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>

      {/* Описание */}
      {product.description && (
        <div className="mt-16">
          <h2 className="mb-6 text-xl font-extrabold uppercase tracking-tight">Описание</h2>
          <ProductDescription text={product.description} />
        </div>
      )}
    </div>
  );
}
