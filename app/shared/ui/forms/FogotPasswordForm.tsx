'use client';

import { useActionState } from 'react';
import { fogotPassword } from '../../lib/actions';
import { Button } from '../Button';
import { Send } from 'lucide-react';

export default function FogotPasswordForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    fogotPassword,
    undefined
  );

  return (
    <form action={formAction}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-full">
          <label htmlFor="email">E-Mail</label>
          <div className="relative">
            <input
              type="email"
              name="email"
              required
              placeholder="Введите email"
              className="w-full border-b border-marshmallow-400"
            />
          </div>
        </div>
        <div className="w-full">
          <Button
            aria-disabled={isPending}
            label="Отправить"
            icon={<Send />}
            variant="secondary"
            className="w-full"
            size="small"
          />
        </div>

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
