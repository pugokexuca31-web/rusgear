'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

type Mode = 'login' | 'register';

export default function AccountPage() {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notice, setNotice] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim() || !password) {
      setNotice('Заполните e-mail и пароль.');
      return;
    }
    // Фаза 1 (макет): аутентификации на витрине нет — личный кабинет появится
    // при подключении платформы. Пока подтверждаем ввод дружелюбным сообщением.
    setNotice(
      mode === 'login'
        ? 'Личный кабинет скоро откроется. Оформить заказ можно без регистрации — как гость.'
        : 'Регистрация появится с запуском личного кабинета. Пока оформляйте заказ как гость.',
    );
  }

  return (
    <div className="container-rg py-12">
      <div className="mx-auto max-w-md">
        <h1 className="mb-8 text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
          {mode === 'login' ? 'Вход' : 'Регистрация'}
        </h1>

        <div className="mb-6 flex border hairline text-sm font-semibold uppercase tracking-wide">
          <button
            onClick={() => { setMode('login'); setNotice(null); }}
            className={`flex-1 py-3 transition-colors ${mode === 'login' ? 'bg-ink-900 text-white' : 'text-ink-600 hover:text-ink-900'}`}
          >
            Вход
          </button>
          <button
            onClick={() => { setMode('register'); setNotice(null); }}
            className={`flex-1 py-3 transition-colors ${mode === 'register' ? 'bg-ink-900 text-white' : 'text-ink-600 hover:text-ink-900'}`}
          >
            Регистрация
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-ink-500">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-12 w-full border hairline bg-transparent px-4 text-sm outline-none focus:border-ink-900"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-ink-500">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-12 w-full border hairline bg-transparent px-4 text-sm outline-none focus:border-ink-900"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {notice && (
            <p className="border-l-2 border-accent-red bg-ink-50 px-4 py-3 text-sm text-ink-700">{notice}</p>
          )}

          <Button size="lg" className="w-full">
            {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-ink-400">
          Оформление заказа доступно без регистрации.{' '}
          <Link href="/catalog" className="text-ink-700 underline hover:text-accent-red">Перейти в каталог</Link>
        </p>
      </div>
    </div>
  );
}
