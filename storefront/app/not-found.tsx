import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="container-rg py-32 text-center">
      <div className="font-heading text-7xl font-extrabold text-ink-200">404</div>
      <h1 className="mt-4 text-2xl font-extrabold uppercase tracking-tight">Страница не найдена</h1>
      <p className="mx-auto mt-3 max-w-md text-ink-500">
        Возможно, товар снят с продажи или ссылка устарела.
      </p>
      <div className="mt-8"><ButtonLink href="/" size="lg">На главную</ButtonLink></div>
    </div>
  );
}
