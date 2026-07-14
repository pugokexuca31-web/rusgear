/** Форматирование денег. Сервер отдаёт копейки (строкой) — показываем рубли. */
export function formatPrice(kopecks: string | number | null | undefined): string {
  if (kopecks == null) return '';
  const value = typeof kopecks === 'string' ? Number(kopecks) : kopecks;
  if (!Number.isFinite(value)) return '';
  const rubles = Math.round(value) / 100;
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(rubles);
}

export function discountPercent(
  price: string | number,
  compareAt?: string | number | null,
): number | null {
  if (compareAt == null) return null;
  const p = Number(price);
  const c = Number(compareAt);
  if (!c || c <= p) return null;
  return Math.round((1 - p / c) * 100);
}
