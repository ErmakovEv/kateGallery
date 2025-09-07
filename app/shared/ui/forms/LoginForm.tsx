'use client';

import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';
import { authenticate } from '../../lib/actions';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';

  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form action={formAction}>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full">
          <label htmlFor="email">E-Mail</label>
          <div className="relative">
            <input
              type="email"
              name="email"
              required
              placeholder="Введите email"
              className="w-full border-b border-marshmallow-400 "
            />
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="password">Пароль</label>
          <div className="relative">
            <input
              type="password"
              name="password"
              required
              placeholder="Введите пароль"
              className="w-full border-b border-marshmallow-400"
            />
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <button
          className="mt-4 w-full bg-marshmallow-400 p-2 rounded-2xl"
          aria-disabled={isPending}
        >
          Войти
        </button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
      </div>
    </form>
  );
}
