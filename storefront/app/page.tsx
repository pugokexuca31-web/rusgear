import { Hero } from '@/components/home/Hero';
import { CategoryTiles } from '@/components/home/CategoryTiles';
import { Features } from '@/components/home/Features';
import { ProductRail } from '@/components/home/ProductRail';
import { getCategories, getProducts } from '@/lib/api';

export default async function HomePage() {
  const [featured, fresh, categories] = await Promise.all([
    getProducts({ featured: true, limit: 8 }),
    getProducts({ new: true, limit: 8 }),
    getCategories(),
  ]);

  return (
    <>
      <Hero />
      <CategoryTiles categories={categories} />
      <ProductRail title="Хиты продаж" products={featured} href="/catalog?featured=1" />
      <ProductRail title="Новинки" products={fresh} href="/catalog?new=1" />
      <Features />
    </>
  );
}
