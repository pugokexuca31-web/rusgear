import type { Config } from 'tailwindcss';

/**
 * Дизайн-токены RUSGEAR — строгий минимализм, desktop-first.
 * Основа — серый; фирменные тёмный/светлый; акценты — синий/красный.
 * См. rusgear/CLAUDE.md §3.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Фирменные цвета магазина
        brand: {
          dark: '#3A301F',
          light: '#B5A07F',
        },
        accent: {
          blue: '#21519E',
          red: '#CE3730',
        },
        // Серая база интерфейса (нейтральная шкала)
        ink: {
          50: '#f6f6f5',
          100: '#e9e9e7',
          200: '#d3d2ce',
          300: '#b3b1ab',
          400: '#8b8880',
          500: '#6d6a62',
          600: '#565349',
          700: '#454239',
          800: '#2b2925',
          900: '#1a1815',
          950: '#0f0e0c',
        },
      },
      fontFamily: {
        // --font-heading: заглушка под HALVAR BREITSCHRIFT (коммерческий).
        // Заменить на реальные файлы шрифта при лицензии — см. app/layout.tsx.
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1360px',
      },
      borderRadius: {
        card: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
