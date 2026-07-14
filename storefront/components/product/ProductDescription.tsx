import type { ReactNode } from 'react';

/**
 * Рендерит структурированное описание товара из простого текста:
 * — секции разделяются строкой «⸻»;
 * — строки, начинающиеся с «•», собираются в маркированный список;
 * — первая обычная строка секции — подзаголовок, остальные — абзацы.
 */
export function ProductDescription({ text }: { text: string }) {
  const sections = text
    .split('⸻')
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="max-w-3xl space-y-8">
      {sections.map((section, si) => {
        const lines = section
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean);

        const nodes: ReactNode[] = [];
        let bullets: string[] = [];
        let seenHeading = false;

        const flushBullets = () => {
          if (bullets.length === 0) return;
          const items = bullets;
          nodes.push(
            <ul
              key={`ul-${nodes.length}`}
              className="list-disc space-y-1.5 pl-5 text-base leading-relaxed text-ink-600 marker:text-accent-red"
            >
              {items.map((b, bi) => (
                <li key={bi}>{b}</li>
              ))}
            </ul>,
          );
          bullets = [];
        };

        lines.forEach((line) => {
          if (line.startsWith('•')) {
            bullets.push(line.replace(/^•\s*/, ''));
            return;
          }
          flushBullets();
          if (!seenHeading) {
            seenHeading = true;
            nodes.push(
              <h3
                key={`h-${nodes.length}`}
                className="text-base font-bold uppercase tracking-wide text-ink-900"
              >
                {line}
              </h3>,
            );
          } else {
            nodes.push(
              <p key={`p-${nodes.length}`} className="text-base leading-relaxed text-ink-600">
                {line}
              </p>,
            );
          }
        });
        flushBullets();

        return (
          <div key={si} className="space-y-3">
            {nodes}
          </div>
        );
      })}
    </div>
  );
}
