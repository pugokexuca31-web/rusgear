/**
 * Мок-данные витрины (Фаза 1). Структура повторяет ответы Storefront API,
 * поэтому при сращивании с Admik замена на реальные вызовы — без правок компонентов.
 * Реальный контент/фото берутся с OZON: https://www.ozon.ru/seller/rusgear/
 * Цены — в копейках.
 */
import type { Brand, Category, Product, ProductListItem } from './types';

export const CATEGORIES: Category[] = [
  { slug: 'bronejilet', name: 'Бронежилет' },
  { slug: 'podsumok', name: 'Подсумок' },
  { slug: 'plastina', name: 'Пластина для бронежилета' },
  { slug: 'razgruzochnaya-sistema', name: 'Разгрузочная система' },
  { slug: 'perehodnik', name: 'Переходник для бронежилета' },
  { slug: 'ryukzak', name: 'Рюкзак' },
  { slug: 'zashchita-shei-plech', name: 'Защита шеи, плеч к бронежилету' },
  { slug: 'protivooskolochnyy-paket', name: 'Противоосколочный пакет' },
  { slug: 'zashchita-paha', name: 'Защита паха' },
  { slug: 'broneshlem', name: 'Бронешлем' },
];

/**
 * Бренды витрины. RUSGEAR — мультибренд-магазин (см. CLAUDE.md §6), поэтому в
 * ассортименте несколько брендов. Список — плейсхолдер, финал берётся с OZON /
 * из CMS платформы (GET /brands). При сращивании фильтр пойдёт в API как brandId.
 */
export const BRANDS: Brand[] = [
  { slug: 'rusgear', name: 'RUSGEAR' },
  { slug: 'sso', name: 'ССО' },
];

const BRAND = BRANDS[0];
const BRAND_SSO = BRANDS[1];

// Размерные варианты для носимых изделий
function sizeVariants(basePrice: number) {
  return ['M', 'L', 'XL'].map((size, i) => ({
    id: `${size.toLowerCase()}`,
    sku: `SIZE-${size}`,
    name: `Размер ${size}`,
    price: String(basePrice),
    attributes: { 'Размер': size },
    inStock: i < 2,
    availableQty: i < 2 ? 12 - i * 4 : 0,
  }));
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'bronejilet-pancir-3-2-sso',
    sku: 'RG-BJ-PANCIR-3.2',
    name: 'Бронежилет ПАНЦИРЬ 3.2 ССО',
    description: `Чехол для бронепанелей Панцирь 3.2

Модульный плитоносец для размещения бронеплит и элементов противоосколочной защиты. Предназначен для использования в составе тактического бронежилета. Конструкция обеспечивает стабильную фиксацию плит и равномерное распределение нагрузки.

⸻

Преимущества по сравнению с аналогами

Конструкция адаптирована под современные требования к модульности и совместимости. Поддерживает установку дополнительной защиты без изменения базовой конфигурации. Сохраняет функциональность MOLLE системы и стабильность посадки при нагрузке.

⸻

Конструкция и регулировка

• анатомическая форма корпуса
• регулировка плечевых лямок
• настройка объёма через камербанд
• фронтальная фиксация
• равномерное распределение веса
• устойчивость при движении

⸻

Совместимость и защита

• формат под все типы бронеплит
• возможность установки мягких баллистических пакетов
• совместимость с MOLLE системой
• поддержка установки дополнительных модулей

⸻

Основные элементы конструкции

Передний модуль / плейтбэг

• отдельный карман под плиту
• загрузка с фиксацией клапаном
• фронтальная MOLLE панель
• усиленные зоны крепления

⸻

Задний модуль / плейтбэг

• карман под тыльную плиту
• фиксация клапаном
• тыльная MOLLE панель
• эвакуационная рукоять

⸻

Камербанды

• регулируемый камербанд
• плотная фиксация по корпусу
• возможность установки боковых защитных элементов

⸻

Материалы

• оригинальная Cordura® Invista
• износостойкая фурнитура
• усиленные зоны нагрузки

⸻

Размеры и цвета

Размеры:

• M
• L

Цвета:

• Мультикам (MULTIKAM)
• Atacs-FG

⸻

Комплектация

• чехол для бронепанелей Панцирь 3.2 — 1 шт

Изделие не содержит встроенной баллистической защиты.

⸻

Назначение

• служебное применение
• тактические задачи
• учебная эксплуатация
• гражданское использование

⸻

О магазине RUSGEAR

RUSGEAR — мультибренд профессиональной экипировки.

Мы собрали проверенные бренды и рабочие решения для реальных задач.

Выбор тех, кому важны надёжность, функциональность и результат.`,
    price: '1651800',
    compareAtPrice: '3600000',
    onSale: true,
    isFeatured: true,
    brand: BRAND_SSO,
    categories: ['bronejilet'],
    categorySlug: 'bronejilet',
    attributes: {
      'Тип': 'Бронежилет',
      'Страна-изготовитель': 'Россия',
      'Материал': 'Кордура',
      'Цвет': 'Atacs-FG',
      'Целевая аудитория': 'Взрослая',
      'Комплектация': 'Чехол для бронеплит',
      'Вес товара': '1500 г',
    },
    variants: [
      { id: 'm', sku: 'PANCIR-3.2-M', name: 'Размер M', attributes: { 'Размер': 'M' }, price: '1651800', compareAtPrice: '3600000', onSale: true, inStock: true, availableQty: 8 },
      { id: 'l', sku: 'PANCIR-3.2-L', name: 'Размер L', attributes: { 'Размер': 'L' }, price: '1651800', compareAtPrice: '3600000', onSale: true, inStock: true, availableQty: 6 },
    ],
    media: [
      { url: '/products/1.2.webp', type: 'image', alt: 'Бронежилет ПАНЦИРЬ 3.2 ССО', isPrimary: true },
      { url: '/products/1.3.webp', type: 'image', alt: 'Бронежилет ПАНЦИРЬ 3.2 ССО — вид 2' },
      { url: '/products/1.4.webp', type: 'image', alt: 'Бронежилет ПАНЦИРЬ 3.2 ССО — вид 3' },
      { url: '/products/1.5.webp', type: 'image', alt: 'Бронежилет ПАНЦИРЬ 3.2 ССО — вид 4' },
      { url: '/products/1.6.webp', type: 'image', alt: 'Бронежилет ПАНЦИРЬ 3.2 ССО — вид 5' },
      { url: '/products/1.7.webp', type: 'image', alt: 'Бронежилет ПАНЦИРЬ 3.2 ССО — вид 6' },
    ],
    inStock: true,
    availableQty: 14,
  },
  {
    id: '2',
    slug: 'bronejilet-skrytogo-nosheniya-br1',
    sku: 'RG-BJ-BR1',
    name: 'Бронежилет скрытого ношения БР1',
    description:
      'Лёгкий бронежилет скрытого ношения класса БР1. Незаметен под одеждой, дышащая подкладка, минимальный вес для повседневной защиты.',
    price: '1890000',
    isNew: true,
    isFeatured: true,
    brand: BRAND,
    categories: ['bronejilet'],
    categorySlug: 'bronejilet',
    attributes: { 'Класс защиты': 'БР1', 'Вес': '2.1 кг', 'Материал': 'Арамид' },
    variants: sizeVariants(1890000),
    inStock: true,
    availableQty: 34,
  },
  {
    id: '3',
    slug: 'broneplastina-br4-sapi',
    sku: 'RG-BP-BR4',
    name: 'Бронепластина БР4 SAPI',
    description:
      'Керамическая бронепластина класса БР4 форм-фактора SAPI. Останавливает бронебойные пули, эргономичный изгиб, антирикошетное покрытие.',
    price: '1290000',
    compareAtPrice: '1490000',
    onSale: true,
    brand: BRAND,
    categories: ['plastina'],
    categorySlug: 'plastina',
    attributes: { 'Класс защиты': 'БР4', 'Вес': '2.6 кг', 'Форм-фактор': 'SAPI M' },
    inStock: true,
    availableQty: 50,
  },
  {
    id: '4',
    slug: 'broneplastina-br5-polyethylene',
    sku: 'RG-BP-BR5',
    name: 'Бронепластина БР5 полиэтиленовая',
    description:
      'Сверхлёгкая полиэтиленовая бронепластина класса БР5. Плавучая, устойчива к влаге, минимальный вес при высоком классе защиты.',
    price: '1790000',
    isNew: true,
    brand: BRAND,
    categories: ['plastina'],
    categorySlug: 'plastina',
    attributes: { 'Класс защиты': 'БР5', 'Вес': '1.4 кг', 'Материал': 'СВМПЭ' },
    inStock: true,
    availableQty: 42,
  },
  {
    id: '5',
    slug: 'plitonoska-taktik',
    sku: 'RG-PN-TAC',
    name: 'Плитоноска «Тактик»',
    description:
      'Модульная плитоноска с системой MOLLE. Регулируется под любой рост и комплекцию, быстрый сброс, крепления под подсумки и бронепанели.',
    price: '890000',
    isFeatured: true,
    brand: BRAND,
    categories: ['razgruzochnaya-sistema'],
    categorySlug: 'razgruzochnaya-sistema',
    attributes: { 'Система': 'MOLLE', 'Вес': '1.2 кг', 'Материал': 'Cordura 1000D' },
    variants: [
      { id: 'black', sku: 'PN-BLK', name: 'Чёрный', attributes: { 'Цвет': 'Чёрный' }, price: '890000', inStock: true, availableQty: 30 },
      { id: 'olive', sku: 'PN-OLV', name: 'Олива', attributes: { 'Цвет': 'Олива' }, price: '890000', inStock: true, availableQty: 25 },
      { id: 'multicam', sku: 'PN-MC', name: 'Мультикам', attributes: { 'Цвет': 'Мультикам' }, price: '990000', inStock: true, availableQty: 18 },
    ],
    inStock: true,
    availableQty: 73,
  },
  {
    id: '6',
    slug: 'shlem-taktik-fast',
    sku: 'RG-SH-FAST',
    name: 'Шлем тактический FAST',
    description:
      'Баллистический шлем типа FAST класса защиты БР1. Рельсы для навесного оборудования, регулируемая подвесная система, крепление под ПНВ.',
    price: '2490000',
    compareAtPrice: '2790000',
    onSale: true,
    brand: BRAND,
    categories: ['broneshlem'],
    categorySlug: 'broneshlem',
    attributes: { 'Класс защиты': 'БР1', 'Вес': '1.5 кг', 'Тип': 'FAST High Cut' },
    inStock: true,
    availableQty: 15,
  },
  {
    id: '7',
    slug: 'zashchita-shei-modul',
    sku: 'RG-AC-NECK',
    name: 'Модуль защиты шеи',
    description:
      'Съёмный противоосколочный модуль защиты шеи. Совместим со штурмовыми бронежилетами RUSGEAR, крепление на липучках.',
    price: '390000',
    isNew: true,
    brand: BRAND,
    categories: ['zashchita-shei-plech'],
    categorySlug: 'zashchita-shei-plech',
    attributes: { 'Класс защиты': 'С2', 'Вес': '0.4 кг' },
    inStock: true,
    availableQty: 60,
  },
  {
    id: '8',
    slug: 'sumka-ak-2-molle',
    sku: 'RG-AC-AK2-MOLLE',
    name: 'Сумка АК 2 MOLLE с бесшумной застёжкой и утяжкой',
    description: `Сумка для магазинов АК-2 ССО MOLLE с бесшумной застёжкой и утяжкой

Тактический подсумок для размещения двух магазинов к автомату Калашникова. Предназначена для установки на плитник, чехол для бронеплит или другое снаряжение с MOLLE системой. Обеспечивает надёжную фиксацию магазинов и быстрый доступ без шумовых факторов.

⸻

Преимущества по сравнению с аналогами

Конструкция с бесшумной застёжкой и внутренней утяжкой позволяет использовать подсумок в условиях, где критичен контроль шума. Совместима с большинством разгрузочных систем и тактических бронежилетов. Универсальна по размещению и не ограничивает движение при активной работе.

⸻

Конструкция и регулировка

• вертикальная посадка на снаряжении
• крепление через MOLLE / PALS интерфейс
• фиксация магазинов внутренней утяжкой
• бесшумная застёжка без металлических элементов
• стабильное удержание магазинов при беге и смене положений
• равномерное распределение веса на плоскости крепления

⸻

Совместимость и защита

• совместима с тактическим бронежилетом, плитником и чехлом для бронеплит
• крепление: MOLLE система (при необходимости подсумок можно устанавливать не только на Molle основу, но и на ремни, сделав из строп петли нужного размера)
• рассчитана на магазины АК стандартных габаритов

⸻

Основные элементы конструкции

Основной корпус подсумка

• вместимость: 2 магазина АК
• жёстко формированный корпус
• защита магазинов от выпадения и смещения
• удобство работы одной рукой

Бесшумная застёжка

• текстильная система фиксации
• отсутствие липучки и металлических кнопок
• снижение шумовой заметности при открытии

Внутренняя утяжка

• шнур с фиксатором
• регулируемая плотность удержания магазинов
• адаптация под магазины с разной степенью наполнения

⸻

Материалы

• ткань: оригинальная Cordura® Invista
• усиленная стропа
• пластиковая фурнитура
• высокая устойчивость к истиранию и разрывным нагрузкам

⸻

Цвета

• Мультикам (MULTIKAM)
• ATACS-FG
• Олива
• ЕМР

⸻

Комплектация

• сумка для магазинов АК-2 — 1 шт

⸻

Назначение

• служебное применение
• тактические задачи
• учебно-тренировочное использование
• гражданское применение (стрелковые тренировки, страйкбол)

⸻

О магазине RUSGEAR

RUSGEAR — мультибренд профессиональной экипировки.

Мы собрали проверенные бренды и рабочие решения для реальных задач.

Выбор тех, кому важны надёжность, функциональность и результат.`,
    price: '398000',
    brand: BRAND_SSO,
    categories: ['podsumok'],
    categorySlug: 'podsumok',
    attributes: {
      'Тип': 'Подсумок',
      'Длина, см': '10',
      'Высота, см': '22.5',
      'Ширина, см': '7.5',
      'Тип застежки': 'Клапан',
      'Материал': 'Кордура',
      'Страна-изготовитель': 'Россия',
      'Специальные отделения': 'Внутренний карман, Отделение-органайзер',
      'Особенности конструкции сумки': 'Разделитель в главном отделении',
      'Кол-во внутренних отделений': '1',
      'Целевая аудитория': 'Взрослая',
    },
    variants: [
      { id: 'multikam', sku: 'AK2-MULTIKAM', name: 'Мультикам', attributes: { 'Цвет': 'Мультикам' }, price: '398000', inStock: true, availableQty: 20 },
      { id: 'atacs-fg', sku: 'AK2-ATACS-FG', name: 'ATACS-FG', attributes: { 'Цвет': 'ATACS-FG' }, price: '398000', inStock: true, availableQty: 20 },
      { id: 'olive', sku: 'AK2-OLIVE', name: 'Олива', attributes: { 'Цвет': 'Олива' }, price: '398000', inStock: true, availableQty: 20 },
      { id: 'emp', sku: 'AK2-EMP', name: 'ЕМР', attributes: { 'Цвет': 'ЕМР' }, price: '398000', inStock: true, availableQty: 20 },
    ],
    media: [
      { url: '/products/multikam1.webp', type: 'image', alt: 'Сумка АК 2 MOLLE — Мультикам', isPrimary: true },
      { url: '/products/multikam2.webp', type: 'image', alt: 'Сумка АК 2 MOLLE — Мультикам' },
      { url: '/products/multikam3.webp', type: 'image', alt: 'Сумка АК 2 MOLLE — Мультикам' },
      { url: '/products/multikam4.webp', type: 'image', alt: 'Сумка АК 2 MOLLE — Мультикам' },
      { url: '/products/multikam5.webp', type: 'image', alt: 'Сумка АК 2 MOLLE — Мультикам' },
      { url: '/products/atacs-fg1.webp', type: 'image', alt: 'Сумка АК 2 MOLLE — ATACS-FG' },
      { url: '/products/atacs-fg2.webp', type: 'image', alt: 'Сумка АК 2 MOLLE — ATACS-FG' },
      { url: '/products/atacs-fg3.webp', type: 'image', alt: 'Сумка АК 2 MOLLE — ATACS-FG' },
      { url: '/products/olive1.webp', type: 'image', alt: 'Сумка АК 2 MOLLE — Олива' },
      { url: '/products/emp1.webp', type: 'image', alt: 'Сумка АК 2 MOLLE — ЕМР' },
    ],
    inStock: true,
    availableQty: 80,
  },
  {
    id: '9',
    slug: 'bronejilet-shturmovoy-br4',
    sku: 'RG-BJ-BR4',
    name: 'Бронежилет штурмовой БР4',
    description:
      'Универсальный штурмовой бронежилет класса БР4. Оптимальный баланс защиты и веса, модульная платформа, быстрый сброс.',
    price: '3690000',
    isFeatured: true,
    brand: BRAND,
    categories: ['bronejilet'],
    categorySlug: 'bronejilet',
    attributes: { 'Класс защиты': 'БР4', 'Вес': '7.2 кг', 'Материал': 'Керамика' },
    variants: sizeVariants(3690000),
    inStock: true,
    availableQty: 28,
  },
  {
    id: '10',
    slug: 'broneplastina-bokovaya-br4',
    sku: 'RG-BP-SIDE',
    name: 'Бронепластина боковая БР4',
    description:
      'Боковая бронепластина класса БР4 для защиты боковых проекций. Устанавливается в карманы плитоноски.',
    price: '640000',
    compareAtPrice: '740000',
    onSale: true,
    brand: BRAND,
    categories: ['plastina'],
    categorySlug: 'plastina',
    attributes: { 'Класс защиты': 'БР4', 'Вес': '0.9 кг' },
    inStock: true,
    availableQty: 40,
  },
  {
    id: '11',
    slug: 'plitonoska-lite',
    sku: 'RG-PN-LITE',
    name: 'Плитоноска «Лайт»',
    description:
      'Облегчённая плитоноска для скрытого ношения под одеждой. Минимальный профиль, дышащая сетка, крепление панелей.',
    price: '590000',
    isNew: true,
    brand: BRAND,
    categories: ['razgruzochnaya-sistema'],
    categorySlug: 'razgruzochnaya-sistema',
    attributes: { 'Вес': '0.7 кг', 'Материал': 'Нейлон' },
    inStock: true,
    availableQty: 22,
  },
  {
    id: '12',
    slug: 'shlem-sfera',
    sku: 'RG-SH-SFERA',
    name: 'Шлем защитный «Сфера»',
    description:
      'Общевойсковой защитный шлем класса БР2. Проверенная конструкция, полное покрытие головы, амортизирующий подпор.',
    price: '1990000',
    brand: BRAND,
    categories: ['broneshlem'],
    categorySlug: 'broneshlem',
    attributes: { 'Класс защиты': 'БР2', 'Вес': '2.3 кг' },
    inStock: false,
    availableQty: 0,
  },
];

function toListItem(p: Product): ProductListItem {
  return {
    slug: p.slug,
    name: p.name,
    price: p.price,
    compareAtPrice: p.compareAtPrice,
    onSale: p.onSale,
    isNew: p.isNew,
    isFeatured: p.isFeatured,
    brand: p.brand,
    imageUrl: p.media?.[0]?.url ?? null,
    inStock: p.inStock,
    availableQty: p.availableQty,
    variants: p.variants,
    categorySlug: p.categorySlug,
  };
}

export const PRODUCT_LIST: ProductListItem[] = PRODUCTS.map(toListItem);

// ---- Атрибутные фильтры (цвет, размер) ----
// Значения живут в вариантах (и иногда в attributes товара). Собираем справочник
// опций и карту slug→ключи для фильтрации. Ключ — регистронезависимый (Atacs-FG /
// ATACS-FG считаем одним цветом). Список финализируется по OZON / CMS платформы.

export interface FilterOption {
  key: string; // нормализованный ключ (lowercase)
  label: string; // отображаемое название (первое встреченное написание)
}

function collectAttr(p: Product, attr: string): string[] {
  const vals: string[] = [];
  const top = p.attributes?.[attr];
  if (top) vals.push(top);
  p.variants?.forEach((v) => {
    const val = v.attributes?.[attr];
    if (val) vals.push(val);
  });
  return vals;
}

function buildOptions(attr: string): FilterOption[] {
  const seen = new Map<string, string>();
  PRODUCTS.forEach((p) =>
    collectAttr(p, attr).forEach((raw) => {
      const key = raw.trim().toLowerCase();
      if (!seen.has(key)) seen.set(key, raw.trim());
    }),
  );
  return [...seen].map(([key, label]) => ({ key, label }));
}

function buildKeyMap(attr: string): Map<string, Set<string>> {
  return new Map(
    PRODUCTS.map((p) => [
      p.slug,
      new Set(collectAttr(p, attr).map((v) => v.trim().toLowerCase())),
    ]),
  );
}

export const COLORS: FilterOption[] = buildOptions('Цвет');
export const SIZES: FilterOption[] = buildOptions('Размер');
export const PRODUCT_COLOR_KEYS = buildKeyMap('Цвет');
export const PRODUCT_SIZE_KEYS = buildKeyMap('Размер');
