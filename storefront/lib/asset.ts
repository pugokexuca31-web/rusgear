/**
 * Префикс basePath для корне-абсолютных путей к статике.
 *
 * На GitHub Pages сайт живёт по под-адресу (`/rusgear`), поэтому «сырые» пути
 * вида `/products/x.webp` в тегах <img> нужно префиксовать вручную
 * (в отличие от next/image и <Link>, которым Next добавляет basePath сам).
 * Без EXPORT basePath пустой — в dev и на своём домене всё работает как раньше.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function asset(path?: string): string | undefined {
  if (!path) return path;
  return path.startsWith('/') ? `${BASE_PATH}${path}` : path;
}
