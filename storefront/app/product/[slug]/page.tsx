import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProduct } from '@/lib/api';
import { PRODUCTS } from '@/lib/mock';
import { ProductDetail } from '@/components/product/ProductDetail';
import { ProductDescription } from '@/components/product/ProductDescription';

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

  return (
    <div className="container-rg py-10">
      <nav className="mb-6 text-xs uppercase tracking-wide text-ink-400">
        <Link href="/" className="hover:text-accent-red">Главная</Link>
        <span className="mx-2">/</span>
        <Link href="/catalog" className="hover:text-accent-red">Каталог</Link>
        <span className="mx-2">/</span>
        <span className="text-ink-700">{product.name}</span>
      </nav>

      <ProductDetail product={product} />

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
