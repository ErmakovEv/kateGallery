'use client';

import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';
import { registartion } from '../../lib/actions';

export default function RegisterForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';

  const [errorMessage, formAction, isPending] = useActionState(
    registartion,
    undefined
  );

  return (
    <form action={formAction}>
      <div className="w-full ">
        <div className="flex flex-col items-center justify-center">
          <div>
            <label htmlFor="name">Имя</label>
            <div className="relative">
              <input
                type="text"
                name="name"
                required
                placeholder="Введите имя"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email">E-Mail</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                placeholder="Введите email"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password">Пароль</label>
            <div className="relative">
              <input
                type="password"
                name="password"
                required
                placeholder="Введите пароль"
              />
            </div>
          </div>
          <input type="hidden" name="redirectTo" value={callbackUrl} />
          <button className="mt-4 w-full" aria-disabled={isPending}>
            Зарегистрироваться
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
      </div>
    </form>
  );
}
