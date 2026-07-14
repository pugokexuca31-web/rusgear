'use client';

import { useState } from 'react';

/** Подписка на рассылку. При сращивании — POST /newsletter. */
export function NewsletterForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return <p className="text-sm text-brand-light">Спасибо! Вы подписаны.</p>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: POST /api/storefront/v1/newsletter { email }
        setDone(true);
      }}
      className="flex border border-ink-700 focus-within:border-ink-400"
    >
      <input
        type="email"
        required
        name="email"
        placeholder="E-mail"
        className="h-11 w-full bg-transparent px-3 text-sm text-white outline-none placeholder:text-ink-500"
        aria-label="E-mail для подписки"
      />
      <button
        type="submit"
        className="h-11 shrink-0 bg-accent-red px-4 font-heading text-xs font-bold uppercase text-white hover:bg-[#b52f28]"
      >
        ОК
      </button>
    </form>
  );
}
