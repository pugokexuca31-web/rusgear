import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CatalogClient } from './CatalogClient';

export const metadata: Metadata = { title: 'Каталог' };

export default function CatalogPage() {
  // Фильтрация каталога вынесена в клиент (useSearchParams), чтобы витрину можно
  // было отдавать статикой (GitHub Pages). Suspense обязателен для useSearchParams.
  return (
    <Suspense fallback={<div className="container-rg py-12" />}>
      <CatalogClient />
    </Suspense>
  );
}
