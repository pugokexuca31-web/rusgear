// EXPORT=1 → статическая сборка для GitHub Pages (под-адрес /rusgear).
// Без EXPORT — обычный standalone-сервер (dev / свой домен).
const isExport = process.env.EXPORT === '1';
const basePath = isExport ? '/rusgear' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isExport ? 'export' : 'standalone',
  basePath,
  reactStrictMode: true,
  // Витрину в dev открывают по внешнему домену превью-стенда, а не по localhost.
  // Без этого Next блокирует cross-origin запросы к dev-ресурсам (HMR/чанки),
  // из-за чего на странице отваливается вся клиентская интерактивность
  // (кнопки «В корзину», поиск и т.п.). Разрешаем хосты стенда.
  allowedDevOrigins: ['*.devgreenboxweb.ru'],
  // Прокидываем basePath в клиент для хелпера asset().
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    // Статический экспорт не умеет оптимизацию на лету — отдаём картинки как есть.
    unoptimized: true,
    // Медиа платформы приходят готовыми публичными URL (Caddy /media/* → MinIO).
    // Для макета используем локальные плейсхолдеры; при сращивании добавить хосты.
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
};

export default nextConfig;
