/**
 * Плейсхолдер изображения товара для Фазы 1 (реальные фото — с OZON при сращивании).
 * Минималистичный: нейтральный фон + силуэт по категории + монограмма.
 */
type Shape = 'vest' | 'plate' | 'carrier' | 'helmet' | 'gear';

const SHAPE_BY_CATEGORY: Record<string, Shape> = {
  bronejilety: 'vest',
  broneplity: 'plate',
  chehly: 'carrier',
  sumki: 'gear',
  ekipirovka: 'helmet',
};

function Silhouette({ shape }: { shape: Shape }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 3 };
  switch (shape) {
    case 'helmet':
      return (
        <g {...common}>
          <path d="M30 62 A30 30 0 0 1 90 62 L90 74 L30 74 Z" />
          <path d="M30 74 L24 80 L40 80" />
        </g>
      );
    case 'plate':
      return (
        <g {...common}>
          <path d="M38 34 H82 L86 44 V86 L60 96 L34 86 V44 Z" />
        </g>
      );
    case 'carrier':
      return (
        <g {...common}>
          <path d="M40 30 H80 V96 H40 Z" />
          <path d="M40 44 H80 M40 60 H80 M40 76 H80" />
        </g>
      );
    case 'gear':
      return (
        <g {...common}>
          <rect x="40" y="40" width="40" height="48" rx="3" />
          <path d="M40 54 H80" />
        </g>
      );
    case 'vest':
    default:
      return (
        <g {...common}>
          <path d="M42 28 L60 38 L78 28 L84 46 L76 52 V96 H44 V52 L36 46 Z" />
        </g>
      );
  }
}

export function ProductPlaceholder({
  categorySlug,
  className = '',
}: {
  categorySlug?: string;
  className?: string;
}) {
  const shape = (categorySlug && SHAPE_BY_CATEGORY[categorySlug]) || 'vest';
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-ink-100 ${className}`}
      aria-hidden
    >
      <div className="absolute inset-0 opacity-[0.04] [background-image:repeating-linear-gradient(45deg,transparent,transparent_8px,#000_8px,#000_9px)]" />
      <svg viewBox="0 0 120 120" className="h-3/4 w-3/4 text-ink-400">
        <Silhouette shape={shape} />
      </svg>
      <span className="absolute bottom-3 right-3 font-heading text-[10px] font-bold uppercase tracking-widest text-ink-300">
        RUSGEAR
      </span>
    </div>
  );
}
