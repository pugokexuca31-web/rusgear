'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

/**
 * Форма обратной связи на странице «Контакты» — макет Фазы 1.
 * При сращивании: POST /api/storefront/v1/leads { name, email, message }.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);
  const input = 'w-full border hairline px-4 text-sm outline-none focus:border-ink-900';

  if (sent) {
    return (
      <div className="border hairline p-6 text-sm text-ink-600">
        Спасибо! Ваше сообщение отправлено — менеджер свяжется с вами в ближайшее время.
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: POST /api/storefront/v1/leads { name, email, message }
        setSent(true);
      }}
      className="space-y-3"
    >
      <input required name="name" placeholder="Имя" className={`${input} h-12`} />
      <input required type="email" name="email" placeholder="E-mail" className={`${input} h-12`} />
      <textarea
        required
        name="message"
        placeholder="Сообщение"
        rows={5}
        className={`${input} resize-y py-3`}
      />
      <Button size="lg" type="submit" className="w-full">
        Отправить
      </Button>
    </form>
  );
}
