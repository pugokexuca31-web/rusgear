import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { STATIC_PAGES } from '@/lib/pages';

export function generateStaticParams() {
  return Object.keys(STATIC_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: STATIC_PAGES[slug]?.title ?? 'Страница' };
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = STATIC_PAGES[slug];
  if (!page) notFound();

  return (
    <div className="container-rg py-12">
      <nav className="mb-6 text-xs uppercase tracking-wide text-ink-400">
        <Link href="/" className="hover:text-accent-red">Главная</Link>
        <span className="mx-2">/</span>
        <span className="text-ink-700">{page.title}</span>
      </nav>
      <h1 className="mb-8 text-3xl font-extrabold uppercase tracking-tight md:text-4xl">{page.title}</h1>
      <div className="max-w-3xl space-y-5 text-base leading-relaxed text-ink-600">
        {page.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
}
