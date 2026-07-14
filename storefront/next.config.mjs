/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  // Витрину в dev открывают по внешнему домену превью-стенда, а не по localhost.
  // Без этого Next блокирует cross-origin запросы к dev-ресурсам (HMR/чанки),
  // из-за чего на странице отваливается вся клиентская интерактивность
  // (кнопки «В корзину», поиск и т.п.). Разрешаем хосты стенда.
  allowedDevOrigins: ['*.devgreenboxweb.ru'],
  images: {
    // Медиа платформы приходят готовыми публичными URL (Caddy /media/* → MinIO).
    // Для макета используем локальные плейсхолдеры; при сращивании добавить хосты.
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
};

export default nextConfig;
